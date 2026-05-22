// ---------------------------------------------------------------------------
// MetaOrtho v2 assessment — deterministic scoring engine
//
// Source of truth: Quiz-Question-Architecture-v2.md §11 (Scoring Logic).
// Produces three independent outputs that combine into the GLP-1 Management
// Profile:
//   1. Candidacy assessment  (decision tree, §11.1)
//   2. Drug suitability flags (qualitative, prioritized, capped at 3, §11.2)
//   3. Clinical management complexity tier (weighted + overrides, §11.3)
//
// Everything here is PURE and stateless: same responses in, same outputs out.
// The AI narrative layer (out of scope for this build) personalizes the prose
// AROUND these outputs but must never change them. Covered by scoring.test.ts.
// ---------------------------------------------------------------------------

import type {
  CandidacyResult,
  ComplexityFactor,
  ComplexityResult,
  ComplexityTier,
  DrugFlag,
  Responses,
  ScoringResult,
} from "./types.ts";
import {
  computeBmi,
  getSingle,
  hardStopReasons,
  hasAnyMulti,
  hasMulti,
  isHardStop,
  isSingle,
  multiCount,
  Q,
  V,
} from "./questions.ts";

// --- Shared predicates -----------------------------------------------------

const SEVERE_GI = [V.sideEffect.nausea, V.sideEffect.gi] as const;

const isT2dm = (r: Responses) => isSingle(r, Q.diabetes, V.diabetes.t2dm);
const isEstablishedCvd = (r: Responses) =>
  isSingle(r, Q.cvEvent, V.cvEvent.yes) || isSingle(r, Q.cvEvent, V.cvEvent.procedure);
const isMash = (r: Responses) =>
  isSingle(r, Q.fattyLiver, V.fattyLiver.yes) || isSingle(r, Q.fattyLiver, V.fattyLiver.suspected);
const isOsaDiagnosed = (r: Responses) =>
  isSingle(r, Q.sleepApnea, V.sleepApnea.cpap) || isSingle(r, Q.sleepApnea, V.sleepApnea.untreated);

/** Severe GI side effects on the current OR a prior GLP-1. */
const hasSevereGiSideEffects = (r: Responses) =>
  hasAnyMulti(r, Q.curSideEffects, SEVERE_GI) || hasAnyMulti(r, Q.formerSideEffects, SEVERE_GI);

/**
 * Any qualifying comorbidity that strengthens candidacy at BMI 27–29.9 / 25–26.9.
 * "Told I'm at risk" of diabetes is intentionally excluded as too soft — a
 * clinical-review item.
 */
function hasComorbidity(r: Responses): boolean {
  return (
    isSingle(r, Q.diabetes, V.diabetes.t2dm) ||
    isSingle(r, Q.diabetes, V.diabetes.prediabetes) ||
    isSingle(r, Q.cholesterol, V.cholesterol.yes) ||
    isSingle(r, Q.cholesterol, V.cholesterol.borderline) ||
    isSingle(r, Q.bloodPressure, V.bp.controlled) ||
    isSingle(r, Q.bloodPressure, V.bp.uncontrolled) ||
    isSingle(r, Q.bloodPressure, V.bp.borderline) ||
    isEstablishedCvd(r) ||
    isMash(r) ||
    isOsaDiagnosed(r) ||
    isSingle(r, Q.sleepApnea, V.sleepApnea.suspected)
  );
}

// Friendly phrasing for the hard-stop reason keys produced by questions.ts.
function hardStopReasonText(key: string, bmi: number | null): string {
  switch (key) {
    case "under_18":
      return "being under 18 (MetaOrtho cares for adults)";
    case "mtc_men2":
      return "a personal or family history of medullary thyroid cancer or MEN2";
    case "pregnancy":
      return "being pregnant or breastfeeding";
    case "active_eating_disorder":
      return "being in active eating disorder treatment";
    case "bmi_under_18_5":
      return `a BMI of ${bmi ?? "below 18.5"}, which is below the range where these medications are used for weight management`;
    default:
      return key;
  }
}

// --- 1. Candidacy assessment (§11.1) ---------------------------------------

