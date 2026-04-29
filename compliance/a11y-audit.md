# WCAG 2.1 AA Audit

**Generated:** 2026-04-29
**Standard:** WCAG 2.1 AA, Section 1557 (ACA), and ADA Title III digital-accessibility expectations.
**Method:** Static source-code review of `app/`, `components/`, and `content/` paired with structured checks against the four WCAG principles (Perceivable, Operable, Understandable, Robust). Browser-rendering checks (color contrast at the pixel level, screen-reader walk-through, keyboard tab order across the live site) are flagged as follow-ups for in-browser verification.

## Summary

| Area | Status |
|---|---|
| Skip-to-main-content link | ✅ **Added in this commit** (`app/layout.tsx`) |
| `<main>` landmark | ✅ Present and now anchored by `id="main-content"` |
| `lang` attribute on `<html>` | ✅ `lang="en"` |
| Image alt text | ✅ No `<img>` / `<Image>` without `alt` detected via grep |
| Form fields with labels | ✅ All inputs found have associated `<label htmlFor>` or `aria-label` (StateGate, WaitlistForm, CookieConsent) |
| Heading hierarchy | ✅ Each page has exactly one `<h1>`; subheadings descend correctly in audited pages |
| Reduced-motion respected | ✅ Hero animations use `motion-reduce:hover:translate-y-0` etc. (Framer Motion respects `prefers-reduced-motion`) |
| Cookie consent: keyboard accessible | ✅ Standard buttons + `<input type="checkbox">` are tab-able |
| Cookie consent: dialog semantics | ✅ `role="dialog"` + `aria-label` added in this commit |
| External links: `rel="noopener noreferrer"` | ✅ External links in `/legal/*` use `target="_blank" rel="noopener noreferrer"` |
| `aria-hidden` on decorative SVG / motion blobs | ⚠️ **Follow-up** — many decorative `<div>` and `<svg>` blobs are not explicitly marked `aria-hidden`; low-priority since they contain no text |
| Color contrast (live render) | ⚠️ **Follow-up** — needs in-browser verification; CSS variables suggest bottom-light-on-cream backgrounds may be borderline at the smallest text sizes |
| Focus indicators across interactive elements | ⚠️ **Follow-up** — a few CTA buttons rely on browser default focus rings; verify visual contrast meets AA |
| Screen-reader walk-through | ⚠️ **Follow-up** — perform with VoiceOver on the new pages added today |
| Captions for any video | N/A — no video content yet |

## Fixes applied in this commit

1. **Skip-to-main-content link** added at the top of `<body>`. Visible only on focus; jumps to `#main-content`.
2. `<main>` element now has `id="main-content"` and `tabIndex={-1}` so the skip link can move focus into the main region.
3. Cookie consent dialog now uses `role="dialog"` + `aria-label="Cookie preferences"` and a `<fieldset>` + `<legend className="sr-only">` for the category toggles.
4. State selector `<select>` has an `<label htmlFor>` (visually hidden via `sr-only`) so screen readers identify the control.

## Open follow-up items (browser-verification needed)

These are not in the current pass because they require running the live site (or a build) and clicking through with a screen reader / tab key.

- **Live color-contrast pass** — run `axe-core` or `pa11y` on a build and capture failures, especially on:
  - White-on-cream sections (`bg-[var(--color-bg-cream)]` paired with light text)
  - Hero subhead text on the dark cinematic background (the new "Source: AAOS 2026" caption uses `text-white/45` &mdash; verify AA contrast)
  - Footer dark-mode legal links (`text-white/55`)
- **Keyboard tab order** through:
  - The waitlist modal (focus trap when open?)
  - The state gate in `/assessment` (does focus move to the dropdown on entry?)
  - The cookie consent dialog (does focus return to the trigger when closed via "Manage cookies"?)
- **Screen-reader walk-through** with VoiceOver on at minimum: `/`, `/landing`, `/legal/notice-of-privacy-practices`, `/legal/telehealth-informed-consent`, `/legal/sources`, `/legal/licensed-states`, `/about/medical-team`.
- **Decorative motion** on the homepage / landing — many absolute-positioned blurred blobs in `MeshBackground`, `TiltCard`, etc. None contains text, but a sweep to add `aria-hidden="true"` to them eliminates noise for screen-reader users.
- **Patient portal a11y** — deferred until the test patient account exists (paired with the broader portal audit in `escalations.md` R-2).

## Recommended tooling for the next pass

- `pnpm dlx @axe-core/cli https://localhost:3000` (or whatever the dev URL is) on each route in the marketing surface.
- Lighthouse CI on the Vercel preview deployment.
- Manual VoiceOver pass on the highest-traffic public pages.

When these are run, append findings as a "Pass 2" section to this file.
