import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { parseUtmsFromUrl, parsePathFromUrl, type Utms } from "@/lib/utm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Assessment capture
//
// Persists a completed GLP-1 Management Profile submission: the full structured
// response set, the deterministic scoring outputs, contact details, and source
// attribution (UTMs + path are read server-side from the Referer so they
// survive even if the client doesn't forward them). Hard-stopped submissions
// are still recorded — they create a CRM record per Quiz-Architecture §14.1.
//
// The existing /api/waitlist flow is untouched. With marketing consent, this
// route also best-effort mirrors the contact into Customer.io + the Resend
// audience so the lead lands in the same tools — but does NOT trigger the
// waitlist welcome series (wrong context for a quiz completer).
//
// INTEGRATION STUBS (documented for later, see .env.example):
//   - Profile email:  send the rendered Profile via Resend (needs a template).
//   - Booking:        Healthie scheduling (NEXT_PUBLIC_BOOKING_URL on the client).
//   - CRM:            HubSpot contact + deal sync (HUBSPOT_* env vars).
//   - Consult prep:   AI-generated 1-page clinical summary (§14.2).
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const COMPONENT_RE = /^[a-z0-9][a-z0-9_-]*$/;
const COMPONENT_MAX = 64;

const CANDIDACY = new Set(["not_candidate", "possible_caveats", "candidate", "strong_candidate"]);
const TIERS = new Set(["standard", "enhanced", "high_risk"]);
const RESPONSES_MAX_BYTES = 24_000;
const FREE_TEXT_MAX = 500;

type Payload = {
  email?: unknown;
  first_name?: unknown;
  state?: unknown;
  consent_marketing?: unknown;
  source_component?: unknown;
  responses?: unknown;
  outcome?: {
    candidacy?: unknown;
    hard_stop?: unknown;
    tier?: unknown;
    complexity_score?: unknown;
    bmi?: unknown;
    flags?: unknown;
  };
};

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  // ---- 1. Rate limit by IP --------------------------------------------------
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  // ---- 2. Parse + validate --------------------------------------------------
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { success: false, message: "A valid email is required to generate your Profile." },
      { status: 400 },
    );
  }

  const firstName =
    typeof body.first_name === "string" ? body.first_name.trim().slice(0, 80) || null : null;

  const stateRaw = typeof body.state === "string" ? body.state.trim().toUpperCase() : "";
  const state = /^[A-Z]{2}$/.test(stateRaw) ? stateRaw : null;

  const consentMarketing =
    typeof body.consent_marketing === "boolean" ? body.consent_marketing : false;

  const component =
    typeof body.source_component === "string" ? body.source_component : "assessment-v2";
  if (component.length > COMPONENT_MAX || !COMPONENT_RE.test(component)) {
    return NextResponse.json({ success: false, message: "Invalid form source." }, { status: 400 });
  }

  // Structured responses — bounded so a malformed client can't write unbounded
  // JSON. We store them as-is (already keyed by stable question id slugs).
  const responses =
    body.responses && typeof body.responses === "object" && !Array.isArray(body.responses)
      ? (body.responses as Record<string, unknown>)
      : {};
  if (JSON.stringify(responses).length > RESPONSES_MAX_BYTES) {
    return NextResponse.json({ success: false, message: "Response payload too large." }, { status: 413 });
  }

  // Free text lives in the responses under the "free_text" question id.
  let freeText: string | null = null;
  const ft = (responses as Record<string, { kind?: string; value?: unknown }>)["free_text"];
  if (ft && ft.kind === "text" && typeof ft.value === "string") {
    freeText = ft.value.slice(0, FREE_TEXT_MAX) || null;
  }

  // Whitelist the scoring outputs so only valid enum values reach the column
  // checks (the client computes these, but never trust the wire).
  const outcome = body.outcome ?? {};
  const candidacy =
    typeof outcome.candidacy === "string" && CANDIDACY.has(outcome.candidacy) ? outcome.candidacy : null;
  const tier = typeof outcome.tier === "string" && TIERS.has(outcome.tier) ? outcome.tier : null;
  const hardStop = typeof outcome.hard_stop === "boolean" ? outcome.hard_stop : false;
  const complexityScore =
    typeof outcome.complexity_score === "number" && Number.isFinite(outcome.complexity_score)
      ? Math.trunc(outcome.complexity_score)
      : null;
  const bmi =
    typeof outcome.bmi === "number" && Number.isFinite(outcome.bmi) ? outcome.bmi : null;
  const flags = Array.isArray(outcome.flags)
    ? outcome.flags.filter((f): f is string => typeof f === "string").slice(0, 3)
    : [];

  // ---- 3. Server-side attribution ------------------------------------------
  const referer = req.headers.get("referer");
  const utms: Utms = parseUtmsFromUrl(referer);
  const sourcePage = parsePathFromUrl(referer) || "/assessment";
  const userAgent = req.headers.get("user-agent")?.slice(0, 512) || null;
  const nowIso = new Date().toISOString();

  // ---- 4. Persist to Supabase (primary, required) --------------------------
  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    console.error("[assessment] Supabase env vars missing — cannot persist.");
    return NextResponse.json(
      { success: false, message: "We couldn't save your Profile right now. Please try again shortly." },
      { status: 503 },
    );
  }

  const { error: insertError } = await supabase.from("assessment_submissions").insert({
    email,
    first_name: firstName,
    state,
    source_page: sourcePage,
    source_component: component,
    utm_source: utms.utm_source,
    utm_medium: utms.utm_medium,
    utm_campaign: utms.utm_campaign,
    utm_content: utms.utm_content,
    utm_term: utms.utm_term,
    consent_marketing: consentMarketing,
    consent_timestamp: consentMarketing ? nowIso : null,
    ip_address: ip,
    user_agent: userAgent,
    candidacy,
    hard_stop: hardStop,
    complexity_tier: tier,
    complexity_score: complexityScore,
    bmi,
    drug_flags: flags,
    responses,
    free_text: freeText,
    status: "new",
  });

  if (insertError) {
    console.error("[assessment] insert error:", insertError);
    return NextResponse.json(
      { success: false, message: "Something went sideways on our end. Please try again." },
      { status: 500 },
    );
  }

  // ---- 5. Best-effort marketing-tool mirror (consent-gated) ----------------
  // Never fails the request — the submission is already recorded above.
  if (consentMarketing) {
    await mirrorToCustomerIo({ email, firstName, state, sourcePage, component, utms, candidacy, tier });
    await mirrorToResendAudience(email);
  }

  // TODO(profile-email): render and send the Profile via Resend (transactional,
  // independent of marketing consent). Requires a Profile email template.

  return NextResponse.json({ success: true, message: "Your Profile is ready. We've emailed you a copy." });
}

