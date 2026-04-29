# Research Notes — Current Compliance Baseline

**Generated:** 2026-04-28
**Purpose:** Synthesize the current external-source baseline (LegitScript / HHS OCR / FTC / state telehealth) so the gap analysis is grounded in 2026 standards, not just the in-house guardrails skill.

---

## 1. LegitScript Healthcare Merchant Certification

**Authoritative source:** [LegitScript Healthcare Certification](https://www.legitscript.com/certification/healthcare-certification/) and the [Telemedicine fact sheet](https://www.legitscript.com/wp-content/uploads/2022/03/Healthcare-Certification-FactSheet-Telemedicine.pdf)

### The 9 standards (high-level, 2024-2026 scope)

LegitScript's Healthcare Certification is built around four pillars and nine underlying standards:

1. **Registration & Compliance** — proper licensing in every jurisdiction served, prescription/telemedicine law adherence, business registration, no disciplinary actions.
2. **Internal Practices** — disclosure of any legal/regulatory history (10-year lookback), policies for HIPAA, security, and patient handling.
3. **External Practices** — compliant patient services, vetted affiliates and partners, privacy protections, valid prescriptions only.
4. **Transparency & Advertising** — honest and accurate operations, advertising aligned with FDA / FTC / state law and platform policies (Google, Bing).

### Telemedicine-specific items

- Required for card-not-present transactions on Visa/Mastercard and for advertising on Google and Bing.
- Required in the U.S., Canada, France, Sweden, South Africa, Indonesia, Japan, Philippines, Australia, New Zealand, UK.
- Application requires: business registration, medical-team roster with state licensure, telemedicine coverage map, pharmacy/partner disclosure, DEA certificates (if controlled substances), HIPAA policies, claims substantiation, disciplinary-history attestation, compounding addendum (if applicable), wireframes for in-progress features, and a live test-patient account.
- Partner pharmacies must themselves be LegitScript-certified or NABP-accredited (or commit to applying within 60 days of the merchant's own certification).

### Application gotchas (commonly cited)

- **Compounded medication** — fastest path to denial if compounded GLP-1s are advertised as substitutes for FDA-approved equivalents.
- **Impermissible peptides / bulk drug substances** — explicit hard stop (BPC-157, TB-500, ipamorelin, sermorelin, MOTS-c, melanotan, etc.).
- **Working test patient account** — non-negotiable; reviewers exercise it end-to-end.

---

## 2. HIPAA Notice of Privacy Practices (45 CFR §164.520)

**Authoritative source:** [HHS NPP guidance](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/privacy-practices-for-protected-health-information/index.html) and [eCFR §164.520](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.520)

### Required content elements (in plain language)

1. **Header (verbatim, in 14-pt or larger):** "THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY."
2. Description of how the entity may use and disclose PHI for **TPO** (Treatment, Payment, Operations) — with at least one example each.
3. Description of other permitted uses and disclosures under §164.512 (public health, health oversight, judicial, law enforcement, decedents, organ donation, research, threat-to-self/others, specialized government functions, workers' comp).
4. Description of uses/disclosures requiring **authorization**, plus the right to revoke authorization.
5. Specifically called-out categories that always require authorization: psychotherapy notes, marketing communications, sale of PHI.
6. **Patient rights**: access, amendment, accounting of disclosures, restriction request, confidential communications, complaint to the entity AND to HHS OCR (without retaliation).
7. **Entity's duties**: maintain privacy of PHI, abide by the notice currently in effect, notice of breach.
8. **Effective date.**
9. **Contact** for the Privacy Officer and/or designated contact person for complaints.
10. Statement that the entity reserves the right to change the notice and how patients will be informed of changes.

### Delivery requirements for telehealth (per HHS guidance)

- Direct treatment relationship → notice must be provided **no later than the date of first service delivery, including electronic delivery**.
- For electronic-only relationships, NPP can be delivered electronically (with reasonable evidence the patient received it). An acknowledgment workflow is best practice.
- Posting on the website is required (in addition to first-encounter delivery).

### What this means for MetaOrtho

- The existing `/hipaa` page (`app/hipaa/HIPAAContent.tsx`) needs a content audit against the 10 required elements above.
- Patient intake flow must capture an `npp_acknowledged_at` timestamp tied to the version hash of the notice the patient received.
- The NPP must be a **separate document** from the general privacy policy — they have different purposes and overlap is fine but they cannot be merged.

---

## 3. Telehealth Informed Consent — State Requirements

**Authoritative sources:**
- [CCHP Consent Requirements](https://www.cchpca.org/topic/consent-requirements-professional-requirements/) — most current state-by-state map
- [HHS telehealth.hhs.gov informed consent](https://telehealth.hhs.gov/providers/preparing-patients-for-telehealth/obtaining-informed-consent)
- [Curogram 2026 telemedicine regs guide](https://curogram.com/blog/best-practices/telemedicine/telemedicine-regulations-by-state)

### Federal baseline (no specific federal requirement)

There is no single federal informed-consent standard for telemedicine. State medical practice acts govern. As a practical matter, providers obtain informed consent in writing or verbally (with documentation) before the first telehealth encounter — and many state Medicaid programs require it as a condition of reimbursement.

### Required content (consensus across states)

1. Definition and nature of telemedicine.
2. Services to be delivered via telemedicine and any limits.
3. Technology used and risks (failure, security limitations, privacy boundaries).
4. Benefits and alternatives (in-person care).
5. Right to withdraw consent at any time.
6. Emergency limitation: telemedicine is **not** for emergencies — call 911.

### State-specific (focus on CA, TX, NY)

- **California** — Provider initiating telehealth must obtain **written or verbal consent** before the **initial** delivery of telehealth services, and must inform the patient of the use of telehealth, availability of in-person services, transportation options, and limitations/risks. Document the consent.
- **Texas** — Requires **written consent**. Specific language requirements for mental-health services. Patient must be informed of the right to decline telehealth in favor of in-person care.
- **New York** — Provider must **document that consent was obtained before each telehealth encounter** (some interpretations require per-encounter, not just one-time). Stricter than the average state.

### Implementation pattern for MetaOrtho

- Informed consent text version-hashed and stored at `informed_consent_signed_at` on the patient record (per directive §2.4).
- For NY patients, gate every encounter (or at minimum, every billable encounter) on a fresh consent acknowledgment.
- TX patients require written (not just verbal) consent — easiest to enforce by requiring all patients to e-sign once before their first visit.

---

## 4. FTC Endorsements & Testimonials — 16 CFR Part 255

**Authoritative source:** [FTC Endorsement Guides at eCFR](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255) — final revisions [adopted June 2023](https://www.ftc.gov/news-events/news/press-releases/2023/06/federal-trade-commission-announces-updated-advertising-guides-combat-deceptive-reviews-endorsements)

### Key 2023-2024 updates relevant to MetaOrtho

1. **Material connections** must be clearly and conspicuously disclosed when a "significant minority" of the audience would not otherwise infer them. The FTC suggested **10% or less** of an audience can be "significant," meaning disclosure is the safe default.
2. **Health and efficacy claims** require **competent and reliable scientific evidence** — typically studies "performed by qualified experts."
3. **Visual representation** in testimonials must be consistent with the actual consumer (e.g., showing a different complexion than the testimonial-giver is now flagged).
4. **Fake reviews / endorsements that don't reflect real user opinions** are explicitly prohibited and now subject to a separate **FTC Trade Regulation Rule on Consumer Reviews and Testimonials** (effective October 2024) — civil penalties up to $51,744 per violation.
5. **Endorser liability** — endorsers may also be held liable for false claims they make about products.
6. **Atypical results** must be flagged in close proximity, not buried in a footer disclaimer.

### MetaOrtho posture

- No testimonials currently in the codebase (verified via static review).
- When testimonials are added: written authorization on file, atypical-result disclosure inline, image consistency with the testifier, material-connection disclosure if compensated.

---

## 5. HHS OCR — Online Tracking Technologies (March 2024 update + court ruling)

**Authoritative sources:**
- [HHS OCR tracking-technologies guidance](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html) — updated March 18, 2024
- [Inside Privacy summary](https://www.insideprivacy.com/health-privacy/hhs-ocr-updates-tracking-technologies-guidance/)
- [Nixon Peabody: portions of bulletin deemed unlawful](https://www.nixonpeabody.com/insights/alerts/2024/07/03/portions-of-ocrs-bulletin-on-online-tracking-technologies-deemed-unlawful) — Northern District of Texas ruling June 2024

### What still applies after the June 2024 court ruling

1. **Authenticated pages** — tracking technology disclosing PHI from logged-in patient pages **without HIPAA-compliant authorization or a BAA** is still impermissible. The court did not vacate this part.
2. **Marketing-purpose disclosures of PHI** require patient authorization — including via tracking pixels.
3. **Security Rule obligations** (risk analysis, appropriate safeguards) apply to ePHI handled by tracking vendors.

### What the court vacated (June 2024)

- The portion of OCR's bulletin that defined "individually identifiable health information" expansively for **unauthenticated public pages** based solely on the combination of an IP address with visiting a health-condition page was held to exceed OCR's statutory authority.
- Result: collecting analytics on a fully public marketing page is materially less risky than the original December 2022 bulletin implied. But anything authenticated, anything tied to an actual patient encounter, and anything where the URL itself reveals health status (e.g., `/portal/asthma-care`) remains squarely covered.

### MetaOrtho implication

The Google Ads gtag firing in `app/layout.tsx` flows on **every** route — including `/portal/*`. Even after the court ruling, gtag on authenticated pages is a hard violation. The fix is route-scoped script injection (or, simplest: move the gtag out of the root layout into a public-marketing-only layout group / route segment).

---

## 6. FDA Promotional Regulations (21 CFR 202) — Drug Mention Pages

**Source:** 21 CFR 202.1 — Prescription drug advertisements. The FDA's "fair balance" rule requires that any prescription-drug claim be accompanied by a brief summary of risk and side-effect information.

**MetaOrtho posture:** We do not promote any branded drug. GLP-1 brand mentions are descriptive (audience identification), which is not "promotion" under FDA rules. Compliance posture: keep brand mentions descriptive, never pair a brand-name page with a "Buy now" CTA, and never include drug imagery / trade dress.

---

## 7. DSHEA — Supplement Claims (21 USC §343-2)

**Source:** Dietary Supplement Health and Education Act of 1994.

### Allowed: structure / function claims

- "Supports muscle health" ✅
- "Helps maintain bone density" ✅
- Must be paired with the **mandatory disclaimer**: *"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."*

### Disallowed: disease claims

- "Treats osteoporosis" ❌
- "Prevents muscle wasting" ❌ (matches our `Supplements.tsx` hit — needs rewrite)
- Anything implying diagnosis, treatment, mitigation, cure, or prevention of a named disease.

### MetaOrtho posture

- Supplements are mentioned in `components/home/Supplements.tsx` and `app/portal/protocol/page.tsx` (HMB).
- Any supplement page needs the DSHEA disclaimer in close proximity to the structure/function claim, plus a Supplement Facts panel image and manufacturer disclosure.

---

## 8. State Privacy Laws (CCPA/CPRA + 2024-2026 wave)

**Status as of April 2026:** California (CCPA/CPRA), Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Utah (UCPA), and an expanding bucket of newer state laws (Texas TDPSA effective 2024, Oregon, Montana, Iowa, Indiana, Tennessee, Florida — varying scopes and effective dates).

### Common requirements relevant to MetaOrtho

- Privacy policy with: categories of data collected, purposes, retention, third-party sharing, sale/share opt-out, sensitive-data handling, children-under-16 statement, contact for privacy requests.
- "Do Not Sell or Share My Personal Information" link in the footer (CA, CO).
- Universal Opt-Out Mechanism (UOOM) honored (CA via Global Privacy Control, CO same).
- Right to access, correct, delete, opt-out of sale/share/targeted advertising.

### MetaOrtho posture

- Existing `/privacy` page needs an audit against the multi-state checklist (not just CA).
- "Do Not Sell or Share" link missing from current footer.

---

## 9. Sources

- [LegitScript Healthcare Certification](https://www.legitscript.com/certification/healthcare-certification/)
- [LegitScript Telemedicine fact sheet](https://www.legitscript.com/wp-content/uploads/2022/03/Healthcare-Certification-FactSheet-Telemedicine.pdf)
- [LegitScript Healthcare Certification FAQ](https://www.legitscript.com/certification/healthcare-certification/faq/)
- [HHS — Notice of Privacy Practices guidance](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/privacy-practices-for-protected-health-information/index.html)
- [eCFR — 45 CFR §164.520](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.520)
- [CCHP — State telehealth consent requirements](https://www.cchpca.org/topic/consent-requirements-professional-requirements/)
- [HHS — Obtaining informed consent for telehealth](https://telehealth.hhs.gov/providers/preparing-patients-for-telehealth/obtaining-informed-consent)
- [Curogram — Telemedicine regulations by state 2026](https://curogram.com/blog/best-practices/telemedicine/telemedicine-regulations-by-state)
- [eCFR — 16 CFR Part 255 (FTC Endorsement Guides)](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255)
- [FTC — 2023 Endorsement Guides update press release](https://www.ftc.gov/news-events/news/press-releases/2023/06/federal-trade-commission-announces-updated-advertising-guides-combat-deceptive-reviews-endorsements)
- [Hall Render — Year later on FTC Endorsement Guides](https://hallrender.com/2024/07/17/a-year-later-revisiting-ftcs-updated-endorsement-guides/)
- [HHS OCR — Online Tracking Technologies guidance](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html)
- [Inside Privacy — HHS OCR updates tracking guidance](https://www.insideprivacy.com/health-privacy/hhs-ocr-updates-tracking-technologies-guidance/)
- [Nixon Peabody — OCR tracking bulletin partially deemed unlawful](https://www.nixonpeabody.com/insights/alerts/2024/07/03/portions-of-ocrs-bulletin-on-online-tracking-technologies-deemed-unlawful)
