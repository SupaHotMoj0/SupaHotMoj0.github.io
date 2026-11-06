# SUPAHOTBAMI // Developer Observatory

Static portfolio for https://git.supahotbami.nl. No build step, external JavaScript libraries, remote fonts, analytics, backend shell, or account tokens.

## Bami Habitat

An original, opt-in web pet with original inline vector art. Inspired by the desktop-pet genre and [adryd325/oneko.js](https://github.com/adryd325/oneko.js), not a copy of its code or sprite sheet. The habitat implementation (`assets/pet.js` and `assets/pet.css`) is MIT licensed; see `LICENSE-HABITAT`.

- Tap/click the tiny floating Earth to reveal its miniature house and wake the black cat. The cat does not roam before activation and activation is not persisted across page loads.
- Tap/click the cat to pet it. Neon eyes change with curiosity, alertness, contentment and sleep; visual purring happens during play and at occasional idle intervals.
- Tap/click the house to call it home. It navigates back and goes inside; the planet remains available to wake it again.
- Hold the cat, Earth, or house for 650 ms to reveal the ancient habitat controls. Dragging beyond 12 px cancels the hold. Mouse right-click and keyboard Shift+F10 also open them.
- Keyboard: focus a habitat control, then hold Tab for 700 ms. Normal short Tab presses still move focus normally. Enter/Space activates the Earth or house. Escape closes the panel; arrows/Home/End navigate its actions.
- The hidden panel provides pet/purr, follow, explore, return home, pause pet, optional sound, page-top and projects actions. It is non-modal: normal keyboard navigation is never trapped.
- Audio defaults to off. Enabling sound permits a quiet synthesized purr only, not a downloaded recording or autoplay soundtrack. Mute stops active sound nodes; hidden tabs and motion pause stop sound too.
- The pet samples visible heading/text rectangles and frame edges, chooses perches, and uses a bounded A* lattice to steer around content. This is a small whimsical navigator, not a complete DOM physics engine. It never clicks links, types into forms, steals page selection or invokes commands on its own.
- No pet data is transmitted. Only explicit page navigation or the site's existing public GitHub fetches use the network.

## Carrier terminal

The old public unlock-word form and decorative duplicate controls have been removed. There is now a local discovery trail involving the repository explorer and the custom 404 page. It is a public, client-side game, **not authentication or hidden server access**. No walkthrough is printed in the interface or this README.

The terminal supports staged colors on near-black glass, slow grapheme/word output with varied timing, individually settling units, command history and Ctrl+C interruption. User input and ordinary help are green. A separate live-region transcript announces completed lines instead of every character. The three top-left controls really close, minimize to a taskbar, and maximize/restore. Drag or keyboard-move the titlebar; Escape minimizes; Alt+Backquote restores only after discovery.

`Nullify.Bami`, displayed in the terminal footer, resets the campaign, its discovery flags, terminal transcript and in-memory history, palette effects and pet activity. Storage events synchronize campaign progress/reset between tabs. It does not delete unrelated local-storage data, motion preferences, or public repository caches.

The slight BAMI_ glitch and CRT effects are decorative. The page motion control and system reduced-motion preference override decorative animation; reduced motion also changes terminal output to immediate text. The independently paused pet does not pause the rest of the site. Background tabs stop animation loops. Pet and sky loops are capped around 30 fps; real performance depends on device/browser.

## Files

- `index.html`, `404.html`: original identity, content and profile links, shared terminal/habitat assets; 404 retains `noindex`.
- `assets/site.css`: baseline responsive site layout.
- `assets/experience.css`: restrained logo interference, carrier UI and discovery card.
- `assets/cipher.js`: bounded versioned campaign state and repository artifact.
- `assets/terminal.js`: whitelisted local simulation, queue, controls and history.
- `assets/pet.js`, `assets/pet.css`: reusable original planet/house/cat habitat.
- `assets/space.js`: shared depth-projected sky, motion controls, comet and warp.
- `assets/repos.js`: public repository browser with pagination, cache and marked fallback.
- `assets/favicon.svg`: site icon.

Assets use a version query for cache refresh. Root-relative paths support nested missing URLs on this custom-domain/user Pages site. CNAME and `.nojekyll` are preserved unchanged.

## Data and privacy

Local storage contains the motion preference, a 15-minute public GitHub repository cache, and validated campaign flags (`sb-q-campaign-v3`). Terminal commands/history remain memory-only. Repository API failures use a clearly labeled cache or starter index; starter entries are not live metrics. Forks/archives are labeled, and non-fork is not proof of authorship. The legendary card's playful statistics are labeled **local fiction / not GitHub statistics**.

Output is inserted as text, never evaluated as HTML or JavaScript. No arbitrary URLs or shell commands are executed. Browser requests to `api.github.com` retrieve public repository data; GitHub links are explicit HTTPS links. Do not put secrets or account tokens in these frontend files.

## Local checks

Serve the root with `python3 -m http.server 8080`. The Playwright script in `tests/browser-checks.py` runs against `BAMI_BASE_URL` (defaults to `http://127.0.0.1:8080`). Install Playwright and its Chromium browser in a separate developer environment. It stubs public repository data for deterministic checks and writes evidence only if `BAMI_EVIDENCE_DIR` is set. It is not a Pages build dependency.

Coverage includes opt-in behavior, planet/house controls, long press, ordinary Tab and held Tab, right-click/Shift+F10, mobile taps, purr feedback, no automatic audio, return-home, text safety, campaign persistence/reset, phased output, taskbar and maximize, bounded transcript/history, blocked storage, API fallback and reduced motion. Physical devices, assistive technologies, origin HTTPS/DNS and Pages deployments still require live verification.

## Deployment

Pages: `main`, `/(root)`, custom domain `git.supahotbami.nl`. Enable Enforce HTTPS once the certificate is ready. Preserve domain-verification TXT records. Cloudflare DNS should point `git` to `supahotmoj0.github.io`, not to a protocol or repository path. DNS-only is the simplest direct setup. If intentionally proxying, use Full (strict) after the origin certificate works; avoid Flexible. This code change does not modify GitHub Pages settings, DNS or Cloudflare configuration.
