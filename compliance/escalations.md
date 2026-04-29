# Escalations — Items Requiring Nelson Decisions or Deferred Actions

**Generated:** 2026-04-28
**Branch:** `claude/legitscript-compliance-audit`

---

## Reminders for tomorrow morning (2026-04-29)

### R-1. Build the LegitScript test patient account (directive §5.1)
- **Status:** Deferred per Nelson 2026-04-28. Pickup tomorrow.
- **What it requires:**
  - Reviewer credential (e.g. `legitscript-review@metaortho.com` + strong unique password) — store in `compliance/legitscript-credentials.md` (must be **gitignored** — the file is referenced for handover via the LegitScript portal, never committed).
  - Test account provisioned in a state we serve, walked through the full intake flow, populated with synthetic non-PHI data: sample order, sample lab order, sample message thread with a clinician, sample treatment plan.
  - Document the credential in the LegitScript Transparency template at submission time.
- **Why it's blocked today:** the patient portal (`/portal/*`) is currently scaffolded with mock UI and no real auth → patient mapping. Building the test account requires (a) a real auth path through `/portal/login`, (b) the Supabase patient table (or whatever the chosen patient-record store is), (c) a state-licensure check on signup, and (d) the §2.4 informed-consent + §2.2 NPP acknowledgment captures.
- **Cleanest path:** stub the test account by manually inserting a synthetic patient row + bypassing the licensure check via a feature flag, then walk through the flow as that patient. Not the production design — but enough for a LegitScript reviewer.
- **Reminder location:** also flagged in `gap-analysis.md` under L-1.

### R-2. Re-audit the authenticated `/portal/*` pages
- **Status:** Deferred together with R-1. Once the test account exists, run the same inventory pass on portal routes — claim inventory, third-party inventory, banned-phrase scan.
- **Specifically check:** that gtag does NOT fire on portal pages after the C-1 fix lands.

---

## Open decisions Nelson needs to make

### D-1. Canonical licensed-state count
- **Issue:** `licensed-states.md` (the in-house skill) lists 46 states with a footnote that the operations team should "confirm exact current count and update." Marketing copy says 43. Footer / intake / sitemap / `/legal/licensed-states` all need to read from a single number.
- **Need:** the actual current count + the actual current state list as of 2026-04-28.
- **Why it matters:** if the displayed count is wrong by even one state, an out-of-state user could be misled, which is a state medical-board advertising violation in some jurisdictions.

### D-2. Medical Director public profile content
- **Issue:** `/about/medical-team` (directive §2.8) needs:
  - Full legal name(s) + credentials of every clinician
  - Headshot
  - Board certifications + certifying body
  - State license numbers + states covered
  - NPI number
  - 1-paragraph bio
- **Need from Nelson:** Dr. Saenz's NPI, state license numbers (and which states each license covers), board-certification body, plus the same for any other clinician on the team today.
- **Note:** `/about` (`AboutContent.tsx`) currently has bio + "board-certified orthopedic surgeon" but no NPI or license numbers. Without these, the page cannot pass LegitScript review.

### D-3. Physical address + phone
- **Issue:** Directive §2.9 + §3.1 require a physical street address (not a PO box) and a staffed phone number on the contact page and in the footer.
- **Known:** CAN-SPAM mailing address from handoff is `3096 Chapel Woods Cove, Germantown, TN 38139`.
- **Need from Nelson:**
  - Confirm whether to publish the Germantown address as the practice's registered HQ or use a separate registered-agent / business address.
  - Provide a phone number (with stated business hours) staffed during those hours. If we don't have a real staffed line yet, decide whether to set up a Google Voice / RingCentral line + voicemail messaging that meets the "staffed" expectation, or delay this until launch.

### D-4. Compounded medication policy
- **Issue:** Directive §2.10 + §4.4 + LegitScript application gotcha. We must publicly state our compounded-medication position.
- **Default assumption (per handoff):** "MetaOrtho does not prescribe compounded medications." Need explicit confirmation before publishing.
- **If we ever do prescribe compounded medications:** the compliance lift expands significantly (compounding addendum to LegitScript application; state-by-state advertising restrictions; partner-pharmacy 503A/503B disclosure).

