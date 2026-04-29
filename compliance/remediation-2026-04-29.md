# LegitScript Compliance Remediation — Status (2026-04-29)

This file is the running tracker for the gap-analysis remediation work executed today. The original `gap-analysis.md` and `escalations.md` remain as point-in-time audit records; this file is the diff between then and now.

## Summary

| Gap ID | Title | Status |
|---|---|---|
| C-1 | Google Ads gtag firing on authenticated portal pages | ✅ **Done** |
| C-2 | Cookie banner reject + granular categories + script gating | ✅ **Done** |
| C-3 | Banned-phrase rewrites | ✅ **Done** |
| H-1 | 11 of 14 required legal/about pages missing or non-canonical | ✅ **Done** (placeholders flagged) |
| H-2 | HIPAA NPP content audit + content patches | ✅ **Done** (4 patches applied; 1 mailbox follow-up) |
| H-3 | Geo-gating + canonical state JSON + selector | ✅ **Done** (count pending Nelson confirmation) |
| H-4 | Footer rebuild | ✅ **Done** (NPI + phone + LegitScript ID flagged as pending) |
| H-5 | Compounded GLP-1 medication compliance posture | ✅ **Done** (partner identity flagged as pending) |
| H-6 | Site-wide testimonials policy | ⏸ Deferred per Nelson — "worry about testimonials once we have patients" |
| M-1 | Citation density / inline source attribution | ✅ **Done** (bare-minimum per Nelson) |
| M-2 | Comparison framing on `/landing` | ⏸ Deferred per Nelson — "Don't change. Stick with our header." |
| M-3 | Insurance qualifier on `/landing` FAQ | ✅ **Done** (Nelson flagged Healthie integration as future replacement) |
| M-4 | WCAG 2.1 AA audit | ✅ **Done — Pass 1** (skip link + dialog roles + sr-only labels added; in-browser verification still pending) |
| M-5 | BAA inventory | ⏸ Deferred per Nelson — "do this later" |
| M-6 | JSON-LD service-name rewrite | ✅ **Done** (bundled with C-3) |
| L-1 | Test patient account | ⏸ Carried into next wave — see `escalations.md` R-1 |
| L-2 | Dr. Saenz photo | ⏸ Closed per Nelson — "That is actually Dr. Saenz so we can leave it" |
| L-3 | Bracketed credential placeholders | ✅ Audited; remaining bracketed placeholders are intentional public flags ("[NPI — pending]", "[LegitScript ID — pending]") and are expected to remain until Nelson supplies the values |
| L-4 | `/portal/care-team` mock data | ⏸ Pre-launch acceptable; flagged to replace before any real patient sees the portal |
| L-5 | Sitemap regeneration | ✅ **Done** (12 new legal/about pages added; redirected paths excluded) |
| L-6 | Robots.txt portal disallow | ✅ **Done** (`/portal/`, `/login`, `/api/` disallowed) |
| L-7 | HSTS header verification | ⏸ Carried into next wave — needs prod header check after gate is lifted |

## Files added (this wave)

### Source pages (12 new + 3 relocated)

