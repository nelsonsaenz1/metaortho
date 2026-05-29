/**
 * MetaOrtho welcome series — Email 2 of 3: "What we measure".
 *
 * Fires 2 days after Email 1 via the Resend Automation. Develops the
 * four-pillar framing Email 1 introduced: what each pillar is, why it matters
 * on a GLP-1, how MetaOrtho screens for it.
 *
 * Env:
 *   WAITLIST_FROM_NAME      e.g. "Dr. Jay Saenz"
 *   WAITLIST_FROM_EMAIL     must be on a verified Resend domain
 *   WAITLIST_MAILING_ADDR   CAN-SPAM physical address
 *   NEXT_PUBLIC_SITE_URL    e.g. "https://metaortho.com"
 */

import {
  renderEmail,
  renderCta,
  renderSignature,
  renderPillarBlocks,
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

const SUBJECT = "GLP-1 Care: 4 things the scale won't tell you";
const PREHEADER =
  "Muscle, bone, joint, nutrition — and why each one matters.";

export function seriesOneSubject(): string {
  return SUBJECT;
}

export function seriesOneFrom(): string {
  return fromAddress();
}

export function seriesOneReplyTo(): string {
  return replyToAddress();
}

export function seriesOneText(inputs?: TemplateInputs): string {
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
    `THE FOUR PILLARS`,
    ``,
    `What we measure.`,
    ``,
    `Most GLP-1 programs measure one thing: the number on the scale.`,
    ``,
    `That number hides more than it reveals. Here are the four we track`,
    `instead — because this is where GLP-1 weight loss actually does its damage.`,
    ``,
    `────────────`,
    ``,
    `  01   MUSCLE`,
    `       A meaningful share of what you lose on a GLP-1 can be lean`,
    `       mass. Your metabolism, your strength, your function —`,
    `       all ride on keeping as much of it as possible.`,
    ``,
    `  02   BONE`,
    `       Rapid weight loss lowers bone mineral density. Emerging`,
    `       orthopedic research points to elevated osteoporosis risk`,
    `       in long-term GLP-1 users over multi-year horizons.`,
    ``,
    `  03   JOINT & URIC ACID`,
    `       Rapid weight loss has been linked to gout flares, even in`,
    `       people with no prior history. We screen for it before it`,
    `       happens — not after.`,
    ``,
    `  04   NUTRITION`,
    `       Appetite suppression means less food. And quietly, less`,
    `       of the micronutrients your bones and muscles need to`,
    `       hold up over time.`,
    ``,
    `────────────`,
    ``,
    `Your free GLP-1 Management Profile organizes exactly this — your status,`,
    `goals, medications, side effects, weight-loss pace, nutrition, strength,`,
    `and what's worth monitoring — so a specialty consult can focus on you.`,
    ``,
    `  →  Get your free GLP-1 Management Profile: ${site}/assessment`,
    `  →  Or book a specialty consult (${INITIAL_CONSULT_PRICE_LABEL} initial · ${FOLLOW_UP_PRICE_LABEL} follow-up): ${site}/book`,
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

export function seriesOneHtml(inputs?: TemplateInputs): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.com";
  // Body signature is always the physician. The From-header brand name lives
  // in WAITLIST_FROM_NAME (currently "MetaOrtho") so the inbox label reads as
  // a brand while the letter reads as a person.
  const name = "Dr. Jay Saenz";
  const profileUrl = `${site}/assessment`;
  const bookUrl = `${site}/book`;

  // Directive build note: the 4-icon row from Email 1 can be echoed above the
  // numbered list as a visual callback. Uncomment the block below + re-import
  // `renderPillarRow` and `ICONS` if we want that echo.
  //
  // const iconEcho = renderPillarRow([
  //   { icon: ICONS.muscle, label: "Muscle" },
  //   { icon: ICONS.bone, label: "Bone" },
  //   { icon: ICONS.joint, label: "Joint" },
  //   { icon: ICONS.nutrition, label: "Nutrition" },
  // ]);

  const body = `        <p style="${styles.pLead}">Most GLP-1 programs measure one thing: the number on the scale.</p>

        <p style="${styles.p}">
          That number hides more than it reveals. Here are the four we track instead &mdash; because this is where GLP-1 weight loss actually does its damage.
        </p>
${renderSectionBreak()}
${renderPillarBlocks([
  {
    label: "Muscle",
    body:
      "A meaningful share of what you lose on a GLP-1 can be lean mass. Your metabolism, your strength, your function &mdash; all ride on keeping as much of it as possible.",
  },
  {
    label: "Bone",
    body:
      "Rapid weight loss lowers bone mineral density. Emerging orthopedic research points to elevated osteoporosis risk in long-term GLP-1 users over multi-year horizons.",
  },
  {
    label: "Joint &amp; uric acid",
    body:
      "Rapid weight loss has been linked to gout flares, even in people with no prior history. We screen for it before it happens &mdash; not after.",
  },
  {
    label: "Nutrition",
    body:
      "Appetite suppression means less food. And quietly, less of the micronutrients your bones and muscles need to hold up over time.",
  },
])}
${renderSectionBreak()}
        <p style="${styles.p}">
          Your free GLP-1 Management Profile organizes exactly this &mdash; your status, goals, medications, side effects, weight-loss pace, nutrition, strength, and what&rsquo;s worth monitoring &mdash; so a specialty consult can focus on you.
        </p>

${renderCta({
  href: profileUrl,
  label: "Get your free GLP-1 Management Profile",
})}
${renderCta({
  href: bookUrl,
  label: `Or book a specialty consult (${INITIAL_CONSULT_PRICE_LABEL} initial · ${FOLLOW_UP_PRICE_LABEL} follow-up)`,
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
})}`;

  return renderEmail({
    subject: SUBJECT,
    preheader: PREHEADER,
    eyebrow: "The four pillars",
    heading: "What we measure.",
    body,
    footer: inputs
      ? { recipientEmail: inputs.email, unsubscribeUrl: inputs.unsubscribeUrl }
      : undefined,
  });
}
