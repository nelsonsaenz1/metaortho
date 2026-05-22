// ---------------------------------------------------------------------------
// MetaOrtho v2 assessment — GLP-1 Management Profile (output layer)
//
// Source of truth: Quiz-Question-Architecture-v2.md §12. Builds the templated
// six-section Profile from the deterministic scoring outputs + the user's
// answers. This is "Layer 1" (templated structure); the AI personalization
// layer (§14.2) is out of scope for this build and would enrich the prose
// without changing the scored outputs.
//
// Compliance: language stays within the medical guardrails — "may be
// appropriate", "the clinical team will review", "monitoring", "consultation".
// No guaranteed-outcome / prevent / cure / reverse claims.
// ---------------------------------------------------------------------------

import type {
  CandidacyLevel,
  ComplexityTier,
  CtaKind,
  ManagementProfile,
  ProfileSection,
  Responses,
  ScoringResult,
} from "./types.ts";
import { getContact, getSingle, hardStopReasons, isSingle, Q, V } from "./questions.ts";

export const CANDIDACY_LABEL: Record<CandidacyLevel, string> = {
  not_candidate: "Not a candidate right now",
  possible_caveats: "Possible candidate, with some things to review",
  candidate: "Candidate",
  strong_candidate: "Strong candidate",
};

export const TIER_LABEL: Record<ComplexityTier, string> = {
  standard: "Standard Management",
  enhanced: "Enhanced Management",
  high_risk: "High-Risk Management",
};

const TIER_MEANING: Record<ComplexityTier, string> = {
  standard:
    "a lower-complexity profile: a baseline DEXA when clinically appropriate, routine monitoring of metabolic and body-composition markers, and standard intervention triggers.",
  enhanced:
    "a moderate-complexity profile: baseline plus a 6-month DEXA, more frequent clinical touchpoints, dietitian input, and a resistance-training plan.",
  high_risk:
    "a higher-complexity profile: closer clinical monitoring, an advanced lab panel, serial DEXA imaging, and priority access to the clinical team.",
};

/** "a, b, and c" */
function joinClauses(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0]!;
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

const MANAGER_PHRASE: Record<string, string> = {
  [V.manager.pcp]: "your primary care doctor",
  [V.manager.virtual]: "a virtual weight-management program",
  [V.manager.medspa]: "a med spa",
  [V.manager.onlinePharmacy]: "an online provider or compounding pharmacy",
  [V.manager.nobody]: "no one in particular — you've been getting refills",
};

function ctaForCandidacy(level: CandidacyLevel): CtaKind {
  if (level === "not_candidate") return "no_booking";
  if (level === "possible_caveats") return "book_caveats";
  return "book";
}

// --- Section builders ------------------------------------------------------

function candidacySection(score: ScoringResult): ProfileSection {
  const { candidacy } = score;
  const reasons = joinClauses(candidacy.reasons);
  const body: string[] = [];

  switch (candidacy.level) {
    case "strong_candidate":
      body.push(
        `Based on your responses, you appear to be a strong candidate for GLP-1 therapy. The clearest factors are ${reasons}.`,
        "Used under specialty supervision, a GLP-1 has a strong evidence base in a situation like yours. A consultation is the right next step to confirm that and build the plan.",
      );
      break;
    case "candidate":
      body.push(
        `Based on your responses, you appear to be a candidate for GLP-1 therapy, supported by ${reasons}.`,
        "A specialty consultation can confirm the indication and design a plan matched to your goals and history.",
      );
      break;
    case "possible_caveats":
      body.push(
        `Based on your responses, you may be a candidate for GLP-1 therapy — with some specifics worth reviewing first, including ${reasons}.`,
        "These aren't reasons you can't be treated. They're reasons the decision is best made with a specialist who will review your situation rather than a program that simply writes the prescription.",
      );
      break;
    case "not_candidate":
      body.push(
        `Based on your responses, a GLP-1 may not be the right path for you right now — specifically because of ${reasons}.`,
        "This is the kind of determination a careful clinical assessment is meant to surface early. The guidance below points you toward the most appropriate next step.",
      );
      break;
  }

  return { id: "candidacy", title: "Your candidacy", body };
}

