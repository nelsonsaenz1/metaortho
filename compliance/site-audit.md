# MetaOrtho — LegitScript Compliance Site Audit

**Generated:** 2026-04-28
**Branch:** `claude/legitscript-compliance-audit`
**Source:** Static read of `app/`, `components/`, `content/` on local dev (no server crawl). Production parity assumed since prod is gated by `SITE_PASSWORD` and serves the same build.
**Scope:** Public pages only. Authenticated/portal walk-through deferred until the §5.1 test patient account is built.

---

## 1. Public Page Inventory

| URL | File | `<title>` (metadata) | H1 | Description |
|-----|------|----------------------|-----|-------------|
| `/` | `app/page.tsx` | inherits root template (`MetaOrtho — Musculoskeletal Care for GLP-1 Patients`) | "The weight is coming off. So are your muscles." | Hero landing with 40% statistic + waitlist CTA |
| `/home` | `app/home/page.tsx` | "MetaOrtho — Musculoskeletal Care for GLP-1 Patients" | (dynamic, in Hero component) | Main homepage: physician-led MSK care, portal preview, services, supplements, cost comparison |
| `/landing` | `app/landing/page.tsx` | "Protect Your Muscles & Bones on GLP-1s \| MetaOrtho" | "The weight is coming off. So are your muscles." | Long-form landing: problem statement, AAOS risk timeline, comparison table, FAQ, final CTA |
| `/about` | `app/about/page.tsx` | "About Dr. Jay M. Saenz, MD" | (in AboutContent component) | Founder profile — board-certified orthopedic surgeon |
| `/pricing` | `app/pricing/page.tsx` | "Pricing & Services" | (in PricingContent) | Service pricing — assessments + monthly monitoring |
| `/faq` | `app/faq/page.tsx` | "Frequently Asked Questions" | implied "GLP-1 musculoskeletal health" | FAQ on services, telehealth, billing |
| `/assessment` | `app/assessment/page.tsx` | "GLP-1 MSK Risk Assessment" | (in AssessmentPage component) | Free interactive risk quiz |
| `/blog` | `app/blog/page.tsx` | "Blog — GLP-1 Musculoskeletal Health" | "GLP-1 musculoskeletal health" | Blog index of evidence-based articles |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | dynamic per-post | dynamic per-post | Individual blog posts (currently in `content/blog/`) |
| `/book` | `app/book/page.tsx` | "Join the Waitlist" | (in BookContent) | Waitlist signup |
| `/privacy` | `app/privacy/page.tsx` | "Privacy Policy — MetaOrtho" | (in PrivacyContent) | General privacy policy |
| `/terms` | `app/terms/page.tsx` | "Terms of Service — MetaOrtho" | (in TermsContent) | Terms of service |
| `/hipaa` | `app/hipaa/page.tsx` | "HIPAA Notice of Privacy Practices — MetaOrtho" | (in HIPAAContent) | HIPAA Notice of Privacy Practices |
| `/login` | `app/login/page.tsx` | (none — site-password gate) | none | `SITE_PASSWORD` gate (pre-launch) |
| `/portal/login` | `app/portal/login/page.tsx` | (none) | none | Patient portal login (placeholder) |

