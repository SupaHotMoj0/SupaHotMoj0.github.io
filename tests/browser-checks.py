"""Run against real repository pages, not a synthetic HTML fixture.
BAMI_PROFILE=legacy tests main; enhanced is a strict future-feature contract.
"""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = os.getenv('BAMI_BASE_URL', 'http://127.0.0.1:8080').rstrip('/')
PROFILE = os.getenv('BAMI_PROFILE', 'legacy')
if PROFILE not in ('legacy', 'enhanced'):
    raise SystemExit('BAMI_PROFILE must be legacy or enhanced')
ENHANCED = PROFILE == 'enhanced'
OUT = Path(os.getenv('BAMI_EVIDENCE_DIR', 'test-results'))
OUT.mkdir(parents=True, exist_ok=True)
checks, errors, asset_errors, contexts = [], [], [], []
FIXTURES = [
    dict(name='frame-one', description='Public browser-test fixture.', language='JavaScript', fork=False, stargazers_count=2, forks_count=1),
    dict(name='frame-two', description='Public browser-test fixture.', language='Python', fork=True, stargazers_count=1, forks_count=0),
]

def check(name, value):
    checks.append(dict(test=name, passed=bool(value)))
    if not value:
        raise AssertionError(name)

def attach(page):
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('response', lambda response: asset_errors.append(response.url) if '/assets/' in response.url and response.status >= 400 else None)
    page.on('requestfailed', lambda request: asset_errors.append(request.url) if '/assets/' in request.url else None)

def page_for(browser, width=1440, height=1000, reduced=False, touch=False, storage='normal', offline=False):
    ctx = browser.new_context(viewport=dict(width=width, height=height), has_touch=touch, is_mobile=touch, reduced_motion='reduce' if reduced else 'no-preference')
    contexts.append(ctx)
    if storage == 'blocked':
        ctx.add_init_script("Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError')}})")
    if storage == 'corrupt':
        ctx.add_init_script("if(!sessionStorage.getItem('corrupt-once')){localStorage.setItem('sb-q-campaign-v3','{bad');sessionStorage.setItem('corrupt-once','yes')}")
    if offline:
        ctx.route('https://api.github.com/**', lambda route: route.abort())
    else:
        ctx.route('https://api.github.com/**', lambda route: route.fulfill(status=200, content_type='application/json', body=json.dumps(FIXTURES)))
    page = ctx.new_page()
    page.set_default_timeout(10000)
    attach(page)
    page.goto(BASE + '/')
    expect(page.locator('#pet-earth')).to_be_visible()
    # The seam must exist, but enhanced mode intentionally keeps it hidden.
    page.locator('.packet-seam').wait_for(state='attached')
    return ctx, page

def panel(page):
    page.locator('#pet-earth').focus()
    page.keyboard.press('Shift+F10')
    expect(page.locator('#pet-console')).to_be_visible()

def wake(page):
    if page.locator('#space-cat').is_hidden():
        page.locator('#pet-earth').click()
    expect(page.locator('#space-cat')).to_be_visible()

def discover(page):
    if ENHANCED:
        check('Unattended seam stays hidden', page.locator('.packet-seam').is_hidden())
        wake(page)
        panel(page)
        # A real keyboard-accessible action, not QVault.advance or injected state.
        page.locator('[data-pet-action=inspect]').click()
        page.keyboard.press('Escape')
    expect(page.locator('.packet-seam')).to_be_visible(timeout=30000)
    page.locator('.packet-seam').click()
    page.select_option('#kind', 'mojo')
    page.select_option('#sort', 'jojo')
    expect(page.locator('.legendary-open')).to_be_visible()
    page.locator('.legendary-open').click()
    expect(page.locator('#terminal-window')).to_be_visible()

def run(page, command):
    page.locator('#command').fill(command)
    page.locator('#command').press('Enter')

def last(page):
    return page.locator('#terminal-log .tty-row').last

def output(page, command, text):
    run(page, command)
    expect(last(page)).to_have_text(text)
    check(command, True)

def fits(page, selector):
    r = page.locator(selector).bounding_box()
    v = page.viewport_size
    return r and r['x'] >= -1 and r['y'] >= -1 and r['x'] + r['width'] <= v['width'] + 1 and r['y'] + r['height'] <= v['height'] + 1