function drugSection(score: ScoringResult): ProfileSection {
  const body: string[] = [];
  const bullets = score.flags.map((f) => f.text);

  if (bullets.length > 0) {
    body.push("Given your specific profile, here are the drug-selection topics your specialty consult would cover:");
    body.push(
      "Your Profile deliberately doesn't name a single medication — that's a clinical decision for your consult. What it shows is that drug selection is a real decision worth making with a specialist, not a default.",
    );
  } else {
    body.push(
      "Drug selection is still a real clinical decision. Based on what you shared, no specific drug-selection considerations stood out — your consult would match the medication and dose to your goals, history, and tolerance.",
    );
  }

  return { id: "drug", title: "Your drug suitability considerations", body, bullets: bullets.length ? bullets : undefined };
}

function tierSection(score: ScoringResult): ProfileSection {
  const { complexity } = score;
  const drivers = [
    ...complexity.overrides,
    ...complexity.factors
      .filter((f) => f.points > 0)
      .sort((a, b) => b.points - a.points)
      .map((f) => f.label),
  ];
  const uniqueDrivers = Array.from(new Set(drivers)).slice(0, 4);

  const body: string[] = [`We've placed you in the ${TIER_LABEL[complexity.tier]} tier, which means ${TIER_MEANING[complexity.tier]}`];

  if (uniqueDrivers.length > 0) {
    const driverText = joinClauses(uniqueDrivers.map((d) => d.toLowerCase()));
    body.push(
      `The main factors behind this were ${driverText}. None of these means you can't take a GLP-1 — they mean the supervision you receive should be more thorough than typical telehealth weight-loss programs offer.`,
    );
  } else {
    body.push(
      "Nothing in your responses pushed you toward higher-intensity monitoring, but baseline monitoring still matters on these medications — that's what the Standard tier covers.",
    );
  }

  return { id: "tier", title: "Your clinical management tier", body };
}

function consultSection(score: ScoringResult, r: Responses): ProfileSection {
  const bullets: string[] = [];
  const journey = getSingle(r, Q.journey);
  const manager = getSingle(r, Q.curManager);
  const tier = score.complexity.tier;

  if (journey === V.journey.current) {
    bullets.push("A review of your current medication and dose — and whether they're still the right fit for your goals.");
  } else if (journey === V.journey.former || journey === V.journey.formerRestart) {
    bullets.push("A look at what happened with your last GLP-1, and how specialty management could change the outcome this time.");
  } else {
    bullets.push("Confirming whether a GLP-1 is appropriate for you — and, if so, which one fits your profile.");
  }

  if (manager && MANAGER_PHRASE[manager]) {
    bullets.push(
      `What changes when an endocrinologist and an orthopedic surgeon co-manage your therapy, compared with ${MANAGER_PHRASE[manager]}.`,
    );
  } else if (isSingle(r, Q.curManager, V.manager.endo)) {
    bullets.push("A specialist second opinion on your current plan — drug, dose, and monitoring.");
  }

  if (tier === "enhanced" || tier === "high_risk") {
    bullets.push(`A monitoring plan matched to your ${TIER_LABEL[tier]} profile, including bone, muscle, and joint health.`);
  } else {
    bullets.push("A baseline monitoring plan covering metabolic markers and body composition, including bone and muscle health.");
  }

  bullets.push("Baseline labs and imaging (such as a DEXA scan) ordered through a lab near you when clinically appropriate.");

  const body: string[] = [
    "A specialty consultation isn't a generic intake. Based on your Profile, here's what your first visit would focus on:",
  ];

  // §13.3 — the highest-value gap: self-managed + high complexity.
  if (manager === V.manager.nobody && tier === "high_risk") {
    body.push(
      "You've been managing this largely on your own, but your profile suggests you'd benefit from a specialist team. That gap is exactly what a consultation is for.",
    );
  }

  return { id: "consult", title: "What this means for your consult", body, bullets };
}

