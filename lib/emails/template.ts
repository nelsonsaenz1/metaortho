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
  // Tight variant for a second CTA stacked under a primary — closer rhythm, same feel.
  ctaWrapperTight: `margin:14px 0 0;font-size:17px;line-height:1.5;color:${PALETTE.ink};letter-spacing:-0.005em;`,
  ctaQuestion: `display:block;margin-bottom:6px;color:${PALETTE.body};font-size:15px;line-height:1.5;`,
  ctaLink: `color:${PALETTE.accent};text-decoration:none;border-bottom:1px solid ${PALETTE.accent};font-weight:500;`,
  signature: `margin:44px 0 0;font-family:${FONT_SERIF};font-size:17px;line-height:1.4;color:${PALETTE.ink};`,
  signatureSub: `display:block;margin-top:4px;font-family:${FONT_SANS};font-size:11px;color:${PALETTE.muted};letter-spacing:0.18em;text-transform:uppercase;font-weight:500;`,
  footer: "padding:40px 4px 0;text-align:center;",
  footerLogo: "display:block;margin:0 auto 10px;height:20px;width:auto;opacity:0.42;",
  footerWordmark: `display:block;font-family:${FONT_SERIF};font-size:9px;letter-spacing:0.36em;color:${PALETTE.muted};font-weight:400;margin-bottom:22px;`,
  small: `margin:0 0 6px;font-size:11px;line-height:1.6;color:${PALETTE.muted};`,
  footerLink: `color:${PALETTE.muted};text-decoration:underline;`,
  // Pillar row — Email 1's "four areas your prescriber isn't measuring".
  pillarTable: "width:100%;max-width:480px;margin:8px auto 20px;border-collapse:collapse;",
  pillarCell: "padding:14px 8px 0;text-align:center;vertical-align:top;",
  pillarIcon: `display:block;margin:0 auto 10px;color:${PALETTE.muted};width:28px;height:28px;`,
  pillarLabel: `display:block;margin:0;font-size:10px;line-height:1;font-weight:500;color:${PALETTE.muted};letter-spacing:0.22em;text-transform:uppercase;`,
  // Pillar blocks — Email 2's labeled numbered rail with multi-line bodies.
  pillarBlockNum: `padding:22px 20px 22px 18px;vertical-align:top;font-family:${FONT_SERIF};font-size:15px;line-height:1.5;color:${PALETTE.muted};letter-spacing:0.06em;width:44px;`,
  pillarBlockText: "padding:22px 0;vertical-align:top;",
  pillarBlockLabel: `margin:0 0 8px;font-size:11px;line-height:1.2;font-weight:600;color:${PALETTE.ink};letter-spacing:0.22em;text-transform:uppercase;`,
  pillarBlockBody: `margin:0;font-size:15px;line-height:1.65;color:${PALETTE.body};letter-spacing:-0.003em;`,
  // Portrait — below signature on Email 1 + 3.
  portraitWrap: "margin:28px 0 0;",
  portraitImg: `display:block;border-radius:50%;border:1px solid ${PALETTE.hair};`,
  // Postscript — Email 3 only.
  postscript: `margin:32px 0 0;font-size:15px;line-height:1.65;color:${PALETTE.body};letter-spacing:-0.003em;`,
  // Footer — richer mission + utility lines used by every email in the series.
  missionSmall: `max-width:400px;margin:0 auto 14px;font-size:11px;line-height:1.6;color:${PALETTE.muted};`,
  utilsSmall: `max-width:420px;margin:0 auto;font-size:11px;line-height:1.6;color:${PALETTE.muted};`,
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

/**
 * Render a CTA block — optional question + text-link with trailing arrow.
 * `tight: true` uses a smaller top margin — pair a primary CTA (default) with
 * a subordinate `{ tight: true }` follow-up to stack two related links.
 */
export function renderCta(opts: {
  question?: string;
  href: string;
  label: string;
  tight?: boolean;
}): string {
  const wrapper = opts.tight ? styles.ctaWrapperTight : styles.ctaWrapper;
  const q = opts.question
    ? `<span style="${styles.ctaQuestion}">${opts.question}</span>`
    : "";
  return `        <p style="${wrapper}">${q}<a href="${escapeHtml(opts.href)}" style="${styles.ctaLink}">${opts.label} &rarr;</a></p>`;
}

