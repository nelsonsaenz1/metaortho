// Patient-education resource library.
//
// These pages are EDUCATIONAL only — conservative, source-backed overviews
// that help patients understand GLP-1 management. They are not medical
// advice, a diagnosis, or an individualized plan. Clinical claims here should
// stay aligned with the citations on /legal/sources; soften rather than
// overstate, and route urgent symptoms to emergency/urgent care, not to a
// consult. The clinical team should review wording before launch.

export type ResourceBullet = {
  // Optional bold lead-in (term), followed by explanatory text.
  term?: string;
  text: string;
};

export type ResourceSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: ResourceBullet[];
};

export type ResourceCallout = {
  heading: string;
  intro?: string;
  items: string[];
  footer?: string;
};

export type Resource = {
  slug: string;
  title: string;
  eyebrow: string;
  // Used on the index card and as the meta description.
  summary: string;
  readingTime: string;
  intro: string;
  // When true, the page leads with the 911 / emergency banner.
  emergencyBanner?: boolean;
  // Red, high-emphasis "seek emergency care" block.
  emergencyBlock?: ResourceCallout;
  // Amber "call your clinician promptly" block.
  promptCareBlock?: ResourceCallout;
  sections: ResourceSection[];
  keyTakeaways?: string[];
  // When true, render the "Sources & citations" pointer near the disclaimer.
  citesSources?: boolean;
};