function approachSection(): ProfileSection {
  return {
    id: "approach",
    title: "The MetaOrtho approach",
    body: [
      "MetaOrtho is built around a combination that's structurally rare. Dr. Kashif Latif, an endocrinologist with deep GLP-1 prescribing experience, leads candidacy, drug, and dose decisions. Dr. Jay Saenz, an orthopedic surgeon, leads the musculoskeletal side — the bone, muscle, and joint monitoring most GLP-1 programs simply don't do. Purpose-built clinical tooling keeps that combined approach consistent for every patient.",
      "The result is specialty-level management of one of the most consequential drug classes in modern medicine — the right candidate, the right drug, the right dose, the right monitoring.",
    ],
  };
}

function nextStepSection(score: ScoringResult, r: Responses): ProfileSection {
  const cta = ctaForCandidacy(score.candidacy.level);
  const body: string[] = [];

  if (cta === "book") {
    body.push(
      "Your next step is an initial consultation with the specialty clinical team — a focused visit that turns this Profile into an actual plan.",
    );
  } else if (cta === "book_caveats") {
    body.push(
      "Your next step is a consultation to talk through your specific situation before any decision. The clinical team will review what you shared and tell you, candidly, whether and how it makes sense to proceed.",
    );
  } else {
    // not_candidate — referral / education, no booking.
    const key = hardStopReasons(r)[0];
    switch (key) {
      case "under_18":
        body.push(
          "MetaOrtho cares for adults. For adolescent weight management, your pediatrician is the right place to start — they can assess what's appropriate at your age.",
        );
        break;
      case "mtc_men2":
        body.push(
          "GLP-1 medications carry a boxed warning for people with a personal or family history of medullary thyroid cancer or MEN2. We don't recommend pursuing GLP-1 therapy; please discuss alternatives with your endocrinologist.",
        );
        break;
      case "pregnancy":
        body.push(
          "GLP-1 medications aren't appropriate during pregnancy or breastfeeding. We'd be glad to talk about options afterward — once you've delivered and finished breastfeeding, if that's your plan.",
        );
        break;
      case "active_eating_disorder":
        body.push(
          "For people in active eating-disorder treatment, GLP-1 medications can carry specific risks. We'd strongly encourage you to keep working with your treatment team before considering a weight-loss medication.",
        );
        break;
      case "bmi_under_18_5":
        body.push(
          "At your current weight, these medications aren't used for weight management. If you have other health concerns you'd like addressed, your primary care doctor is the right starting point.",
        );
        break;
      default:
        body.push(
          "Based on your responses, we'd point you to your primary care doctor or an appropriate specialist as the right next step.",
        );
    }
  }

  // §13.1 — soft mental-health off-ramp, in addition to any CTA.
  if (isSingle(r, Q.mentalHealth, V.mentalHealth.struggling)) {
    body.push(
      "One more thing: it sounds like you may be going through a lot right now. If you're struggling, please consider reaching out to a mental health professional — and in the US, you can call or text 988 anytime. You deserve support for that too.",
    );
  }

  return { id: "next_step", title: "Your next step", body };
}

// --- Public API ------------------------------------------------------------

export function buildProfile(score: ScoringResult, r: Responses): ManagementProfile {
  const contact = getContact(r);
  const hardStop = score.candidacy.hardStop;

  const sections: ProfileSection[] = [candidacySection(score)];
  if (!hardStop) {
    sections.push(drugSection(score), tierSection(score), consultSection(score, r));
  }
  sections.push(approachSection(), nextStepSection(score, r));

  return {
    firstName: contact?.firstName ?? null,
    candidacyLevel: score.candidacy.level,
    complexityTier: score.complexity.tier,
    flags: score.flags,
    cta: ctaForCandidacy(score.candidacy.level),
    sections,
  };
}