/**
 * Render a signature block — "— Name" in serif with optional small-caps subtitle(s).
 * Pass a string for a single subtitle line or an array for stacked lines (each item
 * renders as its own block — the `signatureSub` token already has `display:block`).
 */
export function renderSignature(opts: {
  name: string;
  subtitle?: string | string[];
}): string {
  const subs = opts.subtitle
    ? Array.isArray(opts.subtitle)
      ? opts.subtitle
      : [opts.subtitle]
    : [];
  const sub = subs
    .map((s) => `<span style="${styles.signatureSub}">${s}</span>`)
    .join("");
  return `        <p style="${styles.signature}">&mdash; ${opts.name}${sub}</p>`;
}

// ---- Extended helpers for the welcome series ------------------------------

/**
 * Render a pillar row — four equally-spaced icon+label cells.
 * Used in Email 1 to visualize the four areas a GLP-1 prescriber usually
 * isn't measuring (muscle, bone, joint, nutrition). Cells use `width:25%` so
 * the row evenly fills up to `pillarTable`'s max-width. On narrow mobile the
 * table wraps where the client allows — with `table-layout:auto` + fixed cell
 * widths, Gmail/Apple Mail keep all four on one row down to ~480px, then wrap.
 */
export function renderPillarRow(
  pillars: { icon: string; label: string }[]
): string {
  const cells = pillars
    .map(
      ({ icon, label }) => `            <td style="${styles.pillarCell}" width="25%" align="center" valign="top">
              ${icon}
              <span style="${styles.pillarLabel}">${label}</span>
            </td>`
    )
    .join("\n");
  return `        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="${styles.pillarTable}">
          <tr>
${cells}
          </tr>
        </table>`;
}

/**
 * Render a labeled numbered rail — "01  MUSCLE\\n  body copy…".
 * A denser variant of `renderSteps` used in Email 2's "THE FOUR PILLARS"
 * section and in Email 3's "WHAT THAT LOOKS LIKE" block. Reuses the same
 * `stepsTable` hairline so the visual rhythm matches Email 1's step rail.
 */
export function renderPillarBlocks(
  blocks: { label: string; body: string }[]
): string {
  const rows = blocks
    .map(({ label, body }, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `          <tr>
            <td style="${styles.pillarBlockNum}">${num}</td>
            <td style="${styles.pillarBlockText}">
              <p style="${styles.pillarBlockLabel}">${label}</p>
              <p style="${styles.pillarBlockBody}">${body}</p>
            </td>
          </tr>`;
    })
    .join("\n");
  return `        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="${styles.stepsTable}">
${rows}
        </table>`;
}

/**
 * Render a round-cropped portrait with a hairline border.
 * Sits below the signature on Emails 1 and 3. Square source (e.g. 900×900 JPEG)
 * → `border-radius:50%` clips it to a circle in every email client that honors
 * border-radius (Gmail, Apple Mail, Outlook.com). Desktop Outlook will show a
 * square — acceptable given the low share and the hairline-only styling.
 */
export function renderPortrait(opts: {
  src: string;
  alt: string;
  size?: number;
}): string {
  const size = opts.size ?? 80;
  return `        <div style="${styles.portraitWrap}">
          <img src="${escapeHtml(opts.src)}" width="${size}" height="${size}" alt="${escapeHtml(opts.alt)}" style="${styles.portraitImg}" />
        </div>`;
}

/** Render a P.S. paragraph — body-text weight, generous top margin. */
export function renderPostscript(text: string): string {
  return `        <p style="${styles.postscript}">${text}</p>`;
}

/**
 * Close the current body section, render a hairline separator, and open a new
 * body section — used between content blocks when the directive calls for a
 * visible rule. Drop it *between* content blocks (e.g. between a `renderSteps`
 * and a `renderCta`); don't use it before the very first block or after the
 * last (renderEmail adds the final before-footer rule for you).
 */