export function assessCandidacy(r: Responses): CandidacyResult {
  const bmi = computeBmi(r);

  // Hard stops → "Not a candidate" (careful, non-booking output downstream).
  if (isHardStop(r)) {
    return {
      level: "not_candidate",
      hardStop: true,
      reasons: hardStopReasons(r).map((k) => hardStopReasonText(k, bmi)),
      bmi,
    };
  }

  // Relative-contraindication / ambiguous factors → "Possible candidate with
  // caveats". Evaluated before strong/candidate so that, e.g., a T2DM patient
  // with pancreatitis history routes to the consult-required output. The tree
  // intentionally errs toward caveats for ambiguous responses (§13.4).
  const caveats: string[] = [];
  if (isSingle(r, Q.pancreatitis, V.pancreatitis.once) || isSingle(r, Q.pancreatitis, V.pancreatitis.multiple)) {
    caveats.push("a history of pancreatitis");
  }
  if (hasMulti(r, Q.giHistory, V.giHistory.gastroparesis)) caveats.push("gastroparesis");
  if (hasMulti(r, Q.giHistory, V.giHistory.ibd)) caveats.push("inflammatory bowel disease");
  if (hasMulti(r, Q.giHistory, V.giHistory.obstruction)) caveats.push("a history of bowel obstruction");
  if (isSingle(r, Q.eatingDisorder, V.eatingDisorder.past) || isSingle(r, Q.eatingDisorder, V.eatingDisorder.struggled)) {
    caveats.push("a past experience with disordered eating");
  }
  if (
    isSingle(r, Q.kidneyLiver, V.kidneyLiver.kidney) ||
    isSingle(r, Q.kidneyLiver, V.kidneyLiver.liver) ||
    isSingle(r, Q.kidneyLiver, V.kidneyLiver.both)
  ) {
    caveats.push("kidney or liver disease that affects dosing and monitoring");
  }
  if (isSingle(r, Q.mentalHealth, V.mentalHealth.struggling)) {
    caveats.push("what you shared about how you're doing right now");
  }
  if (bmi != null && bmi >= 25 && bmi < 27 && !hasComorbidity(r)) {
    caveats.push("a BMI just below the usual treatment threshold without a clear related condition");
  }

  if (caveats.length > 0) {
    return { level: "possible_caveats", hardStop: false, reasons: caveats, bmi };
  }

  // Strong candidate: BMI ≥30, OR an established medical indication.
  const strongReasons: string[] = [];
  if (bmi != null && bmi >= 30) strongReasons.push(`a BMI of ${bmi}`);
  if (isT2dm(r)) strongReasons.push("your Type 2 diabetes diagnosis");
  if (isEstablishedCvd(r)) strongReasons.push("your cardiovascular history");
  if (isMash(r)) strongReasons.push("your fatty liver (MASH) diagnosis");
  if (strongReasons.length > 0) {
    return { level: "strong_candidate", hardStop: false, reasons: strongReasons, bmi };
  }

  // Candidate: BMI ≥27, or BMI 25–26.9 with a qualifying comorbidity.
  if (bmi != null && bmi >= 27) {
    return { level: "candidate", hardStop: false, reasons: [`a BMI of ${bmi}`], bmi };
  }
  if (bmi != null && bmi >= 25 && hasComorbidity(r)) {
    return {
      level: "candidate",
      hardStop: false,
      reasons: [`a BMI of ${bmi} together with a related health condition`],
      bmi,
    };
  }

  // Everything else routes to the consult to establish the indication.
  return {
    level: "possible_caveats",
    hardStop: false,
    reasons: ["whether there's a clear medical indication for therapy in your situation"],
    bmi,
  };
}

// --- 3. Clinical management complexity tier (§11.3) ------------------------
// (Defined before drug flags because the MSK flag depends on the tier.)

// Representative midpoints for weight-loss velocity (lb/week) on a current GLP-1.
const LB_LOST_MID: Record<string, number> = {
  [V.weightLost.lt10]: 5,
  [V.weightLost.l10_20]: 15,
  [V.weightLost.l20_40]: 30,
  [V.weightLost.l40_60]: 50,
  [V.weightLost.gt60]: 70,
};
const WEEKS_ON_MID: Record<string, number> = {
  [V.duration.lt3]: 6.5,
  [V.duration.m3_6]: 19.5,
  [V.duration.m6_12]: 39,
  [V.duration.y1_2]: 78,
  [V.duration.gt2]: 130,
};

