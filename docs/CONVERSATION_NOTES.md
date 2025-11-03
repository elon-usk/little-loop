# LittleLoop – Working Notes (conversation summary)

This file captures the key decisions and changes we made so it’s easy to keep context and roll back when needed.

## Theme & Palette
- Brand primary (indigo): `#5E60CE`
- Brand amber (accent): `#F7B538`
- Brand coral (accent/hover): `#FF6B6B`
- Brand mint (tint/hover): `#9BE7C4`
- Soft header bg: `#F7F9FC`
- Text strong: `#2B2D42`
- Legacy tokens map to requested colors in `src/index.css`.

## Typography
- Body: Kodchasan (via Google Fonts)
- Header nav: Jost
- Logo: Playwrite HU (optical sizing on, weight 400)
- Removed logo glossy/shine; tightened letter spacing (0) and enabled kerning/ligatures.
- Logo markup: `littleloop` + `.ro` (in brand amber) via `<span class="tld">.ro</span>`.

## Header / Navbar
- Frosted glass header matches Subscribe popup (blur + brightness + soft border/shadow).
- Hover effect: orange → now coral slide-in; base text hides, overlay slides from above/below.
- Active state ready (use `aria-current="page"` when needed).

## Hero Section
- Stacked heading + subtext with tight spacing.
- Positioned under the fixed header (margin-top); background uses site beige.

## Map & Sections
- Leaflet map moved inside `#activitati` (right column of a two-column grid).
- Standalone map section visually hidden via CSS.
- Map tiles grayscale + slight desaturation; responsive sizing.
- “Despre” pushed further down so it doesn’t show above-the-fold.

## Tests (Playwright)
- Config: `playwright.config.mjs` (starts Vite on 5173).
- Tests in `tests/nav-hero-map.spec.ts`:
  - Header renders (logo + .ro color; nav items inside header scope).
  - Hero spacing check (measures gap between H1 and P).
  - Map presence at `#activitati #map`.
- Scripts: `npm run test:e2e`, `npm run test:e2e:ui`.

## Git Checkpoints
- Baseline tag: `v0-baseline` (initial state before further changes).
- Cleanup tag after tests/layout fixes: `v1-tests-cleanup`.

Quick rollback examples
- Reset all files to baseline (destructive):
  - `cd little-loop && git reset --hard v0-baseline`
- Restore one file from baseline:
  - `git checkout v0-baseline -- src/index.css`
- Go back to latest checkpoint:
  - `git reset --hard v1-tests-cleanup`

## Next Ideas
- Remove the old hidden map section from `src/App.jsx` (now redundant).
- Add tests for nav hover color and Contact underline animation.
- Optional: store future checkpoints as `v2-*`, `v3-*`, etc.

---
Append anything important here as we iterate. This file lives at `docs/CONVERSATION_NOTES.md` and can be committed with each change.
