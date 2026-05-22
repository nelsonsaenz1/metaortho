// ---------------------------------------------------------------------------
// MetaOrtho v2 assessment — question bank, branching, and response readers
//
// Source of truth: Quiz-Question-Architecture-v2.md (Blocks A–H). Question
// surface copy is intentionally conversational (design principle 1.1); the
// clinical rigor lives in scoring.ts. This module owns the option value slugs
// (`V`), so scoring/profile read answers against stable identifiers rather
// than display strings.
//
// Deviations from the source doc (flagged for clinical review):
//  - Q-A1 age buckets are reconciled with the complexity scoring table, which
//    references "55–64" (+2) and "65+" (override) — values the doc's own
//    A1 buckets (50–59 / 60–69) could not express. Buckets here are:
//    Under 18 · 18–29 · 30–39 · 40–49 · 50–54 · 55–64 · 65+. "Under 18" is
//    added so the age hard-stop is actually reachable in the UI.
//  - A `state` question is added to Block H so the booking CTA can be gated by
//    licensure (capture-first: everyone gets a Profile; only booking is gated).
// ---------------------------------------------------------------------------

import type { BlockId, MeasureKind, QuestionKind, Responses } from "./types.ts";
// STATES is the canonical licensure list, so the state question never drifts
// from lib/states.ts. It is pure data (no UI imports).
import { STATES } from "../states.ts";

// --- Question ids ----------------------------------------------------------

export const Q = {
  // Block A
  age: "age",
  sex: "sex",
  height: "height",
  weight: "weight",
  journey: "glp1_journey",
  concern: "primary_concern",
  // Block B — current user
  curDrug: "cur_drug",
  curDose: "cur_dose",
  curDuration: "cur_duration",
  curManager: "cur_manager",
  curSideEffects: "cur_side_effects",
  curEfficacy: "cur_efficacy",
  curWeightLost: "cur_weight_lost",
  // Block B — former user
  formerDrug: "former_drug",
  formerDuration: "former_duration",
  formerStop: "former_stop_reason",
  formerSideEffects: "former_side_effects",
  // Block B — prospective
  prospInsurance: "prosp_insurance",
  prospInfo: "prosp_info_sources",
  // Block C
  highestWeight: "highest_weight",
  weightTrend: "weight_trend",
  priorAttempts: "prior_attempts",
  // Block D
  diabetes: "diabetes",
  bloodPressure: "blood_pressure",
  cholesterol: "cholesterol",
  cvEvent: "cv_event",
  fattyLiver: "fatty_liver",
  sleepApnea: "sleep_apnea",
  medications: "medications",
  // Block E
  mtc: "mtc_men2",
  pancreatitis: "pancreatitis",
  giHistory: "gi_history",
  pregnancy: "pregnancy",
  menopause: "menopause",
  eatingDisorder: "eating_disorder",
  mentalHealth: "mental_health",
  kidneyLiver: "kidney_liver",
  // Block F
  fracture: "prior_fracture",
  familyOsteo: "family_osteoporosis",
  dexa: "dexa",
  jointReplacement: "joint_replacement",
  falls: "falls",
  functionalDecline: "functional_decline",
  // Block G
  activity: "activity_level",
  resistance: "resistance_training",
  protein: "protein_intake",
  smoking: "smoking",
  alcohol: "alcohol",
  sleep: "sleep_quality",
  // Block H
  timeline: "timeline",
  consultPref: "consult_pref",
  state: "state",
  contact: "contact",
  freeText: "free_text",
} as const;

// --- Option value slugs ----------------------------------------------------
// Stable identifiers used by scoring/profile. Display labels live in the
// question defs below.