**API Routes (not user-facing pages):**

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/login` | POST | Validates `SITE_PASSWORD`, sets `site-auth` httpOnly cookie |
| `/api/waitlist` | POST | Waitlist signup → Supabase + Resend + Customer.io |
| `/api/waitlist/unsubscribe` | GET | Email unsubscribe handler |

---

## 2. Authenticated Pages (deferred)

Per Nelson 2026-04-28: the authenticated/test-patient walk-through is deferred until §5.1 of the directive (LegitScript test patient account) is built tomorrow. Below is the route map for that future audit phase:

| URL | File | Auth | Purpose |
|-----|------|------|---------|
| `/portal` | `app/portal/page.tsx` | yes | Dashboard — MSK score, labs, checklist, upcoming visits |
| `/portal/body` | `app/portal/body/page.tsx` | yes | 28+ biomarkers (MSK, bone, metabolic, gout, nutrition, inflammation) |
| `/portal/protocol` | `app/portal/protocol/page.tsx` | yes | Personalized protocol — training, nutrition, supplements, labs |
| `/portal/care-team` | `app/portal/care-team/page.tsx` | yes | Visits + clinician messaging |

---

## 3. Required Pages — Gap vs Directive §2

Comparing the existing public-page set against the LegitScript Compliance Directive §2 required pages:

| Directive URL | Required content | Current state | Gap |
|---|---|---|---|
| `/legal/privacy-policy` | General privacy policy with state-law coverage (CCPA/CPRA, VCDPA, CPA, CTDPA, UCPA, broader bucket) | `/privacy` exists — content scope to verify against directive § 2.1 | **Verify scope, possibly relocate to `/legal/privacy-policy`** |
| `/legal/notice-of-privacy-practices` | HIPAA NPP, separate from privacy policy | `/hipaa` exists | **Verify content vs 45 CFR §164.520(b); confirm distinct from privacy policy** |
| `/legal/terms-of-service` | ToS w/ telehealth clauses, arbitration, etc. | `/terms` exists | **Verify completeness vs directive § 2.3** |
| `/legal/telehealth-informed-consent` | Telehealth consent w/ CA/TX/NY-specific language | **MISSING** | **Build** |
| `/legal/refund-policy` | Refund terms — visits, supplements, subscriptions | **MISSING** | **Build** |
| `/legal/accessibility-statement` | WCAG 2.1 AA conformance statement | **MISSING** | **Build** |
| `/legal/licensed-states` (or `/states`) | State list + state selector | **MISSING** as a dedicated page; copy exists ad-hoc | **Build single source-of-truth page** |
| `/about/medical-team` | Practitioner profiles w/ NPI + license #s + state coverage | **MISSING** — only `/about` (Dr. Saenz bio) exists; no NPI / license number / board cert detail; no other clinicians listed | **Build, with NPIs and license numbers** |
| `/about/contact` | Physical address + phone + emergency disclaimer | **MISSING** — only `info@metaortho.com` mailto in footer | **Build** |
| `/legal/pharmacy-partners` | Partner pharmacy disclosure | **MISSING** | **Build** (or memo: no Rx fulfillment) |
| `/legal/affiliate-disclosure` | Commercial-affiliation disclosures (FTC §255) | **MISSING** | **Build** |
| `/legal/sources` | Citations page for every clinical claim | **MISSING** | **Build (claims library is the source data)** |
| `/legal/cookie-policy` | Cookie list w/ vendor + purpose + expiry | **MISSING** — Banner exists (see §5.2) but no policy page | **Build** |
| `/legal/grievances` | MetaOrtho complaint process + per-state board contacts + OCR / FTC | **MISSING** | **Build** |

**Summary:** 11 of 14 required legal/about pages are missing or insufficient. 3 (privacy, terms, HIPAA NPP) exist at non-canonical URLs and need content review.

---

## 4. Geo-Gating Status (Directive §7)

| Requirement | Current state |
|---|---|
| State selector at start of every clinical-intake flow | **MISSING** — no state question at top of `/assessment`, `/book`, `/api/waitlist` |
| Out-of-state polite stop screen + waitlist + free educational content | **MISSING** |
| Single source-of-truth state list (JSON/YAML) | **MISSING** — state list lives in `~/.claude/skills/metaortho-ads/references/licensed-states.md` only; not exported into the app |
| Address verification API at scheduling | **MISSING** |
| Out-of-state mover detection + records-portability workflow | **MISSING** (post-launch concern) |

---

## 5. Site-Wide Components (Directive §3)

### 5.1 Global Footer
**File:** `components/layout/Footer.tsx`
**Currently includes:** logo, copyright year, Coming Soon CTA, Services / Learn / Company / Contact link groups, `info@metaortho.com` mailto, basic emergency disclaimer ("MetaOrthopedics provides telehealth services and does not replace emergency medical care…"), Privacy / Terms / HIPAA links.

**Missing per directive §3.1:**
- Practice identification line ("MetaOrtho is a physician-led telemedicine practice. Available in [N] U.S. states.")
- Physical street address (CAN-SPAM mailing address `3096 Chapel Woods Cove, Germantown, TN 38139` is in handoff but not on site)
- Phone number
- Medical Director name + board certification + NPI
- Telemedicine + state-licensed-clinician statement
- Expanded legal links: Telehealth Consent, Licensed States, Medical Team, Pharmacy Partners, Refund Policy, Accessibility, Affiliate Disclosure, Sources, Grievances, "Do Not Sell or Share"
- LegitScript ID placeholder ("CHM-XXXXX — placeholder until certified")

### 5.2 Cookie Consent Banner
**File:** `components/layout/CookieConsent.tsx`
- Banner appears 2.5s after page load; consent stored in `localStorage` as `metaortho-cookie-consent: "accepted"`.
- **Both "Accept" and "Dismiss" buttons call the same `accept()` function** — there is no actual reject path.
- No granular consent (necessary / functional / analytics / marketing).
- No vendor / cookie-list breakdown.
- No conditional script-loading based on consent — Google Ads gtag loads in root layout regardless of consent state.

### 5.3 Medical Disclaimer
**Status:** Not present as a global component. No standardized educational-page disclaimer banner.

### 5.4 Emergency Disclaimer
**Status:** Present in footer (good). **Missing** prominently on intake (`/assessment`, `/book`) and any "talk to a clinician" CTAs.

### 5.5 Telehealth-Service Identification (per LegitScript identification rule)
**Status:** Present in body copy on `/landing` but not in a uniform identification block on every public landing page. No "Available in [N] U.S. states" surfaced anywhere.

### 5.6 SSL / HTTPS / HSTS
- HTTPS enforced via Vercel default; HSTS not yet verified on prod headers (will need a `curl -I https://metaortho.com` once gate is lifted, or Vercel-side HSTS check).
- Mixed content not observed in source review.