const resources: Resource[] = [
  {
    slug: "what-to-expect",
    title: "What to expect with GLP-1 treatment",
    eyebrow: "Getting started",
    summary:
      "A plain-language overview of how GLP-1 medications work, what the first weeks can feel like, and what healthy progress looks like — including why muscle and bone deserve attention.",
    readingTime: "5 min read",
    intro:
      "GLP-1 receptor agonists such as semaglutide and tirzepatide can lead to significant weight loss for many people. Knowing what's typical — and what specialty management adds — can help you get more out of treatment and fewer surprises along the way.",
    sections: [
      {
        heading: "How GLP-1 medications work",
        paragraphs: [
          "GLP-1 medications mimic a hormone your body makes after eating. They slow how quickly your stomach empties and reduce appetite, so you tend to feel full sooner and stay full longer. That's what makes eating less feel more manageable.",
          "Because they change appetite and digestion, the most common early effects are gastrointestinal — and most of them ease as your body adjusts and as your clinician titrates the dose gradually.",
        ],
      },
      {
        heading: "The first weeks",
        paragraphs: [
          "Treatment usually starts at a low dose that's increased over time. This step-up approach is designed to limit side effects.",
        ],
        bullets: [
          {
            term: "Common, usually temporary:",
            text: "nausea, reduced appetite, constipation or loose stools, and fatigue, especially after a dose increase.",
          },
          {
            term: "Helps for many people:",
            text: "smaller meals, staying hydrated, prioritizing protein, and going slow with dose changes under clinician guidance.",
          },
          {
            term: "Worth a conversation:",
            text: "side effects that don't settle, interfere with eating and drinking, or worry you. Your clinician can adjust the plan.",
          },
        ],
      },
      {
        heading: "What healthy progress looks like",
        paragraphs: [
          "Gradual, steady weight loss is generally more sustainable — and easier on muscle and bone — than very rapid loss. The pace that's right for you depends on your starting point, goals, and medical history, which is something a clinician individualizes.",
          "Progress isn't only the number on the scale. How you feel, your energy, your strength, and your lab and body-composition trends all matter.",
        ],
      },
      {
        heading: "Why muscle and bone matter",
        paragraphs: [
          "When you lose weight quickly, a meaningful portion of what you lose can come from lean mass — muscle and bone — not just fat. Protecting muscle and bone is a core focus of specialty GLP-1 management, because it supports strength, metabolism, and long-term health.",
          "Adequate protein, resistance training, and — when appropriate — monitoring with labs or a body-composition scan are the main tools used to protect lean mass during active weight loss.",
        ],
      },
      {
        heading: "What a specialty consult adds",
        paragraphs: [
          "A specialty GLP-1 consult is a focused review of your medication and dose, side effects, goals, and what should be monitored over time — including your bones and muscle. You leave with clearer next steps tailored to your situation, documented in your secure patient portal.",
        ],
      },
    ],
    keyTakeaways: [
      "Early GI side effects are common and usually ease with gradual dosing.",
      "Steady, gradual weight loss is generally easier on muscle and bone than rapid loss.",
      "Protein, strength work, and monitoring help protect lean mass.",
      "A specialty consult individualizes your plan and what to monitor.",
    ],
    citesSources: true,
  },
  {
    slug: "glp1-safety-warning-signs",
    title: "GLP-1 safety: warning signs to watch for",
    eyebrow: "Safety",
    summary:
      "The symptoms that mean you should seek emergency care, the ones to call your clinician about promptly, and why you shouldn't start or stop a GLP-1 on your own.",
    readingTime: "4 min read",
    intro:
      "Most people tolerate GLP-1 medications well, but like any medication they carry risks. This page helps you recognize symptoms that need urgent attention. It is educational and is not a substitute for medical advice from your own clinician.",
    emergencyBanner: true,
    emergencyBlock: {
      heading: "Seek emergency care now",
      intro:
        "Call 911 or go to the nearest emergency department if you experience any of the following — these can signal a serious, time-sensitive problem:",
      items: [
        "Severe or persistent abdominal pain, especially pain that radiates to your back (possible pancreatitis).",
        "Signs of a serious allergic reaction: trouble breathing, swelling of the face, lips, tongue, or throat, or a sudden severe rash.",
        "Persistent vomiting and an inability to keep down fluids, or signs of severe dehydration.",
        "Severe, unrelenting upper-right abdominal pain with fever or yellowing of the skin or eyes (possible gallbladder problem).",
        "Severe abdominal bloating with an inability to pass stool or gas (possible bowel obstruction).",
      ],
      footer:
        "When in doubt about a severe symptom, treat it as an emergency. It is always safer to be evaluated.",
    },
    promptCareBlock: {
      heading: "Call your clinician promptly",
      intro:
        "These aren't emergencies, but contact your care team soon — don't wait it out:",
      items: [
        "Nausea or vomiting that keeps you from eating or drinking normally.",
        "Constipation or diarrhea that is severe or lasting.",
        "New or worsening heartburn or reflux.",
        "Signs of low blood sugar if you also take insulin or a sulfonylurea (shakiness, sweating, confusion).",
        "New vision changes, a fast heartbeat, or any symptom that worries you.",
      ],
    },
    sections: [
      {
        heading: "Don't start or stop on your own",
        paragraphs: [
          "GLP-1 dosing is individualized and stepped up gradually for a reason. Starting, stopping, or changing your dose without clinical guidance can increase side effects or undo your progress.",
          "If you're considering a change — including pausing because of side effects — talk with your clinician first so it can be done safely.",
        ],
      },
      {
        heading: "Be cautious about non-clinical sources",
        paragraphs: [
          "Compounded or non-prescribed products obtained outside a licensed pharmacy can carry added risks around dosing and quality. If you have questions about your medication's source, raise them with a licensed clinician.",
        ],
      },
    ],
    citesSources: true,
  },
  {
    slug: "dexa-body-composition",
    title: "DEXA scans and body composition",
    eyebrow: "Monitoring",
    summary:
      "What a DEXA scan measures, why body composition matters during weight loss, and when your clinician might recommend one.",
    readingTime: "4 min read",
    intro:
      "Weight on a scale doesn't tell you what you're losing. A body-composition assessment can show how much of your weight is fat versus lean mass — and how your bones are doing — which is especially useful during active weight loss.",
    sections: [
      {
        heading: "What a DEXA scan measures",
        paragraphs: [
          "DEXA (dual-energy X-ray absorptiometry) is a quick, low-radiation scan. It's widely used to measure bone mineral density, and it can also estimate fat mass and lean (muscle) mass across your body.",
        ],
        bullets: [
          { term: "Bone density:", text: "how strong and dense your bones are." },
          { term: "Lean mass:", text: "an estimate of your muscle and other non-fat tissue." },
          { term: "Fat mass:", text: "how much fat you carry and where it's distributed." },
        ],
      },
      {
        heading: "Why it matters during weight loss",
        paragraphs: [
          "Significant or rapid weight loss can reduce bone mineral density, and a meaningful portion of weight lost can come from lean mass rather than fat. Tracking body composition — not just total weight — helps you and your clinician see whether your plan is protecting muscle and bone.",
        ],
      },
      {
        heading: "When your clinician might recommend one",
        paragraphs: [
          "A DEXA scan is ordered only when it adds value to your care — for example, to establish a baseline, to monitor bone health over time, or to confirm that strength and protein strategies are preserving lean mass. Whether and when to scan is an individualized decision.",
        ],
      },
      {
        heading: "What the scan is like",
        paragraphs: [
          "You lie still on a padded table for several minutes while a scanner arm passes over you. There's no tunnel, no injection, and the radiation dose is very low. Your clinician interprets the results in the context of your goals and history.",
        ],
      },
    ],
    keyTakeaways: [
      "DEXA measures bone density plus fat and lean mass.",
      "Body composition reveals what the scale can't — muscle and bone trends.",
      "Scans are recommended only when they add value to your care.",
    ],
    citesSources: true,
  },
  {
    slug: "protein-and-strength-basics",
    title: "Protein and strength basics during weight loss",
    eyebrow: "Muscle & bone",
    summary:
      "Why protein and resistance training help protect muscle and bone while you lose weight, with general, conservative starting points to discuss with your clinician.",
    readingTime: "5 min read",
    intro:
      "Two of the most reliable tools for protecting muscle and bone during weight loss are adequate protein and resistance training. Here's the why and the basics — your clinician can tailor specifics to you.",
    sections: [
      {
        heading: "Why protein matters",
        paragraphs: [
          "When appetite drops on a GLP-1, it's easy to under-eat protein. Adequate protein gives your body the building blocks to maintain muscle while you're in a calorie deficit, which supports strength, metabolism, and bone.",
        ],
      },
      {
        heading: "General protein targets",
        paragraphs: [
          "Research on preserving muscle during weight loss commonly points to protein intakes in the range of roughly 1.6 to 2.4 grams per kilogram of body weight per day. That's a general guidepost from the literature — not a prescription. Your right target depends on your weight, kidney health, and other factors, so confirm it with your clinician.",
        ],
        bullets: [
          { term: "Spread it out:", text: "aim for protein at each meal rather than all at once." },
          { term: "Easy sources:", text: "eggs, dairy or Greek yogurt, poultry, fish, legumes, tofu, and protein supplements if needed." },
          { term: "Pair with hydration:", text: "staying hydrated also helps with common GI side effects." },
        ],
      },
      {
        heading: "Why resistance training helps",
        paragraphs: [
          "Resistance training — using weights, bands, or your body weight — signals your body to keep the muscle it has. During weight loss, that can reduce the proportion of weight you lose as lean mass and supports bone strength.",
        ],
        bullets: [
          { term: "Start where you are:", text: "two to three short sessions a week is a common starting point." },
          { term: "Cover the basics:", text: "movements for legs, pushing, pulling, and core." },
          { term: "Progress gradually:", text: "small, steady increases beat doing too much too soon." },
        ],
      },
      {
        heading: "A note on individualization",
        paragraphs: [
          "These are general educational starting points, not a personalized program. If you have heart, kidney, joint, or other health conditions, check with a clinician before making big changes to your diet or exercise.",
        ],
      },
    ],
    keyTakeaways: [
      "Adequate protein helps preserve muscle during weight loss.",
      "Literature commonly cites ~1.6–2.4 g/kg/day — confirm your target with a clinician.",
      "Resistance training protects muscle and supports bone.",
      "Tailor specifics to your health history.",
    ],
    citesSources: true,
  },
  {
    slug: "labs-and-imaging",
    title: "Labs and imaging for GLP-1 management",
    eyebrow: "Monitoring",
    summary:
      "An overview of the labs and imaging a clinician may consider during GLP-1 treatment, and why ordering is always individualized.",
    readingTime: "4 min read",
    intro:
      "Good GLP-1 management includes knowing what to monitor. The specific labs and imaging that make sense depend on your history, medications, and goals — this is an overview, not a checklist to request.",
    sections: [
      {
        heading: "Labs a clinician may consider",
        paragraphs: [
          "Depending on your situation, your clinician may look at some of the following over the course of treatment. Not everyone needs all of them.",
        ],
        bullets: [
          { term: "Metabolic markers:", text: "blood glucose or HbA1c, especially if you have or are at risk for diabetes." },
          { term: "Lipids:", text: "cholesterol and triglycerides as part of cardiometabolic health." },
          { term: "Kidney and liver function:", text: "baseline and follow-up as appropriate." },
          { term: "Vitamin D and bone-related markers:", text: "relevant when bone health is a focus." },
          { term: "Others as indicated:", text: "guided by your symptoms, history, and other medications." },
        ],
      },
      {
        heading: "Imaging",
        paragraphs: [
          "When bone or body-composition monitoring is appropriate, a DEXA scan is the most common imaging tool. You can read more on our dedicated overview of DEXA and body composition.",
        ],
      },
      {
        heading: "Why monitoring matters",
        paragraphs: [
          "Monitoring turns weight loss from a guessing game into a managed process. It helps confirm that your plan is working, that muscle and bone are protected, and that any emerging issues are caught early.",
        ],
      },
      {
        heading: "Ordering is individualized",
        paragraphs: [
          "What to order, when, and how often is a clinical decision made with you — not a fixed panel. A specialty consult is where that plan gets set, and results are documented in your secure patient portal.",
        ],
      },
    ],
    keyTakeaways: [
      "Useful labs vary by person — there's no one-size panel.",
      "DEXA is the common imaging tool for bone and body composition.",
      "Monitoring catches issues early and confirms your plan is working.",
      "Your clinician individualizes what to order and when.",
    ],
    citesSources: true,
  },
];

export const allResources = resources;

export function getResourceBySlug(slug: string): Resource | null {
  return resources.find((r) => r.slug === slug) ?? null;
}

export function getAllResourceSlugs(): string[] {
  return resources.map((r) => r.slug);
}