def exercise(browser):
    ctx, page = page_for(browser)
    check('Cat dormant on load', page.locator('#space-cat').is_hidden())
    check('House hidden initially', page.locator('#pet-house').is_hidden())
    check('No unlock form', page.locator('#unlock-form').count() == 0)
    check('Terminal hidden initially', page.locator('#terminal-window').is_hidden())
    check('Original Earth vector exists', page.locator('#pet-earth svg circle').count() >= 3)
    page.locator('#pet-earth').focus()
    page.keyboard.press('Tab')
    page.wait_for_timeout(800)
    check('Short Tab does not open controls', page.locator('#pet-console').is_hidden())
    check('Short Tab moves focus', page.evaluate("document.activeElement.id !== 'pet-earth'"))
    page.locator('#pet-earth').focus()
    page.keyboard.down('Tab')
    page.wait_for_timeout(800)
    page.keyboard.up('Tab')
    expect(page.locator('#pet-console')).to_be_visible()
    check('Held Tab opens controls', True)
    page.keyboard.press('Escape')
    expect(page.locator('#pet-console')).to_be_hidden()
    check('Closing panel restores focus', page.evaluate("document.activeElement.id === 'pet-earth'"))
    panel(page)
    check('No modal focus trap', page.locator('#pet-console').get_attribute('aria-modal') == 'false')
    check('Audio defaults off', page.locator('[data-pet-action=sound]').get_attribute('aria-pressed') == 'false')
    # Assert actions, not an exact count: new care controls may be added.
    for action in ('pet', 'follow', 'roam', 'home', 'motion', 'sound', 'close'):
        check('Action: ' + action, page.locator('[data-pet-action=' + action + ']').count() == 1)
    page.keyboard.press('Escape')
    page.keyboard.press('Enter')
    expect(page.locator('#space-cat')).to_be_visible()
    expect(page.locator('#pet-house')).to_be_visible()
    check('Enter wakes cat and reveals house', True)
    eye = '#space-cat .pet-eyes ellipse' if ENHANCED else '#space-cat .eyes-normal ellipse'
    check('Neon eyes remain rendered', page.locator(eye).count() >= 2)
    start = page.locator('#space-cat').bounding_box()
    page.wait_for_function("([x,y])=>{const r=document.querySelector('#space-cat').getBoundingClientRect();return Math.abs(r.x-x)+Math.abs(r.y-y)>8}", arg=[start['x'], start['y']], timeout=15000)
    check('Activated pet moves', True)
    panel(page)
    page.locator('[data-pet-action=motion]').click()
    page.keyboard.press('Escape')
    frozen = page.locator('#space-cat').bounding_box()
    page.wait_for_timeout(400)
    check('Independent pause freezes movement', page.locator('#space-cat').bounding_box() == frozen)
    check('Pet pause does not pause site', not page.locator('body').evaluate("e=>e.classList.contains('motion-paused')"))
    page.locator('#space-cat').scroll_into_view_if_needed()
    page.locator('#space-cat').click()
    check('Petting makes eyes happy', page.locator('#space-cat').get_attribute('data-emotion') == 'happy')
    check('Visual purr', 'prrr' in page.locator('#pet-bubble').inner_text())
    if not ENHANCED:
        check('Legacy purring state', page.locator('#space-cat').get_attribute('data-state') == 'purring')
    panel(page)
    page.locator('[data-pet-action=follow]').click()
    panel(page)
    check('Follow mode selectable', 'follow' in page.locator('#pet-telemetry').inner_text())
    page.locator('[data-pet-action=roam]').click()
    panel(page)
    check('Roam mode selectable', 'roam' in page.locator('#pet-telemetry').inner_text())
    page.locator('[data-pet-action=motion]').click()
    page.locator('[data-pet-action=home]').click()
    # New panel actions need not automatically close their panel.
    if page.locator('#pet-console').is_visible():
        page.keyboard.press('Escape')
    expect(page.locator('#space-cat')).to_be_hidden(timeout=30000)
    check('Return home completes', True)
    page.locator('#pet-house').click()
    expect(page.locator('#space-cat')).to_be_visible()
    check('House can wake cat', True)
    page.reload()
    expect(page.locator('#pet-earth')).to_be_visible()
    check('Reload does not wake cat', page.locator('#space-cat').is_hidden())
    box = page.locator('#pet-earth').bounding_box()
    page.mouse.move(box['x'] + 25, box['y'] + 35)
    page.mouse.down()
    page.mouse.move(box['x'] - 30, box['y'] + 15)
    page.wait_for_timeout(800)
    page.mouse.up()
    check('Movement cancels long press', page.locator('#pet-console').is_hidden())
    page.mouse.move(box['x'] + 25, box['y'] + 35)
    page.mouse.down()
    page.wait_for_timeout(800)
    page.mouse.up()
    expect(page.locator('#pet-console')).to_be_visible()
    check('Mouse long press opens panel', True)
    check('Long press does not also wake cat', page.locator('#space-cat').is_hidden())
    page.keyboard.press('Escape')
    page.locator('#pet-earth').click(button='right')
    expect(page.locator('#pet-console')).to_be_visible()
    check('Right-click opens panel', True)
    page.keyboard.press('Escape')
    page.locator('body').press('b')
    page.locator('body').press('a')
    page.locator('body').press('m')
    page.locator('body').press('i')
    page.keyboard.press('Alt+Backquote')
    check('Legacy shortcut cannot bypass discovery', page.locator('#terminal-window').is_hidden())
    page.select_option('#kind', 'mojo')
    page.select_option('#sort', 'jojo')
    check('Dropdown pair alone does not unlock', page.locator('.legendary-card').count() == 0)
    discover(page)
    check('Discovery sets fragment', page.evaluate('QVault.snapshot().fragment'))
    check('Discovery opens phase one', page.evaluate('QVault.snapshot().level') == 1)
    check('Game statistics labeled fictional', 'NOT GITHUB STATISTICS' in page.locator('.legendary-card').inner_text())
    page.wait_for_timeout(700)
    n = len(page.locator('#terminal-log').inner_text())
    check('Output is incremental', 1 <= n < 80)
    page.wait_for_function('n=>document.querySelector("#terminal-log").innerText.length>n', arg=n)
    check('Output keeps streaming', True)
    check('Per-unit output exists', page.locator('.typed-unit').count() > 0)
    check('No character live-region spam', page.locator('#terminal-log').get_attribute('aria-live') is None)
    page.screenshot(path=str(OUT / 'desktop.png'))
    page.locator('#terminal-minimize').click()
    expect(page.locator('#terminal-window')).to_be_hidden()
    expect(page.locator('#terminal-dock')).to_be_visible()
    check('Minimize leaves usable taskbar', True)
    page.locator('#terminal-dock').click()
    expect(page.locator('#terminal-window')).to_be_visible()
    check('Taskbar restores terminal', True)
    page.locator('#terminal-maximize').click()
    check('Maximize works', page.locator('#terminal-window').evaluate("e=>e.classList.contains('maximized')"))
    page.locator('#terminal-maximize').click()
    check('Restore size works', not page.locator('#terminal-window').evaluate("e=>e.classList.contains('maximized')"))
    page.locator('#terminal-close').click()
    check('Close hides taskbar too', page.locator('#terminal-taskbar').is_hidden())
    page.keyboard.press('Alt+Backquote')
    expect(page.locator('#terminal-window')).to_be_visible()
    check('Discovered shortcut restores', True)
    page.locator('#command').press('Control+c')
    check('Ctrl+C interrupts', '^C' in page.locator('#terminal-log').inner_text())
    run(page, 'carrier --invert')
    check('Phase two unlocks', page.evaluate('QVault.snapshot().level') == 2)
    check('Phase two palette', page.locator('#terminal-window').get_attribute('data-phase') == '2')
    run(page, 'mirror --read')
    check('Phase three unlocks', page.evaluate('QVault.snapshot().level') == 3)
    check('Phase three palette', page.locator('#terminal-window').get_attribute('data-phase') == '3')
    response = page.goto(BASE + '/test-suite/nested/missing-page')
    check('Nested missing path has HTTP 404', response.status == 404)
    expect(page.locator('#pet-earth')).to_be_visible()
    check('Custom 404 keeps noindex', 'noindex' in page.locator('meta[name=robots]').get_attribute('content'))
    page.locator('#sector-number').click()
    check('404 completes hunt', page.evaluate('QVault.snapshot().level') == 4)
    check('Phase four palette', page.locator('#terminal-window').get_attribute('data-phase') == '4')
    page.emulate_media(reduced_motion='reduce')
    expect(page.locator('.tty-row.typing')).to_have_count(0)
    check('Reduced motion flushes queue', True)
    run(page, 'clear')
    run(page, '<img src=x onerror=alert(1)>')
    expect(page.locator('#terminal-log')).to_contain_text('<img src=x')
    check('Output cannot create HTML', page.locator('#terminal-log img').count() == 0)
    run(page, 'help')
    expect(page.locator('.tty-row.help').last).to_be_visible()
    check('Help green', page.locator('.tty-row.help').last.evaluate('e=>getComputedStyle(e).color') == 'rgb(157, 255, 186)')
    check('Input green', page.locator('#command').evaluate('e=>getComputedStyle(e).color') == 'rgb(157, 255, 186)')
    run(page, 'date')
    page.locator('#command').press('ArrowUp')
    check('History recalls command', page.locator('#command').input_value() == 'date')
    page.locator('#command').press('ArrowDown')
    check('History reaches empty input', page.locator('#command').input_value() == '')
    for _ in range(105):
        run(page, 'date')
    check('Transcript bounded', page.locator('#terminal-log > p').count() <= (140 if ENHANCED else 90))
    other = ctx.new_page()
    attach(other)
    other.goto(BASE + '/')
    other.wait_for_function('window.QVault && QVault.snapshot().level===4')
    check('Campaign persists across pages/tabs', True)
    run(page, 'Nullify.Bami')
    other.wait_for_function('QVault.snapshot().level===0')
    check('Reset propagates across tabs', True)
    check('Reset closes terminal', page.locator('#terminal-window').is_hidden())
    check('Reset clears output', page.locator('#terminal-log > p').count() == 0)
    check('Reset clears discovery', not page.evaluate('QVault.snapshot().fragment'))
    check('Reset removes campaign storage', page.evaluate("localStorage.getItem('sb-q-campaign-v3')===null"))
    check('Reset preserves repository cache', page.evaluate("localStorage.getItem('sb-repos-v2-SupaHotMoj0')!==null"))
    ctx.close()
    for width in (390, 360):
        ctx, page = page_for(browser, width=width, height=844, touch=True, reduced=True)
        check('Phone layout fits ' + str(width), page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
        page.locator('#pet-earth').tap()
        expect(page.locator('#space-cat')).to_be_visible()
        frozen = page.locator('#space-cat').bounding_box()
        page.wait_for_timeout(350)
        check('Reduced-motion pet stationary', page.locator('#space-cat').bounding_box() == frozen)
        page.locator('#space-cat').scroll_into_view_if_needed()
        page.locator('#space-cat').tap()
        check('Touch petting works', page.locator('#space-cat').get_attribute('data-emotion') == 'happy')
        panel(page)
        check('Phone panel fits', fits(page, '#pet-console'))
        check('Care controls at least 44px', page.locator('.alien-action-grid button').evaluate_all('es=>es.every(e=>e.getBoundingClientRect().height>=44)'))
        page.locator('[data-pet-action=home]').tap()
        if page.locator('#pet-console').is_visible():
            page.keyboard.press('Escape')
        expect(page.locator('#space-cat')).to_be_hidden()
        page.locator('#pet-house').tap()
        expect(page.locator('#space-cat')).to_be_visible()
        page.locator('#pet-house').tap()
        expect(page.locator('#space-cat')).to_be_hidden()
        check('Touch house wakes/returns pet', True)
        discover(page)
        check('Phone terminal fits', fits(page, '#terminal-window'))
        page.locator('#terminal-minimize').tap()
        page.locator('#terminal-dock').tap()
        expect(page.locator('#terminal-window')).to_be_visible()
        check('Touch taskbar works', True)
        page.screenshot(path=str(OUT / ('phone-' + str(width) + '.png')))
        ctx.close()
    ctx, page = page_for(browser, width=360, height=844, touch=True)
    box = page.locator('#pet-earth').bounding_box()
    page.dispatch_event('#pet-earth', 'pointerdown', dict(pointerId=7, pointerType='touch', button=0, clientX=box['x']+20, clientY=box['y']+30))
    page.wait_for_timeout(800)
    page.dispatch_event('#pet-earth', 'pointerup', dict(pointerId=7, pointerType='touch', button=0))
    page.dispatch_event('#pet-earth', 'click')
    expect(page.locator('#pet-console')).to_be_visible()
    check('Touch hold suppresses ordinary tap', page.locator('#space-cat').is_hidden())
    ctx.close()
    for storage in ('blocked', 'corrupt'):
        ctx, page = page_for(browser, storage=storage, offline=True, reduced=True)
        check('Fallback cards with ' + storage + ' storage', page.locator('#grid article.card').count() > 0)
        check('API fallback explicitly labeled', 'starter' in page.locator('#source-status').inner_text().lower())
        wake(page)
        discover(page)
        check('Hunt works with ' + storage + ' storage', page.evaluate('QVault.snapshot().level') == 1)
        run(page, 'Nullify.Bami')
        check('Reset works with ' + storage + ' storage', page.evaluate('QVault.snapshot().level') == 0)
        ctx.close()
    if ENHANCED:
        enhanced(browser)
    check('No failed site assets', not asset_errors)
    check('No uncaught page errors', not errors)

def enhanced(browser):
    ctx, page = page_for(browser, reduced=True)
    discover(page)
    check('Exact literal identity', "q^-^'p/" in page.locator('.shell-prompt').inner_text())
    output(page, 'whoami', "q^-^'p/")
    output(page, 'pwd', '/home/agent')
    run(page, 'echo hello > note.txt')
    output(page, 'cat note.txt', 'hello\n')
    run(page, 'echo world >> note.txt')
    output(page, 'cat note.txt | grep world | wc -w', '1')
    run(page, 'mkdir -p lab/deep')
    run(page, 'cd lab/deep')
    output(page, 'pwd', '/home/agent/lab/deep')
    run(page, 'cd ~')
    run(page, 'cp note.txt copied')
    run(page, 'mv copied moved')
    output(page, 'cat moved', 'hello\nworld\n')
    output(page, 'echo 63617272696572202d2d696e76657274 | xxd -r -p', 'carrier --invert')
    output(page, 'echo "daer-- rorrim" | rev', 'mirror --read')
    output(page, 'echo "|"', '|\n')
    output(page, 'echo ">"', '>\n')
    run(page, 'echo no > /etc/forbidden')
    expect(last(page)).to_contain_text('Read-only')
    check('Protected virtual paths', True)
    run(page, 'sudo rm -rf /')
    expect(last(page)).to_contain_text('not supported')
    check('No false host sudo', True)
    run(page, 'secret')
    check('Legacy secret restored', page.locator('body').evaluate("e=>e.classList.contains('egg')"))
    run(page, 'open sesame')
    check('Legacy open sesame restored', not page.locator('body').evaluate("e=>e.classList.contains('egg')"))
    run(page, 'window compact')
    expect(page.locator('#terminal-window')).to_have_css('width', '420px')
    grip = page.locator('.resize-grip[data-edge=se]')
    grip.focus()
    page.keyboard.press('ArrowLeft')
    expect(page.locator('#terminal-window')).to_have_css('width', '404px')
    check('Keyboard resize', True)
    box = grip.bounding_box()
    page.mouse.move(box['x']+8, box['y']+8)
    page.mouse.down()
    page.mouse.move(box['x']+60, box['y']+40, steps=4)
    page.mouse.up()
    check('Pointer resize', page.locator('#terminal-window').bounding_box()['width'] > 440)
    run(page, 'window page')
    page.evaluate('scrollTo(0,0)')
    before = page.locator('#terminal-window').evaluate('e=>e.getBoundingClientRect().top+scrollY')
    page.evaluate('scrollTo(0,100)')
    after = page.locator('#terminal-window').evaluate('e=>e.getBoundingClientRect().top+scrollY')
    check('Page placement preserves document coordinate', abs(before-after) < 2)
    run(page, 'window screen')
    before = page.locator('#terminal-window').bounding_box()['y']
    page.evaluate('scrollTo(0,200)')
    check('Screen placement stays fixed', abs(before-page.locator('#terminal-window').bounding_box()['y']) < 2)
    run(page, 'sleep 5')
    page.locator('#command').press('Control+c')
    output(page, 'echo ready', 'ready\n')
    page.locator('#terminal-close').click()
    wake(page)
    panel(page)
    for action, meter in (('feed', 'food'), ('drink', 'water'), ('play', 'play')):
        page.locator('[data-pet-action=' + action + ']').click()
        check('Care: ' + action, page.locator('meter[aria-label=' + meter + ']').evaluate('e=>e.value') == 100)
    page.keyboard.press('Escape')
    before = page.locator('#space-cat').evaluate('e=>e.getBoundingClientRect().top+scrollY')
    page.evaluate('scrollBy(0,100)')
    after = page.locator('#space-cat').evaluate('e=>e.getBoundingClientRect().top+scrollY')
    check('Pet stays document-anchored', abs(before-after) < 2)
    # Check the requested Unicode content, not a particular glyph font.
    check('Full legendary seal', page.locator('.legendary-seal').text_content() == "qง'̀-'́pง̀")
    ctx.close()

failure = None
try:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            exercise(browser)
        except Exception:
            for i, ctx in enumerate(contexts):
                try:
                    for j, page in enumerate(ctx.pages):
                        if not page.is_closed():
                            page.screenshot(path=str(OUT / ('failure-%s-%s.png' % (i, j))))
                except Exception:
                    pass
            raise
        finally:
            browser.close()
except Exception as exc:
    failure = str(exc)
    raise
finally:
    report = dict(profile=PROFILE, base_url=BASE, checks=len(checks), passed=sum(c['passed'] for c in checks), tests=checks, failure=failure, page_errors=errors, asset_errors=asset_errors, limits=['Chromium with stubbed public API; not live DNS/HTTPS, physical-device, screen-reader, or recorded-audio verification.'])
    (OUT / 'browser-checks.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps({k: report[k] for k in ('profile', 'checks', 'passed', 'failure')}))