---

## 6. Schema.org / Structured Data

`app/layout.tsx` includes a `MedicalBusiness` JSON-LD block:
- `@type`: `MedicalBusiness`
- `name`: MetaOrthopedics; `alternateName`: MetaOrtho
- `medicalSpecialty`: Orthopedic
- `availableService`: Comprehensive MSK Assessment, Sarcopenia Prevention Protocol, Bone Density Monitoring, Gout Diagnosis and Treatment
- `isAcceptingNewPatients`: true

**Note:** "Sarcopenia Prevention Protocol" embeds the word "Prevention" — see banned-phrase scan §3 of `gap-analysis.md`.

---

## 7. Anomalies & Pre-Audit Notes

1. **Google Ads gtag fires globally including authenticated portal pages** — see `gap-analysis.md` for severity.
2. **Cookie banner has no functional reject** — both buttons accept.
3. **`SITE_PASSWORD` gate** — production is currently behind a single-password gate via `/login`; this is acceptable pre-launch but is not a HIPAA-grade authentication boundary and the patient portal must use a separate proper auth before real PHI is loaded.
4. **`/portal/care-team` mock data** — hardcoded future-dated lab status (May 1, 2026 DEXA scan) is preview data; needs replacement before any real patient sees it.
5. **Sitemap.xml** at `app/sitemap.ts` lists 8 marketing pages + dynamic blog posts. Does **not** include `/privacy`, `/terms`, `/hipaa`, `/login`, `/portal`. Adding the legal/about pages is part of the §2 build-out; sitemap will need to be regenerated.
6. **`robots.ts`** disallows `/api/` (correct). Portal pages are not currently disallowed in robots.txt — they are noindex via portal layout metadata, but adding them to `disallow` is a belt-and-suspenders move.

---

## 8. Outputs from this Audit Phase

In `metaortho/compliance/`:

- `site-audit.md` — this file
- `claim-inventory.csv` — every clinical/outcome/endorsement/comparison/testimonial/guarantee/brand-mention/statistic claim
- `third-party-inventory.csv` — every external script, pixel, vendor, embed, font, link
- `banned-phrase-scan.md` — banned-phrase grep results with triage
- `research-notes.md` — current LegitScript / HIPAA NPP / telehealth consent / FTC §255 / OCR pixel guidance baseline
- `gap-analysis.md` — prioritized findings, severity, recommended action — Nelson reviews this first
- `escalations.md` — items deferred or requiring Nelson decision

**No code modified.** Per directive §1 closing line: "Do NOT modify anything yet. Show me the audit before remediation begins."
