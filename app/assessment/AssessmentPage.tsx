"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, calculateResult, type AssessmentResult } from "@/lib/assessment-logic";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";
import StateGate from "@/components/intake/StateGate";

export default function AssessmentPage() {
  return (
    <StateGate intakeName="Risk assessment">
      <AssessmentBody />
    </StateGate>
  );
}

function AssessmentBody() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleAnswer = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setResult(calculateResult(newAnswers));
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const progress = ((currentStep + (result ? 1 : 0)) / questions.length) * 100;

  const riskStyles = {
    high: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      bar: "bg-red-500",
      badge: "warning" as const,
    },
    moderate: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      bar: "bg-amber-500",
      badge: "warning" as const,
    },
    lower: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-800",
      bar: "bg-emerald-500",
      badge: "success" as const,
    },
  };

  return (
    <>
      {/* Header */}
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Free assessment
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            GLP-1 musculoskeletal risk assessment
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Answer 8 quick questions to understand your risk for bone loss, muscle wasting, and other musculoskeletal side effects from GLP-1 weight loss medications.
          </p>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-[var(--color-text-tertiary)] mb-2.5 font-[var(--font-body)]">
              <span>
                {result
                  ? "Assessment complete"
                  : `Question ${currentStep + 1} of ${questions.length}`}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-[var(--color-bg-cream)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent-primary)] rounded-full transition-[width] duration-500 ease-[var(--ease-out)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <h2 className="text-2xl font-normal tracking-[-0.02em] text-[var(--color-text-heading)] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                  {questions[currentStep].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentStep].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(questions[currentStep].id, option.score)}
                      className="w-full text-left p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-light)] transition-[background-color,border-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.99] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
                    >
                      <span className="text-[var(--color-text-primary)] font-medium tracking-[-0.01em] group-hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div
                  className={`rounded-[var(--radius-xl)] p-8 md:p-10 border ${riskStyles[result.level].bg} ${riskStyles[result.level].border}`}
                >
                  <div className="text-center mb-8">
                    <Badge
                      variant={riskStyles[result.level].badge}
                      className="mb-4"
                    >
                      Risk Score: {result.score}/{questions.length * 4}
                    </Badge>
                    <h2
                      className={`text-2xl md:text-3xl font-normal tracking-[-0.02em] ${riskStyles[result.level].text}`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {result.title}
                    </h2>
                  </div>

                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 text-center max-w-lg mx-auto">
                    {result.description}
                  </p>

                  <div className="bg-white rounded-[var(--radius-lg)] p-6 mb-8 border border-[var(--color-border)]">
                    <h3 className="font-semibold text-[var(--color-text-heading)] mb-2 font-[var(--font-body)] tracking-[-0.01em]">
                      Our recommendation
                    </h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                      {result.recommendation}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <WaitlistCTA
                      variant="dark"
                      size="lg"
                      source={`assessment-result-${result.level}`}
                      eyebrow="Coming soon · Based on your assessment"
                      headline={
                        <>
                          Protect what the
                          <br />
                          scale can&apos;t measure.
                        </>
                      }
                      subcopy="You're a strong fit for MetaOrtho. Join the waitlist and we'll reach out the day we open enrollment in your state."
                    >
                      Join the waitlist
                    </WaitlistCTA>
                    <Button onClick={restart} variant="outline" size="lg">
                      Retake Assessment
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-center text-[var(--color-text-tertiary)] mt-8 leading-relaxed max-w-md mx-auto">
                  This assessment is for informational purposes only and does not constitute medical advice. Consult with a healthcare provider for personalized recommendations.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