export const V = {
  age: {
    under18: "under_18",
    a18_29: "18_29",
    a30_39: "30_39",
    a40_49: "40_49",
    a50_54: "50_54",
    a55_64: "55_64",
    a65_plus: "65_plus",
  },
  sex: { female: "female", male: "male", preferNot: "prefer_not" },
  journey: {
    curious: "curious",
    planning: "planning",
    current: "current",
    former: "former",
    formerRestart: "former_restart",
  },
  concern: {
    weight: "weight",
    chronic: "chronic",
    vitality: "vitality",
    specialist: "specialist",
    secondOpinion: "second_opinion",
  },
  drug: {
    ozempic: "ozempic",
    wegovy: "wegovy",
    mounjaro: "mounjaro",
    zepbound: "zepbound",
    compSema: "compounded_semaglutide",
    compTirz: "compounded_tirzepatide",
    older: "older_glp1",
    unsure: "unsure",
  },
  dose: {
    starting: "starting",
    titrating: "titrating",
    maintenance: "maintenance",
    lowerByDesign: "lower_by_design",
    unknown: "unknown",
  },
  duration: {
    lt3: "lt_3mo",
    m3_6: "3_6mo",
    m6_12: "6_12mo",
    y1_2: "1_2yr",
    gt2: "gt_2yr",
  },
  manager: {
    pcp: "pcp",
    endo: "endo_obesity",
    virtual: "virtual_program",
    medspa: "med_spa",
    onlinePharmacy: "online_pharmacy",
    nobody: "nobody",
  },
  // Shared by current + former side-effect multi-selects.
  sideEffect: {
    nausea: "severe_nausea",
    gi: "diarrhea_constipation",
    fatigue: "fatigue",
    muscle: "muscle_weakness",
    joint: "joint_pain",
    hair: "hair_thinning",
    mood: "mood_changes",
    skin: "loose_skin",
    reflux: "reflux",
    sulfur: "sulfur_burps",
    palpitations: "palpitations",
    vision: "vision_changes",
    other: "other",
    none: "none",
  },
  efficacy: {
    greatWantMonitoring: "great_want_monitoring",
    workingConcerns: "working_concerns",
    plateaued: "plateaued",
    unsureWorking: "unsure_working",
    unsureContinue: "unsure_continue",
  },
  weightLost: {
    lt10: "lt_10",
    l10_20: "10_20",
    l20_40: "20_40",
    l40_60: "40_60",
    gt60: "gt_60",
  },
  formerStop: {
    sideEffects: "side_effects",
    cost: "cost",
    reachedGoal: "reached_goal",
    notEnough: "not_enough",
    doctor: "doctor",
    other: "other",
  },
  insurance: {
    yesWeightLoss: "yes_weight_loss",
    yesDiabetes: "yes_diabetes",
    none: "none",
    unsure: "unsure",
    cash: "cash",
  },
  infoSource: {
    online: "online",
    pcp: "pcp",
    friends: "friends",
    specialist: "specialist",
    ads: "ads",
    starting: "starting",
  },
  weightTrend: {
    steadyLoss: "steady_loss",
    slowLoss: "slow_loss",
    same: "same",
    slowGain: "slow_gain",
    fastGain: "fast_gain",
  },
  priorAttempt: {
    diet: "diet_exercise",
    commercial: "commercial",
    dietitian: "dietitian",
    otherMeds: "other_meds",
    bariatric: "bariatric",
    none: "none",
  },
  diabetes: {
    t2dm: "t2dm",
    prediabetes: "prediabetes",
    atRisk: "at_risk",
    no: "no",
    unknown: "unknown",
  },
  bp: {
    controlled: "controlled",
    uncontrolled: "uncontrolled",
    borderline: "borderline",
    no: "no",
    unknown: "unknown",
  },
  cholesterol: { yes: "yes", borderline: "borderline", no: "no", unknown: "unknown" },
  cvEvent: { yes: "yes", no: "no", procedure: "procedure" },
  fattyLiver: { yes: "yes", suspected: "suspected", no: "no", unknown: "unknown" },
  sleepApnea: { cpap: "diagnosed_cpap", untreated: "diagnosed_untreated", suspected: "suspected", no: "no" },
  medication: {
    bp: "bp",
    statin: "statin",
    diabetes: "diabetes",
    thyroid: "thyroid",
    antidepressant: "antidepressant",
    steroids: "steroids",
    bloodThinner: "blood_thinner",
    other: "other",
    none: "none",
  },
  mtc: { self: "self", family: "family", no: "no", unknown: "unknown" },
  pancreatitis: { once: "once", multiple: "multiple", no: "no", unknown: "unknown" },
  giHistory: {
    gastroparesis: "gastroparesis",
    gerd: "gerd",
    ibd: "ibd",
    obstruction: "obstruction",
    constipation: "constipation",
    none: "none",
  },
  pregnancy: {
    pregnant: "pregnant",
    postpartum: "postpartum_not_breastfeeding",
    breastfeeding: "breastfeeding",
    planning: "planning",
    none: "none",
  },
  menopause: {
    notStarted: "not_started",
    perimenopause: "perimenopause",
    postmenopausal: "postmenopausal",
    surgical: "surgical",
    hrt: "hrt",
  },
  eatingDisorder: {
    currently: "currently",
    past: "past",
    struggled: "struggled",
    no: "no",
    preferNot: "prefer_not",
  },
  mentalHealth: {
    stable: "stable",
    managing: "managing",
    hardSupported: "hard_supported",
    struggling: "struggling",
    preferNot: "prefer_not",
  },
  kidneyLiver: { kidney: "kidney", liver: "liver", both: "both", no: "no", unknown: "unknown" },
  fracture: { minorFall: "minor_fall", seriousAccident: "serious_accident", no: "no" },
  familyOsteo: { yes: "yes", suspected: "suspected", no: "no", unknown: "unknown" },
  dexa: {
    osteoporosis: "osteoporosis",
    osteopenia: "osteopenia",
    normal: "normal",
    toldNotDone: "told_not_done",
    never: "never",
  },
  jointReplacement: { one: "one", multiple: "multiple", scheduled: "scheduled", considering: "considering", no: "no" },
  falls: { multiple: "multiple", once: "once", closeCalls: "close_calls", no: "no" },
  functionalDecline: {
    jointPain: "joint_pain",
    weakness: "weakness",
    tendon: "tendon",
    stairs: "stairs",
    none: "none",
  },
  activity: {
    veryActive: "very_active",
    active: "active",
    somewhat: "somewhat",
    sedentary: "sedentary",
    limited: "limited",
  },
  resistance: { thricePlus: "thrice_plus", onceTwice: "once_twice", occasionally: "occasionally", no: "no" },
  protein: {
    focus: "focus",
    good: "good",
    notEnough: "not_enough",
    dontThink: "dont_think",
    avoidAnimal: "avoid_animal",
  },
  smoking: { current: "current", quitRecent: "quit_recent", quitOld: "quit_old", never: "never" },
  alcohol: { none: "none", occasional: "occasional", fewWeekly: "few_weekly", daily: "daily", heavy: "heavy" },
  sleep: { good: "good", okay: "okay", struggle: "struggle", disorder: "disorder" },
  timeline: { asap: "asap", month: "month", threeMonths: "three_months", researching: "researching" },
  consultPref: { video: "video", phone: "phone", readMore: "read_more" },
} as const;

// Age buckets that count as "40 or older" (menopause gating) and "<60"
// (pregnancy gating).
const AGE_40_PLUS: string[] = [V.age.a40_49, V.age.a50_54, V.age.a55_64, V.age.a65_plus];
const AGE_UNDER_60: string[] = [
  V.age.a18_29,
  V.age.a30_39,
  V.age.a40_49,
  V.age.a50_54,
  V.age.a55_64,
];

// --- Response readers ------------------------------------------------------

export function getSingle(r: Responses, id: string): string | null {
  const a = r[id];
  return a && a.kind === "single" ? a.value : null;
}

export function isSingle(r: Responses, id: string, value: string): boolean {
  return getSingle(r, id) === value;
}

export function getMulti(r: Responses, id: string): string[] {
  const a = r[id];
  return a && a.kind === "multi" ? a.values : [];
}

export function hasMulti(r: Responses, id: string, value: string): boolean {
  return getMulti(r, id).includes(value);
}

export function hasAnyMulti(r: Responses, id: string, values: readonly string[]): boolean {
  const selected = getMulti(r, id);
  return values.some((v) => selected.includes(v));
}

