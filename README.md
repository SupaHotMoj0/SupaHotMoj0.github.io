# SUPAHOTBAMI // Developer Observatory

Static GitHub Pages portfolio for https://git.supahotbami.nl. No build step, third-party JavaScript libraries, remote fonts, tracking scripts or backend shell.

## Audit baseline
Reviewed main at 1ad11cc2da42c900d80cc72c5221ee71f368a91a.
- index.html: 20,263 bytes; inline CSS and JavaScript, canvas starfield, static terminal introduction, live public repository browser with cache/fallback.
- 404.html: 4,427 bytes; custom error page, radial gradient and gentle 404 drift; no canvas/starfield.
- CNAME: 19 bytes, git.supahotbami.nl; preserved unchanged.
- .nojekyll: empty; preserved unchanged.
- README.md: empty before this update.
No separate CSS/JS files, image assets, framework or build workflow existed in that snapshot. The uploaded screenshots were not used as a source of precise code or deployment state.

## Updated structure
- index.html: existing identity, biography and project explorer, plus terminal and original inline SVG cat.
- 404.html: preserved error message/home links and noindex; shared sky effect. Root-relative assets work for nested missing paths on this custom-domain/user site.
- assets/site.css: responsive neon presentation, console, cat and reduced-motion rules.
- assets/space.js: shared projected-depth canvas sky, motion settings, occasional clickable comet, warp, cat and dock chase.
- assets/repos.js: public GitHub repository index, pagination, search, filters, sorting and cache/fallback.
- assets/terminal.js: whitelisted simulated commands, history, drag/minimize/restore and Easter eggs.

## Play
Unlock word: bami. It is intentionally public, not authentication. Commands: help, whoami, cat interests.txt, projects, repos, github, date, clear, stars pause, stars resume, warp, comet, cat, secret, open sesame, minimize. No eval, remote execution or arbitrary command URLs. Console input/history stays in memory and is not sent to a server.
Drag the title bar with a mouse or touch; focus it and use arrow keys (Shift = larger steps); Escape or the reset button returns it to its layout. Minimize to the draggable restore icon; the cat chases it and catches it. Activate that icon or Alt+Backquote to restore. Pet the cat or approach it with a mouse. Catch a comet or run secret to toggle the hidden palette. These are cosmetic, not security features.

## Motion, data and privacy
System reduced motion overrides animated features. The pause button controls the shared sky and decorative CSS motion. Background tabs stop the animation loop. Canvas uses at most 160 stars, DPR capped at 1.5 and approximately 30 animation frames per second. Browser performance is device-dependent.
Local storage contains the motion preference and a 15-minute public repository cache. Command history is memory-only, bounded to 50 entries; console output is bounded to about 80 blocks. Browsers contact api.github.com for public data; links to GitHub are explicit HTTPS links. No tokens, private repository metadata or credentials belong in frontend code.
Forks/archives are labeled and not silently omitted. Non-fork is not proof of authorship. If the API fails, a clearly marked stale cache or the supplied 18-name starter list remains visible; starter entries are not guaranteed current/public. Cache records are validated and output is inserted as text. GitHub rate limits still apply; pagination has a 100-page safety cap.

## Deployment checks (not automatically changed)
GitHub Settings > Pages: main, /(root), custom domain git.supahotbami.nl; enable Enforce HTTPS when the certificate is ready. Keep domain-verification TXT records.
Cloudflare DNS: git CNAME supahotmoj0.github.io (no protocol/repository path). DNS-only is the simplest direct setup; Cloudflare does not proxy/cache HTTP traffic in that mode. If deliberately enabling the proxy after origin HTTPS works, use Full (strict) with a valid hostname-matching origin certificate. Avoid Flexible. Do not automatically enable Rocket Loader, alter zone-wide redirects or change cache rules without testing. No Cloudflare or Pages setting is changed by this commit.

## Test checklist
Serve the repository root with python3 -m http.server 8080. Test at widths 360/768/1440, keyboard-only navigation, touch drag, terminal unlock/help/history, minimize/cat chase/restore, draggable dock, window resize, reduced motion, pause/resume, tab hide/show, comet and warp. Test API success, offline mode, rate-limit errors, malformed/blocked local storage and starter fallback. On the deployed site, test a nested nonexistent path and asset loading, response status 404, custom-domain redirects and HTTPS. The live domain could not be retrieved during the audit; this is not proof of an outage or a certificate error.

Documentation:
https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
https://developers.cloudflare.com/dns/proxy-status/
https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/
https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture
