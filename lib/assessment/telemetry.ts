// ---------------------------------------------------------------------------
// MetaOrtho v2 assessment — funnel telemetry (integration point)
//
// Source of truth: Quiz-Question-Architecture-v2.md §14.3. The 1-1-1 diagnostic
// dashboard depends on these events being clean from day one. This module is
// the typed dispatch seam; wiring it to a real sink is a deliberate TODO.
//
// PRIVACY: events carry only non-identifying aggregates — never the email,
// name, free text, or raw answer values. components/Analytics.tsx intentionally
// blocks gtag on /assessment, so this MUST NOT route through gtag. The intended
// sink is a first-party, consent-respecting endpoint.
// ---------------------------------------------------------------------------

import type { CandidacyLevel, ComplexityTier, DrugFlagKey } from "./types.ts";

export type AssessmentEvent =
  | { type: "quiz_started" }
  | { type: "question_viewed"; questionId: string; index: number; total: number }
  | { type: "question_answered"; questionId: string; index: number }
  // Drop-off: emitted on unload before completion. `lastQuestionId` localizes
  // which question lost the user (§14.3 "drop-off per question").
  | { type: "quiz_abandoned"; lastQuestionId: string; index: number; total: number }
  | {
      type: "quiz_completed";
      candidacy: CandidacyLevel;
      tier: ComplexityTier;
      flagKeys: DrugFlagKey[];
      // Q-B4-c distribution is a strategic v2 signal; carried as a non-PII slug.
      currentManager: string | null;
    }
  | {
      type: "booking_cta_clicked";
      candidacy: CandidacyLevel;
      tier: ComplexityTier;
      source: string;
      licensed: boolean;
    };

/**
 * Optional global sink. A first-party analytics layer can assign
 * `window.metaorthoAssessmentSink` to receive events. Kept off the typed
 * `window` surface deliberately so nothing depends on it existing.
 */
type Sink = (event: AssessmentEvent) => void;

export function track(event: AssessmentEvent): void {
  if (typeof window === "undefined") return;
  try {
    const sink = (window as unknown as { metaorthoAssessmentSink?: Sink }).metaorthoAssessmentSink;
    if (typeof sink === "function") {
      sink(event);
      return;
    }
    // TODO(telemetry): POST to a first-party events endpoint (e.g. /api/events)
    // so the 1-1-1 dashboard can compute drop-off, tier distribution, flag
    // distribution, and booking conversion by tier. Until then, dev-log only.
    if (process.env.NODE_ENV !== "production") {
      console.debug("[assessment:telemetry]", event);
    }
  } catch {
    // Telemetry must never break the quiz.
  }
}