/** Count of selected options, excluding the given values (typically "none"). */
export function multiCount(r: Responses, id: string, exclude: readonly string[] = []): number {
  return getMulti(r, id).filter((v) => !exclude.includes(v)).length;
}

export function getMeasure(r: Responses, id: string): number | null {
  const a = r[id];
  return a && a.kind === "measure" ? a.canonical : null;
}

export function getContact(
  r: Responses,
): { firstName: string; email: string; consentMarketing: boolean } | null {
  const a = r[Q.contact];
  return a && a.kind === "contact"
    ? { firstName: a.firstName, email: a.email, consentMarketing: a.consentMarketing }
    : null;
}

export function getText(r: Responses, id: string): string {
  const a = r[id];
  return a && a.kind === "text" ? a.value : "";
}

/** BMI from canonical height (cm) + weight (kg). Rounded to one decimal. */
export function computeBmi(r: Responses): number | null {
  const cm = getMeasure(r, Q.height);
  const kg = getMeasure(r, Q.weight);
  if (cm == null || kg == null || cm <= 0 || kg <= 0) return null;
  const m = cm / 100;
  return Math.round((kg / (m * m)) * 10) / 10;
}

// --- Hard stops ------------------------------------------------------------
// Absolute contraindications. Kept here (not in scoring.ts) because the
// branching engine needs them: a hard-stopped user skips Blocks F and G.

export function isHardStop(r: Responses): boolean {
  return hardStopReasons(r).length > 0;
}

export function hardStopReasons(r: Responses): string[] {
  const reasons: string[] = [];
  if (isSingle(r, Q.age, V.age.under18)) {
    reasons.push("under_18");
  }
  if (isSingle(r, Q.mtc, V.mtc.self) || isSingle(r, Q.mtc, V.mtc.family)) {
    reasons.push("mtc_men2");
  }
  if (isSingle(r, Q.pregnancy, V.pregnancy.pregnant) || isSingle(r, Q.pregnancy, V.pregnancy.breastfeeding)) {
    reasons.push("pregnancy");
  }
  if (isSingle(r, Q.eatingDisorder, V.eatingDisorder.currently)) {
    reasons.push("active_eating_disorder");
  }
  const bmi = computeBmi(r);
  if (bmi != null && bmi < 18.5) {
    reasons.push("bmi_under_18_5");
  }
  return reasons;
}

// --- Question definitions --------------------------------------------------

export interface Option {
  value: string;
  label: string;
  /** Selecting an exclusive option in a multi-select clears the others. */
  exclusive?: boolean;
}

interface BaseQuestion {
  id: string;
  block: BlockId;
  kind: QuestionKind;
  prompt: string;
  helper?: string;
  /** Shown only when this returns true (skip logic). */
  visibleWhen?: (r: Responses) => boolean;
}

export interface SingleQuestion extends BaseQuestion {
  kind: "single";
  options: Option[];
}
export interface MultiQuestion extends BaseQuestion {
  kind: "multi";
  options: Option[];
}
export interface MeasureQuestion extends BaseQuestion {
  kind: "measure";
  measure: MeasureKind;
}
export interface ContactQuestion extends BaseQuestion {
  kind: "contact";
}
export interface TextQuestion extends BaseQuestion {
  kind: "text";
  maxLength: number;
}

export type QuestionDef =
  | SingleQuestion
  | MultiQuestion
  | MeasureQuestion
  | ContactQuestion
  | TextQuestion;

// Branch predicates ---------------------------------------------------------
const isCurrentUser = (r: Responses) => isSingle(r, Q.journey, V.journey.current);
const isFormerUser = (r: Responses) =>
  isSingle(r, Q.journey, V.journey.former) || isSingle(r, Q.journey, V.journey.formerRestart);
const isProspectiveUser = (r: Responses) =>
  isSingle(r, Q.journey, V.journey.curious) || isSingle(r, Q.journey, V.journey.planning);
const notHardStopped = (r: Responses) => !isHardStop(r);