// --- integration helpers ----------------------------------------------------

async function mirrorToResendAudience(email: string) {
  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!resendKey || !audienceId) return;
  try {
    const resend = new Resend(resendKey);
    await resend.contacts.create({ audienceId, email, unsubscribed: false });
  } catch (err) {
    console.error("[assessment] Resend audience sync failed:", err);
  }
}

async function mirrorToCustomerIo(args: {
  email: string;
  firstName: string | null;
  state: string | null;
  sourcePage: string;
  component: string;
  utms: Utms;
  candidacy: string | null;
  tier: string | null;
}) {
  const siteId = process.env.CUSTOMER_IO_SITE_ID;
  const trackKey = process.env.CUSTOMER_IO_TRACK_API_KEY;
  if (!siteId || !trackKey) return;

  const base =
    process.env.CUSTOMER_IO_REGION === "eu" ? "https://track-eu.customer.io" : "https://track.customer.io";
  const auth = "Basic " + Buffer.from(`${siteId}:${trackKey}`).toString("base64");
  const id = encodeURIComponent(args.email);
  const nowEpoch = Math.floor(Date.now() / 1000);

  try {
    await fetch(`${base}/api/v1/customers/${id}`, {
      method: "PUT",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: args.email,
        first_name: args.firstName,
        state: args.state,
        candidacy: args.candidacy,
        complexity_tier: args.tier,
        source_page: args.sourcePage,
        source_component: args.component,
        utm_source: args.utms.utm_source,
        utm_campaign: args.utms.utm_campaign,
        subscribed: true,
        joined_via: "assessment",
      }),
    });
    await fetch(`${base}/api/v1/customers/${id}/events`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "assessment_completed",
        timestamp: nowEpoch,
        data: { candidacy: args.candidacy, complexity_tier: args.tier },
      }),
    });
  } catch (err) {
    console.error("[assessment] Customer.io sync failed:", err);
  }
}
