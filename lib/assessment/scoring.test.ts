// Unit tests for the deterministic scoring engine. Run with `npm test`
// (node --test, native TypeScript). Excluded from the Next build via tsconfig.
import { test } from "node:test";
import assert from "node:assert/strict";

import type { MeasureUnit, Responses } from "./types.ts";
import { computeBmi, Q, V } from "./questions.ts";
import {
  assessCandidacy,
  computeComplexity,
  computeDrugFlags,
  scoreAssessment,
  velocityLbPerWeek,
} from "./scoring.ts";

// --- builders --------------------------------------------------------------
const S = (value: string) => ({ kind: "single" as const, value });
const M = (...values: string[]) => ({ kind: "multi" as const, values });
const meas = (canonical: number, unit: MeasureUnit) => ({ kind: "measure" as const, canonical, unit, display: "" });

/** A baseline respondent with no disqualifiers and a 0-point complexity score. */
function base(): Responses {
  return {
    [Q.age]: S(V.age.a40_49),
    [Q.sex]: S(V.sex.male),
    [Q.height]: meas(175, "cm"),
    [Q.weight]: meas(80, "kg"), // BMI ~26.1
    [Q.journey]: S(V.journey.curious),
    [Q.mtc]: S(V.mtc.no),
    [Q.pancreatitis]: S(V.pancreatitis.no),
    [Q.giHistory]: M(V.giHistory.none),
    [Q.pregnancy]: S(V.pregnancy.none),
    [Q.eatingDisorder]: S(V.eatingDisorder.no),
    [Q.mentalHealth]: S(V.mentalHealth.stable),
    [Q.kidneyLiver]: S(V.kidneyLiver.no),
    [Q.diabetes]: S(V.diabetes.no),
    [Q.bloodPressure]: S(V.bp.no),
    [Q.cholesterol]: S(V.cholesterol.no),
    [Q.cvEvent]: S(V.cvEvent.no),
    [Q.fattyLiver]: S(V.fattyLiver.no),
    [Q.sleepApnea]: S(V.sleepApnea.no),
    [Q.medications]: M(V.medication.none),
    [Q.fracture]: S(V.fracture.no),
    [Q.familyOsteo]: S(V.familyOsteo.no),
    [Q.dexa]: S(V.dexa.never),
    [Q.jointReplacement]: S(V.jointReplacement.no),
    [Q.falls]: S(V.falls.no),
    [Q.functionalDecline]: M(V.functionalDecline.none),
    [Q.activity]: S(V.activity.active),
    [Q.resistance]: S(V.resistance.onceTwice),
    [Q.protein]: S(V.protein.good),
    [Q.smoking]: S(V.smoking.never),
    [Q.alcohol]: S(V.alcohol.occasional),
    [Q.sleep]: S(V.sleep.good),
  };
}
const w = (over: Responses): Responses => ({ ...base(), ...over });

// --- BMI --------------------------------------------------------------------
test("computeBmi rounds to one decimal", () => {
  assert.equal(computeBmi(base()), 26.1);
  assert.equal(computeBmi(w({ [Q.weight]: meas(95, "kg") })), 31);
  assert.equal(computeBmi({}), null);
});

// --- Candidacy: hard stops --------------------------------------------------
test("candidacy hard stops → not_candidate", () => {
  const cases: Responses[] = [
    w({ [Q.age]: S(V.age.under18) }),
    w({ [Q.mtc]: S(V.mtc.self) }),
    w({ [Q.mtc]: S(V.mtc.family) }),
    w({ [Q.sex]: S(V.sex.female), [Q.pregnancy]: S(V.pregnancy.pregnant) }),
    w({ [Q.sex]: S(V.sex.female), [Q.pregnancy]: S(V.pregnancy.breastfeeding) }),
    w({ [Q.eatingDisorder]: S(V.eatingDisorder.currently) }),
    w({ [Q.weight]: meas(52, "kg") }), // BMI ~17
  ];
  for (const c of cases) {
    const res = assessCandidacy(c);
    assert.equal(res.level, "not_candidate");
    assert.equal(res.hardStop, true);
    assert.ok(res.reasons.length > 0);
  }
});