export const QUESTIONS: QuestionDef[] = [
  // ----- Block A: Warm-up --------------------------------------------------
  {
    id: Q.age,
    block: "A",
    kind: "single",
    prompt: "First, what's your age?",
    options: [
      { value: V.age.under18, label: "Under 18" },
      { value: V.age.a18_29, label: "18–29" },
      { value: V.age.a30_39, label: "30–39" },
      { value: V.age.a40_49, label: "40–49" },
      { value: V.age.a50_54, label: "50–54" },
      { value: V.age.a55_64, label: "55–64" },
      { value: V.age.a65_plus, label: "65 or older" },
    ],
  },
  {
    id: Q.sex,
    block: "A",
    kind: "single",
    prompt: "What sex were you assigned at birth?",
    helper: "This helps us apply the right clinical reference ranges.",
    options: [
      { value: V.sex.female, label: "Female" },
      { value: V.sex.male, label: "Male" },
      { value: V.sex.preferNot, label: "Prefer not to say" },
    ],
  },
  {
    id: Q.height,
    block: "A",
    kind: "measure",
    measure: "height",
    prompt: "What's your height?",
  },
  {
    id: Q.weight,
    block: "A",
    kind: "measure",
    measure: "weight",
    prompt: "And your current weight?",
    helper: "We use this with your height to calculate BMI — one input among several.",
  },
  {
    id: Q.journey,
    block: "A",
    kind: "single",
    prompt: "Where are you in your GLP-1 journey right now?",
    options: [
      { value: V.journey.curious, label: "I've never taken a GLP-1, and I'm curious whether I should consider it" },
      { value: V.journey.planning, label: "I've never taken one, but I'm actively planning to start" },
      { value: V.journey.current, label: "I'm currently taking one (Ozempic, Wegovy, Mounjaro, Zepbound, etc.)" },
      { value: V.journey.former, label: "I took one in the past and stopped" },
      { value: V.journey.formerRestart, label: "I took one in the past, stopped, and I'm considering restarting" },
    ],
  },
  {
    id: Q.concern,
    block: "A",
    kind: "single",
    prompt: "What matters most to you right now?",
    helper: "Pick the one that resonates most.",
    options: [
      { value: V.concern.weight, label: "Losing weight I haven't been able to lose any other way" },
      { value: V.concern.chronic, label: "Managing a chronic condition like diabetes or heart risk" },
      { value: V.concern.vitality, label: "Feeling stronger, more energetic, and aging well" },
      { value: V.concern.specialist, label: "Being managed by a specialist instead of just getting a prescription" },
      { value: V.concern.secondOpinion, label: "Getting a second opinion on whether my current treatment is right" },
    ],
  },

  // ----- Block B: GLP-1 context (conditional) ------------------------------
  // Current-user path (7 questions)
  {
    id: Q.curDrug,
    block: "B",
    kind: "single",
    prompt: "Which GLP-1 medication are you currently taking?",
    visibleWhen: isCurrentUser,
    options: [
      { value: V.drug.ozempic, label: "Ozempic (semaglutide, for diabetes)" },
      { value: V.drug.wegovy, label: "Wegovy (semaglutide, for weight loss)" },
      { value: V.drug.mounjaro, label: "Mounjaro (tirzepatide, for diabetes)" },
      { value: V.drug.zepbound, label: "Zepbound (tirzepatide, for weight loss)" },
      { value: V.drug.compSema, label: "Compounded semaglutide" },
      { value: V.drug.compTirz, label: "Compounded tirzepatide" },
      { value: V.drug.older, label: "Saxenda, Victoza, or Trulicity" },
      { value: V.drug.unsure, label: "I'm not sure — I just call it Ozempic" },
    ],
  },
  {
    id: Q.curDose,
    block: "B",
    kind: "single",
    prompt: "What dose are you currently on?",
    visibleWhen: isCurrentUser,
    options: [
      { value: V.dose.starting, label: "Just starting (lowest dose)" },
      { value: V.dose.titrating, label: "Working my way up (in titration)" },
      { value: V.dose.maintenance, label: "Maintenance dose (target or max dose)" },
      { value: V.dose.lowerByDesign, label: "Lower than the maximum, by design" },
      { value: V.dose.unknown, label: "I don't know my dose" },
    ],
  },
  {
    id: Q.curDuration,
    block: "B",
    kind: "single",
    prompt: "How long have you been on this medication?",
    visibleWhen: isCurrentUser,
    options: [
      { value: V.duration.lt3, label: "Less than 3 months" },
      { value: V.duration.m3_6, label: "3–6 months" },
      { value: V.duration.m6_12, label: "6–12 months" },
      { value: V.duration.y1_2, label: "1–2 years" },
      { value: V.duration.gt2, label: "More than 2 years" },
    ],
  },
  {
    id: Q.curManager,
    block: "B",
    kind: "single",
    prompt: "Who currently prescribes and manages your GLP-1 therapy?",
    visibleWhen: isCurrentUser,
    options: [
      { value: V.manager.pcp, label: "My primary care doctor" },
      { value: V.manager.endo, label: "An endocrinologist or obesity medicine specialist" },
      { value: V.manager.virtual, label: "A virtual weight management program (Calibrate, Form Health, Found, etc.)" },
      { value: V.manager.medspa, label: "A med spa or similar non-medical setting" },
      { value: V.manager.onlinePharmacy, label: "An online provider or compounding pharmacy" },
      { value: V.manager.nobody, label: "Nobody really manages it — I just get refills" },
    ],
  },
  {
    id: Q.curSideEffects,
    block: "B",
    kind: "multi",
    prompt: "What side effects have you experienced?",
    helper: "Select all that apply.",
    visibleWhen: isCurrentUser,
    options: [
      { value: V.sideEffect.nausea, label: "Severe nausea or vomiting" },
      { value: V.sideEffect.gi, label: "Diarrhea or constipation" },
      { value: V.sideEffect.fatigue, label: "Fatigue or feeling weaker than usual" },
      { value: V.sideEffect.muscle, label: "Loss of muscle tone or noticeable muscle weakness" },
      { value: V.sideEffect.joint, label: "Joint pain or stiffness" },
      { value: V.sideEffect.hair, label: "Hair thinning" },
      { value: V.sideEffect.mood, label: "Mood changes" },
      { value: V.sideEffect.skin, label: "Loose or sagging skin" },
      { value: V.sideEffect.reflux, label: "Acid reflux or heartburn" },
      { value: V.sideEffect.sulfur, label: "Sulfur burps" },
      { value: V.sideEffect.palpitations, label: "Heart palpitations" },
      { value: V.sideEffect.vision, label: "Vision changes" },
      { value: V.sideEffect.none, label: "None of these have been significant", exclusive: true },
    ],
  },
  {
    id: Q.curEfficacy,
    block: "B",
    kind: "single",
    prompt: "How well do you feel your current GLP-1 is working for you overall?",
    visibleWhen: isCurrentUser,
    options: [
      { value: V.efficacy.greatWantMonitoring, label: "It's working great — I just want better monitoring than I'm getting" },
      { value: V.efficacy.workingConcerns, label: "It's working, but I have concerns about side effects" },
      { value: V.efficacy.plateaued, label: "It's working, but the weight loss has slowed or plateaued" },
      { value: V.efficacy.unsureWorking, label: "I'm not sure it's working as well as I hoped" },
      { value: V.efficacy.unsureContinue, label: "I'm not sure I should still be on it" },
    ],
  },
  {
    id: Q.curWeightLost,
    block: "B",
    kind: "single",
    prompt: "About how much weight have you lost since starting your GLP-1?",
    visibleWhen: isCurrentUser,
    options: [
      { value: V.weightLost.lt10, label: "Less than 10 lb" },
      { value: V.weightLost.l10_20, label: "10–20 lb" },
      { value: V.weightLost.l20_40, label: "20–40 lb" },
      { value: V.weightLost.l40_60, label: "40–60 lb" },
      { value: V.weightLost.gt60, label: "More than 60 lb" },
    ],
  },

  // Former-user path (4 questions)
  {
    id: Q.formerDrug,
    block: "B",
    kind: "single",
    prompt: "Which GLP-1 did you take?",
    helper: "Most recent, if you've tried more than one.",
    visibleWhen: isFormerUser,
    options: [
      { value: V.drug.ozempic, label: "Ozempic (semaglutide, for diabetes)" },
      { value: V.drug.wegovy, label: "Wegovy (semaglutide, for weight loss)" },
      { value: V.drug.mounjaro, label: "Mounjaro (tirzepatide, for diabetes)" },
      { value: V.drug.zepbound, label: "Zepbound (tirzepatide, for weight loss)" },
      { value: V.drug.compSema, label: "Compounded semaglutide" },
      { value: V.drug.compTirz, label: "Compounded tirzepatide" },
      { value: V.drug.older, label: "Saxenda, Victoza, or Trulicity" },
      { value: V.drug.unsure, label: "I'm not sure" },
    ],
  },
  {
    id: Q.formerDuration,
    block: "B",
    kind: "single",
    prompt: "How long were you on it before stopping?",
    visibleWhen: isFormerUser,
    options: [
      { value: V.duration.lt3, label: "Less than 3 months" },
      { value: V.duration.m3_6, label: "3–6 months" },
      { value: V.duration.m6_12, label: "6–12 months" },
      { value: V.duration.y1_2, label: "1–2 years" },
      { value: V.duration.gt2, label: "More than 2 years" },
    ],
  },
  {
    id: Q.formerStop,
    block: "B",
    kind: "single",
    prompt: "Why did you stop?",
    visibleWhen: isFormerUser,
    options: [
      { value: V.formerStop.sideEffects, label: "Side effects were too difficult to manage" },
      { value: V.formerStop.cost, label: "Cost or insurance coverage changed" },
      { value: V.formerStop.reachedGoal, label: "I reached my weight loss goal" },
      { value: V.formerStop.notEnough, label: "I wasn't losing enough weight" },
      { value: V.formerStop.doctor, label: "My doctor recommended stopping" },
      { value: V.formerStop.other, label: "Other reason" },
    ],
  },
  {
    id: Q.formerSideEffects,
    block: "B",
    kind: "multi",
    prompt: "What side effects did you experience while on it?",
    helper: "Select all that apply.",
    visibleWhen: isFormerUser,
    options: [
      { value: V.sideEffect.nausea, label: "Severe nausea or vomiting" },
      { value: V.sideEffect.gi, label: "Diarrhea or constipation" },
      { value: V.sideEffect.fatigue, label: "Fatigue or feeling weaker than usual" },
      { value: V.sideEffect.muscle, label: "Loss of muscle tone or noticeable muscle weakness" },
      { value: V.sideEffect.joint, label: "Joint pain or stiffness" },
      { value: V.sideEffect.hair, label: "Hair thinning" },
      { value: V.sideEffect.mood, label: "Mood changes" },
      { value: V.sideEffect.skin, label: "Loose or sagging skin" },
      { value: V.sideEffect.other, label: "Other significant side effects" },
      { value: V.sideEffect.none, label: "None of these were significant", exclusive: true },
    ],
  },

  // Prospective-user path (2 questions)
  {
    id: Q.prospInsurance,
    block: "B",
    kind: "single",
    prompt: "Does your insurance currently cover GLP-1 medications?",
    visibleWhen: isProspectiveUser,
    options: [
      { value: V.insurance.yesWeightLoss, label: "Yes, for weight loss" },
      { value: V.insurance.yesDiabetes, label: "Yes, but only for diabetes" },
      { value: V.insurance.none, label: "No coverage" },
      { value: V.insurance.unsure, label: "I'm not sure / haven't checked" },
      { value: V.insurance.cash, label: "I plan to pay cash regardless" },
    ],
  },
  {
    id: Q.prospInfo,
    block: "B",
    kind: "multi",
    prompt: "How are you currently getting information about GLP-1s?",
    helper: "Select all that apply.",
    visibleWhen: isProspectiveUser,
    options: [
      { value: V.infoSource.online, label: "Online research and social media" },
      { value: V.infoSource.pcp, label: "From my primary care doctor" },
      { value: V.infoSource.friends, label: "From friends or family who take them" },
      { value: V.infoSource.specialist, label: "From a specialist or endocrinologist" },
      { value: V.infoSource.ads, label: "From marketing or advertisements" },
      { value: V.infoSource.starting, label: "I'm just starting to look into it", exclusive: true },
    ],
  },

  // ----- Block C: Weight history -------------------------------------------
  {
    id: Q.highestWeight,
    block: "C",
    kind: "measure",
    measure: "weight",
    prompt: "What's the highest you've weighed as an adult?",
    helper: "A rough number is fine.",
  },
  {
    id: Q.weightTrend,
    block: "C",
    kind: "single",
    prompt: "In the last 6 months, how would you describe your weight trend?",
    options: [
      { value: V.weightTrend.steadyLoss, label: "Steadily losing weight" },
      { value: V.weightTrend.slowLoss, label: "Slowly losing weight" },
      { value: V.weightTrend.same, label: "About the same" },
      { value: V.weightTrend.slowGain, label: "Slowly gaining weight" },
      { value: V.weightTrend.fastGain, label: "Gaining weight quickly" },
    ],
  },
  {
    id: Q.priorAttempts,
    block: "C",
    kind: "multi",
    prompt: "What weight loss approaches have you tried before?",
    helper: "Select all that apply.",
    options: [
      { value: V.priorAttempt.diet, label: "Diet and exercise on my own" },
      { value: V.priorAttempt.commercial, label: "Commercial programs (WW, Noom, etc.)" },
      { value: V.priorAttempt.dietitian, label: "Working with a nutritionist or dietitian" },
      { value: V.priorAttempt.otherMeds, label: "Other weight loss medications (phentermine, Contrave, etc.)" },
      { value: V.priorAttempt.bariatric, label: "Bariatric surgery" },
      { value: V.priorAttempt.none, label: "Nothing yet", exclusive: true },
    ],
  },

  // ----- Block D: Metabolic & cardiovascular -------------------------------
  {
    id: Q.diabetes,
    block: "D",
    kind: "single",
    prompt: "Have you been diagnosed with Type 2 diabetes or prediabetes?",
    options: [
      { value: V.diabetes.t2dm, label: "Yes, Type 2 diabetes" },
      { value: V.diabetes.prediabetes, label: "Yes, prediabetes" },
      { value: V.diabetes.atRisk, label: "No, but I've been told I'm at risk" },
      { value: V.diabetes.no, label: "No" },
      { value: V.diabetes.unknown, label: "I don't know" },
    ],
  },
  {
    id: Q.bloodPressure,
    block: "D",
    kind: "single",
    prompt: "Do you have high blood pressure?",
    options: [
      { value: V.bp.controlled, label: "Yes, controlled with medication" },
      { value: V.bp.uncontrolled, label: "Yes, not well controlled" },
      { value: V.bp.borderline, label: "Borderline" },
      { value: V.bp.no, label: "No" },
      { value: V.bp.unknown, label: "I don't know" },
    ],
  },
  {
    id: Q.cholesterol,
    block: "D",
    kind: "single",
    prompt: "Has a doctor ever told you that you have high cholesterol or high triglycerides?",
    options: [
      { value: V.cholesterol.yes, label: "Yes" },
      { value: V.cholesterol.borderline, label: "Borderline" },
      { value: V.cholesterol.no, label: "No" },
      { value: V.cholesterol.unknown, label: "I don't know" },
    ],
  },
  {
    id: Q.cvEvent,
    block: "D",
    kind: "single",
    prompt: "Have you ever had a heart attack, stroke, or other cardiovascular event?",
    options: [
      { value: V.cvEvent.yes, label: "Yes" },
      { value: V.cvEvent.procedure, label: "I had a procedure (stent, bypass, etc.) but no event" },
      { value: V.cvEvent.no, label: "No" },
    ],
  },
  {
    id: Q.fattyLiver,
    block: "D",
    kind: "single",
    prompt: "Have you been diagnosed with fatty liver disease (also called NAFLD or MASH)?",
    options: [
      { value: V.fattyLiver.yes, label: "Yes" },
      { value: V.fattyLiver.suspected, label: "Suspected but not formally diagnosed" },
      { value: V.fattyLiver.no, label: "No" },
      { value: V.fattyLiver.unknown, label: "I don't know" },
    ],
  },
  {
    id: Q.sleepApnea,
    block: "D",
    kind: "single",
    prompt: "Do you have sleep apnea, or have you been told you might?",
    options: [
      { value: V.sleepApnea.cpap, label: "Yes, diagnosed and using CPAP" },
      { value: V.sleepApnea.untreated, label: "Yes, diagnosed but not on treatment" },
      { value: V.sleepApnea.suspected, label: "Suspected but not diagnosed" },
      { value: V.sleepApnea.no, label: "No" },
    ],
  },
  {
    id: Q.medications,
    block: "D",
    kind: "multi",
    prompt: "Do you take any medications regularly?",
    helper: "Select all that apply.",
    options: [
      { value: V.medication.bp, label: "Blood pressure medication" },
      { value: V.medication.statin, label: "Cholesterol medication (statins)" },
      { value: V.medication.diabetes, label: "Diabetes medication (metformin, insulin, etc.)" },
      { value: V.medication.thyroid, label: "Thyroid medication" },
      { value: V.medication.antidepressant, label: "Antidepressants or anti-anxiety medications" },
      { value: V.medication.steroids, label: "Steroids (prednisone, etc.) regularly" },
      { value: V.medication.bloodThinner, label: "Blood thinners" },
      { value: V.medication.other, label: "Other" },
      { value: V.medication.none, label: "None", exclusive: true },
    ],
  },

  // ----- Block E: Contraindications & red flags ----------------------------
  {
    id: Q.mtc,
    block: "E",
    kind: "single",
    prompt: "Have you or anyone in your immediate family ever had medullary thyroid cancer, or a condition called MEN2?",
    options: [
      { value: V.mtc.self, label: "Yes, I have" },
      { value: V.mtc.family, label: "Yes, a family member has" },
      { value: V.mtc.no, label: "No" },
      { value: V.mtc.unknown, label: "I don't know" },
    ],
  },
  {
    id: Q.pancreatitis,
    block: "E",
    kind: "single",
    prompt: "Have you ever been hospitalized for pancreatitis (inflammation of the pancreas)?",
    options: [
      { value: V.pancreatitis.once, label: "Yes, once" },
      { value: V.pancreatitis.multiple, label: "Yes, more than once" },
      { value: V.pancreatitis.no, label: "No" },
      { value: V.pancreatitis.unknown, label: "I'm not sure / never told" },
    ],
  },
  {
    id: Q.giHistory,
    block: "E",
    kind: "multi",
    prompt: "Do you have a history of any of these gastrointestinal conditions?",
    helper: "Select all that apply.",
    options: [
      { value: V.giHistory.gastroparesis, label: "Gastroparesis (slow stomach emptying)" },
      { value: V.giHistory.gerd, label: "Severe acid reflux or GERD" },
      { value: V.giHistory.ibd, label: "Inflammatory bowel disease (Crohn's, ulcerative colitis)" },
      { value: V.giHistory.obstruction, label: "History of bowel obstruction" },
      { value: V.giHistory.constipation, label: "Severe chronic constipation" },
      { value: V.giHistory.none, label: "None of these", exclusive: true },
    ],
  },
  {
    id: Q.pregnancy,
    block: "E",
    kind: "single",
    prompt: "Are you currently pregnant, recently postpartum, or planning to become pregnant in the next year?",
    visibleWhen: (r) =>
      isSingle(r, Q.sex, V.sex.female) && AGE_UNDER_60.includes(getSingle(r, Q.age) ?? ""),
    options: [
      { value: V.pregnancy.pregnant, label: "Currently pregnant" },
      { value: V.pregnancy.postpartum, label: "Postpartum within 6 months (and not breastfeeding)" },
      { value: V.pregnancy.breastfeeding, label: "Breastfeeding" },
      { value: V.pregnancy.planning, label: "Planning to become pregnant in the next year" },
      { value: V.pregnancy.none, label: "None of the above" },
    ],
  },
  {
    id: Q.menopause,
    block: "E",
    kind: "single",
    prompt: "Where are you in menopause?",
    visibleWhen: (r) =>
      isSingle(r, Q.sex, V.sex.female) && AGE_40_PLUS.includes(getSingle(r, Q.age) ?? ""),
    options: [
      { value: V.menopause.notStarted, label: "I haven't started menopause symptoms" },
      { value: V.menopause.perimenopause, label: "I'm in perimenopause (irregular periods, symptoms starting)" },
      { value: V.menopause.postmenopausal, label: "I'm post-menopausal (no period for 12+ months)" },
      { value: V.menopause.surgical, label: "I had surgical menopause (hysterectomy, oophorectomy)" },
      { value: V.menopause.hrt, label: "I'm on hormone replacement therapy" },
    ],
  },
  {
    id: Q.eatingDisorder,
    block: "E",
    kind: "single",
    prompt: "Have you ever been treated for an eating disorder?",
    options: [
      { value: V.eatingDisorder.currently, label: "Yes, currently" },
      { value: V.eatingDisorder.past, label: "Yes, in the past" },
      { value: V.eatingDisorder.struggled, label: "I've struggled but never been formally treated" },
      { value: V.eatingDisorder.no, label: "No" },
      { value: V.eatingDisorder.preferNot, label: "Prefer not to say" },
    ],
  },
  {
    id: Q.mentalHealth,
    block: "E",
    kind: "single",
    prompt: "How is your mental health right now?",
    options: [
      { value: V.mentalHealth.stable, label: "Stable, no current concerns" },
      { value: V.mentalHealth.managing, label: "Generally well, but managing anxiety or depression" },
      { value: V.mentalHealth.hardSupported, label: "Going through a hard time, but supported" },
      { value: V.mentalHealth.struggling, label: "Struggling and not sure where to turn" },
      { value: V.mentalHealth.preferNot, label: "Prefer not to say" },
    ],
  },
  {
    id: Q.kidneyLiver,
    block: "E",
    kind: "single",
    prompt: "Do you have any known kidney or liver problems?",
    options: [
      { value: V.kidneyLiver.kidney, label: "Yes, kidney disease" },
      { value: V.kidneyLiver.liver, label: "Yes, liver disease (other than fatty liver)" },
      { value: V.kidneyLiver.both, label: "Yes, both" },
      { value: V.kidneyLiver.no, label: "No" },
      { value: V.kidneyLiver.unknown, label: "I don't know" },
    ],
  },

  // ----- Block F: Bone, joint & fracture history (skipped on hard stop) -----
  {
    id: Q.fracture,
    block: "F",
    kind: "single",
    prompt: "Have you ever broken a bone as an adult?",
    helper: "Other than fingers, toes, or sports injuries from impact.",
    visibleWhen: notHardStopped,
    options: [
      { value: V.fracture.minorFall, label: "Yes, from a minor fall or low-impact event" },
      { value: V.fracture.seriousAccident, label: "Yes, but from a serious accident (car crash, etc.)" },
      { value: V.fracture.no, label: "No" },
    ],
  },
  {
    id: Q.familyOsteo,
    block: "F",
    kind: "single",
    prompt: "Has anyone in your immediate family (parent, sibling) had osteoporosis or a hip fracture?",
    visibleWhen: notHardStopped,
    options: [
      { value: V.familyOsteo.yes, label: "Yes" },
      { value: V.familyOsteo.suspected, label: "Suspected but not confirmed" },
      { value: V.familyOsteo.no, label: "No" },
      { value: V.familyOsteo.unknown, label: "I don't know" },
    ],
  },
  {
    id: Q.dexa,
    block: "F",
    kind: "single",
    prompt: "Have you ever had a bone density scan (DEXA scan)?",
    visibleWhen: notHardStopped,
    options: [
      { value: V.dexa.osteoporosis, label: "Yes, and I have osteoporosis" },
      { value: V.dexa.osteopenia, label: "Yes, and I have osteopenia (low bone mass, but not osteoporosis)" },
      { value: V.dexa.normal, label: "Yes, and the results were normal" },
      { value: V.dexa.toldNotDone, label: "I've been told I should get one, but haven't" },
      { value: V.dexa.never, label: "No, and it's never been suggested" },
    ],
  },
  {
    id: Q.jointReplacement,
    block: "F",
    kind: "single",
    prompt: "Have you had any joint replacements (hip, knee, shoulder)?",
    visibleWhen: notHardStopped,
    options: [
      { value: V.jointReplacement.one, label: "Yes, one" },
      { value: V.jointReplacement.multiple, label: "Yes, multiple" },
      { value: V.jointReplacement.scheduled, label: "Scheduled for one" },
      { value: V.jointReplacement.considering, label: "Considering one" },
      { value: V.jointReplacement.no, label: "No" },
    ],
  },
  {
    id: Q.falls,
    block: "F",
    kind: "single",
    prompt: "In the last year, have you fallen?",
    visibleWhen: notHardStopped,
    options: [
      { value: V.falls.multiple, label: "Yes, more than once" },
      { value: V.falls.once, label: "Yes, once" },
      { value: V.falls.closeCalls, label: "I've had close calls, but no actual falls" },
      { value: V.falls.no, label: "No" },
    ],
  },
  {
    id: Q.functionalDecline,
    block: "F",
    kind: "multi",
    prompt: "Do any of these currently limit your activity?",
    helper: "Select all that apply.",
    visibleWhen: notHardStopped,
    options: [
      { value: V.functionalDecline.jointPain, label: "Persistent joint pain" },
      { value: V.functionalDecline.weakness, label: "Muscle weakness or feeling weaker than I used to" },
      { value: V.functionalDecline.tendon, label: "Tendon pain or a recent tendon injury" },
      { value: V.functionalDecline.stairs, label: "Difficulty climbing stairs or rising from a chair" },
      { value: V.functionalDecline.none, label: "None of these", exclusive: true },
    ],
  },

  // ----- Block G: Functional & lifestyle (skipped on hard stop) ------------
  {
    id: Q.activity,
    block: "G",
    kind: "single",
    prompt: "How would you describe your activity level right now?",
    visibleWhen: notHardStopped,
    options: [
      { value: V.activity.veryActive, label: "Very active (vigorous exercise 4+ days/week)" },
      { value: V.activity.active, label: "Active (moderate exercise 2–3 days/week)" },
      { value: V.activity.somewhat, label: "Somewhat active (light activity, walks, occasional exercise)" },
      { value: V.activity.sedentary, label: "Mostly sedentary (long periods sitting, minimal exercise)" },
      { value: V.activity.limited, label: "Limited by pain, injury, or other health issues" },
    ],
  },
  {
    id: Q.resistance,
    block: "G",
    kind: "single",
    prompt: "Do you do any resistance or strength training (weights, bands, bodyweight exercises)?",
    visibleWhen: notHardStopped,
    options: [
      { value: V.resistance.thricePlus, label: "Yes, 3 or more times a week" },
      { value: V.resistance.onceTwice, label: "Yes, 1–2 times a week" },
      { value: V.resistance.occasionally, label: "Occasionally, but not regularly" },
      { value: V.resistance.no, label: "No" },
    ],
  },
  {
    id: Q.protein,
    block: "G",
    kind: "single",
    prompt: "How would you rate your protein intake on a typical day?",
    visibleWhen: notHardStopped,
    options: [
      { value: V.protein.focus, label: "I focus on it — protein at every meal, often above 100g/day" },
      { value: V.protein.good, label: "I usually get a good amount, but don't track it" },
      { value: V.protein.notEnough, label: "I eat protein, but probably not enough" },
      { value: V.protein.dontThink, label: "Honestly, I don't think about it much" },
      { value: V.protein.avoidAnimal, label: "I avoid most animal protein (vegetarian, vegan, or by preference)" },
    ],
  },
  {
    id: Q.smoking,
    block: "G",
    kind: "single",
    prompt: "Do you smoke (cigarettes, vaping, or other tobacco)?",
    visibleWhen: notHardStopped,
    options: [
      { value: V.smoking.current, label: "Yes, currently" },
      { value: V.smoking.quitRecent, label: "I quit within the last 5 years" },
      { value: V.smoking.quitOld, label: "I quit more than 5 years ago" },
      { value: V.smoking.never, label: "Never" },
    ],
  },
  {
    id: Q.alcohol,
    block: "G",
    kind: "single",
    prompt: "How much alcohol do you typically drink?",
    visibleWhen: notHardStopped,
    options: [
      { value: V.alcohol.none, label: "I don't drink" },
      { value: V.alcohol.occasional, label: "Occasionally, less than once a week" },
      { value: V.alcohol.fewWeekly, label: "A few drinks a week" },
      { value: V.alcohol.daily, label: "Daily or near-daily" },
      { value: V.alcohol.heavy, label: "Heavy at times" },
    ],
  },
  {
    id: Q.sleep,
    block: "G",
    kind: "single",
    prompt: "How would you describe your sleep, on average?",
    visibleWhen: notHardStopped,
    options: [
      { value: V.sleep.good, label: "I sleep well most nights, 7–9 hours" },
      { value: V.sleep.okay, label: "I sleep okay, but not always 7+ hours" },
      { value: V.sleep.struggle, label: "I struggle with sleep regularly" },
      { value: V.sleep.disorder, label: "I have a diagnosed sleep disorder" },
    ],
  },

  // ----- Block H: Closing — motivation & logistics -------------------------
  {
    id: Q.timeline,
    block: "H",
    kind: "single",
    prompt: "What's your timeline for taking action on this?",
    options: [
      { value: V.timeline.asap, label: "As soon as possible — within the next 2 weeks" },
      { value: V.timeline.month, label: "Within the next month" },
      { value: V.timeline.threeMonths, label: "Within the next 3 months" },
      { value: V.timeline.researching, label: "Just researching for now" },
    ],
  },
  {
    id: Q.consultPref,
    block: "H",
    kind: "single",
    prompt: "How would you prefer your first consult to happen?",
    options: [
      { value: V.consultPref.video, label: "Video call with the clinical team" },
      { value: V.consultPref.phone, label: "Phone call first, to learn more before committing" },
      { value: V.consultPref.readMore, label: "I'd like to read more before deciding" },
    ],
  },
  {
    id: Q.state,
    block: "H",
    kind: "single",
    prompt: "Which state do you live in?",
    helper: "MetaOrtho is a telemedicine practice; consults are available only where our clinicians are licensed. Your Profile is yours regardless of where you live.",
    // Options come from the canonical licensure list so this never drifts.
    options: STATES.map((s) => ({ value: s.code, label: s.name })),
  },
  {
    id: Q.contact,
    block: "H",
    kind: "contact",
    prompt: "Where should we send your GLP-1 Management Profile?",
    helper: "We'll show it on the next screen and email you a copy.",
  },
  {
    id: Q.freeText,
    block: "H",
    kind: "text",
    maxLength: 500,
    prompt: "Anything else you'd like Dr. Latif and Dr. Saenz to know before your consult?",
    helper: "Optional — but it helps us prepare.",
  },
];

// --- Sequence / progress helpers -------------------------------------------

/** The ordered list of questions currently visible given the responses. */
export function getVisibleQuestions(r: Responses): QuestionDef[] {
  return QUESTIONS.filter((q) => !q.visibleWhen || q.visibleWhen(r));
}

/** Whether a question has a usable answer (required-field gate for the UI). */
export function isAnswered(q: QuestionDef, r: Responses): boolean {
  const a = r[q.id];
  if (!a) return q.kind === "text"; // free text is always optional
  switch (a.kind) {
    case "single":
      return a.value.length > 0;
    case "multi":
      return a.values.length > 0;
    case "measure":
      return a.canonical > 0;
    case "contact":
      return a.firstName.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email);
    case "text":
      return true;
  }
}

export const isMeasureQuestion = (q: QuestionDef): q is MeasureQuestion => q.kind === "measure";

/** Convenience for the API/telemetry: total potential question count. */
export function totalQuestionCount(): number {
  return QUESTIONS.length;
}
