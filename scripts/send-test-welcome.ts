/**
 * scripts/send-test-welcome.ts
 *
 * One-off: send the production welcome email (Email 1 of the waitlist series)
 * to a single recipient via Resend, without touching the Supabase waitlist
 * table or scheduling the +2d / +4d follow-ups. Useful for verifying template
 * rendering or confirming a deliverability fix end-to-end.
 *
 * Usage:
 *   cd ~/Mission\ Control/metaortho
 *   npx tsx scripts/send-test-welcome.ts <email>
 *
 * Reads RESEND_API_KEY, WAITLIST_FROM_NAME, WAITLIST_FROM_EMAIL,
 * WAITLIST_MAILING_ADDR, NEXT_PUBLIC_SITE_URL from .env.local.
 */

import { Resend } from "resend";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

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

async function main() {
  const recipient = process.argv[2];
  if (!recipient) {
    console.error("usage: npx tsx scripts/send-test-welcome.ts <email>");
    process.exit(1);
  }

  const env = loadEnv();
  for (const [k, v] of Object.entries(env)) {
    if (process.env[k] == null) process.env[k] = v;
  }

  const required = [
    "RESEND_API_KEY",
    "WAITLIST_FROM_EMAIL",
    "WAITLIST_FROM_NAME",
    "NEXT_PUBLIC_SITE_URL",
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error("missing env vars:", missing.join(", "));
    process.exit(1);
  }

  // Imported after env is wired up so the template helpers see the right values.
  const {
    welcomeEmailSubject,
    welcomeEmailFrom,
    welcomeEmailReplyTo,
    welcomeEmailHtml,
    welcomeEmailText,
  } = await import("../lib/emails/welcome");

  const site = process.env.NEXT_PUBLIC_SITE_URL!;
  const unsub = `${site}/api/waitlist/unsubscribe?email=${encodeURIComponent(recipient)}`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log(`sending welcome email to ${recipient}`);
  console.log(`  from:    ${welcomeEmailFrom()}`);
  console.log(`  replyTo: ${welcomeEmailReplyTo()}`);
  console.log(`  subject: ${welcomeEmailSubject()}`);

  const result = await resend.emails.send({
    from: welcomeEmailFrom(),
    replyTo: welcomeEmailReplyTo(),
    to: [recipient],
    subject: welcomeEmailSubject(),
    html: welcomeEmailHtml({ email: recipient, unsubscribeUrl: unsub }),
    text: welcomeEmailText({ email: recipient, unsubscribeUrl: unsub }),
    headers: {
      "List-Unsubscribe": `<${unsub}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });

  if (result.error) {
    console.error("resend error:", result.error);
    process.exit(1);
  }

  console.log(`sent. resend id: ${result.data?.id ?? "(no id)"}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
