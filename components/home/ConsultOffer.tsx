"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import Spotlight from "@/components/ui/motion/Spotlight";
import { trackEvent } from "@/lib/analytics";
import {
  INITIAL_CONSULT_PRICE_LABEL,
  FOLLOW_UP_PRICE_LABEL,
  BOOK_CONSULT_SPECIALTY_LABEL,
} from "@/lib/site-config";

const ease = [0.23, 1, 0.32, 1] as const;

const initialIncludes = [
  "Review of your GLP-1 status and goals",
  "Medication and dose-history review",
  "Side-effect and tolerability discussion",
  "Candidacy and management-complexity assessment",
  "Metabolic and musculoskeletal risk review",
  "Body-composition monitoring considerations",
  "Recommended next steps and follow-up plan",
];

const followUpIncludes = [
  "Progress review",
  "Side-effect and tolerability update",
  "Medication-management considerations",
  "Monitoring review",
  "Plan refinement",
];

const notIncluded = [
  "Medication cost",
  "Labs or imaging costs",
  "Third-party nutrition services",
  "Supplements",
  "Insurance billing",
  "Emergency care",
];

function Check() {
  return (
    <svg
      className="w-4 h-4 text-[var(--color-success)] flex-shrink-0 mt-0.5"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ConsultOffer() {
  return (
    <SectionWrapper bg="cream" id="consult">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
          The consult
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-5">
          One focused specialty consult.
          <br className="hidden md:block" /> Clear next steps.
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          Cash-pay, transparent, and built around your GLP-1 Management Profile —
          so the visit focuses on your specific questions.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 max-w-5xl mx-auto items-stretch">
        {/* Initial consult */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease }}
          className="h-full"
        >
          <Spotlight
            color="rgba(42, 111, 151, 0.4)"
            glow="rgba(42, 111, 151, 0.06)"
            className="relative h-full rounded-[var(--radius-xl)] p-8 border border-[var(--color-border)] bg-white shadow-[var(--shadow-md)]"
          >
            <div className="absolute -top-3 left-8">
              <Badge variant="dark">Start here</Badge>
            </div>
            <h3
              className="text-lg font-semibold text-[var(--color-text-heading)] mb-3 mt-2 tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Initial Specialty GLP-1 Consult
            </h3>
            <div className="flex items-baseline gap-1.5 mb-6">
              <span
                className="text-5xl font-bold text-[var(--color-text-heading)] tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {INITIAL_CONSULT_PRICE_LABEL}
              </span>
              <span className="text-[var(--color-text-tertiary)] text-sm">one-time</span>
            </div>
            <ul className="space-y-3">
              {initialIncludes.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check />
                  <span className="text-[var(--color-text-primary)] tracking-[-0.01em]">{f}</span>
                </li>
              ))}
            </ul>
          </Spotlight>
        </motion.div>

        {/* Follow-up consult */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08, ease }}
          className="h-full"
        >
          <Spotlight
            color="rgba(42, 111, 151, 0.4)"
            glow="rgba(42, 111, 151, 0.06)"
            className="relative h-full rounded-[var(--radius-xl)] p-8 border border-[var(--color-border)] bg-white shadow-[var(--shadow-md)]"
          >
            <h3
              className="text-lg font-semibold text-[var(--color-text-heading)] mb-3 mt-2 tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Follow-Up Specialty Consult
            </h3>
            <div className="flex items-baseline gap-1.5 mb-6">
              <span
                className="text-5xl font-bold text-[var(--color-text-heading)] tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {FOLLOW_UP_PRICE_LABEL}
              </span>
              <span className="text-[var(--color-text-tertiary)] text-sm">per follow-up</span>
            </div>
            <ul className="space-y-3 mb-8">
              {followUpIncludes.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check />
                  <span className="text-[var(--color-text-primary)] tracking-[-0.01em]">{f}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-[var(--color-border)]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-tertiary)] mb-3">
                Not included
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-[var(--color-text-secondary)]">
                {notIncluded.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>
          </Spotlight>
        </motion.div>
      </div>

      {/* CTAs + disclaimer */}
      <div className="max-w-5xl mx-auto mt-10 text-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/assessment"
            onClick={() => trackEvent("profile_cta_clicked", { location: "home-consult-offer" })}
            className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-md)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
          >
            Get my free GLP-1 profile
          </a>
          <a
            href="/book"
            onClick={() => trackEvent("consult_cta_clicked", { location: "home-consult-offer" })}
            className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] border-2 border-[var(--color-text-heading)] text-[var(--color-text-heading)] hover:bg-[var(--color-text-heading)] hover:text-white transition-[background-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
          >
            {BOOK_CONSULT_SPECIALTY_LABEL}
          </a>
        </div>
        <p className="mt-6 text-[13px] text-[var(--color-text-tertiary)] max-w-2xl mx-auto leading-relaxed">
          Phase 1 consults are cash-pay. Consult availability depends on state
          licensure and clinical eligibility. The website assessment is
          educational and does not create a clinician-patient relationship.
        </p>
      </div>
    </SectionWrapper>
  );
}