- `app/legal/licensed-states/page.tsx` — full list, status, geo-gate behavior
- `app/legal/sources/page.tsx` — claim-by-claim citations
- `app/legal/pharmacy-partners/page.tsx` — compounding partner disclosure (per H-5)
- `app/legal/telehealth-informed-consent/page.tsx` — federal baseline + CA / TX / NY notices
- `app/legal/affiliate-disclosure/page.tsx` — FTC §255 commercial disclosures
- `app/legal/refund-policy/page.tsx` — visit / subscription / supplement / lab / compounded med refund terms
- `app/legal/accessibility-statement/page.tsx` — WCAG 2.1 AA commitment + reporting path
- `app/legal/grievances/page.tsx` — MetaOrtho complaint path + state medical board / OCR / FTC escalation
- `app/legal/cookie-policy/page.tsx` — cookie list + categories + GPC honored
- `app/about/medical-team/page.tsx` — Dr. Saenz roster (NPI + license #s flagged pending)
- `app/about/contact/page.tsx` — practice address + emergency disclaimer + Privacy Officer
- Relocated: `/privacy` → `/legal/privacy-policy`, `/terms` → `/legal/terms-of-service`, `/hipaa` → `/legal/notice-of-privacy-practices` (all with 301 redirects via `next.config.ts`)

### Source modules

- `lib/states.ts` — canonical state list with `licensed | pending | not-served` status. All UI surfaces read `LICENSED_COUNT` from here.
- `components/intake/StateGate.tsx` — first-step state selector with out-of-state waitlist screen
- `components/Analytics.tsx` — gtag injection that respects route allow-list AND consent state, replacing the global injection in root layout

### Source files modified

- `app/layout.tsx` — removed inline gtag; added `<Analytics />`; updated JSON-LD service name; added skip-to-main-content link; added `id="main-content"` to `<main>`
- `app/page.tsx` — added inline AAOS source caption beneath hero stat
- `app/landing/page.tsx` — added inline AAOS source caption + insurance-coverage qualifier on FAQ
- `app/about/AboutContent.tsx` — added superscript citation pointer to /legal/sources
- `app/assessment/AssessmentPage.tsx` — wrapped in `<StateGate>`
- `app/faq/FAQContent.tsx` — softened "ongoing prevention" → "help reduce the risk of recurrence"
- `app/hipaa/HIPAAContent.tsx` — expanded §164.512 disclosures section, added Right-to-Complaint to patient-rights, added breach-notification to entity duties, added "How you receive this notice" section
- `app/sitemap.ts` — regenerated with 12 new legal/about pages
- `app/robots.ts` — added `/portal/` and `/login` to disallow list
- `components/Analytics.tsx` — new
- `components/home/Hero.tsx` — added inline source caption + softened layout
- `components/home/Supplements.tsx` — rewrote outcome-claim purposes to structure/function language; added DSHEA disclaimer
- `components/intake/StateGate.tsx` — new
- `components/layout/CookieConsent.tsx` — full rebuild: granular categories, real reject path, JSON storage with version, custom event for live updates, `role="dialog"`
- `components/layout/Footer.tsx` — full rebuild: practice ID line, state count, address, Privacy Officer + emergency block, expanded legal links, Manage Cookies button, Do Not Sell or Share, LegitScript ID placeholder
- `content/blog/gout-glp1-weight-loss-connection.ts` — softened "how to prevent it" → "how to reduce your risk"
- `lib/states.ts` — new
- `next.config.ts` — added 301 redirects from old to canonical legal paths

### Source files removed

- `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/hipaa/page.tsx` (their `*Content.tsx` siblings remain and are imported from the new canonical paths)

### Compliance docs

- `compliance/hipaa-npp-audit.md` — 10-element NPP audit
- `compliance/a11y-audit.md` — WCAG 2.1 AA Pass 1 audit
- `compliance/remediation-2026-04-29.md` — this file

## Items that still need Nelson&rsquo;s input

These are the explicit `[pending]` placeholders introduced in the page copy. They are visible to any reader and clearly marked &mdash; they will not be hidden or removed until Nelson supplies the values:

1. **NPI numbers + state license numbers** for Dr. Saenz — appear on `/about/medical-team` and in the footer.
2. **Staffed phone number** + business hours — appear on `/about/contact` and in the footer.
3. **Compounding pharmacy partner name + state of licensure + 503A vs 503B + LegitScript / NABP accreditation status** — appear on `/legal/pharmacy-partners`.
4. **LegitScript ID** — appears in footer; populated after certification.
5. **Dedicated `privacy@metaortho.com` mailbox** — referenced on `/legal/notice-of-privacy-practices` and `/about/contact`. Currently routes go to `info@metaortho.com`; flip when the dedicated mailbox is set up.
6. **Canonical licensed-state count** — `lib/states.ts` currently shows the working list (most marked `licensed`, a handful `pending`). Confirm with operations and update individual entries; everything else (footer count, /legal/licensed-states, geo-gate) reads from this single source.

## Items deferred to next session (per Nelson)

- L-1: **Build the LegitScript test patient account** + re-audit `/portal/*` once it exists (R-1 + R-2 in `escalations.md`).
- M-5: BAA inventory (will do once the patient-touching vendor stack is finalized).
- L-7: HSTS verification on prod (after `SITE_PASSWORD` gate is lifted).
- M-4 Pass 2: in-browser a11y verification (axe-core, Lighthouse CI, VoiceOver walk-through).
- H-6: Testimonials policy (defer until first patients).

## Suggested smoke tests for tomorrow morning

In the dev preview (`pnpm dev` / `npm run dev`):

1. Hit `/privacy` → should 301 to `/legal/privacy-policy`. Same for `/terms` → `/legal/terms-of-service` and `/hipaa` → `/legal/notice-of-privacy-practices`.
2. Hit `/assessment` → should show state selector first; pick Tennessee → should advance to the assessment; pick Vermont → should show the polite stop screen with waitlist CTA.
3. Hit `/legal/licensed-states` → confirms the list and the count match what `/about/medical-team` and the footer show (everything reads from `lib/states.ts`).
4. Open the cookie banner → click "Reject non-essential" → reload → in DevTools, confirm no `googletagmanager.com` request. Click "Manage cookies" in footer → banner reopens with current choices.
5. Visit `/portal/login` → confirm in DevTools network tab that no `googletagmanager.com` request fires.
6. Tab from the top of any public page → first focusable element should be the "Skip to main content" link.
7. Hit `/legal/grievances`, `/legal/sources`, `/about/medical-team`, `/legal/pharmacy-partners` → all render with the placeholders clearly marked.

If any of those smoke tests fail, flag in the next conversation and we&rsquo;ll fix.
