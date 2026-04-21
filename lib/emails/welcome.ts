/**
 * MetaOrtho waitlist welcome email.
 *
 * Tone: calm, clinical, short. Mirrors the brand voice on the site —
 * direct language, no exclamation marks, no marketing puffery.
 *
 * Env placeholders (set in .env.local and Vercel):
 *   WAITLIST_FROM_NAME      e.g. "Dr. Nelson Saenz"
 *   WAITLIST_FROM_EMAIL     e.g. "hello@metaortho.com"  (must be on verified domain in Resend)
 *   WAITLIST_MAILING_ADDR   Physical business address, required by CAN-SPAM
 *   NEXT_PUBLIC_SITE_URL    e.g. "https://metaortho.com"
 */

type TemplateInputs = {
  email: string;
  unsubscribeUrl: string;
};

export function welcomeEmailSubject() {
  return "You're on the list — here's what's next";
}

export function welcomeEmailFrom() {
  const name = process.env.WAITLIST_FROM_NAME || "Dr. [Surgeon Name]";
  const address = process.env.WAITLIST_FROM_EMAIL || "hello@metaortho.com";
  return `${name} <${address}>`;
}

export function welcomeEmailReplyTo() {
  return process.env.WAITLIST_FROM_EMAIL || "hello@metaortho.com";
}

export function welcomeEmailText({ email, unsubscribeUrl }: TemplateInputs): string {
  const addr = process.env.WAITLIST_MAILING_ADDR || "[Mailing address placeholder]";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.com";
  const name = process.env.WAITLIST_FROM_NAME || "Dr. [Surgeon Name]";

  return [
    `Thanks for joining the MetaOrtho waitlist.`,
    ``,
    `MetaOrtho is a physician-led telehealth practice built around one`,
    `thing: protecting your muscle, bone, and joint health while you're`,
    `on a GLP-1 medication like Ozempic, Wegovy, Mounjaro, or Zepbound.`,
    `The scale is coming down — but research shows up to 40% of that`,
    `weight loss is lean tissue, not fat, and bone density often follows.`,
    `We monitor for that with DEXA scans, targeted labs, and a clinical`,
    `protocol tailored to your risk profile.`,
    ``,
    `What to expect from this list:`,
    `- 1 to 2 short emails per month until we open to the general public`,
    `- No filler. No fake urgency.`,
    `- You'll be first to know when we're accepting new patients in your state.`,
    ``,
    `If you're already on a GLP-1 and want care now, you can book an`,
    `initial assessment at ${site}/book.`,
    ``,
    `— ${name}`,
    `   MetaOrtho`,
    ``,
    `---`,
    `You're receiving this because ${email} joined the MetaOrtho waitlist.`,
    `Unsubscribe: ${unsubscribeUrl}`,
    ``,
    `MetaOrtho`,
    `${addr}`,
  ].join("\n");
}

export function welcomeEmailHtml({ email, unsubscribeUrl }: TemplateInputs): string {
  const addr = process.env.WAITLIST_MAILING_ADDR || "[Mailing address placeholder]";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.com";
  const name = process.env.WAITLIST_FROM_NAME || "Dr. [Surgeon Name]";

  // Inline styles only — most email clients strip <style>.
  const t = {
    body: "margin:0;padding:0;background:#F7F5F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1A1A1A;",
    wrap: "max-width:560px;margin:0 auto;padding:32px 24px;",
    card: "background:#FFFFFF;border:1px solid #EAE6DD;border-radius:12px;padding:40px 32px;",
    h1: "margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:400;letter-spacing:-0.02em;color:#0B0F14;",
    p: "margin:0 0 16px;font-size:15px;line-height:1.6;color:#3A3A3A;",
    small: "margin:0 0 8px;font-size:12px;line-height:1.5;color:#888;",
    hr: "border:none;border-top:1px solid #EAE6DD;margin:28px 0;",
    ul: "margin:0 0 16px 0;padding:0 0 0 20px;font-size:15px;line-height:1.7;color:#3A3A3A;",
    link: "color:#2E5D7D;text-decoration:underline;",
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${welcomeEmailSubject()}</title>
  </head>
  <body style="${t.body}">
    <div style="${t.wrap}">
      <div style="${t.card}">
        <h1 style="${t.h1}">You're on the list.</h1>
        <p style="${t.p}">Thanks for joining the MetaOrtho waitlist.</p>
        <p style="${t.p}">
          MetaOrtho is a physician-led telehealth practice built around one thing: protecting your muscle,
          bone, and joint health while you're on a GLP-1 medication like Ozempic, Wegovy, Mounjaro, or
          Zepbound. The scale is coming down — but research shows up to
          <strong>40% of that weight loss is lean tissue, not fat</strong>, and bone density often follows.
          We monitor for that with DEXA scans, targeted labs, and a clinical protocol tailored to your risk.
        </p>
        <p style="${t.p}"><strong>What to expect from this list:</strong></p>
        <ul style="${t.ul}">
          <li>1 to 2 short emails per month until we open to the general public.</li>
          <li>No filler. No fake urgency.</li>
          <li>You'll be first to know when we're accepting new patients in your state.</li>
        </ul>
        <p style="${t.p}">
          If you're already on a GLP-1 and want care now, you can book an initial assessment at
          <a href="${site}/book" style="${t.link}">${site.replace(/^https?:\/\//, "")}/book</a>.
        </p>
        <p style="${t.p}" >— ${name}<br/><span style="color:#888;font-size:13px;">MetaOrtho</span></p>

        <hr style="${t.hr}" />

        <p style="${t.small}">You're receiving this because ${escapeHtml(email)} joined the MetaOrtho waitlist.</p>
        <p style="${t.small}">
          <a href="${unsubscribeUrl}" style="${t.link}">Unsubscribe</a>
        </p>
        <p style="${t.small}">MetaOrtho · ${escapeHtml(addr)}</p>
      </div>
    </div>
  </body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