/** Estimated sustained weight-loss velocity in lb/week, or null if N/A. */
export function velocityLbPerWeek(r: Responses): number | null {
  if (!isSingle(r, Q.journey, V.journey.current)) return null;
  const lost = getSingle(r, Q.curWeightLost);
  const dur = getSingle(r, Q.curDuration);
  if (!lost || !dur) return null;
  const lb = LB_LOST_MID[lost];
  const wk = WEEKS_ON_MID[dur];
  if (!lb || !wk) return null;
  return lb / wk;
}

export function computeComplexity(r: Responses): ComplexityResult {
  const overrides: string[] = [];
  const factors: ComplexityFactor[] = [];
  const add = (cond: boolean, label: string, points: number) => {
    if (cond) factors.push({ label, points });
  };

  const velocity = velocityLbPerWeek(r);

  // Override conditions — any single trigger forces High-Risk (§11.3.1).
  if (isSingle(r, Q.age, V.age.a65_plus)) overrides.push("Age 65 or older");
  if (isSingle(r, Q.dexa, V.dexa.osteoporosis)) overrides.push("Known osteoporosis");
  if (isSingle(r, Q.fracture, V.fracture.minorFall)) overrides.push("A prior fragility fracture");
  if (isSingle(r, Q.falls, V.falls.multiple)) overrides.push("More than one fall in the past year");
  if (velocity != null && velocity > 3) overrides.push("Rapid weight-loss velocity (over 3 lb/week)");

  // Weighted factors (§11.3.2). Computed regardless of overrides so the output
  // can always "show the work"; the tier is forced to High-Risk if any
  // override fired.
  add(
    isSingle(r, Q.menopause, V.menopause.postmenopausal) || isSingle(r, Q.menopause, V.menopause.surgical),
    "Post-menopausal status",
    3,
  );
  add(isSingle(r, Q.dexa, V.dexa.osteopenia), "Osteopenia on a prior DEXA", 3);
  add(isSingle(r, Q.familyOsteo, V.familyOsteo.yes), "Family history of osteoporosis", 2);
  add(isSingle(r, Q.age, V.age.a55_64), "Age 55–64", 2);
  add(isSingle(r, Q.falls, V.falls.once), "A fall in the past year", 2);
  add(multiCount(r, Q.functionalDecline, [V.functionalDecline.none]) >= 2, "Multiple functional limitations", 3);
  add(velocity != null && velocity >= 2 && velocity <= 3, "Sustained weight-loss velocity of 2–3 lb/week", 3);
  add(hasMulti(r, Q.priorAttempts, V.priorAttempt.bariatric), "History of bariatric surgery", 2);
  add(hasMulti(r, Q.medications, V.medication.steroids), "Regular steroid use", 3);
  add(isSingle(r, Q.activity, V.activity.sedentary), "A mostly sedentary routine", 2);
  add(isSingle(r, Q.activity, V.activity.limited), "Activity limited by pain or injury", 3);
  add(isSingle(r, Q.resistance, V.resistance.no), "No regular resistance training", 2);
  add(
    isSingle(r, Q.protein, V.protein.notEnough) || isSingle(r, Q.protein, V.protein.dontThink),
    "Lower protein intake",
    2,
  );
  add(isSingle(r, Q.smoking, V.smoking.current), "Current smoking", 1);
  add(isSingle(r, Q.alcohol, V.alcohol.daily) || isSingle(r, Q.alcohol, V.alcohol.heavy), "Higher alcohol intake", 1);
  add(isSingle(r, Q.menopause, V.menopause.perimenopause), "Perimenopause", 1);
  add(isSingle(r, Q.falls, V.falls.closeCalls), "Close calls with falls", 1);
  // v2 additions — complexity from drug-related factors alongside MSK risk.
  add(hasSevereGiSideEffects(r), "Significant GI side effects on GLP-1 therapy", 2);
  add(hasMulti(r, Q.curSideEffects, V.sideEffect.muscle), "Muscle weakness reported on your current GLP-1", 2);
  add(multiCount(r, Q.curSideEffects, [V.sideEffect.none]) >= 3, "Three or more side effects on your current GLP-1", 1);

  // Mitigating factors.
  add(isT2dm(r), "Type 2 diabetes (associated with less bone-density loss)", -1);
  add(isSingle(r, Q.menopause, V.menopause.hrt), "Hormone replacement therapy", -1);
  add(isSingle(r, Q.resistance, V.resistance.thricePlus), "Resistance training 3+ times/week", -1);

  const score = factors.reduce((sum, f) => sum + f.points, 0);

  let tier: ComplexityTier;
  if (overrides.length > 0 || score >= 8) tier = "high_risk";
  else if (score >= 4) tier = "enhanced";
  else tier = "standard";

  return { tier, score, overrides, factors };
}

