/**
 * MetaOrtho welcome email — Email 1 of 3 in the waitlist welcome series.
 *
 * Fires immediately on signup (transactional from /api/waitlist; Emails 2 and 3
 * land via the Resend Automation triggered by audience-add). Opens the
 * four-pillar framing (muscle / bone / joint / nutrition) that Emails 2 and 3
 * develop further.
 *
 * Env:
 *   WAITLIST_FROM_NAME      e.g. "Dr. Jay Saenz"
 *   WAITLIST_FROM_EMAIL     must be on a verified Resend domain
 *   WAITLIST_MAILING_ADDR   CAN-SPAM physical address
 *   NEXT_PUBLIC_SITE_URL    e.g. "https://metaortho.com"
 */

import {
  renderEmail,
  renderSteps,
  renderCta,
  renderSignature,
  renderPillarRow,
  renderPortrait,
  renderSectionBreak,
  fromAddress,
  replyToAddress,
  ICONS,
  styles,
} from "./template";

type TemplateInputs = {
  email: string;
  unsubscribeUrl: string;
};

const SUBJECT = "GLP-1 Care: You're in — here's what we'll do together";
const PREHEADER =
  "The part of GLP-1 weight loss most programs don't protect.";

export function welcomeEmailSubject(): string {
  return SUBJECT;
}

export function welcomeEmailFrom(): string {
  return fromAddress();
}

export function welcomeEmailReplyTo(): string {
  return replyToAddress();
}

export function welcomeEmailText(inputs?: TemplateInputs): string {
  const addr =
    process.env.WAITLIST_MAILING_ADDR || "[Mailing address placeholder]";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.com";
  // Body signature is always the physician. The From-header brand name lives
  // in WAITLIST_FROM_NAME (currently "MetaOrtho") so the inbox label reads as
  // a brand while the letter reads as a person.
  const name = "Dr. Jay Saenz";

  const recipientFooter = inputs
    ? [
        `────────────`,
        `You're receiving this because ${inputs.email} joined the MetaOrtho waitlist.`,
        `Unsubscribe: ${inputs.unsubscribeUrl}`,
        ``,
        `MetaOrtho is a physician-led telemedicine practice`,
        `protecting bone, muscle, joint, and nutrition health for GLP-1 patients.`,
        `Privacy: ${site}/privacy`,
        `${addr}`,
      ]
    : [
        `────────────`,
        `MetaOrtho is a physician-led telemedicine practice`,
        `protecting bone, muscle, joint, and nutrition health for GLP-1 patients.`,
        `${addr}`,
      ];

  return [
    `METAORTHO`,
    `────────────`,
    ``,
    `You're in.`,
    ``,
    `Thanks for joining the MetaOrtho waitlist — I'm glad you're here.`,
    ``,
    `We built this practice around one idea: GLP-1s work, but as much as 40%`,
    `of the weight you lose can be lean tissue, and bone density often follows.`,
    `You've spent years building your strength. You deserve care that protects it.`,
    ``,
    `That's what we do — across four areas your prescriber usually isn't measuring:`,
    ``,
    `   MUSCLE   ·   BONE   ·   JOINT   ·   NUTRITION`,
    ``,
    `A DEXA scan, targeted labs, a 30-minute visit, and a protocol matched to`,
    `your risk. No filler, no guesswork.`,
    ``,
    `────────────`,
    ``,
    `WHAT TO EXPECT`,
    ``,
    `  01   A short note from us, 1 to 2 times a month.`,
    `  02   No hype. No fake urgency.`,
    `  03   First word when we open in your state.`,
    ``,
    `────────────`,
    ``,
    `Already on a GLP-1 and in a state we serve?`,
    `  →  Book your $149 initial assessment: ${site}/book`,
    `  →  Or take our free 5-minute risk quiz: ${site}/quiz`,
    ``,
    `────────────`,
    ``,
    `— ${name}`,
    `  [Orthopedic surgeon, board-certified]`,
    `  Medical Director, MetaOrtho`,
    ``,
    ...recipientFooter,
  ].join("\n");
}

export function welcomeEmailHtml(inputs?: TemplateInputs): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.com";
  // Body signature is always the physician. The From-header brand name lives
  // in WAITLIST_FROM_NAME (currently "MetaOrtho") so the inbox label reads as
  // a brand while the letter reads as a person.
  const name = "Dr. Jay Saenz";
  // TODO: confirm URL — directive suggests /assessment; current live route is /book.
  const assessmentUrl = `${site}/book`;
  // TODO: confirm /quiz route exists.
  const quizUrl = `${site}/quiz`;
  const portraitUrl = `${site}/images/dr-saenz.jpg`;

  const body = `        <p style="${styles.pLead}">Thanks for joining the MetaOrtho waitlist &mdash; I&rsquo;m glad you&rsquo;re here.</p>

        <p style="${styles.p}">
          We built this practice around one idea: GLP-1s work, but
          <span style="${styles.strong}">as much as 40% of the weight you lose can be lean tissue</span>,
          and bone density often follows. You&rsquo;ve spent years building your strength. You deserve care that protects it.
        </p>

        <p style="${styles.p}">
          That&rsquo;s what we do &mdash; across four areas your prescriber usually isn&rsquo;t measuring:
        </p>

${renderPillarRow([
  { icon: ICONS.muscle, label: "Muscle" },
  { icon: ICONS.bone, label: "Bone" },
  { icon: ICONS.joint, label: "Joint" },
  { icon: ICONS.nutrition, label: "Nutrition" },
])}

        <p style="${styles.p}">
          A DEXA scan, targeted labs, a 30-minute visit, and a protocol matched to your risk. No filler, no guesswork.
        </p>
${renderSectionBreak()}
        <p style="${styles.eyebrow}">What to expect</p>
${renderSteps([
  "A short note from us, 1 to 2 times a month.",
  "No hype. No fake urgency.",
  "First word when we open in your state.",
])}
${renderSectionBreak()}
${renderCta({
  question: "Already on a GLP-1 and in a state we serve?",
  href: assessmentUrl,
  label: "Book your $149 initial assessment",
})}
${renderCta({
  href: quizUrl,
  label: "Or take our free 5-minute risk quiz",
  tight: true,
})}
${renderSectionBreak()}
${renderSignature({
  name,
  // NOTE: brackets on the credentials line are visible on purpose during review —
  // directive: "leave the brackets and the TODO comment; the user will confirm".
  // Strip the brackets once the exact credentials wording is approved.
  // TODO: confirm credentials line
  subtitle: [
    "[Orthopedic surgeon, board-certified]",
    "Medical Director, MetaOrtho",
  ],
})}
${renderPortrait({
  src: portraitUrl,
  alt: "Dr. Jay Saenz, Medical Director of MetaOrtho",
  size: 80,
})}`;

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
