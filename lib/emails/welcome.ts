/**
 * MetaOrtho waitlist welcome email.
 *
 * Composes the shared branded template in `./template` with content
 * specific to the first-touch welcome flow. Tone is calm, clinical,
 * direct — no exclamation marks, no hype.
 *
 * Env:
 *   WAITLIST_FROM_NAME      e.g. "Dr. Jay Saenz"
 *   WAITLIST_FROM_EMAIL     must be on a verified Resend domain
 *   WAITLIST_MAILING_ADDR   CAN-SPAM physical address
 *   NEXT_PUBLIC_SITE_URL    e.g. "https://metaortho.org"
 */

import {
  renderEmail,
  renderSteps,
  renderCta,
  renderSignature,
  styles,
} from "./template";

/**
 * Recipient-specific context for transactional sends. Omit when rendering
 * for a Resend Broadcast — the Broadcast footer is auto-generated per
 * subscriber and the per-recipient "you're receiving this because" line
 * doesn't fit the bulk context.
 */
type TemplateInputs = {
  email: string;
  unsubscribeUrl: string;
};

const SUBJECT = "You're in — here's what we'll do together.";
const PREHEADER =
  "Protecting muscle, bone, and joint strength while the scale comes down.";

export function welcomeEmailSubject() {
  return SUBJECT;
}

export function welcomeEmailFrom() {
  const name = process.env.WAITLIST_FROM_NAME || "Dr. Jay Saenz";
  const address = process.env.WAITLIST_FROM_EMAIL || "hello@metaortho.org";
  return `${name} <${address}>`;
}

export function welcomeEmailReplyTo() {
  return process.env.WAITLIST_FROM_EMAIL || "hello@metaortho.org";
}

export function welcomeEmailText(inputs?: TemplateInputs): string {
  const addr = process.env.WAITLIST_MAILING_ADDR || "[Mailing address placeholder]";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.org";
  const name = process.env.WAITLIST_FROM_NAME || "Dr. Jay Saenz";

  const recipientFooter = inputs
    ? [
        `────────────`,
        `You're receiving this because ${inputs.email} joined the MetaOrtho waitlist.`,
        `Unsubscribe: ${inputs.unsubscribeUrl}`,
        ``,
        `MetaOrtho`,
        `${addr}`,
      ]
    : [
        `────────────`,
        `MetaOrtho`,
        `${addr}`,
      ];

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
    ...recipientFooter,
  ].join("\n");
}

export function welcomeEmailHtml(inputs?: TemplateInputs): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.org";
  const name = process.env.WAITLIST_FROM_NAME || "Dr. Jay Saenz";
  const bookUrl = `${site}/book`;

  const body = `        <p style="${styles.pLead}">Thanks for joining the MetaOrtho waitlist &mdash; we&rsquo;re genuinely glad you&rsquo;re here.</p>

        <p style="${styles.p}">
          We built this practice around one idea: GLP-1s work, but up to
          <span style="${styles.strong}">40% of the weight you lose can be lean tissue</span>,
          and bone density often follows. You&rsquo;ve spent years building your strength. You deserve care that protects it.
        </p>

        <p style="${styles.p}">
          That&rsquo;s what we&rsquo;re excited to do with you &mdash; DEXA scans, targeted labs, and a protocol matched to your risk. No filler. No guesswork.
        </p>
      </div>

      <div style="${styles.section}">
        <p style="${styles.eyebrow}">What to expect</p>
${renderSteps([
  "A short note from us, 1 to 2 times a month.",
  "No hype. No fake urgency.",
  "First word when we open in your state.",
])}
      </div>

      <div style="${styles.section}">
${renderCta({
  question: "Already on a GLP-1 and want care now?",
  href: bookUrl,
  label: "Book your initial assessment",
})}

${renderSignature({ name, subtitle: "MetaOrtho" })}`;

  return renderEmail({
    subject: SUBJECT,
    preheader: PREHEADER,
    eyebrow: "Welcome",
    heading: "You&rsquo;re in.",
    body,
    footer: inputs
      ? { recipientEmail: inputs.email, unsubscribeUrl: inputs.unsubscribeUrl }
      : undefined,
  });
}