// --- 2. Drug suitability flags (§11.2) -------------------------------------

const FLAG_TEXT: Record<DrugFlag["key"], string> = {
  cvd:
    "Your cardiovascular history is highly relevant to drug selection — semaglutide has a specific cardiovascular indication that may influence the recommendation. This is a topic the clinical team will review during your consult.",
  t2dm:
    "Your diabetes or prediabetes is a strong indication for GLP-1 therapy. Drug selection will weigh both glycemic and weight goals — semaglutide and tirzepatide both have strong evidence here, with differences the clinical team will discuss.",
  mash:
    "Your fatty liver (MASH) is relevant to drug selection, as some GLP-1s have stronger emerging evidence for liver outcomes. The clinical team will review this with you.",
  osa:
    "Your sleep apnea is relevant to drug selection — one GLP-1 has FDA approval specifically for obstructive sleep apnea with obesity. The clinical team will review whether it fits your profile.",
  gi_side_effects:
    "Your history of significant GI side effects suggests careful dose titration, and possibly a different GLP-1, is worth discussing. Specialty management often resolves these issues without stopping therapy.",
  pregnancy_planning:
    "Because you're planning a pregnancy, drug selection and treatment timing will consider washout requirements. This is a key topic for your consult.",
  msk_high_risk:
    "Given your musculoskeletal risk profile, drug selection will consider emerging evidence on differential effects on lean mass and bone density across GLP-1s.",
  compounded:
    "You're currently on a compounded GLP-1. The clinical team will discuss the clinical and supply-chain considerations of compounded versus FDA-approved formulations.",
};

// Lower number = higher clinical priority (§11.2 cap rule).
const FLAG_PRIORITY: Record<DrugFlag["key"], number> = {
  cvd: 1,
  t2dm: 2,
  mash: 3,
  osa: 4,
  gi_side_effects: 5,
  pregnancy_planning: 6,
  msk_high_risk: 7,
  compounded: 8,
};

const MAX_FLAGS = 3;

export function computeDrugFlags(r: Responses, complexityTier: ComplexityTier): DrugFlag[] {
  const keys: DrugFlag["key"][] = [];

  if (isEstablishedCvd(r)) keys.push("cvd");
  if (isT2dm(r) || isSingle(r, Q.diabetes, V.diabetes.prediabetes)) keys.push("t2dm");
  if (isMash(r)) keys.push("mash");
  if (isOsaDiagnosed(r)) keys.push("osa");
  if (hasSevereGiSideEffects(r)) keys.push("gi_side_effects");
  if (isSingle(r, Q.pregnancy, V.pregnancy.planning)) keys.push("pregnancy_planning");
  if (complexityTier === "high_risk") keys.push("msk_high_risk");
  if (isSingle(r, Q.curDrug, V.drug.compSema) || isSingle(r, Q.curDrug, V.drug.compTirz)) {
    keys.push("compounded");
  }

  return keys
    .map<DrugFlag>((key) => ({ key, priority: FLAG_PRIORITY[key], text: FLAG_TEXT[key] }))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, MAX_FLAGS);
}

// --- Combined --------------------------------------------------------------

export function scoreAssessment(r: Responses): ScoringResult {
  const candidacy = assessCandidacy(r);
  const complexity = computeComplexity(r);
  const flags = computeDrugFlags(r, complexity.tier);
  return { candidacy, flags, complexity, bmi: candidacy.bmi };
}
