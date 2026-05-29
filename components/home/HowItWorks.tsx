"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Spotlight from "@/components/ui/motion/Spotlight";
import { trackEvent } from "@/lib/analytics";
import { CONSULT_PRICE_SUMMARY } from "@/lib/site-config";

const ease = [0.23, 1, 0.32, 1] as const;

const steps = [
  {
    step: "01",
    title: "Get my free GLP-1 profile",
    description:
      "Answer questions about your GLP-1 status, goals, medication history, side effects, weight-loss pace, nutrition, strength, labs, and body-composition concerns.",
    includes: ["Status & goals", "Medication & dose context", "Side effects & monitoring needs"],
    duration: "~5 minutes · free",
  },
  {
    step: "02",
    title: "Receive your profile preview",
    description:
      "Your results summarize your management complexity — Standard, Enhanced, or High-Risk — and preview what a specialty consult would focus on for you.",
    includes: ["Candidacy signals", "Management tier", "What your consult would cover"],
    duration: "Instant",
  },
  {
    step: "03",
    title: "Book a specialty consult",
    description:
      "Meet a licensed clinician for a cash-pay specialty review of your GLP-1 plan, side effects, and monitoring needs — then leave with clear next steps.",
    includes: ["Specialty review", "Recommended next steps", "Monitoring plan if appropriate"],
    duration: CONSULT_PRICE_SUMMARY,
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper bg="cream" id="how-it-works">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
          How it works
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6">
          Profile, preview,
          <br className="hidden md:block" /> then a specialty consult
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          A simple path from a free, structured assessment to a focused
          physician consult — all from home, via secure telehealth.
        </p>
      </div>

      {/* Stepper */}
      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="relative"
            >
              {/* Numbered badge */}
              <div className="hidden md:flex items-center justify-center w-20 h-20 -mb-10 mx-auto rounded-full bg-white border border-[var(--color-border)] shadow-[var(--shadow-md)] relative z-10">
                <span
                  className="text-[36px] font-normal tracking-[-0.04em] leading-none text-[var(--color-accent-primary)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.step}
                </span>
              </div>

              <Spotlight className="relative h-full bg-white rounded-[var(--radius-xl)] border border-[var(--color-border)] p-7 md:p-8 pt-16 md:pt-16 transition-[transform,box-shadow] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] motion-reduce:hover:translate-y-0 overflow-hidden">
                {/* Mobile number */}
                <div
                  className="md:hidden text-[56px] font-normal leading-none tracking-[-0.04em] text-[var(--color-accent-primary)]/20 mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.step}
                </div>

                <h3
                  className="text-xl font-normal text-[var(--color-text-heading)] mb-3 tracking-[-0.02em] leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.title}
                </h3>

                <p className="text-[var(--color-text-secondary)] text-[14px] leading-relaxed mb-6">
                  {step.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {step.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13px] text-[var(--color-text-primary)]"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-[var(--color-success)] flex-shrink-0 mt-[3px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="tracking-[-0.01em]">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-[var(--color-border)] flex items-center justify-between text-[12px]">
                  <span className="text-[var(--color-text-tertiary)] font-medium uppercase tracking-[0.1em]">
                    {step.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--color-accent-primary)] font-semibold">
                    Step {i + 1} of 3
                  </span>
                </div>
              </Spotlight>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2, ease }}
          className="mt-14 text-center"
        >
          <a
            href="/assessment"
            onClick={() => trackEvent("profile_cta_clicked", { location: "home-how-it-works" })}
            className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-md)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
          >
            Get my free GLP-1 profile
          </a>
          <p className="mt-4 text-[13px] text-[var(--color-text-tertiary)]">
            Free · ~5 minutes · educational, not a diagnosis
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
