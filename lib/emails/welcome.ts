/**
 * MetaOrtho waitlist welcome email.
 *
 * Design principles (Emil · Impeccable · Taste):
 *   — No card container. Cream (#FBF8F5) flows edge-to-edge.
 *   — Typography does the work: DM Serif Display / DM Sans in a strict
 *     scale, navy-tinted grays, hairline dividers (no shadows or glows).
 *   — Rhythm over ornament: 8/16/24/32px spacing, 560px content column,
 *     body lines cap near 65ch.
 *   — One accent (blue #2A6F97) reserved for the link CTA.
 *   — Tone: calm, clinical, direct. No exclamation marks, no hype.
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
    `────────────`,
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
    `WHAT TO EXPECT`,
    ``,
    `  01   A short note from us, 1 to 2 times a month.`,
    `  02   No hype. No fake urgency.`,
    `  03   First word when we open in your state.`,
    ``,
    `Already on a GLP-1?`,
    `Book your initial assessment → ${site}/book`,
    ``,
    `— ${name}`,
    `  MetaOrtho`,
    ``,
    `────────────`,
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
  const bookUrl = `${site}/book`;

  // Palette — hex values computed from navy (#0A2633) alpha-composited
  // against cream (#FBF8F5), so gray tones carry the brand's navy cast
  // in clients that don't honor rgba().
  const c = {
    cream: "#FBF8F5",
    ink: "#0A2633",      // headings
    body: "#475157",     // navy @ 72% on cream
    muted: "#87939A",    // navy @ 48%
    faint: "#BFC6CB",    // navy @ 28%
    hair: "#E4E1D9",     // hairline rule
    accent: "#2A6F97",   // links, single accent
  };

  // Inline styles only — most email clients strip <style> blocks.
  const t = {
    body: `margin:0;padding:0;background:${c.cream};font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${c.body};-webkit-font-smoothing:antialiased;`,
    preheader:
      "display:none;visibility:hidden;opacity:0;color:transparent;height:0;width:0;max-height:0;max-width:0;overflow:hidden;mso-hide:all;",
    wrap: "max-width:560px;margin:0 auto;padding:48px 28px 40px;",
    header: "text-align:center;padding:0 0 32px;",
    headerLogo: "display:block;margin:0 auto 12px;height:36px;width:auto;",
    wordmark: `display:block;font-family:'DM Serif Display',Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:0.32em;color:${c.ink};font-weight:400;`,
    hr: `border:none;border-top:1px solid ${c.hair};margin:0;`,
    section: "padding:40px 4px 0;",
    eyebrow: `margin:0 0 18px;font-size:10px;line-height:1;font-weight:600;color:${c.muted};letter-spacing:0.22em;text-transform:uppercase;`,
    h1: `margin:0 0 28px;font-family:'DM Serif Display',Georgia,'Times New Roman',serif;font-size:44px;line-height:1.05;font-weight:400;letter-spacing:-0.03em;color:${c.ink};`,
    pLead: `margin:0 0 24px;font-size:17px;line-height:1.55;color:${c.ink};letter-spacing:-0.005em;`,
    p: `margin:0 0 18px;font-size:15px;line-height:1.65;color:${c.body};letter-spacing:-0.003em;`,
    strong: `color:${c.ink};font-weight:600;`,
    stepsTable:
      "width:100%;border-collapse:collapse;margin:0 0 8px;border-left:1px solid #E4E1D9;",
    stepNum: `padding:10px 20px 10px 18px;vertical-align:top;font-family:'DM Serif Display',Georgia,'Times New Roman',serif;font-size:15px;line-height:1.5;color:${c.muted};letter-spacing:0.06em;width:32px;`,
    stepText: `padding:10px 0;vertical-align:top;font-size:15px;line-height:1.55;color:${c.body};`,
    cta: `margin:36px 0 0;font-size:17px;line-height:1.5;color:${c.ink};letter-spacing:-0.005em;`,
    ctaLink: `color:${c.accent};text-decoration:none;border-bottom:1px solid ${c.accent};font-weight:500;`,
    ctaQuestion: `display:block;margin-bottom:6px;color:${c.body};font-size:15px;line-height:1.5;`,
    signature: `margin:44px 0 0;font-family:'DM Serif Display',Georgia,'Times New Roman',serif;font-size:17px;line-height:1.4;color:${c.ink};`,
    signatureSub: `display:block;margin-top:4px;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;color:${c.muted};letter-spacing:0.18em;text-transform:uppercase;font-weight:500;`,
    footer: "padding:40px 4px 0;text-align:center;",
    footerLogo: "display:block;margin:0 auto 10px;height:20px;width:auto;opacity:0.42;",
    footerWordmark: `display:block;font-family:'DM Serif Display',Georgia,'Times New Roman',serif;font-size:9px;letter-spacing:0.36em;color:${c.muted};font-weight:400;margin-bottom:22px;`,
    small: `margin:0 0 6px;font-size:11px;line-height:1.6;color:${c.muted};`,
    footerLink: `color:${c.muted};text-decoration:underline;`,
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

      <div style="${t.header}">
        <img src="${logoUrl}" width="64" height="36" alt="MetaOrtho" style="${t.headerLogo}" />
        <span style="${t.wordmark}">METAORTHO</span>
      </div>

      <hr style="${t.hr}" />

      <div style="${t.section}">
        <p style="${t.eyebrow}">Welcome</p>
        <h1 style="${t.h1}">You&rsquo;re in.</h1>

        <p style="${t.pLead}">Thanks for joining the MetaOrtho waitlist &mdash; we&rsquo;re genuinely glad you&rsquo;re here.</p>

        <p style="${t.p}">
          We built this practice around one idea: GLP-1s work, but up to
          <span style="${t.strong}">40% of the weight you lose can be lean tissue</span>,
          and bone density often follows. You&rsquo;ve spent years building your strength. You deserve care that protects it.
        </p>

        <p style="${t.p}">
          That&rsquo;s what we&rsquo;re excited to do with you &mdash; DEXA scans, targeted labs, and a protocol matched to your risk. No filler. No guesswork.
        </p>
      </div>

      <div style="${t.section}">
        <p style="${t.eyebrow}">What to expect</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="${t.stepsTable}">
          <tr>
            <td style="${t.stepNum}">01</td>
            <td style="${t.stepText}">A short note from us, 1 to 2 times a month.</td>
          </tr>
          <tr>
            <td style="${t.stepNum}">02</td>
            <td style="${t.stepText}">No hype. No fake urgency.</td>
          </tr>
          <tr>
            <td style="${t.stepNum}">03</td>
            <td style="${t.stepText}">First word when we open in your state.</td>
          </tr>
        </table>
      </div>

      <div style="${t.section}">
        <p style="${t.cta}">
          <span style="${t.ctaQuestion}">Already on a GLP-1 and want care now?</span>
          <a href="${bookUrl}" style="${t.ctaLink}">Book your initial assessment &rarr;</a>
        </p>

        <p style="${t.signature}">&mdash; ${name}<span style="${t.signatureSub}">MetaOrtho</span></p>
      </div>

      <div style="padding-top:48px;">
        <hr style="${t.hr}" />
      </div>

      <div style="${t.footer}">
        <img src="${logoUrl}" width="36" height="20" alt="" style="${t.footerLogo}" />
        <span style="${t.footerWordmark}">METAORTHO</span>
        <p style="${t.small}">You&rsquo;re receiving this because ${escapeHtml(email)} joined the MetaOrtho waitlist.</p>
        <p style="${t.small}"><a href="${unsubscribeUrl}" style="${t.footerLink}">Unsubscribe</a> &nbsp;&middot;&nbsp; ${escapeHtml(addr)}</p>
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
