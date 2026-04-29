# HIPAA NPP Content Audit — `app/hipaa/HIPAAContent.tsx`

**Generated:** 2026-04-29
**Standard:** 45 CFR §164.520(b) — required content of the Notice of Privacy Practices

## Summary

The existing NPP is **substantially compliant** but has 4 content gaps that should be closed before LegitScript submission. Patches applied in the same commit; remaining items flagged below.

| § | Required element | Status | Source |
|---|---|---|---|
| 1 | Header (verbatim) | ✅ Present | lines 33-35 (uppercase styling matches "prominent" requirement) |
| 2 | TPO description w/ examples | ✅ Present | lines 51-64 |
| 3 | Other §164.512 permitted uses | ⚠️ **Expanded in this commit** | was thin (only "law" + "health/safety"); now lists public health, oversight, judicial, law enforcement, decedents/coroners, organ donation, research, workers' comp, military, abuse/neglect victims, threats |
| 4 | Authorization-required uses + revocation | ✅ Present | lines 76-88 |
| 5 | Specifically named: psychotherapy notes, marketing, sale of PHI | ✅ Present | line 80-84 |
| 6 | Patient rights | ⚠️ **Right-to-complaint added to rights section in this commit** | was buried in "Complaints" only |
| 7 | Entity duties | ⚠️ **Breach-notification duty added to duties list in this commit** | was listed as patient right only |
| 8 | Effective date | ✅ Present | line 26 |
| 9 | Privacy Officer / contact | ✅ Present (with caveat) | line 191 — uses `info@metaortho.com`; **TODO** swap to dedicated `privacy@metaortho.com` once that mailbox is set up (tracked in `escalations.md` D-8) |
| 10 | Right to change notice + how patients informed | ✅ Present | lines 184-187 |

## Additional polish

| Item | Status |
|---|---|
| "How you receive this notice" section (delivery method for telehealth — electronic + first-encounter acknowledgment) | ⚠️ **Added in this commit** |
| Spanish-language access notice (Section 1557 ACA — only required if MetaOrtho receives federal funds) | Not applicable today (cash-pay practice); revisit if/when accepting Medicare/Medicaid |
| Fundraising communications opt-out (45 CFR §164.514(f)(2)) | Not applicable (no fundraising program) |

## Implementation note for the patient portal

Once the test patient account is built (R-1 in `escalations.md`), the intake flow must capture an `npp_acknowledged_at` timestamp tied to a content version hash, so the practice can prove which NPP version a patient acknowledged. This work is intake-flow scope, not NPP-content scope, but flagged here so it isn't lost.
