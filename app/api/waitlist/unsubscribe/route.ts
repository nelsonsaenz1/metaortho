import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const PALETTE = {
  cream: "#FBF8F5",
  ink: "#0A2633",
  body: "#475157",
  muted: "#87939A",
  hair: "#E4E1D9",
  accent: "#2A6F97",
} as const;

function htmlResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function renderConfirmationPage({
  title,
  message,
}: {
  title: string;
  message: string;
}): string {
  const FONT_SERIF =
    "'DM Serif Display',Georgia,'Times New Roman',serif";
  const FONT_SANS =
    "'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${title} — MetaOrtho</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap" />
<style>
  html,body{margin:0;padding:0;background:${PALETTE.cream};}
  body{font-family:${FONT_SANS};color:${PALETTE.body};-webkit-font-smoothing:antialiased;min-height:100vh;display:flex;flex-direction:column;}
  main{flex:1;display:flex;align-items:center;justify-content:center;padding:48px 24px;}
  .card{max-width:520px;width:100%;text-align:center;}
  .wordmark{display:block;font-family:${FONT_SERIF};font-size:11px;letter-spacing:0.32em;color:${PALETTE.ink};font-weight:400;margin:0 0 48px;text-transform:uppercase;}
  .eyebrow{margin:0 0 18px;font-size:10px;font-weight:600;color:${PALETTE.muted};letter-spacing:0.22em;text-transform:uppercase;}
  h1{margin:0 0 20px;font-family:${FONT_SERIF};font-size:40px;line-height:1.1;font-weight:400;letter-spacing:-0.03em;color:${PALETTE.ink};}
  p{margin:0 0 16px;font-size:16px;line-height:1.6;color:${PALETTE.body};}
  hr{border:none;border-top:1px solid ${PALETTE.hair};margin:36px 0 28px;}
  a{color:${PALETTE.accent};text-decoration:none;border-bottom:1px solid ${PALETTE.accent};font-weight:500;}
  footer{padding:24px;text-align:center;color:${PALETTE.muted};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;}
</style>
</head>
<body>
<main>
  <div class="card">
    <span class="wordmark">MetaOrtho</span>
    <p class="eyebrow">Email preferences</p>
    <h1>${title}</h1>
    <p>${message}</p>
    <hr />
    <p>Changed your mind? <a href="https://metaortho.com">Re-join the waitlist</a> any time.</p>
  </div>
</main>
<footer>MetaOrthopedics, PLLC · Germantown, TN</footer>
</body>
</html>`;
}

async function unsubscribeFromSupabase(email: string): Promise<void> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    console.warn("[unsubscribe] Supabase env vars missing — skipped.");
    return;
  }

  const { error } = await supabase
    .from("waitlist")
    .update({
      consent_marketing: false,
      status: "unsubscribed",
    })
    .eq("email", email);

  if (error) {
    console.error("[unsubscribe] Supabase update failed:", error);
  }
}

async function unsubscribeFromResend(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.warn(
      "[unsubscribe] RESEND_API_KEY or RESEND_AUDIENCE_ID missing — skipped.",
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.contacts.update({
      audienceId,
      email,
      unsubscribed: true,
    });
  } catch (err) {
    console.error("[unsubscribe] Resend update failed:", err);
  }
}

async function unsubscribeFromCustomerIo(email: string): Promise<void> {
  const siteId = process.env.CUSTOMER_IO_SITE_ID;
  const trackKey = process.env.CUSTOMER_IO_TRACK_API_KEY;
  if (!siteId || !trackKey) {
    console.warn("[unsubscribe] Customer.io env vars missing — skipped.");
    return;
  }

  const base =
    process.env.CUSTOMER_IO_REGION === "eu"
      ? "https://track-eu.customer.io"
      : "https://track.customer.io";
  const auth =
    "Basic " + Buffer.from(`${siteId}:${trackKey}`).toString("base64");
  const cioId = encodeURIComponent(email);

  try {
    const resp = await fetch(`${base}/api/v1/customers/${cioId}`, {
      method: "PUT",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        unsubscribed: true,
        subscribed: false,
      }),
    });
    if (!resp.ok) {
      console.error(
        `[unsubscribe] Customer.io update failed: HTTP ${resp.status}`,
      );
    }
  } catch (err) {
    console.error("[unsubscribe] Customer.io update failed:", err);
  }
}

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const rawEmail = url.searchParams.get("email");

  if (!rawEmail) {
    return htmlResponse(
      renderConfirmationPage({
        title: "Missing email",
        message:
          "This unsubscribe link is missing an email address. Please use the link from one of our emails.",
      }),
      400,
    );
  }

  const email = rawEmail.trim().toLowerCase();

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return htmlResponse(
      renderConfirmationPage({
        title: "Invalid link",
        message:
          "This unsubscribe link doesn't look right. Please use the link from one of our emails.",
      }),
      400,
    );
  }

  // Best-effort across all three systems. We always show success to the user
  // — both to avoid leaking whether an email is in the database, and because
  // a partial failure on a downstream system shouldn't make the user think
  // their request was rejected.
  await Promise.allSettled([
    unsubscribeFromSupabase(email),
    unsubscribeFromResend(email),
    unsubscribeFromCustomerIo(email),
  ]);

  return htmlResponse(
    renderConfirmationPage({
      title: "You've been unsubscribed",
      message:
        "We've removed you from MetaOrtho's marketing emails. You won't hear from us again unless you opt back in.",
    }),
  );
}

// CAN-SPAM and List-Unsubscribe one-click (RFC 8058) require a POST endpoint
// at the same URL that performs the unsubscribe without further user action.
export async function POST(req: Request): Promise<Response> {
  const url = new URL(req.url);
  let email = url.searchParams.get("email")?.trim().toLowerCase() ?? "";

  if (!email) {
    try {
      const form = await req.formData();
      const candidate = form.get("email");
      if (typeof candidate === "string") {
        email = candidate.trim().toLowerCase();
      }
    } catch {
      // No form body — fall through.
    }
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { success: false, message: "Missing or invalid email." },
      { status: 400 },
    );
  }

  await Promise.allSettled([
    unsubscribeFromSupabase(email),
    unsubscribeFromResend(email),
    unsubscribeFromCustomerIo(email),
  ]);

  return NextResponse.json({ success: true });
}
