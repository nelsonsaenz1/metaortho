# Gap Analysis — LegitScript Compliance

**Generated:** 2026-04-28
**Read this first.** This file ranks every finding from the audit by severity and maps each to the directive section + the recommended remediation. The four supporting files (`site-audit.md`, `claim-inventory.csv`, `third-party-inventory.csv`, `banned-phrase-scan.md`) are the underlying evidence; this file is the synthesis Nelson reviews tomorrow morning.

**Categories:**
- 🔴 **CRITICAL** — would cause LegitScript denial or constitutes an active HIPAA / FTC / state violation. Fix before any production push.
- 🟠 **HIGH** — required for the LegitScript application bundle. Fix before submission.
- 🟡 **MEDIUM** — necessary but doesn't independently block submission. Fix during the build-out.
- 🟢 **LOW** — polish or future-state items. Document and schedule.

---

## 🔴 CRITICAL

### C-1. Google Ads gtag fires on authenticated portal pages
- **Where:** `app/layout.tsx:119-128` injects `gtag` globally; `app/portal/layout.tsx` does not suppress it.
- **Violates:** Directive §6.1 (pixel allow-list); HHS OCR online-tracking guidance (post-June-2024 court ruling, the authenticated-page restriction is intact); `compliance-guardrails.md` §3.1.
- **Fix:** Move gtag out of root layout. Two paths:
  1. **Route group split** — refactor public marketing routes into a `(marketing)` route group with its own layout that injects gtag; portal + login + any future authenticated routes get a separate `(secure)` group with no pixel.
  2. **Conditional injection** — gate the `<Script>` tags on `usePathname()`-based logic in a client component that only renders the script when path is in an explicit allow-list.
  - Option 1 is the cleaner Next.js 16 pattern. Recommended.
- **Test:** After fix, load `/portal/*` and confirm `window.gtag` is undefined and no `googletagmanager.com` request fires.

### C-2. Cookie banner has no functional reject + no script gating
- **Where:** `components/layout/CookieConsent.tsx` — both buttons call the same `accept()`.
- **Violates:** CPRA reject-by-default expectation; directive §2.13 (granular consent: necessary / functional / analytics / marketing); directive §3.5 (cookie banner defaults non-essential cookies OFF).
- **Fix:**
  - Add a real "Reject non-essential" path that does NOT set the consent flag and prevents non-essential scripts from loading.
  - Add granular categories (necessary / functional / analytics / marketing) with per-category toggles.
  - Make gtag (and any future analytics) load conditionally on `analytics === true`. This pairs with C-1.
- **Note:** This work also unlocks compliance with the broader state-privacy bucket (Colorado UOOM, Connecticut, Texas TDPSA) over time.

### C-3. Site-wide claims with banned-phrase rewrites
- **Where:** see `banned-phrase-scan.md`.
  - `components/home/Supplements.tsx:11` "Prevent muscle wasting"
  - `content/blog/gout-glp1-weight-loss-connection.ts:5` "how to prevent it"
  - `app/layout.tsx:80` JSON-LD service name "Sarcopenia Prevention Protocol"
- **Violates:** `compliance-guardrails.md` §5; DSHEA (the supplement instance); LegitScript "Transparency & Advertising" pillar.
- **Fix:** Three targeted string edits per `banned-phrase-scan.md`.
- **Effort:** trivial; bundled with the broader claim rewrite pass.

---

## 🟠 HIGH

