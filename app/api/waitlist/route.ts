import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  parseUtmsFromUrl,
  parsePathFromUrl,
  type Utms,
} from "@/lib/utm";
import {
  welcomeEmailSubject,
  welcomeEmailFrom,
  welcomeEmailReplyTo,
  welcomeEmailHtml,
  welcomeEmailText,
} from "@/lib/emails/welcome";
import {
  seriesOneFrom,
  seriesOneHtml,
  seriesOneReplyTo,
  seriesOneSubject,
  seriesOneText,
} from "@/lib/emails/welcome-series-1";
import {
  seriesTwoFrom,
  seriesTwoHtml,
  seriesTwoReplyTo,
  seriesTwoSubject,
  seriesTwoText,
} from "@/lib/emails/welcome-series-2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Strict-but-pragmatic email regex — RFC 5322 is overkill for waitlist gate.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const ALLOWED_COMPONENTS = new Set([
  "hero",
  "hero-primary",
  "inline",
  "sticky_footer",
  "modal",
  "final-cta",
  "landing-slide-3",
  "book-page",
]);

type Payload = {
  email?: unknown;
  source_component?: unknown;
  consent_marketing?: unknown;
};

/** Pull the best-effort client IP from standard proxy headers (Vercel etc). */
function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();

  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function unsubscribeUrl(email: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.com";
  return `${base}/api/waitlist/unsubscribe?email=${encodeURIComponent(email)}`;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  // ---- 1. Rate limit by IP --------------------------------------------------
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please try again in a minute.",
      },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  // ---- 2. Parse + validate payload -----------------------------------------
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const component =
    typeof body.source_component === "string" ? body.source_component : "";
  const consentMarketing =
    typeof body.consent_marketing === "boolean" ? body.consent_marketing : true;

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (component && !ALLOWED_COMPONENTS.has(component)) {
    return NextResponse.json(
      { success: false, message: "Invalid form source." },
      { status: 400 },
    );
  }

  // ---- 3. Server-side attribution (UTMs + source_page from Referer) ---------
  const referer = req.headers.get("referer");
  const utms: Utms = parseUtmsFromUrl(referer);
  const sourcePage = parsePathFromUrl(referer) || "/";
  const userAgent = req.headers.get("user-agent")?.slice(0, 512) || null;

  // ---- 4. Insert into Supabase ---------------------------------------------
  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    console.error("[waitlist] Supabase env vars missing — cannot persist.");
    return NextResponse.json(
      {
        success: false,
        message:
          "The waitlist is temporarily unavailable. Please try again shortly.",
      },
      { status: 503 },
    );
  }

  const nowIso = new Date().toISOString();

  const { error: insertError } = await supabase
    .from("waitlist")
    .insert({
      email,
      source_page: sourcePage,
      source_component: component || null,
      utm_source: utms.utm_source,
      utm_medium: utms.utm_medium,
      utm_campaign: utms.utm_campaign,
      utm_content: utms.utm_content,
      utm_term: utms.utm_term,
      consent_marketing: consentMarketing,
      consent_timestamp: consentMarketing ? nowIso : null,
      ip_address: ip,
      user_agent: userAgent,
      status: "pending",
    });

  if (insertError) {
    // Unique-violation on email — friendly duplicate handling.
    // Postgres error code 23505 is unique_violation.
    const code = (insertError as { code?: string }).code;
    if (code === "23505") {
      return NextResponse.json({
        success: true,
        message: "You're already on the list. We'll be in touch.",
      });
    }

    console.error("[waitlist] insert error:", insertError);
    return NextResponse.json(
      {
        success: false,
        message: "Something went sideways on our end. Please try again.",
      },
      { status: 500 },
    );
  }

  // ---- 5. Resend side-effects (welcome email + audience sync) ---------------
  // Both are best-effort: the signup is already recorded in Supabase, so we
  // never fail the request if Resend is down.
  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const unsub = unsubscribeUrl(email);

    // 5a. Welcome email.
    try {
      await resend.emails.send({
        from: welcomeEmailFrom(),
        replyTo: welcomeEmailReplyTo(),
        to: [email],
        subject: welcomeEmailSubject(),
        html: welcomeEmailHtml({ email, unsubscribeUrl: unsub }),
        text: welcomeEmailText({ email, unsubscribeUrl: unsub }),
        headers: {
          "List-Unsubscribe": `<${unsub}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
    } catch (err) {
      console.error("[waitlist] Resend send failed (signup still recorded):", err);
    }

    // 5b. Mirror the contact into the Resend audience so broadcasts can
    // reach them. Supabase stays the source of truth; this is a projection.
    if (audienceId) {
      try {
        await resend.contacts.create({
          audienceId,
          email,
          unsubscribed: !consentMarketing,
        });
      } catch (err) {
        console.error("[waitlist] Resend audience sync failed:", err);
      }
    } else {
      console.warn(
        "[waitlist] RESEND_AUDIENCE_ID not set — audience sync skipped.",
      );
    }

    // 5c. Schedule the rest of the welcome series. E2 fires +2 days, E3 fires
    // +4 days. We capture each scheduled email's ID so the unsubscribe route
    // can cancel them if the contact opts out before they're delivered.
    let scheduledE2Id: string | null = null;
    let scheduledE3Id: string | null = null;

    try {
      const e2 = await resend.emails.send({
        from: seriesOneFrom(),
        replyTo: seriesOneReplyTo(),
        to: [email],
        subject: seriesOneSubject(),
        html: seriesOneHtml({ email, unsubscribeUrl: unsub }),
        text: seriesOneText({ email, unsubscribeUrl: unsub }),
        headers: {
          "List-Unsubscribe": `<${unsub}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
        scheduledAt: "in 2 days",
      });
      scheduledE2Id = e2.data?.id ?? null;
    } catch (err) {
      console.error("[waitlist] Resend schedule E2 failed:", err);
    }

    try {
      const e3 = await resend.emails.send({
        from: seriesTwoFrom(),
        replyTo: seriesTwoReplyTo(),
        to: [email],
        subject: seriesTwoSubject(),
        html: seriesTwoHtml({ email, unsubscribeUrl: unsub }),
        text: seriesTwoText({ email, unsubscribeUrl: unsub }),
        headers: {
          "List-Unsubscribe": `<${unsub}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
        scheduledAt: "in 4 days",
      });
      scheduledE3Id = e3.data?.id ?? null;
    } catch (err) {
      console.error("[waitlist] Resend schedule E3 failed:", err);
    }

    if (scheduledE2Id || scheduledE3Id) {
      const { error: updErr } = await supabase
        .from("waitlist")
        .update({
          scheduled_e2_id: scheduledE2Id,
          scheduled_e3_id: scheduledE3Id,
        })
        .eq("email", email);
      if (updErr) {
        console.error(
          "[waitlist] Failed to persist scheduled email IDs:",
          updErr,
        );
      }
    }
  } else {
    console.warn(
      "[waitlist] RESEND_API_KEY not set — welcome email + audience sync skipped.",
    );
  }

  // ---- 6. Customer.io side-effects (identify + waitlist event) -------------
  // Mirrors the Resend block: best-effort, never fails the request. Identify
  // is keyed by email and idempotent, so retries from a transient error leave
  // the same record. The "Waitlist · subscribed" segment in Customer.io picks
  // up people where `subscribed=true`, firing the onboarding campaign.
  const cioSiteId = process.env.CUSTOMER_IO_SITE_ID;
  const cioTrackKey = process.env.CUSTOMER_IO_TRACK_API_KEY;
  if (cioSiteId && cioTrackKey) {
    const cioBase =
      process.env.CUSTOMER_IO_REGION === "eu"
        ? "https://track-eu.customer.io"
        : "https://track.customer.io";
    const cioAuth =
      "Basic " +
      Buffer.from(`${cioSiteId}:${cioTrackKey}`).toString("base64");
    const cioId = encodeURIComponent(email);
    const nowEpoch = Math.floor(Date.now() / 1000);

    // 6a. Identify the person.
    try {
      const idResp = await fetch(`${cioBase}/api/v1/customers/${cioId}`, {
        method: "PUT",
        headers: {
          Authorization: cioAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          created_at: nowEpoch,
          source_page: sourcePage,
          source_component: component || null,
          utm_source: utms.utm_source,
          utm_medium: utms.utm_medium,
          utm_campaign: utms.utm_campaign,
          utm_content: utms.utm_content,
          utm_term: utms.utm_term,
          consent_marketing: consentMarketing,
          subscribed: consentMarketing,
          joined_via: "waitlist",
        }),
      });
      if (!idResp.ok) {
        console.error(
          `[waitlist] Customer.io identify failed: HTTP ${idResp.status}`,
        );
      }
    } catch (err) {
      console.error("[waitlist] Customer.io identify failed:", err);
    }

    // 6b. Track the signup event so future automations can trigger off it.
    try {
      await fetch(`${cioBase}/api/v1/customers/${cioId}/events`, {
        method: "POST",
        headers: {
          Authorization: cioAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "waitlist_signed_up",
          timestamp: nowEpoch,
          data: {
            source_page: sourcePage,
            source_component: component || null,
          },
        }),
      });
    } catch (err) {
      console.error("[waitlist] Customer.io event failed:", err);
    }
  } else {
    console.warn(
      "[waitlist] Customer.io env vars missing — sync skipped.",
    );
  }

  return NextResponse.json({
    success: true,
    message: "You're in. We'll be in touch.",
  });
}
