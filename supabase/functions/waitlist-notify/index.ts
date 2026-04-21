/**
 * waitlist-notify — Supabase Edge Function (Deno runtime)
 *
 * Invoked by a Supabase Database Webhook on INSERT into public.waitlist.
 * Posts a formatted summary to Slack via an incoming webhook.
 *
 * Environment variables (set in the Supabase dashboard → Edge Functions → Settings):
 *   SLACK_WEBHOOK_URL            — Incoming webhook URL
 *   SUPABASE_URL                 — Provided automatically by Supabase (do not set)
 *   SUPABASE_SERVICE_ROLE_KEY    — Provided automatically by Supabase (do not set)
 *
 * Local dev:
 *   supabase functions serve waitlist-notify --env-file .env
 *
 * Deploy:
 *   supabase functions deploy waitlist-notify
 *
 * Configure the webhook after deploy:
 *   Supabase Studio → Database → Webhooks → Create a new webhook
 *     Name: waitlist-notify
 *     Table: public.waitlist
 *     Events: Insert
 *     Type: HTTP Request
 *     Method: POST
 *     URL: https://<project-ref>.supabase.co/functions/v1/waitlist-notify
 *     HTTP Headers: Authorization: Bearer <SERVICE_ROLE_KEY>
 *
 * Important: this function never throws out of the HTTP handler — if Slack is
 * down, we log and return 200 so the database INSERT is never rolled back.
 */

// deno-lint-ignore-file no-explicit-any
// @ts-expect-error Deno remote import — resolved at runtime, not by TypeScript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Supabase Database Webhook payload shape for a row-change event.
type DbWebhookPayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record?: Record<string, any>;
  old_record?: Record<string, any>;
};

const DENO_ENV: Record<string, string | undefined> = (globalThis as any).Deno
  ?.env?.toObject
  ? (globalThis as any).Deno.env.toObject()
  : {};

const SLACK_WEBHOOK_URL = DENO_ENV.SLACK_WEBHOOK_URL;
const SUPABASE_URL = DENO_ENV.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = DENO_ENV.SUPABASE_SERVICE_ROLE_KEY;

// @ts-expect-error Deno.serve is the runtime entrypoint
Deno.serve(async (req: Request) => {
  try {
    if (req.method !== "POST") {
      return json({ ok: false, reason: "method_not_allowed" }, 405);
    }

    const payload = (await req.json().catch(() => null)) as DbWebhookPayload | null;
    if (!payload || payload.type !== "INSERT" || payload.table !== "waitlist") {
      return json({ ok: true, skipped: true });
    }

    if (!SLACK_WEBHOOK_URL) {
      console.warn("[waitlist-notify] SLACK_WEBHOOK_URL not set — skipping.");
      return json({ ok: true, skipped: true });
    }

    const row = payload.record ?? {};

    // Count total signups for context. Not fatal if it fails.
    let total: number | string = "?";
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        const { count } = await supabase
          .from("waitlist")
          .select("id", { count: "exact", head: true });
        if (typeof count === "number") total = count;
      } catch (err) {
        console.error("[waitlist-notify] count failed:", err);
      }
    }

    const email = String(row.email ?? "(unknown)");
    const sourcePage = String(row.source_page ?? "(none)");
    const sourceComponent = String(row.source_component ?? "(none)");
    const utmSource = row.utm_source ? String(row.utm_source) : "—";
    const utmCampaign = row.utm_campaign ? String(row.utm_campaign) : "—";

    const text =
      `:tada: *New MetaOrtho waitlist signup*\n` +
      `Email: \`${email}\`\n` +
      `Source: ${sourcePage} (${sourceComponent})\n` +
      `UTM: ${utmSource} / ${utmCampaign}\n` +
      `Total signups: *${total}*`;

    const slackRes = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!slackRes.ok) {
      console.error(
        "[waitlist-notify] Slack responded non-2xx:",
        slackRes.status,
        await slackRes.text().catch(() => ""),
      );
    }

    return json({ ok: true });
  } catch (err) {
    console.error("[waitlist-notify] unhandled error:", err);
    // Return 200 so the database insert is NOT rolled back by webhook retry.
    return json({ ok: true, error: String(err) }, 200);
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
