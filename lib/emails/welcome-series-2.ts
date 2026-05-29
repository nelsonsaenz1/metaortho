/**
 * MetaOrtho welcome series — Email 3 of 3: "The story".
 *
 * Fires 2 days after Email 2 (i.e. 4 days after signup) via the Resend
 * Automation. Closes the series on a founder-voice note explaining why
 * MetaOrtho exists and how the free Profile and specialty consult fit together.
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
import {
  INITIAL_CONSULT_PRICE_LABEL,
  FOLLOW_UP_PRICE_LABEL,
} from "../site-config";

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
    `  01   A free GLP-1 Management Profile — your status, goals, and history.`,
    `  02   A specialty consult — candidacy, medication fit, side effects,`,
    `       and what to monitor.`,
    `  03   Labs or a DEXA scan when clinically appropriate and available`,
    `       in your state.`,
    `  04   A plan matched to your situation, not a template.`,
    ``,
    `The Profile is free. Consults are cash-pay: ${INITIAL_CONSULT_PRICE_LABEL} initial · ${FOLLOW_UP_PRICE_LABEL} follow-up.`,
    ``,
    `────────────`,
    ``,
    `  →  Get your free GLP-1 Management Profile: ${site}/assessment`,
    `  →  Or book a specialty consult: ${site}/book`,
    ``,
    `────────────`,
    ``,
    `— ${name}`,
    `  [Orthopedic surgeon, board-certified]`,
    `  Medical Director, MetaOrtho`,
    ``,
    `P.S. If you're not sure whether any of this applies to you yet, the`,
    `free GLP-1 Management Profile is the lowest-effort way to find out.`,
    `It takes about five minutes.`,
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
  const profileUrl = `${site}/assessment`;
  const bookUrl = `${site}/book`;
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
  "A free GLP-1 Management Profile &mdash; your status, goals, and history.",
  "A specialty consult &mdash; candidacy, medication fit, side effects, and what to monitor.",
  "Labs or a DEXA scan when clinically appropriate and available in your state.",
  "A plan matched to your situation, not a template.",
])}

        <p style="${styles.p}margin-top:24px;">
          The Profile is <span style="${styles.strong}">free</span>. Consults are cash-pay: ${INITIAL_CONSULT_PRICE_LABEL} initial &middot; ${FOLLOW_UP_PRICE_LABEL} follow-up.
        </p>
${renderSectionBreak()}
${renderCta({
  href: profileUrl,
  label: "Get your free GLP-1 Management Profile",
})}
${renderCta({
  href: bookUrl,
  label: "Or book a specialty consult",
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
  "P.S. If you&rsquo;re not sure whether any of this applies to you yet, the free GLP-1 Management Profile is the lowest-effort way to find out. It takes about five minutes."
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
