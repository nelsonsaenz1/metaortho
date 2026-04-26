/**
 * scripts/backfill-customerio.ts
 *
 * One-shot backfill: pull every active waitlist row from Supabase and identify
 * each one in Customer.io. Mirrors what app/api/waitlist/route.ts does for new
 * signups, applied to historical rows. Idempotent — re-running won't duplicate
 * because Customer.io identify is keyed by email.
 *
 * Usage:
 *   cd ~/Mission\ Control/metaortho
 *   npx tsx scripts/backfill-customerio.ts            # dry run
 *   npx tsx scripts/backfill-customerio.ts --apply    # actually send
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, CUSTOMER_IO_SITE_ID,
 * CUSTOMER_IO_TRACK_API_KEY, CUSTOMER_IO_REGION from .env.local. Fails fast if
 * any are missing.
 *
 * Skips rows where status='unsubscribed'. Sets `subscribed=true` on the rest so
 * they fall into the Customer.io segment that fires the onboarding campaign.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// ---- env loader ------------------------------------------------------------
function loadEnv(): Record<string, string> {
  const path = resolve(process.cwd(), ".env.local");
  const raw = readFileSync(path, "utf8");
  const env: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

// ---- main ------------------------------------------------------------------
async function main() {
  const env = loadEnv();
  const apply = process.argv.includes("--apply");

  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const cioSiteId = env.CUSTOMER_IO_SITE_ID;
  const cioTrackKey = env.CUSTOMER_IO_TRACK_API_KEY;
  const cioRegion = env.CUSTOMER_IO_REGION === "eu" ? "eu" : "us";

  const missing: string[] = [];
  if (!supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!cioSiteId) missing.push("CUSTOMER_IO_SITE_ID");
  if (!cioTrackKey) missing.push("CUSTOMER_IO_TRACK_API_KEY");
  if (missing.length) {
    console.error(`Missing env vars: ${missing.join(", ")}`);
    process.exit(1);
  }

  const cioBase =
    cioRegion === "eu"
      ? "https://track-eu.customer.io"
      : "https://track.customer.io";
  const cioAuth =
    "Basic " + Buffer.from(`${cioSiteId}:${cioTrackKey}`).toString("base64");

  console.log(`Mode: ${apply ? "APPLY" : "DRY RUN"}`);
  console.log(`Region: ${cioRegion}`);
  console.log(`Customer.io base: ${cioBase}`);
  console.log();

  const supabase = createClient(supabaseUrl!, serviceKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Pull every row that hasn't unsubscribed. Order so a partial-failure
  // re-run picks up at the same place; identify is idempotent so this is
  // safe even without explicit cursoring.
  const { data, error } = await supabase
    .from("waitlist")
    .select(
      "email, source_page, source_component, utm_source, utm_medium, utm_campaign, utm_content, utm_term, consent_marketing, status, created_at",
    )
    .neq("status", "unsubscribed")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase query failed:", error);
    process.exit(1);
  }

  const rows = data ?? [];
  console.log(`Found ${rows.length} active waitlist rows.\n`);

  let ok = 0;
  let fail = 0;
  let skipped = 0;

  for (const row of rows) {
    const email = String(row.email || "").trim().toLowerCase();
    if (!email) {
      skipped++;
      continue;
    }
    const cioId = encodeURIComponent(email);
    const created = row.created_at
      ? Math.floor(new Date(row.created_at).getTime() / 1000)
      : Math.floor(Date.now() / 1000);
    const consent = row.consent_marketing !== false;

    const body = {
      email,
      created_at: created,
      source_page: row.source_page ?? null,
      source_component: row.source_component ?? null,
      utm_source: row.utm_source ?? null,
      utm_medium: row.utm_medium ?? null,
      utm_campaign: row.utm_campaign ?? null,
      utm_content: row.utm_content ?? null,
      utm_term: row.utm_term ?? null,
      consent_marketing: consent,
      subscribed: consent,
      joined_via: "waitlist",
      backfilled_at: Math.floor(Date.now() / 1000),
    };

    if (!apply) {
      console.log(`[dry] would identify ${email}`);
      ok++;
      continue;
    }

    try {
      const resp = await fetch(`${cioBase}/api/v1/customers/${cioId}`, {
        method: "PUT",
        headers: { Authorization: cioAuth, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (resp.ok) {
        ok++;
        process.stdout.write(".");
      } else {
        fail++;
        console.error(`\n${email}: HTTP ${resp.status}`);
      }
    } catch (err) {
      fail++;
      console.error(`\n${email}:`, err);
    }
  }

  console.log();
  console.log(`Done. ok=${ok} fail=${fail} skipped=${skipped}`);
  if (!apply) console.log("\nRe-run with --apply to actually sync.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
