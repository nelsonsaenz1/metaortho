/**
 * MetaOrtho welcome series — Email 3 of 3: "The story".
 *
 * Fires 2 days after Email 2 (i.e. 4 days after signup) via the Resend
 * Automation. Closes the series on a founder-voice note explaining why
 * MetaOrtho exists and how the $149 assessment is structured.
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
  renderPortrait,
  renderPostscript,
  renderSectionBreak,
  fromAddress,
  replyToAddress,
  styles,
} from "./template";

type TemplateInputs = {
  email: string;
  unsubscribeUrl: string;
};

const SUBJECT = "GLP-1 Care: Why MetaOrtho exists";
const PREHEADER =
  "One orthopedic finding. Five years. A growing patient population.";

export function seriesTwoSubject(): string {
  return SUBJECT;
}

export function seriesTwoFrom(): string {
  return fromAddress();
}

export function seriesTwoReplyTo(): string {
  return replyToAddress();
}

export function seriesTwoText(inputs?: TemplateInputs): string {
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
    `THE STORY`,
    ``,
    `Why MetaOrtho exists.`,
    ``,
    `A few years ago, as GLP-1 prescribing exploded, something quieter was`,
    `happening underneath it:`,
    ``,
    `Patients were losing weight — and also losing strength. And bone density.`,
    `And often, not knowing it.`,
    ``,
    `The data caught up in 2026. Orthopedic research published through the AAOS`,
    `pointed to meaningfully elevated osteoporosis risk, gout incidence, and`,
    `lean-mass loss in long-term GLP-1 users — the kind of changes that don't`,
    `show up on a scale, and don't show up in a six-month visit with your`,
    `prescriber.`,
    ``,
    `That's the gap we built MetaOrtho to close. Not to compete with your`,
    `GLP-1 program. To run alongside it. You keep your prescriber. We handle`,
    `the part they don't have the time or tools for.`,
    ``,
    `────────────`,
    ``,
    `WHAT THAT LOOKS LIKE`,
    ``,
    `  01   A DEXA scan — baseline bone density and body composition.`,
    `  02   Targeted labs — vitamin D, calcium, metabolic panel.`,
    `  03   A 30-minute visit with your orthopedic team.`,
    `  04   A plan personalized to your risk, not a template.`,
    ``,
    `One price: $149. No subscription required to start.`,
    ``,
    `────────────`,
    ``,
    `  →  Start your $149 assessment: ${site}/book`,
    `  →  Or take the free 5-minute risk quiz first: ${site}/quiz`,
    ``,
    `────────────`,
    ``,
    `— ${name}`,
    `  [Orthopedic surgeon, board-certified]`,
    `  Medical Director, MetaOrtho`,
    ``,
    `P.S. If you're not sure whether any of this applies to you yet, the`,
    `5-minute risk quiz is the lowest-effort way to find out. It's free`,
    `and it's honest.`,
    ``,
    ...recipientFooter,
  ].join("\n");
}

export function seriesTwoHtml(inputs?: TemplateInputs): string {
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

  const body = `        <p style="${styles.pLead}">A few years ago, as GLP-1 prescribing exploded, something quieter was happening underneath it:</p>

        <p style="${styles.p}">
          Patients were losing weight &mdash; and also losing strength. And bone density. And often, not knowing it.
        </p>

        <p style="${styles.p}">
          The data caught up in 2026. Orthopedic research published through the AAOS pointed to meaningfully elevated osteoporosis risk, gout incidence, and lean-mass loss in long-term GLP-1 users &mdash; the kind of changes that don&rsquo;t show up on a scale, and don&rsquo;t show up in a six-month visit with your prescriber.
        </p>

        <p style="${styles.p}">
          That&rsquo;s the gap we built MetaOrtho to close. Not to compete with your GLP-1 program. To run alongside it. You keep your prescriber. We handle the part they don&rsquo;t have the time or tools for.
        </p>
${renderSectionBreak()}
        <p style="${styles.eyebrow}">What that looks like</p>
${renderSteps([
  "A DEXA scan &mdash; baseline bone density and body composition.",
  "Targeted labs &mdash; vitamin D, calcium, metabolic panel.",
  "A 30-minute visit with your orthopedic team.",
  "A plan personalized to your risk, not a template.",
])}

        <p style="${styles.p}margin-top:24px;">
          One price: <span style="${styles.strong}">$149</span>. No subscription required to start.
        </p>
${renderSectionBreak()}
${renderCta({
  href: assessmentUrl,
  label: "Start your $149 assessment",
})}
${renderCta({
  href: quizUrl,
  label: "Or take the free 5-minute risk quiz first",
  tight: true,
})}
${renderSectionBreak()}
${renderSignature({
  name,
  // TODO: confirm credentials line; leave brackets visible until approved
  subtitle: [
    "[Orthopedic surgeon, board-certified]",
    "Medical Director, MetaOrtho",
  ],
})}
${renderPortrait({
  src: portraitUrl,
  alt: "Dr. Jay Saenz, Medical Director of MetaOrtho",
  size: 80,
})}
${renderPostscript(
  "P.S. If you&rsquo;re not sure whether any of this applies to you yet, the 5-minute risk quiz is the lowest-effort way to find out. It&rsquo;s free and it&rsquo;s honest."
)}`;

  return renderEmail({
    subject: SUBJECT,
    preheader: PREHEADER,
    eyebrow: "The story",
    heading: "Why MetaOrtho exists.",
    body,
    footer: inputs
      ? { recipientEmail: inputs.email, unsubscribeUrl: inputs.unsubscribeUrl }
      : undefined,
  });
}
