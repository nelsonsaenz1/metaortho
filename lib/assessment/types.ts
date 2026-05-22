// ---------------------------------------------------------------------------
// MetaOrtho v2 assessment — pure types
//
// This module has NO runtime imports, so it loads cleanly under both the Next
// bundler and Node's native TypeScript test runner (`node --test`). Every other
// module in lib/assessment/ imports its types from here.
//
// The whole assessment is split deliberately:
//   types.ts      — shapes only (this file)
//   questions.ts  — the question bank, branching/skip logic, response readers
//   scoring.ts    — deterministic candidacy / drug-flag / complexity scoring
//   profile.ts    — the templated GLP-1 Management Profile (output layer)
//   telemetry.ts  — typed funnel events (integration point)
//
// Scoring is intentionally separated from UI so the clinical logic stays pure
// and unit-testable (see scoring.test.ts).
// ---------------------------------------------------------------------------

export type BlockId = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export type QuestionKind = "single" | "multi" | "measure" | "contact" | "text";

export type MeasureKind = "height" | "weight";

/** The unit the user entered a measurement in. Canonical storage is metric. */
export type MeasureUnit = "ft_in" | "cm" | "lb" | "kg";

// --- Answers ---------------------------------------------------------------
// One discriminated-union member per question kind. Responses are a plain map
// keyed by question id, so the whole set serializes straight to JSON for the
// capture API and Supabase.

export type Answer =
  | { kind: "single"; value: string }
  | { kind: "multi"; values: string[] }
  // `canonical` is cm for height, kg for weight. `display` is the human string
  // the user actually entered (e.g. `5'10"`, `185 lb`) — kept for the record.
  | { kind: "measure"; canonical: number; unit: MeasureUnit; display: string }
  | { kind: "contact"; firstName: string; email: string; consentMarketing: boolean }
  | { kind: "text"; value: string };

export type Responses = Record<string, Answer | undefined>;

// --- Candidacy -------------------------------------------------------------

export type CandidacyLevel =
  | "not_candidate"
  | "possible_caveats"
  | "candidate"
  | "strong_candidate";

export interface CandidacyResult {
  level: CandidacyLevel;
  /** True when a hard-stop contraindication fired (drives non-booking CTA). */
  hardStop: boolean;
  /** Human-readable factors that drove the determination (shown in output). */
  reasons: string[];
  bmi: number | null;
}

// --- Drug suitability flags ------------------------------------------------

export type DrugFlagKey =
  | "cvd"
  | "t2dm"
  | "mash"
  | "osa"
  | "gi_side_effects"
  | "pregnancy_planning"
  | "msk_high_risk"
  | "compounded";

export interface DrugFlag {
  key: DrugFlagKey;
  /** Lower number = higher clinical priority. Used to cap the list at 3. */
  priority: number;
  text: string;
}

// --- Clinical management complexity tier -----------------------------------

export type ComplexityTier = "standard" | "enhanced" | "high_risk";

export interface ComplexityFactor {
  label: string;
  /** Weighted points (may be negative for mitigating factors). */
  points: number;
}

export interface ComplexityResult {
  tier: ComplexityTier;
  score: number;
  /** Override triggers that force High-Risk regardless of score. */
  overrides: string[];
  /** Weighted contributors + mitigators, for "show the work" in the output. */
  factors: ComplexityFactor[];
}

// --- Combined scoring output ----------------------------------------------

export interface ScoringResult {
  candidacy: CandidacyResult;
  /** Already prioritized and capped at 3. */
  flags: DrugFlag[];
  complexity: ComplexityResult;
  bmi: number | null;
}

// --- GLP-1 Management Profile (output document) ----------------------------

export type CtaKind = "book" | "book_caveats" | "no_booking";

export interface ProfileSection {
  id: string;
  title: string;
  /** Body paragraphs. */
  body: string[];
  /** Optional bullet list rendered after the body. */
  bullets?: string[];
}

export interface ManagementProfile {
  firstName: string | null;
  candidacyLevel: CandidacyLevel;
  complexityTier: ComplexityTier;
  flags: DrugFlag[];
  cta: CtaKind;
  sections: ProfileSection[];
}
