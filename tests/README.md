# Browser regression checks

Run these against the real repository, not a recreated HTML fixture:

```sh
python -m pip install playwright
python -m playwright install chromium
python tests/serve.py
```

In another terminal:

```sh
BAMI_PROFILE=legacy python tests/browser-checks.py
```

`tests/serve.py` binds only to 127.0.0.1:8080 and returns the repository's
`404.html` with status 404 for missing paths. This tests root-relative assets
on nested URLs; it does not prove GitHub Pages, DNS or HTTPS configuration.
Override the server port with `--port` and match `BAMI_BASE_URL`.

The legacy profile is the contract for the currently committed application.
The enhanced profile is an explicit future-feature contract. Select it with
`BAMI_PROFILE=enhanced`; absent features fail rather than being skipped.
It expects the proposed virtual filesystem, literal identity, resizing,
page/screen placement, care controls and cat-gated seam. When that application
update is integrated, change the workflow's default from legacy to enhanced
in the same commit. A legacy green run is not proof of enhanced features.

The suite waits for the seam to be attached, not prematurely visible.
Enhanced discovery uses the real keyboard-accessible pet inspect action.
Named actions replace exact control counts; visual behavior replaces
assumptions about the number of SVG paths. Keyboard, mouse/touch holds,
streaming, interruption, four puzzle stages, palettes, taskbar controls,
output safety, history bounds, cross-tab reset, storage failures, API
fallback, nested 404 loading and reduced motion remain covered.

`test-results/` holds screenshots and a JSON report even after test failure.
CI uploads these and the server log. Dependency versions are printed in CI;
Playwright is currently unpinned. Public repository API responses are stubbed.
No tokens, real repository writes or destructive host commands are used.
These tests do not audition audio, audit screen readers or physical devices,
or certify comet physics. Do not describe them as those verifications.