### D-5. Pharmacy / fulfillment partners
- **Issue:** Directive §2.10 — even if we don't prescribe compounded meds, if any non-Rx supplement is fulfilled by a third party, that partner must be disclosed.
- **Need:** Are supplements (HMB, protein, calcium + vit D) sold via MetaOrtho today, or only recommended? If sold, who's the fulfillment partner?

### D-6. Affiliate / commercial relationships
- **Issue:** Directive §2.11 + FTC §255. Required disclosures of any supplement-supplier revenue share, lab vendor relationships (Quest, Labcorp), DEXA partner, telehealth platform vendor, marketing partner with revenue share.
- **Need:** the actual list of commercial relationships today, even if early-stage.

### D-7. Telehealth video / messaging vendor
- **Issue:** Once selected, this vendor needs a BAA. Current state: not yet selected (per handoff).
- **Need:** When selection happens, flag for BAA verification before any patient encounter.

### D-8. Privacy Officer designation + grievance contact
- **Issue:** Directive §2.9 + §2.14 require a named Privacy Officer and a grievance contact.
- **Need:** Who is the Privacy Officer? (Defaults to Dr. Saenz unless someone else is designated.) An accessible email like `privacy@metaortho.com` should route to that person — needs to be set up in the inbound-mail config (currently ImprovMX → `info@metaortho.com`).

### D-9. Insurance posture statement
- **Issue:** `/landing` says labs/DEXA "typically covered by insurance" without qualifier. We need an actual insurance policy statement: which insurers, what's covered, what's out-of-pocket, what's the cash-pay tier.
- **Need:** the operational reality of insurance acceptance today, plus an explicit policy on /pricing or /faq.

---

## Items the audit deliberately does NOT include

- **Authenticated/portal claim and pixel inventory** — see R-1.
- **Production crawl with real HTTP requests** — current audit is static / source-based since prod is `SITE_PASSWORD`-gated. We can supplement with a `curl` walk against the production URL once the gate is lifted, mainly to verify response headers (HSTS, CSP, cookies) and any server-side runtime injection.
- **Pricing audit against directive §3.9 (transparency)** — flagged as a separate review pass once the test patient flow exists; today, `/pricing` exists but the recurring-vs-one-time, billing cadence, and cancellation method language hasn't been line-item validated.
- **Schema.org JSON-LD broader audit** — only the banned-phrase issue (`Sarcopenia Prevention Protocol`) was flagged. Full schema validation against Google's structured-data tester is a separate, lower-priority pass.

---

## Ambiguities flagged for Nelson sign-off

### A-1. `/about` already exists; should `/about/medical-team` replace it or live alongside?
- Nelson decision: keep `/about` as Dr. Saenz's narrative bio and add `/about/medical-team` as the LegitScript-spec public roster, OR consolidate into one canonical page.

### A-2. Existing `/privacy`, `/terms`, `/hipaa` URL paths
- Directive specifies `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/notice-of-privacy-practices`. Two options:
  1. Move to canonical paths and 301-redirect the old ones.
  2. Keep current paths, alias as canonical, and update all internal links + sitemap.
- Recommendation: Option 1 (clean canonical structure matches the directive verbatim; 301s preserve any inbound links, search ranking, and external references).

### A-3. Cookie banner rebuild scope
- Minimum compliant version: real reject path + script gating for gtag.
- Full version: granular categories (necessary / functional / analytics / marketing), per-category toggles, cookie-policy page with vendor-by-vendor list.
- Nelson decision: ship minimum first to unblock launch, follow up with full version, OR build full version as part of the same work.

### A-4. State selector UX placement
- Top-of-page selector on every clinical CTA, OR step-1 of intake form, OR both.
- Recommendation: both — a global "What state are you in?" header bar (compact) on `/assessment`, `/book`, `/pricing`, plus an explicit step-1 in any intake flow that gathers clinical info.

---

## Logged for tomorrow

- **Reminder scheduled implicitly via this file** — when Nelson opens the next session, the explicit ask is "build the LegitScript test patient account + re-audit `/portal/*`."
- **Branch state:** `claude/legitscript-compliance-audit` is uncommitted; only `compliance/` is new. No source code modified. Per Nelson's standing rule, no commits or pushes until explicit go.
