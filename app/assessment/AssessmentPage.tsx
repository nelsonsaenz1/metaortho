"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";
import {
  getContact,
  getSingle,
  getVisibleQuestions,
  isAnswered,
  Q,
  type MeasureQuestion,
  type Option,
  type QuestionDef,
} from "@/lib/assessment/questions";
import { scoreAssessment } from "@/lib/assessment/scoring";
import { buildProfile, CANDIDACY_LABEL, TIER_LABEL } from "@/lib/assessment/profile";
import { track } from "@/lib/assessment/telemetry";
import type {
  Answer,
  CandidacyLevel,
  ManagementProfile,
  MeasureUnit,
  Responses,
} from "@/lib/assessment/types";
import { getStateByCode, isLicensed, licensedStatesCopy } from "@/lib/states";

const ease = [0.23, 1, 0.32, 1] as const;

// Booking destination. Wire this to the Healthie scheduling URL once live; it
// falls back to the existing lead-capture page during the pre-launch phase.
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "/book";

// Persist progress + the completed Profile to sessionStorage so the assessment
// survives a page reload (including Next dev Fast Refresh) and the user can
// resume — the result stays on screen instead of vanishing. Ephemeral by
// design: sessionStorage is per-tab and clears when the tab closes.
const STORAGE_KEY = "metaortho-assessment-v2";

const BLOCK_LABEL: Record<string, string> = {
  A: "About you",
  B: "Your GLP-1",
  C: "Weight history",
  D: "Your health",
  E: "Your health",
  F: "Bone & joint health",
  G: "Daily habits",
  H: "Last step",
};

// --- unit conversion -------------------------------------------------------
const ftInToCm = (ft: number, inch: number) => (ft * 12 + inch) * 2.54;
const cmToFtIn = (cm: number) => {
  const totalInches = cm / 2.54;
  let ft = Math.floor(totalInches / 12);
  let inch = Math.round(totalInches - ft * 12);
  if (inch === 12) {
    ft += 1;
    inch = 0;
  }
  return { ft, inch };
};
const lbToKg = (lb: number) => lb * 0.453592;
const kgToLb = (kg: number) => kg / 0.453592;
const round1 = (n: number) => Math.round(n * 10) / 10;

