/**
 * MetaOrtho shared email template.
 *
 * One visual system for every email we send — welcome, broadcasts,
 * state-announcement blasts, whatever. Callers compose an inner body of
 * HTML using the style tokens and component helpers exported here, then
 * wrap it with `renderEmail(...)` which handles the branded header,
 * footer, preheader, and doctype.
 *
 * Design principles (applied from Emil / Impeccable / Taste):
 *   — Cream flows edge-to-edge; no card container.
 *   — DM Serif Display / DM Sans in a strict scale, Georgia/system fallback.
 *   — Navy-tinted grays (not pure black) so neutrals carry the brand cast.
 *   — Hairline rules for section breaks; no shadows or glows.
 *   — One accent color reserved for CTA links.
 *   — Calm, clinical, direct — no exclamation marks, no hype.
 */

// ---- Palette ---------------------------------------------------------------
// Hex values computed from navy (#0A2633) alpha-composited on cream so tones
// carry the brand cast in clients that don't honor rgba().
export const PALETTE = {
  cream: "#FBF8F5",
  ink: "#0A2633", //    headings / strong emphasis
  body: "#475157", //    navy @ 72% on cream — body copy
  muted: "#87939A", //   navy @ 48% — secondary, footer text
  faint: "#BFC6CB", //   navy @ 28% — rarely used
  hair: "#E4E1D9", //    hairline rules
  accent: "#2A6F97", //  links / CTAs
} as const;

// ---- Style tokens ----------------------------------------------------------
// Inline-style strings — most email clients strip <style> blocks.
const FONT_SERIF = "'DM Serif Display',Georgia,'Times New Roman',serif";
const FONT_SANS =
  "'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const styles = {
  body: `margin:0;padding:0;background:${PALETTE.cream};font-family:${FONT_SANS};color:${PALETTE.body};-webkit-font-smoothing:antialiased;`,
  preheader:
    "display:none;visibility:hidden;opacity:0;color:transparent;height:0;width:0;max-height:0;max-width:0;overflow:hidden;mso-hide:all;",
  wrap: "max-width:560px;margin:0 auto;padding:48px 28px 40px;",
  header: "text-align:center;padding:0 0 32px;",
  headerLogo: "display:block;margin:0 auto 12px;height:36px;width:auto;",
  wordmark: `display:block;font-family:${FONT_SERIF};font-size:11px;letter-spacing:0.32em;color:${PALETTE.ink};font-weight:400;`,
  hr: `border:none;border-top:1px solid ${PALETTE.hair};margin:0;`,
  section: "padding:40px 4px 0;",
  eyebrow: `margin:0 0 18px;font-size:10px;line-height:1;font-weight:600;color:${PALETTE.muted};letter-spacing:0.22em;text-transform:uppercase;`,
  h1: `margin:0 0 28px;font-family:${FONT_SERIF};font-size:44px;line-height:1.05;font-weight:400;letter-spacing:-0.03em;color:${PALETTE.ink};`,
  pLead: `margin:0 0 24px;font-size:17px;line-height:1.55;color:${PALETTE.ink};letter-spacing:-0.005em;`,
  p: `margin:0 0 18px;font-size:15px;line-height:1.65;color:${PALETTE.body};letter-spacing:-0.003em;`,
  strong: `color:${PALETTE.ink};font-weight:600;`,
  stepsTable: `width:100%;border-collapse:collapse;margin:0 0 8px;border-left:1px solid ${PALETTE.hair};`,
  stepNum: `padding:10px 20px 10px 18px;vertical-align:top;font-family:${FONT_SERIF};font-size:15px;line-height:1.5;color:${PALETTE.muted};letter-spacing:0.06em;width:32px;`,
  stepText: `padding:10px 0;vertical-align:top;font-size:15px;line-height:1.55;color:${PALETTE.body};`,
  ctaWrapper: `margin:36px 0 0;font-size:17px;line-height:1.5;color:${PALETTE.ink};letter-spacing:-0.005em;`,
  ctaQuestion: `display:block;margin-bottom:6px;color:${PALETTE.body};font-size:15px;line-height:1.5;`,
  ctaLink: `color:${PALETTE.accent};text-decoration:none;border-bottom:1px solid ${PALETTE.accent};font-weight:500;`,
  signature: `margin:44px 0 0;font-family:${FONT_SERIF};font-size:17px;line-height:1.4;color:${PALETTE.ink};`,
  signatureSub: `display:block;margin-top:4px;font-family:${FONT_SANS};font-size:11px;color:${PALETTE.muted};letter-spacing:0.18em;text-transform:uppercase;font-weight:500;`,
  footer: "padding:40px 4px 0;text-align:center;",
  footerLogo: "display:block;margin:0 auto 10px;height:20px;width:auto;opacity:0.42;",
  footerWordmark: `display:block;font-family:${FONT_SERIF};font-size:9px;letter-spacing:0.36em;color:${PALETTE.muted};font-weight:400;margin-bottom:22px;`,
  small: `margin:0 0 6px;font-size:11px;line-height:1.6;color:${PALETTE.muted};`,
  footerLink: `color:${PALETTE.muted};text-decoration:underline;`,
} as const;

