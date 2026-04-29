# Banned-Phrase Scan

**Generated:** 2026-04-28
**Method:** Case-insensitive `grep` across `app/`, `components/`, `content/` for the banned phrases enumerated in directive §3.6 and `compliance-guardrails.md` §5.

---

## Summary

| Banned phrase | Real hits | False positives filtered |
|---|---|---|
| `guarantee` / `guaranteed` | 1 (acceptable in context) | — |
| `cure` | 0 | "secure" matches |
| `prevent` | 4 (1 problematic, 1 borderline, 2 acceptable) | "prevention" / "preventive" / "preventable" matches |
| `eliminate` | 0 | — |
| `FDA-approved` / `FDA approved` | 0 | — |
| `clinically proven` | 0 | — |
| `lose weight without` | 0 | — |
| `doctor-trusted` / `doctor trusted` | 0 | — |
| `results may vary` | 0 | — |
| `before and after` / `before/after` | 0 | — |

---

## Real hits — triage

### `guarantee` (1 hit)

**`app/privacy/PrivacyContent.tsx:170`** — "No method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security."
- **Verdict:** Keep. This is a standard security disclaimer pattern, not an outcome guarantee, and is materially the opposite of a banned outcome promise.

### `prevent` (4 hits)

**1. `app/hipaa/HIPAAContent.tsx:73`** — "To prevent or lessen a serious and imminent threat to your health or safety or the health or safety of the public."
- **Verdict:** Keep. Quotes 45 CFR §164.512(j) language for a permitted disclosure.

**2. `app/terms/TermsContent.tsx:61`** — "Technical difficulties may occur that interrupt or prevent your consultation"
- **Verdict:** Keep. Operational disclosure, not a clinical claim.

**3. `components/home/Supplements.tsx:11`** — "Prevent muscle wasting" (purpose copy for High-Quality Protein supplement)
- **Verdict:** **REWRITE.** Outcome promise on a supplement; per `compliance-guardrails.md` §5, "prevent" applied to a condition is banned, and this is paired with a product. Suggested replacement: "Designed to support muscle preservation" or "Helps support lean muscle during weight loss." DSHEA compliance: needs the "These statements have not been evaluated by the FDA…" disclaimer in close proximity.

**4. `content/blog/gout-glp1-weight-loss-connection.ts:5`** — "Here's the science behind the connection and how to prevent it." (referring to gout attacks)
- **Verdict:** **REWRITE.** Educational content can describe risk-reduction strategies, but "prevent it" applied to a named condition (gout) crosses the guardrail. Suggested replacement: "…and how to reduce your risk."

---

## Hits in JSON-LD / metadata

`app/layout.tsx:80` — `availableService` includes "Sarcopenia Prevention Protocol".
- **Verdict:** **REWRITE.** Same banned word in a service name surfaces in structured data and may surface in search snippets. Suggested replacement: "Sarcopenia Risk-Reduction Protocol" or "Lean-Mass Preservation Protocol."

---

## Hits in metadata description

`app/layout.tsx:54` — OpenGraph description: "Up to 40% of weight lost on GLP-1 drugs is muscle and bone, not fat. MetaOrtho monitors and protects your musculoskeletal health during weight loss."
- **Verdict:** Keep. Statistic is substantiated (AAOS 2026 / Jensen 2024); "monitors and protects" is an operational description, not a banned outcome promise.

---

## Action items pulled into gap-analysis.md

1. Rewrite `components/home/Supplements.tsx:11` "Prevent muscle wasting" → safe phrasing.
2. Rewrite `content/blog/gout-glp1-weight-loss-connection.ts:5` "how to prevent it" → "how to reduce your risk."
3. Rewrite `app/layout.tsx:80` "Sarcopenia Prevention Protocol" → "Sarcopenia Risk-Reduction Protocol" (or chosen alternative).
4. Add DSHEA disclaimer to any supplement copy/page (independently of the banned-phrase fix).