### H-1. 11 of 14 required legal/about pages missing or non-canonical
- **Where:** see `site-audit.md` §3 for the full table.
- **Missing entirely:** `/legal/telehealth-informed-consent`, `/legal/refund-policy`, `/legal/accessibility-statement`, `/legal/licensed-states` (or `/states`), `/about/medical-team`, `/about/contact`, `/legal/pharmacy-partners`, `/legal/affiliate-disclosure`, `/legal/sources`, `/legal/cookie-policy`, `/legal/grievances`.
- **Exist at non-canonical URLs (need content audit + relocation):** `/privacy`, `/terms`, `/hipaa`.
- **Violates:** Directive §2.x (every subsection); LegitScript Standards 1, 2, 4 (Registration & Compliance, Internal Practices, Transparency & Advertising); HIPAA §164.520 (NPP content audit); FTC §255 (affiliate disclosure).
- **Fix sequence (recommended order, fastest path to a publishable site):**
  1. `/legal/licensed-states` + state JSON source-of-truth (unlocks H-3 and is a small lift).
  2. `/about/medical-team` + `/about/contact` (need real NPI, license #s, physical address — Nelson decides scope).
  3. `/legal/sources` (claims library is the source data — mostly a formatting pass).
  4. `/legal/pharmacy-partners` (or memo: "MetaOrtho does not facilitate Rx fulfillment via partner pharmacies").
  5. `/legal/telehealth-informed-consent` + intake-flow integration.
  6. `/legal/affiliate-disclosure`, `/legal/refund-policy`, `/legal/accessibility-statement`, `/legal/grievances`, `/legal/cookie-policy`.
  7. Relocate + audit `/privacy` → `/legal/privacy-policy`, `/terms` → `/legal/terms-of-service`, `/hipaa` → `/legal/notice-of-privacy-practices`. Add 301 redirects.

### H-2. HIPAA Notice of Privacy Practices content audit
- **Where:** `app/hipaa/HIPAAContent.tsx` exists but has not been audited against the 10 required content elements in 45 CFR §164.520(b).
- **Action:** Read the existing content and verify each of the 10 elements (header verbatim, TPO description, §164.512 disclosures, authorization-required disclosures, patient rights, entity duties, effective date, contact, breach notification, change-of-notice clause).
- **Also:** Build the `npp_acknowledged_at` capture on the patient record (separate from informed-consent capture) tied to a content version hash.

### H-3. Geo-gating absent from intake flows
- **Where:** `/assessment`, `/book`, `/api/waitlist` — no state question first.
- **Violates:** Directive §7.1; medical practice acts in every unlicensed state.
- **Fix:**
  1. Build the canonical state JSON/YAML at `lib/states.json` (sourced from `licensed-states.md`; surfaced to footer counter, intake selector, footer copy, and `/legal/licensed-states`).
  2. Add a state selector as the first step of `/assessment` and `/book`. Out-of-state → polite stop screen with waitlist + free educational resources (no clinical questions asked).
  3. Address verification at scheduling (Smarty / Lob — pick one) — separate ticket; flag for cost.
- **Note:** the in-house `licensed-states.md` says "target: 43" with a counted 46 in-list and a "operations team to confirm exact current count." **Nelson decision needed: what's the canonical current count?**

### H-4. Footer rebuild
- **Where:** `components/layout/Footer.tsx`.
- **Missing:** practice identification line, physical address, phone, Medical Director + NPI, telemedicine + state-licensed-clinician statement, expanded legal links (Telehealth Consent, Licensed States, Medical Team, Pharmacy Partners, Refund Policy, Accessibility, Affiliate Disclosure, Sources, Grievances, "Do Not Sell or Share"), LegitScript ID placeholder.
- **Fix:** Single rebuild pass once H-1 pages exist; pull state count from H-3 source-of-truth file.

### H-5. Compounded medication policy disclosure
- **Where:** No public statement either way today.
- **Action:** Either (a) confirm "MetaOrtho does not prescribe compounded medications" and put that on `/legal/pharmacy-partners`, OR (b) if compounded GLP-1s are or will be in scope, the directive requires a much heavier compliance lift (compounding addendum, state advertising restrictions). **Nelson decision needed.**
- **Per handoff and current state:** assumption is "no compounded medications." Confirm and document.

### H-6. Sitewide testimonials policy
- **Where:** No testimonials currently in the codebase (verified). Future testimonials are a known compliance hot zone.
- **Action:** Document the testimonials process now, before the first one is added: written authorization on file, atypical-result disclosure inline, image consistency with the testifier, material-connection disclosure if compensated. Best implemented as a checklist on `/compliance/testimonials-policy.md` plus a database column `testimonial_authorization_doc_url` so we never publish without the auth.

---

## 🟡 MEDIUM

### M-1. Citation density on landing pages
- **Where:** `/`, `/home`, `/landing` reference the 40% / 30% / 150% / 12% statistics without inline source attribution; only `/blog` has full citations.
- **Action:** Add footnote markers + a single `/legal/sources` link near each statistic instance. Pulls double duty for FTC substantiation and LegitScript transparency.

### M-2. Comparison framing on `/landing`
- **Where:** `app/landing/page.tsx:257-260` "Your weight loss doctor manages the scale. Who's managing everything else?"
- **Action:** Per `compliance-guardrails.md` §1.4, factual verifiable comparisons OK; rhetorical framing OK as long as it doesn't disparage. Current copy is borderline — consider softening: "Your prescriber tracks your weight. We track everything else weight loss affects." (Same hook, less implied disparagement.)

### M-3. Insurance / billing copy needs qualifier
- **Where:** `app/landing/page.tsx:783` "Labs and DEXA scans ordered through the visit are typically covered by insurance."
- **Action:** Add "Coverage varies by plan; confirm with your insurer." qualifier.

### M-4. WCAG 2.1 AA audit
- **Where:** Whole site.
- **Action:** Run `axe-core` (or `pa11y` / `lighthouse a11y`) on every public page; output `/compliance/a11y-audit.md` per directive §3.11. Bundle fixes (color contrast, missing alt text, form labels, heading order) into one remediation pass.

### M-5. BAA inventory
- **Where:** `compliance/baa-inventory.md` does not yet exist.
- **Action:** Build it once the patient-touching vendor stack is finalized. Today: Supabase (need confirm BAA tier), Vercel (need confirm BAA tier), Resend (transactional only, no PHI today), Customer.io (marketing only, no PHI). Future: telehealth video provider, EHR (if separate from Supabase tables), lab integration.

### M-6. JSON-LD service-name rewrite
- **Where:** `app/layout.tsx:80` "Sarcopenia Prevention Protocol".
- **Action:** Bundled with C-3.

---

## 🟢 LOW

### L-1. Test patient account (deferred per Nelson — DO TOMORROW)
- See `escalations.md`. This is required for LegitScript submission but is being scheduled for the next session per agreement.

### L-2. Dr. Saenz photo replacement
- Per handoff item #6: stand-in photo at `public/images/dr-saenz.jpg` needs replacement before public launch.

### L-3. Bracketed credential placeholders
- Per handoff item #7: scan and strip any remaining `[NEEDS XXX]` style bracket placeholders from on-page copy.

### L-4. `/portal/care-team` mock data
- Hardcoded "May 1, 2026 DEXA scan" — replace with real patient data before any real patient sees the portal.

### L-5. Sitemap regeneration
- `app/sitemap.ts` will need to include the new `/legal/*` and `/about/*` pages once H-1 lands.

### L-6. Robots.txt portal disallow
- Portal layout has `noindex` metadata. Adding `disallow: /portal/` to `robots.ts` is a belt-and-suspenders move worth shipping.

### L-7. HSTS header verification
- Once site password gate is lifted, confirm Vercel is sending `Strict-Transport-Security` headers in production.

---

## Suggested Sequencing for Tomorrow's Review

If Nelson approves the audit, the most efficient build-out order is:

**Wave 1 (1-2 days, low-risk, all string/markup work):**
- C-3 (banned-phrase rewrites)
- M-1 (citation density)
- M-2 (comparison softening)
- M-3 (insurance qualifier)
- L-3 (bracket placeholders)
- L-6 (robots.txt portal disallow)

**Wave 2 (HIPAA + intake — needs Nelson decisions on state count, NPI, address, phone, compounding policy):**
- C-1 (route-group split for gtag)
- C-2 (cookie banner rebuild)
- H-3 (state selector + canonical state JSON)
- H-2 (NPP content audit)
- H-5 (compounding policy memo)
- L-1 (test patient account stub)

**Wave 3 (page build-out — H-1 sequence in §H-1):**
- All 11 missing legal/about pages
- H-4 (footer rebuild — depends on Wave 2 + Wave 3)
- H-6 (testimonials policy doc)

**Wave 4 (audit re-runs):**
- M-4 (a11y audit)
- M-5 (BAA inventory)
- L-7 (HSTS verification on prod)
- L-4 (replace portal mock data)
- L-2 (replace Dr. Saenz photo)

After all waves: re-run §10 final verification checklist, then submit LegitScript.