// ---- Component helpers -----------------------------------------------------

/**
 * Render a numbered step rail (01 / 02 / 03 …) with a hairline left border.
 * Pass pre-escaped text — callers may include &mdash;, &rsquo;, etc.
 */
export function renderSteps(steps: string[]): string {
  const rows = steps
    .map((text, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `          <tr>
            <td style="${styles.stepNum}">${num}</td>
            <td style="${styles.stepText}">${text}</td>
          </tr>`;
    })
    .join("\n");
  return `        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="${styles.stepsTable}">
${rows}
        </table>`;
}

/** Render a CTA block — optional question + text-link with trailing arrow. */
export function renderCta(opts: {
  question?: string;
  href: string;
  label: string;
}): string {
  const q = opts.question
    ? `<span style="${styles.ctaQuestion}">${opts.question}</span>`
    : "";
  return `        <p style="${styles.ctaWrapper}">${q}<a href="${opts.href}" style="${styles.ctaLink}">${opts.label} &rarr;</a></p>`;
}

/** Render a signature block — "— Name" in serif with optional small-caps subtitle. */
export function renderSignature(opts: { name: string; subtitle?: string }): string {
  const sub = opts.subtitle
    ? `<span style="${styles.signatureSub}">${opts.subtitle}</span>`
    : "";
  return `        <p style="${styles.signature}">&mdash; ${opts.name}${sub}</p>`;
}

// ---- Top-level wrapper -----------------------------------------------------

export type EmailInputs = {
  /** Used only inside &lt;title&gt; — separate from the Resend subject line. */
  subject: string;
  /** Hidden inbox-preview text. */
  preheader: string;
  /** Tiny uppercase label above the h1, e.g. "WELCOME" or "ANNOUNCEMENT". */
  eyebrow?: string;
  /** The h1 — e.g. "You&rsquo;re in." */
  heading: string;
  /** Raw HTML body — composed by the caller using `styles` + component helpers. */
  body: string;
  /**
   * Pass when sending a per-recipient transactional email. Omit for broadcasts
   * (Resend Broadcasts append their own List-Unsubscribe + physical address).
   */
  footer?: {
    recipientEmail: string;
    unsubscribeUrl: string;
  };
};

/** Wrap an email body with the branded header, footer, preheader, and doctype. */
export function renderEmail(inputs: EmailInputs): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.org";
  const addr = process.env.WAITLIST_MAILING_ADDR || "[Mailing address placeholder]";
  const logoUrl = `${site}/images/mo-logo.png`;

  const eyebrowBlock = inputs.eyebrow
    ? `        <p style="${styles.eyebrow}">${inputs.eyebrow}</p>\n`
    : "";

  const recipientFooter = inputs.footer
    ? `        <p style="${styles.small}">You&rsquo;re receiving this because ${escapeHtml(inputs.footer.recipientEmail)} joined the MetaOrtho waitlist.</p>
        <p style="${styles.small}"><a href="${inputs.footer.unsubscribeUrl}" style="${styles.footerLink}">Unsubscribe</a> &nbsp;&middot;&nbsp; ${escapeHtml(addr)}</p>
`
    : `        <p style="${styles.small}">${escapeHtml(addr)}</p>
`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <title>${inputs.subject}</title>
  </head>
  <body style="${styles.body}">
    <div style="${styles.preheader}">${inputs.preheader}</div>
    <div style="${styles.wrap}">

      <div style="${styles.header}">
        <img src="${logoUrl}" width="64" height="36" alt="MetaOrtho" style="${styles.headerLogo}" />
        <span style="${styles.wordmark}">METAORTHO</span>
      </div>

      <hr style="${styles.hr}" />

      <div style="${styles.section}">
${eyebrowBlock}        <h1 style="${styles.h1}">${inputs.heading}</h1>

${inputs.body}
      </div>

      <div style="padding-top:48px;">
        <hr style="${styles.hr}" />
      </div>

      <div style="${styles.footer}">
        <img src="${logoUrl}" width="36" height="20" alt="" style="${styles.footerLogo}" />
        <span style="${styles.footerWordmark}">METAORTHO</span>
${recipientFooter}      </div>

    </div>
  </body>
</html>`;
}

// ---- Utilities -------------------------------------------------------------

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