// --- Candidacy: strong / candidate / caveats -------------------------------
test("candidacy strong candidate", () => {
  assert.equal(assessCandidacy(w({ [Q.weight]: meas(95, "kg") })).level, "strong_candidate"); // BMI 31
  assert.equal(assessCandidacy(w({ [Q.diabetes]: S(V.diabetes.t2dm) })).level, "strong_candidate");
  assert.equal(assessCandidacy(w({ [Q.cvEvent]: S(V.cvEvent.yes) })).level, "strong_candidate");
  assert.equal(assessCandidacy(w({ [Q.fattyLiver]: S(V.fattyLiver.suspected) })).level, "strong_candidate");
});

test("candidacy candidate", () => {
  assert.equal(assessCandidacy(w({ [Q.weight]: meas(86, "kg") })).level, "candidate"); // BMI ~28, ≥27
  assert.equal(
    assessCandidacy(w({ [Q.weight]: meas(80, "kg"), [Q.diabetes]: S(V.diabetes.prediabetes) })).level,
    "candidate", // BMI ~26 + comorbidity
  );
});

test("candidacy caveats", () => {
  // BMI just below threshold, no comorbidity.
  assert.equal(assessCandidacy(base()).level, "possible_caveats");
  // Relative contraindications downgrade even with a strong BMI.
  assert.equal(
    assessCandidacy(w({ [Q.weight]: meas(95, "kg"), [Q.pancreatitis]: S(V.pancreatitis.once) })).level,
    "possible_caveats",
  );
  assert.equal(
    assessCandidacy(w({ [Q.weight]: meas(95, "kg"), [Q.giHistory]: M(V.giHistory.gastroparesis) })).level,
    "possible_caveats",
  );
  assert.equal(
    assessCandidacy(w({ [Q.weight]: meas(95, "kg"), [Q.mentalHealth]: S(V.mentalHealth.struggling) })).level,
    "possible_caveats",
  );
  assert.equal(
    assessCandidacy(w({ [Q.weight]: meas(95, "kg"), [Q.kidneyLiver]: S(V.kidneyLiver.kidney) })).level,
    "possible_caveats",
  );
});

// --- Velocity ---------------------------------------------------------------
test("weight-loss velocity", () => {
  assert.equal(velocityLbPerWeek(base()), null); // not a current user
  const fast = w({
    [Q.journey]: S(V.journey.current),
    [Q.curWeightLost]: S(V.weightLost.gt60),
    [Q.curDuration]: S(V.duration.m3_6),
  });
  assert.ok((velocityLbPerWeek(fast) ?? 0) > 3); // 70 / 19.5 ≈ 3.6
});

// --- Complexity: overrides --------------------------------------------------
test("complexity overrides force high_risk", () => {
  const overrides: Responses[] = [
    w({ [Q.age]: S(V.age.a65_plus) }),
    w({ [Q.dexa]: S(V.dexa.osteoporosis) }),
    w({ [Q.fracture]: S(V.fracture.minorFall) }),
    w({ [Q.falls]: S(V.falls.multiple) }),
    w({
      [Q.journey]: S(V.journey.current),
      [Q.curWeightLost]: S(V.weightLost.gt60),
      [Q.curDuration]: S(V.duration.m3_6),
    }),
  ];
  for (const c of overrides) {
    const res = computeComplexity(c);
    assert.equal(res.tier, "high_risk");
    assert.ok(res.overrides.length > 0);
  }
});

