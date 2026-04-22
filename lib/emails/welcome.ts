/**
 * MetaOrtho waitlist welcome email.
 *
 * Tone: calm, clinical, short. Mirrors the brand voice on the site —
 * direct language, no exclamation marks, no marketing puffery.
 * Warm without being precious.
 *
 * Env placeholders (set in .env.local and Vercel):
 *   WAITLIST_FROM_NAME      e.g. "Dr. Jay Saenz"
 *   WAITLIST_FROM_EMAIL     e.g. "hello@metaortho.org"  (must be on verified domain in Resend)
 *   WAITLIST_MAILING_ADDR   Physical business address, required by CAN-SPAM
 *   NEXT_PUBLIC_SITE_URL    e.g. "https://metaortho.org"
 */

type TemplateInputs = {
  email: string;
  unsubscribeUrl: string;
};

const PREHEADER = "Protecting muscle, bone, and joint strength while the scale comes down.";

export function welcomeEmailSubject() {
  return "You're in — here's what we'll do together.";
}

export function welcomeEmailFrom() {
  const name = process.env.WAITLIST_FROM_NAME || "Dr. Jay Saenz";
  const address = process.env.WAITLIST_FROM_EMAIL || "hello@metaortho.org";
  return `${name} <${address}>`;
}

export function welcomeEmailReplyTo() {
  return process.env.WAITLIST_FROM_EMAIL || "hello@metaortho.org";
}

export function welcomeEmailText({ email, unsubscribeUrl }: TemplateInputs): string {
  const addr = process.env.WAITLIST_MAILING_ADDR || "[Mailing address placeholder]";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.org";
  const name = process.env.WAITLIST_FROM_NAME || "Dr. Jay Saenz";

  return [
    `METAORTHO`,
    ``,
    `You're in.`,
    ``,
    `Thanks for joining the MetaOrtho waitlist — we're genuinely glad you're here.`,
    ``,
    `We built this practice around one idea: GLP-1s work, but up to 40% of`,
    `the weight you lose can be lean tissue, and bone density often follows.`,
    `You've spent years building your strength. You deserve care that protects it.`,
    ``,
    `That's what we're excited to do with you — DEXA scans, targeted labs,`,
    `and a protocol matched to your risk. No filler. No guesswork.`,
    ``,
    `What to expect from this list:`,
    `- 1 to 2 short emails a month until we open our doors.`,
    `- No hype. No fake urgency.`,
    `- First word when we start taking patients in your state.`,
    ``,
    `Already on a GLP-1 and want care now? Book an initial assessment at ${site}/book.`,
    ``,
    `— ${name}`,
    `  MetaOrtho`,
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
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.org";
  const name = process.env.WAITLIST_FROM_NAME || "Dr. Jay Saenz";
  const logoUrl = `${site}/images/mo-logo.png`;

  // Inline styles only — most email clients strip <style>.
  const t = {
    body: "margin:0;padding:0;background:#FBF8F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#3A3A3A;-webkit-font-smoothing:antialiased;",
    preheader:
      "display:none;visibility:hidden;opacity:0;color:transparent;height:0;width:0;max-height:0;max-width:0;overflow:hidden;mso-hide:all;",
    wrap: "max-width:560px;margin:0 auto;padding:32px 24px;",
    card: "background:#FFFFFF;border:1px solid #EDE7DB;border-radius:12px;padding:40px 32px;",
    header: "text-align:center;padding:0 0 32px;",
    headerLogo: "display:block;margin:0 auto 10px;height:36px;width:auto;",
    wordmark:
      "display:block;font-family:'DM Serif Display',Georgia,'Times New Roman',serif;font-size:14px;letter-spacing:0.24em;color:#0A2633;font-weight:400;",
    h1:
      "margin:0 0 20px;font-family:'DM Serif Display',Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;font-weight:400;letter-spacing:-0.01em;color:#0A2633;",
    pLead: "margin:0 0 20px;font-size:16px;line-height:1.6;color:#0A2633;",
    p: "margin:0 0 16px;font-size:15px;line-height:1.65;color:#3A3A3A;",
    small: "margin:0 0 8px;font-size:12px;line-height:1.5;color:#888;",
    hr: "border:none;border-top:1px solid #EDE7DB;margin:32px 0 24px;",
    label:
      "margin:20px 0 10px;font-size:12px;line-height:1.4;font-weight:600;color:#0A2633;letter-spacing:0.08em;text-transform:uppercase;",
    ul: "margin:0 0 20px 0;padding:0 0 0 20px;font-size:15px;line-height:1.7;color:#3A3A3A;",
    li: "margin-bottom:4px;",
    link: "color:#2A6F97;text-decoration:underline;",
    strong: "color:#0A2633;font-weight:600;",
    signature:
      "margin:28px 0 0;font-family:'DM Serif Display',Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;color:#0A2633;",
    sigSub:
      "display:block;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:#888;letter-spacing:0.12em;text-transform:uppercase;",
    footer: "text-align:center;padding:28px 0 0;",
    footerLogo: "display:block;margin:0 auto 8px;height:22px;width:auto;opacity:0.55;",
    footerWordmark:
      "display:block;font-family:'DM Serif Display',Georgia,'Times New Roman',serif;font-size:10px;letter-spacing:0.3em;color:#888;font-weight:400;margin-bottom:14px;",
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <title>${welcomeEmailSubject()}</title>
  </head>
  <body style="${t.body}">
    <div style="${t.preheader}">${PREHEADER}</div>
    <div style="${t.wrap}">
      <div style="${t.card}">
        <div style="${t.header}">
          <img src="${logoUrl}" width="64" height="36" alt="MetaOrtho" style="${t.headerLogo}" />
          <span style="${t.wordmark}">METAORTHO</span>
        </div>

        <h1 style="${t.h1}">You're in.</h1>

        <p style="${t.pLead}">Thanks for joining the MetaOrtho waitlist — we're genuinely glad you're here.</p>

        <p style="${t.p}">
          We built this practice around one idea: GLP-1s work, but up to
          <span style="${t.strong}">40% of the weight you lose can be lean tissue</span>,
          and bone density often follows. You've spent years building your strength. You deserve care that protects it.
        </p>

        <p style="${t.p}">
          That's what we're excited to do with you — DEXA scans, targeted labs, and a protocol matched to your risk. No filler. No guesswork.
        </p>

        <p style="${t.label}">What to expect from this list</p>
        <ul style="${t.ul}">
          <li style="${t.li}">1 to 2 short emails a month until we open our doors.</li>
          <li style="${t.li}">No hype. No fake urgency.</li>
          <li style="${t.li}">First word when we start taking patients in your state.</li>
        </ul>

        <p style="${t.p}">
          Already on a GLP-1 and want care now? Book an initial assessment at
          <a href="${site}/book" style="${t.link}">${site.replace(/^https?:\/\//, "")}/book</a>.
        </p>

        <p style="${t.signature}">— ${name}<span style="${t.sigSub}">MetaOrtho</span></p>

        <hr style="${t.hr}" />

        <div style="${t.footer}">
          <img src="${logoUrl}" width="40" height="22" alt="" style="${t.footerLogo}" />
          <span style="${t.footerWordmark}">METAORTHO</span>
          <p style="${t.small}">You're receiving this because ${escapeHtml(email)} joined the MetaOrtho waitlist.</p>
          <p style="${t.small}">
            <a href="${unsubscribeUrl}" style="${t.link}">Unsubscribe</a>
          </p>
          <p style="${t.small}">${escapeHtml(addr)}</p>
        </div>
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