export function renderSectionBreak(): string {
  return `      </div>

      <div style="padding-top:40px;">
        <hr style="${styles.hr}" />
      </div>

      <div style="${styles.section}">`;
}

/**
 * Inline SVG pillar icons — 28×28 viewBox, 1.5px stroke, `currentColor`.
 * Inline markup (not <img src>) so there's no external fetch and no broken-image
 * placeholder if the CDN lags. Alt-less by design; the label below each icon
 * carries the meaning. `aria-hidden="true"` so screen readers skip them.
 */
export const ICONS = {
  // Muscle — minimal dumbbell silhouette (two weights, handle).
  muscle: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="${styles.pillarIcon}"><path d="M4 9v6M7 6v12M17 6v12M20 9v6M7 12h10"/></svg>`,
  // Bone — "dog bone" as four lobes + shaft.
  bone: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="${styles.pillarIcon}"><circle cx="6" cy="9" r="2"/><circle cx="6" cy="15" r="2"/><circle cx="18" cy="9" r="2"/><circle cx="18" cy="15" r="2"/><path d="M8 12h8"/></svg>`,
  // Joint — two touching circles suggesting articulation.
  joint: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" style="${styles.pillarIcon}"><circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/></svg>`,
  // Nutrition — apple silhouette with stem + leaf.
  nutrition: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="${styles.pillarIcon}"><path d="M12 8c-4 0-6 3-6 7 0 3 2 5 4 5 1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 4-2 4-5 0-4-2-7-6-7z"/><path d="M12 8V6"/><path d="M12 6c1-2 3-2 4-2-.5 2-2 3-4 2z"/></svg>`,
} as const;

// ---- Shared from/replyTo helpers for any email in the series --------------

/** Build the `From:` header from `WAITLIST_FROM_NAME` + `WAITLIST_FROM_EMAIL`. */
export function fromAddress(): string {
  const name = process.env.WAITLIST_FROM_NAME || "Dr. Jay Saenz";
  const address = process.env.WAITLIST_FROM_EMAIL || "hello@metaortho.com";
  return `${name} <${address}>`;
}

/** `Reply-To:` header — the plain address, no display name. */
export function replyToAddress(): string {
  return process.env.WAITLIST_FROM_EMAIL || "hello@metaortho.com";
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
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.com";
  const addr = process.env.WAITLIST_MAILING_ADDR || "[Mailing address placeholder]";
  const logoUrl = `${site}/images/mo-logo.png`;

  const eyebrowBlock = inputs.eyebrow
    ? `        <p style="${styles.eyebrow}">${inputs.eyebrow}</p>\n`
    : "";

  // Mission + privacy + mailing address appear on every email in the series.
  const privacyUrl = `${site}/privacy`; // TODO: confirm /privacy page exists
  const missionLine = `        <p style="${styles.missionSmall}">MetaOrtho is a physician-led telemedicine practice protecting bone, muscle, joint, and nutrition health for GLP-1 patients.</p>\n`;
  const recipientLine = inputs.footer
    ? `        <p style="${styles.small}">You&rsquo;re receiving this because ${escapeHtml(inputs.footer.recipientEmail)} joined the MetaOrtho waitlist.</p>\n`
    : "";
  // Transactional sends pass the real per-recipient URL; broadcast / automation
  // sends fall back to Resend's `{{{RESEND_UNSUBSCRIBE_URL}}}` placeholder, which
  // Resend substitutes at delivery time (one-click unsubscribe compliant).
  const unsubUrl = inputs.footer?.unsubscribeUrl || "{{{RESEND_UNSUBSCRIBE_URL}}}";
  const utilsLine = `        <p style="${styles.utilsSmall}"><a href="${escapeHtml(unsubUrl)}" style="${styles.footerLink}">Unsubscribe</a> &nbsp;&middot;&nbsp; <a href="${escapeHtml(privacyUrl)}" style="${styles.footerLink}">Privacy</a> &nbsp;&middot;&nbsp; ${escapeHtml(addr)}</p>\n`;

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
${missionLine}${recipientLine}${utilsLine}      </div>

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