// --- Complexity: thresholds + mitigators ------------------------------------
test("complexity tiers by weighted score", () => {
  assert.equal(computeComplexity(base()).tier, "standard"); // 0 points

  // Enhanced: post-menopausal (+3) + family history (+2) = 5
  const enhanced = computeComplexity(
    w({ [Q.sex]: S(V.sex.female), [Q.menopause]: S(V.menopause.postmenopausal), [Q.familyOsteo]: S(V.familyOsteo.yes) }),
  );
  assert.equal(enhanced.score, 5);
  assert.equal(enhanced.tier, "enhanced");
  assert.equal(enhanced.overrides.length, 0);

  // High-risk by score (no override): post-menopausal (+3) + osteopenia (+3) + family (+2) = 8
  const highByScore = computeComplexity(
    w({
      [Q.sex]: S(V.sex.female),
      [Q.menopause]: S(V.menopause.postmenopausal),
      [Q.dexa]: S(V.dexa.osteopenia),
      [Q.familyOsteo]: S(V.familyOsteo.yes),
    }),
  );
  assert.equal(highByScore.score, 8);
  assert.equal(highByScore.tier, "high_risk");
  assert.equal(highByScore.overrides.length, 0);

  // Mitigators subtract: post-menopausal (+3) + T2DM (-1) + HRT? (menopause is exclusive) → use resistance 3+/wk (-1)
  const mitigated = computeComplexity(
    w({
      [Q.sex]: S(V.sex.female),
      [Q.menopause]: S(V.menopause.postmenopausal),
      [Q.diabetes]: S(V.diabetes.t2dm),
      [Q.resistance]: S(V.resistance.thricePlus),
    }),
  );
  assert.equal(mitigated.score, 1); // 3 - 1 - 1
  assert.equal(mitigated.tier, "standard");
});

test("complexity v2 drug-related factors", () => {
  const res = computeComplexity(
    w({
      [Q.journey]: S(V.journey.current),
      [Q.curSideEffects]: M(V.sideEffect.nausea, V.sideEffect.gi, V.sideEffect.muscle),
    }),
  );
  // severe GI (+2) + muscle weakness (+2) + 3-or-more side effects (+1) = 5
  assert.equal(res.score, 5);
  assert.equal(res.tier, "enhanced");
});

// --- Drug flags -------------------------------------------------------------
test("drug flags trigger and cap at 3 by priority", () => {
  const many = w({
    [Q.cvEvent]: S(V.cvEvent.yes),
    [Q.diabetes]: S(V.diabetes.t2dm),
    [Q.fattyLiver]: S(V.fattyLiver.yes),
    [Q.sleepApnea]: S(V.sleepApnea.cpap),
  });
  const flags = computeDrugFlags(many, "standard");
  assert.equal(flags.length, 3);
  assert.deepEqual(
    flags.map((f) => f.key),
    ["cvd", "t2dm", "mash"], // osa (priority 4) drops off
  );
});

test("msk_high_risk flag tracks complexity tier", () => {
  assert.deepEqual(computeDrugFlags(base(), "high_risk").map((f) => f.key), ["msk_high_risk"]);
  assert.deepEqual(computeDrugFlags(base(), "standard").map((f) => f.key), []);
});

test("compounded + pregnancy-planning flags", () => {
  assert.ok(
    computeDrugFlags(w({ [Q.journey]: S(V.journey.current), [Q.curDrug]: S(V.drug.compSema) }), "standard")
      .some((f) => f.key === "compounded"),
  );
  assert.ok(
    computeDrugFlags(w({ [Q.sex]: S(V.sex.female), [Q.pregnancy]: S(V.pregnancy.planning) }), "standard")
      .some((f) => f.key === "pregnancy_planning"),
  );
});

// --- Integration ------------------------------------------------------------
test("scoreAssessment combines all three outputs", () => {
  const res = scoreAssessment(w({ [Q.weight]: meas(95, "kg"), [Q.diabetes]: S(V.diabetes.t2dm) }));
  assert.equal(res.candidacy.level, "strong_candidate");
  assert.ok(res.flags.some((f) => f.key === "t2dm"));
  assert.equal(res.complexity.tier, "standard");
  assert.equal(res.bmi, 31);
});
