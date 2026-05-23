// ---------------------------------------------------------------------------
// MetaOrtho — lightweight marketing-funnel analytics (Phase 1)
//
// A thin, dependency-free seam for the Phase 1 conversion funnel:
//   landing_view → profile_cta_clicked → (assessment funnel) → consult_cta_clicked
//
// The assessment owns its own in-quiz telemetry (lib/assessment/telemetry.ts);
// this module covers the marketing surfaces (home, /landing, hero, CTAs) so the
// 1-1-1 dashboard can measure Profile-start intent and consult intent.
//
// PRIVACY: events carry only non-identifying funnel metadata — never email,
// name, free text, or raw answers. Do not pass PHI into `props`.
//
// SINKS, in priority order:
//   1. window.metaorthoAnalyticsSink — a first-party endpoint can assign this.
//   2. window.gtag — only present after marketing consent (see Analytics.tsx),
//      so this is consent-respecting by construction.
//   3. dev console — so events are visible while building, silent in prod.
// ---------------------------------------------------------------------------

export type FunnelEvent =
  | "landing_view"
  | "profile_cta_clicked"
  | "consult_cta_clicked"
  | "booking_request_started"
  | "booking_request_completed"
  | "waitlist_cta_clicked";

/** Non-PII funnel metadata. Keep values to low-cardinality slugs/booleans. */
export type EventProps = Record<string, string | number | boolean | null | undefined>;

type Sink = (event: FunnelEvent, props?: EventProps) => void;

declare global {
  interface Window {
    metaorthoAnalyticsSink?: Sink;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: FunnelEvent, props?: EventProps): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.metaorthoAnalyticsSink === "function") {
      window.metaorthoAnalyticsSink(event, props);
      return;
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", event, props ?? {});
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      console.debug("[analytics]", event, props ?? {});
    }
  } catch {
    // Analytics must never break the page.
  }
}