export default function AssessmentPage() {
  const [responses, setResponses] = useState<Responses>({});
  const [index, setIndex] = useState(0);
  const [profile, setProfile] = useState<ManagementProfile | null>(null);
  const [completedAt, setCompletedAt] = useState<Date | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  // Gates the persistence effect until after the restore effect has run, so we
  // never overwrite saved data with the initial empty state on mount.
  const [hydrated, setHydrated] = useState(false);

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const startedRef = useRef(false);

  const visible = useMemo(() => getVisibleQuestions(responses), [responses]);
  const total = visible.length;
  const clampedIndex = Math.min(index, total - 1);
  const current = visible[clampedIndex];
  const isLast = clampedIndex === total - 1;
  const progress = profile ? 100 : Math.round((clampedIndex / total) * 100);

  // Move focus to the question (or result) heading on each step — keyboard and
  // screen-reader users land on the new content rather than the top of the page.
  useEffect(() => {
    headingRef.current?.focus();
  }, [clampedIndex, profile]);

  // Fire "started" once, and report drop-off if the user leaves mid-quiz.
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      track({ type: "quiz_started" });
    }
  }, []);

  useEffect(() => {
    const onLeave = () => {
      if (!profile && current) {
        track({ type: "quiz_abandoned", lastQuestionId: current.id, index: clampedIndex, total });
      }
    };
    window.addEventListener("pagehide", onLeave);
    return () => window.removeEventListener("pagehide", onLeave);
  }, [profile, current, clampedIndex, total]);

  // Restore a saved session on mount: resume mid-quiz, or re-show a completed
  // Profile after a reload. Client-only (no sessionStorage during SSR), so the
  // server still renders Q1 and hydration matches; the restore then re-renders.
  /* eslint-disable react-hooks/set-state-in-effect -- one-time restore from
     sessionStorage on mount; a lazy useState initializer would read storage
     during SSR and cause a hydration mismatch. */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as {
          responses?: Responses;
          index?: number;
          completed?: boolean;
          completedAt?: string | null;
        };
        if (saved.responses && typeof saved.responses === "object") {
          setResponses(saved.responses);
          if (typeof saved.index === "number") setIndex(saved.index);
          if (saved.completed) {
            // Profiles are deterministic, so we recompute rather than serialize.
            const score = scoreAssessment(saved.responses);
            setProfile(buildProfile(score, saved.responses));
            setCompletedAt(saved.completedAt ? new Date(saved.completedAt) : new Date());
          }
        }
      }
    } catch {
      // Corrupt/unavailable storage — start fresh.
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persist on every change once hydrated; clear when the session is reset.
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (Object.keys(responses).length === 0 && !profile) {
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            responses,
            index,
            completed: !!profile,
            completedAt: completedAt ? completedAt.toISOString() : null,
          }),
        );
      }
    } catch {
      // Storage full/unavailable — non-fatal.
    }
  }, [responses, index, profile, completedAt, hydrated]);

  function setAnswer(id: string, answer: Answer) {
    setResponses((prev) => ({ ...prev, [id]: answer }));
  }

  // Advance relative to the question we just answered, recomputing visibility
  // from the *new* responses so branch additions/removals are handled cleanly.
  function advanceFrom(next: Responses, questionId: string) {
    const nextVisible = getVisibleQuestions(next);
    const curIdx = nextVisible.findIndex((q) => q.id === questionId);
    const nextIdx = curIdx + 1;
    if (curIdx === -1 || nextIdx >= nextVisible.length) {
      finalize(next);
    } else {
      setIndex(nextIdx);
    }
  }

  function handleSingle(q: QuestionDef, value: string) {
    const next: Responses = { ...responses, [q.id]: { kind: "single", value } };
    setResponses(next);
    track({ type: "question_answered", questionId: q.id, index: clampedIndex });
    advanceFrom(next, q.id);
  }

  function handleContinue() {
    if (!current) return;
    track({ type: "question_answered", questionId: current.id, index: clampedIndex });
    advanceFrom(responses, current.id);
  }

  function goBack() {
    if (clampedIndex > 0) setIndex(clampedIndex - 1);
  }

  function finalize(finalResponses: Responses) {
    const score = scoreAssessment(finalResponses);
    const built = buildProfile(score, finalResponses);
    const now = new Date();
    setProfile(built);
    setCompletedAt(now);
    // Persist synchronously so the completed Profile survives even if a reload
    // fires moments later (e.g. Next dev recompiling /api/assessment on first POST).
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ responses: finalResponses, index, completed: true, completedAt: now.toISOString() }),
      );
    } catch {
      // non-fatal
    }
    track({
      type: "quiz_completed",
      candidacy: score.candidacy.level,
      tier: score.complexity.tier,
      flagKeys: score.flags.map((f) => f.key),
      currentManager: getSingle(finalResponses, Q.curManager),
    });
    void submitAssessment(finalResponses, score, setSubmitStatus);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    setResponses({});
    setIndex(0);
    setProfile(null);
    setCompletedAt(null);
    setSubmitStatus("idle");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // non-fatal
    }
    window.scrollTo({ top: 0 });
  }

  return (
    <>
      {!profile && (
        <section className="bg-[var(--color-bg-cream)] pt-12 pb-16">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
              Free clinical assessment
            </p>
            <h1 className="text-[clamp(2.25rem,5vw,3.25rem)] font-normal tracking-[-0.03em] mb-5">
              Get your free GLP-1 Management Profile
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Answer a clinical-style assessment built around candidacy, drug-and-dose context, side
              effects, and monitoring needs — including bone, muscle, and joint health. Built by an
              endocrinologist and an orthopedic surgeon.
            </p>
          </div>
        </section>
      )}

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-12">
          {!profile && current ? (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-[var(--color-text-tertiary)] mb-2.5 font-[var(--font-body)]">
                  <span>{BLOCK_LABEL[current.block] ?? "Assessment"}</span>
                  <span>{progress}%</span>
                </div>
                <div
                  className="h-1.5 bg-[var(--color-bg-cream)] rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Assessment progress"
                >
                  <div
                    className="h-full bg-[var(--color-accent-primary)] rounded-full transition-[width] duration-500 ease-[var(--ease-out)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.28, ease }}
                >
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-2xl font-normal tracking-[-0.02em] text-[var(--color-text-heading)] mb-2 outline-none"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {current.prompt}
                  </h2>
                  {current.helper && (
                    <p className="text-[15px] text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                      {current.helper}
                    </p>
                  )}
                  {!current.helper && <div className="mb-6" />}

                  <QuestionBody
                    question={current}
                    responses={responses}
                    onSingle={(value) => handleSingle(current, value)}
                    onChange={(a) => setAnswer(current.id, a)}
                  />

                  {/* Continue / Back controls — single-selects auto-advance. */}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={clampedIndex === 0}
                      className="text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-[var(--dur-hover)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 rounded px-1 py-1"
                    >
                      ← Back
                    </button>

                    {current.kind !== "single" && (
                      <div className="flex items-center gap-3">
                        {current.kind === "text" && (
                          <button
                            type="button"
                            onClick={handleContinue}
                            className="text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] cursor-pointer"
                          >
                            Skip
                          </button>
                        )}
                        <Button
                          onClick={handleContinue}
                          variant="dark"
                          size="md"
                          disabled={!isAnswered(current, responses)}
                        >
                          {isLast ? "See my Profile →" : "Continue"}
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <p className="text-xs text-center text-[var(--color-text-tertiary)] mt-10 leading-relaxed max-w-md mx-auto">
                Your answers are used to generate your Profile and prepare your consult. This
                assessment is educational and is not medical advice or a diagnosis.
              </p>
            </>
          ) : profile ? (
            <ProfileView
              profile={profile}
              responses={responses}
              completedAt={completedAt}
              submitStatus={submitStatus}
              onRestart={restart}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Question renderers
// ---------------------------------------------------------------------------

function QuestionBody({
  question,
  responses,
  onSingle,
  onChange,
}: {
  question: QuestionDef;
  responses: Responses;
  onSingle: (value: string) => void;
  onChange: (a: Answer) => void;
}) {
  switch (question.kind) {
    case "single":
      return <SingleField question={question} responses={responses} onSelect={onSingle} />;
    case "multi":
      return <MultiField question={question} responses={responses} onChange={onChange} />;
    case "measure":
      return <MeasureField question={question} answer={responses[question.id]} onChange={onChange} />;
    case "contact":
      return <ContactField answer={responses[question.id]} onChange={onChange} />;
    case "text":
      return <TextField question={question} answer={responses[question.id]} onChange={onChange} />;
  }
}

const optionClasses =
  "w-full text-left p-4 sm:p-5 rounded-[var(--radius-lg)] border bg-white transition-[background-color,border-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.99] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2";

function SingleField({
  question,
  responses,
  onSelect,
}: {
  question: QuestionDef & { kind: "single" };
  responses: Responses;
  onSelect: (value: string) => void;
}) {
  const selected = getSingle(responses, question.id);
  return (
    <div className="space-y-2.5" role="radiogroup" aria-label={question.prompt}>
      {question.options.map((opt) => {
        const active = selected === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(opt.value)}
            className={`${optionClasses} group ${
              active
                ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-light)]"
                : "border-[var(--color-border)] hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-light)]"
            }`}
          >
            <span className="text-[var(--color-text-primary)] font-medium tracking-[-0.01em] group-hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--dur-hover)]">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MultiField({
  question,
  responses,
  onChange,
}: {
  question: QuestionDef & { kind: "multi" };
  responses: Responses;
  onChange: (a: Answer) => void;
}) {
  const answer = responses[question.id];
  const values = answer && answer.kind === "multi" ? answer.values : [];

  function toggle(opt: Option) {
    let next: string[];
    if (values.includes(opt.value)) {
      next = values.filter((v) => v !== opt.value);
    } else if (opt.exclusive) {
      next = [opt.value]; // exclusive clears the rest
    } else {
      // selecting a normal option clears any exclusive option
      const exclusiveValues = question.options.filter((o) => o.exclusive).map((o) => o.value);
      next = [...values.filter((v) => !exclusiveValues.includes(v)), opt.value];
    }
    onChange({ kind: "multi", values: next });
  }

  return (
    <fieldset className="space-y-2.5">
      <legend className="sr-only">{question.prompt}</legend>
      {question.options.map((opt) => {
        const active = values.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            role="checkbox"
            aria-checked={active}
            onClick={() => toggle(opt)}
            className={`${optionClasses} flex items-center gap-3 ${
              active
                ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-light)]"
                : "border-[var(--color-border)] hover:border-[var(--color-accent-primary)]"
            }`}
          >
            <span
              aria-hidden
              className={`flex-shrink-0 w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors ${
                active
                  ? "bg-[var(--color-accent-primary)] border-[var(--color-accent-primary)]"
                  : "border-[var(--color-border-strong)]"
              }`}
            >
              {active && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span className="text-[var(--color-text-primary)] font-medium tracking-[-0.01em]">{opt.label}</span>
          </button>
        );
      })}
    </fieldset>
  );
}

function unitToggle(active: boolean) {
  return `px-3 py-1.5 text-sm font-semibold rounded-[var(--radius-pill)] cursor-pointer transition-colors ${
    active ? "bg-[var(--color-bg-dark)] text-white" : "bg-[var(--color-bg-cream)] text-[var(--color-text-secondary)]"
  }`;
}

const numberInputClasses =
  "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-text-heading)] text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]";

function MeasureField({
  question,
  answer,
  onChange,
}: {
  question: MeasureQuestion;
  answer?: Answer;
  onChange: (a: Answer) => void;
}) {
  const isHeight = question.measure === "height";
  const seed = answer && answer.kind === "measure" ? answer : null;

  const [unit, setUnit] = useState<MeasureUnit>(seed?.unit ?? (isHeight ? "ft_in" : "lb"));

  // Seed input strings from any existing canonical value (e.g. on back-nav).
  const seedFtIn = seed && isHeight ? cmToFtIn(seed.canonical) : null;
  const [ft, setFt] = useState(seedFtIn ? String(seedFtIn.ft) : "");
  const [inch, setInch] = useState(seedFtIn ? String(seedFtIn.inch) : "");
  const [cm, setCm] = useState(seed && isHeight && unit === "cm" ? String(Math.round(seed.canonical)) : "");
  const [lb, setLb] = useState(seed && !isHeight ? String(Math.round(kgToLb(seed.canonical))) : "");
  const [kg, setKg] = useState(seed && !isHeight && unit === "kg" ? String(Math.round(seed.canonical)) : "");

  function emitHeight(nextUnit: MeasureUnit, f: string, i: string, c: string) {
    if (nextUnit === "ft_in") {
      const ftn = parseFloat(f) || 0;
      const inn = parseFloat(i) || 0;
      if (ftn > 0 || inn > 0) {
        onChange({ kind: "measure", canonical: round1(ftInToCm(ftn, inn)), unit: "ft_in", display: `${ftn}'${Math.round(inn)}"` });
      }
    } else {
      const cmv = parseFloat(c) || 0;
      if (cmv > 0) onChange({ kind: "measure", canonical: round1(cmv), unit: "cm", display: `${Math.round(cmv)} cm` });
    }
  }
  function emitWeight(nextUnit: MeasureUnit, l: string, k: string) {
    if (nextUnit === "lb") {
      const lbv = parseFloat(l) || 0;
      if (lbv > 0) onChange({ kind: "measure", canonical: round1(lbToKg(lbv)), unit: "lb", display: `${Math.round(lbv)} lb` });
    } else {
      const kgv = parseFloat(k) || 0;
      if (kgv > 0) onChange({ kind: "measure", canonical: round1(kgv), unit: "kg", display: `${Math.round(kgv)} kg` });
    }
  }

  if (isHeight) {
    return (
      <div>
        <div className="flex gap-2 mb-4">
          <button type="button" className={unitToggle(unit === "ft_in")} onClick={() => setUnit("ft_in")}>
            ft / in
          </button>
          <button type="button" className={unitToggle(unit === "cm")} onClick={() => setUnit("cm")}>
            cm
          </button>
        </div>
        {unit === "ft_in" ? (
          <div className="flex gap-3">
            <label className="flex-1">
              <span className="block text-xs text-[var(--color-text-tertiary)] mb-1.5">Feet</span>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={8}
                value={ft}
                onChange={(e) => {
                  setFt(e.target.value);
                  emitHeight("ft_in", e.target.value, inch, cm);
                }}
                className={numberInputClasses}
                placeholder="5"
              />
            </label>
            <label className="flex-1">
              <span className="block text-xs text-[var(--color-text-tertiary)] mb-1.5">Inches</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={11}
                value={inch}
                onChange={(e) => {
                  setInch(e.target.value);
                  emitHeight("ft_in", ft, e.target.value, cm);
                }}
                className={numberInputClasses}
                placeholder="10"
              />
            </label>
          </div>
        ) : (
          <label className="block">
            <span className="block text-xs text-[var(--color-text-tertiary)] mb-1.5">Centimeters</span>
            <input
              type="number"
              inputMode="numeric"
              min={100}
              max={250}
              value={cm}
              onChange={(e) => {
                setCm(e.target.value);
                emitHeight("cm", ft, inch, e.target.value);
              }}
              className={numberInputClasses}
              placeholder="178"
            />
          </label>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button type="button" className={unitToggle(unit === "lb")} onClick={() => setUnit("lb")}>
          lb
        </button>
        <button type="button" className={unitToggle(unit === "kg")} onClick={() => setUnit("kg")}>
          kg
        </button>
      </div>
      <label className="block">
        <span className="block text-xs text-[var(--color-text-tertiary)] mb-1.5">
          Weight ({unit})
        </span>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          value={unit === "lb" ? lb : kg}
          onChange={(e) => {
            if (unit === "lb") {
              setLb(e.target.value);
              emitWeight("lb", e.target.value, kg);
            } else {
              setKg(e.target.value);
              emitWeight("kg", lb, e.target.value);
            }
          }}
          className={numberInputClasses}
          placeholder={unit === "lb" ? "185" : "84"}
        />
      </label>
    </div>
  );
}

function ContactField({ answer, onChange }: { answer?: Answer; onChange: (a: Answer) => void }) {
  const seed = answer && answer.kind === "contact" ? answer : null;
  const [firstName, setFirstName] = useState(seed?.firstName ?? "");
  const [email, setEmail] = useState(seed?.email ?? "");
  const [consent, setConsent] = useState(seed?.consentMarketing ?? true);

  function emit(next: { firstName?: string; email?: string; consent?: boolean }) {
    onChange({
      kind: "contact",
      firstName: next.firstName ?? firstName,
      email: next.email ?? email,
      consentMarketing: next.consent ?? consent,
    });
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block text-sm font-medium text-[var(--color-text-heading)] mb-1.5">First name</span>
        <input
          type="text"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            emit({ firstName: e.target.value });
          }}
          className={numberInputClasses}
          placeholder="Your first name"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-[var(--color-text-heading)] mb-1.5">Email</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            emit({ email: e.target.value });
          }}
          className={numberInputClasses}
          placeholder="your@email.com"
        />
      </label>
      <label className="flex items-start gap-2.5 text-[13px] text-[var(--color-text-secondary)] leading-relaxed cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            emit({ consent: e.target.checked });
          }}
          className="mt-0.5 accent-[var(--color-accent-primary)]"
        />
        <span>
          Email me my Profile and occasional updates on specialty GLP-1 management. Unsubscribe
          anytime. We never share your information.
        </span>
      </label>
    </div>
  );
}

function TextField({
  question,
  answer,
  onChange,
}: {
  question: QuestionDef & { kind: "text" };
  answer?: Answer;
  onChange: (a: Answer) => void;
}) {
  const seed = answer && answer.kind === "text" ? answer.value : "";
  const [value, setValue] = useState(seed);
  return (
    <div>
      <textarea
        value={value}
        maxLength={question.maxLength}
        rows={4}
        onChange={(e) => {
          setValue(e.target.value);
          onChange({ kind: "text", value: e.target.value });
        }}
        className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] leading-relaxed"
        placeholder="Optional — anything you'd like the clinical team to know."
      />
      <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5 text-right">
        {value.length}/{question.maxLength}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Result — the GLP-1 Management Profile
// ---------------------------------------------------------------------------

const CANDIDACY_BADGE: Record<CandidacyLevel, "success" | "highlight" | "warning" | "default"> = {
  strong_candidate: "success",
  candidate: "highlight",
  possible_caveats: "warning",
  not_candidate: "default",
};

function ProfileView({
  profile,
  responses,
  completedAt,
  submitStatus,
  onRestart,
}: {
  profile: ManagementProfile;
  responses: Responses;
  completedAt: Date | null;
  submitStatus: "idle" | "saving" | "saved" | "error";
  onRestart: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const stateCode = getSingle(responses, Q.state);
  const stateEntry = stateCode ? getStateByCode(stateCode) : null;
  const licensed = stateCode ? isLicensed(stateCode) : false;
  const dateStr = (completedAt ?? new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
      {/* Clinical-document header */}
      <div className="border border-[var(--color-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-md)]">
        <div className="bg-[var(--color-bg-dark)] text-white px-6 sm:px-9 py-7">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              MetaOrtho · Specialty GLP-1 management
            </span>
            <span className="text-[11px] text-white/60 tabular-nums">{dateStr}</span>
          </div>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-[clamp(1.75rem,4vw,2.5rem)] font-normal tracking-[-0.02em] outline-none"
            style={{ fontFamily: "var(--font-heading)", color: "white" }}
          >
            {profile.firstName ? `${profile.firstName}'s` : "Your"} GLP-1 Management Profile
          </h2>
          <div className="flex flex-wrap gap-2.5 mt-5">
            <Badge variant={CANDIDACY_BADGE[profile.candidacyLevel]}>
              {CANDIDACY_LABEL[profile.candidacyLevel]}
            </Badge>
            {profile.cta !== "no_booking" && (
              <Badge variant="dark" className="border border-white/20">
                {TIER_LABEL[profile.complexityTier]}
              </Badge>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white px-6 sm:px-9 py-8 space-y-9">
          {profile.sections.map((section, i) => (
            <section key={section.id} aria-labelledby={`sec-${section.id}`}>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[13px] font-semibold text-[var(--color-accent-primary)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  id={`sec-${section.id}`}
                  className="text-xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {section.title}
                </h3>
              </div>
              <div className="pl-7 space-y-3">
                {section.body.map((p, j) => (
                  <p key={j} className="text-[var(--color-text-secondary)] leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2.5 mt-2">
                    {section.bullets.map((b, k) => (
                      <li key={k} className="flex gap-2.5 text-[var(--color-text-secondary)] leading-relaxed">
                        <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA lives inside the final "next step" section. */}
                {section.id === "next_step" && (
                  <div className="mt-6">
                    <NextStepCta profile={profile} licensed={licensed} stateName={stateEntry?.name ?? null} />
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={onRestart}
          className="text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] cursor-pointer"
        >
          ↺ Retake the assessment
        </button>
        <span className="text-xs text-[var(--color-text-tertiary)]" aria-live="polite">
          {submitStatus === "saving" && "Saving your Profile…"}
          {submitStatus === "saved" && "Saved · check your email"}
          {submitStatus === "error" && "We couldn't save it, but your Profile is shown above."}
        </span>
      </div>

      <p className="text-xs text-center text-[var(--color-text-tertiary)] mt-8 leading-relaxed max-w-lg mx-auto">
        This Profile is educational and is generated from your responses. It is not a diagnosis or
        a prescription. A MetaOrtho clinician reviews your specific situation during a consultation
        before any treatment decision.
      </p>
    </motion.div>
  );
}

function NextStepCta({
  profile,
  licensed,
  stateName,
}: {
  profile: ManagementProfile;
  licensed: boolean;
  stateName: string | null;
}) {
  if (profile.cta === "no_booking") {
    return (
      <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-cream)] p-5 border border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          Want to keep learning? We publish a research-backed newsletter on GLP-1 therapy and
          musculoskeletal health.
        </p>
        <WaitlistCTA variant="ghost" size="sm" source="assessment-not-candidate">
          Get the GLP-1 newsletter
        </WaitlistCTA>
      </div>
    );
  }

  const label = profile.cta === "book" ? "Book a $400 specialty consult" : "Book a consultation to discuss your situation";

  if (!licensed) {
    return (
      <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-cream)] p-5 border border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-text-heading)] font-semibold mb-1.5">
          We&apos;re not yet licensed in {stateName ?? "your state"}.
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          MetaOrtho is a telemedicine practice, so consults are available only where our clinicians
          are licensed. Join the waitlist and we&apos;ll tell you the moment we open there — your
          Profile is yours to keep in the meantime.
        </p>
        <WaitlistCTA
          variant="dark"
          size="md"
          source={`assessment-${profile.complexityTier}-oos`}
          eyebrow={`Waitlist · ${stateName ?? ""}`}
          headline={
            <>
              Tell me when MetaOrtho
              <br />
              opens in {stateName ?? "my state"}.
            </>
          }
          subcopy="One short email when we go live where you live. No spam."
        >
          Join the waitlist
        </WaitlistCTA>
        <p className="text-xs text-[var(--color-text-tertiary)] mt-3">
          Currently available in {licensedStatesCopy()}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-accent-light)] p-5 sm:p-6 border border-[var(--color-accent-primary)]/20">
      <Button
        href={BOOKING_URL}
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() =>
          track({
            type: "booking_cta_clicked",
            candidacy: profile.candidacyLevel,
            tier: profile.complexityTier,
            source: `profile-${profile.cta}`,
            licensed: true,
          })
        }
      >
        {label}
      </Button>
      <p className="text-sm text-[var(--color-text-secondary)] mt-3">
        <span className="font-semibold text-[var(--color-text-heading)]">$400</span> initial specialty
        consultation · <span className="font-semibold text-[var(--color-text-heading)]">$200</span>{" "}
        follow-ups. May be HSA/FSA eligible — check with your plan.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Capture
// ---------------------------------------------------------------------------

async function submitAssessment(
  responses: Responses,
  score: ReturnType<typeof scoreAssessment>,
  setStatus: (s: "idle" | "saving" | "saved" | "error") => void,
) {
  const contact = getContact(responses);
  setStatus("saving");
  try {
    const res = await fetch("/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: contact?.firstName ?? null,
        email: contact?.email ?? null,
        consent_marketing: contact?.consentMarketing ?? false,
        state: getSingle(responses, Q.state),
        source_component: "assessment-v2",
        responses,
        outcome: {
          candidacy: score.candidacy.level,
          hard_stop: score.candidacy.hardStop,
          tier: score.complexity.tier,
          complexity_score: score.complexity.score,
          bmi: score.bmi,
          flags: score.flags.map((f) => f.key),
        },
      }),
    });
    const data = (await res.json().catch(() => ({ success: false }))) as { success?: boolean };
    setStatus(res.ok && data.success ? "saved" : "error");
  } catch {
    setStatus("error");
  }
}
