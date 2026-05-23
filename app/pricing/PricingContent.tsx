"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import Spotlight from "@/components/ui/motion/Spotlight";
import { trackEvent } from "@/lib/analytics";

const ease = [0.23, 1, 0.32, 1] as const;

const consults = [
  {
    name: "Initial Specialty GLP-1 Consult",
    price: "$400",
    period: "one-time",
    description:
      "A focused specialty review for patients starting, taking, or questioning GLP-1 treatment.",
    features: [
      "GLP-1 candidacy and goal review",
      "Current medication and dose-history review",
      "Side-effect and tolerability discussion",
      "Monitoring and risk-profile review",
      "Body-composition and musculoskeletal considerations",
      "Recommended next steps",
      "Follow-up plan if clinically appropriate",
    ],
    featured: true,
  },
  {
    name: "Follow-Up Specialty Consult",
    price: "$200",
    period: "per follow-up",
    description:
      "Ongoing specialty management as your treatment and monitoring needs evolve.",
    features: [
      "Progress review",
      "Side-effect and tolerability update",
      "Medication-management considerations",
      "Monitoring review",
      "Plan refinement",
    ],
    featured: false,
  },
];

const notIncluded = [
  "Medication cost",
  "Labs or imaging costs",
  "Third-party nutrition services",
  "Supplements",
  "Insurance billing",
  "Emergency care",
];

export default function PricingContent() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-[var(--color-bg-cream)] pt-16 pb-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-[var(--radius-pill)] border border-[var(--color-border)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] animate-breath" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)]">
              Cash-pay specialty consult
            </span>
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-normal tracking-[-0.035em] leading-[1.05] mb-6">
            Simple, transparent pricing.
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            One focused specialty consult, with follow-ups when you need them.
            Start with the free GLP-1 Management Profile so your visit focuses on
            your specific questions.
          </p>
        </div>
      </section>

      {/* Consult tiers */}
      <SectionWrapper bg="primary">
        <div className="grid lg:grid-cols-2 gap-5 max-w-5xl mx-auto items-stretch">
          {consults.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="h-full"
            >
              <Spotlight
                color="rgba(42, 111, 151, 0.4)"
                glow="rgba(42, 111, 151, 0.06)"
                className="relative h-full rounded-[var(--radius-xl)] p-8 border border-[var(--color-border)] bg-white shadow-[var(--shadow-md)] transition-[transform,box-shadow] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-8 z-10">
                    <Badge variant="dark">Start here</Badge>
                  </div>
                )}

                <h3
                  className="text-lg font-semibold text-[var(--color-text-heading)] mb-3 mt-2 tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span
                    className="text-4xl font-bold text-[var(--color-text-heading)] tracking-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-[var(--color-text-tertiary)] text-sm">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-7">
                  {plan.description}
                </p>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm"
                    >
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
                      <span className="text-[var(--color-text-primary)] tracking-[-0.01em]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <div className="max-w-5xl mx-auto mt-10 text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/assessment"
              onClick={() => trackEvent("profile_cta_clicked", { location: "pricing" })}
              className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-md)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
            >
              Get my free GLP-1 profile
            </a>
            <a
              href="/book"
              onClick={() => trackEvent("consult_cta_clicked", { location: "pricing" })}
              className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] border-2 border-[var(--color-text-heading)] text-[var(--color-text-heading)] hover:bg-[var(--color-text-heading)] hover:text-white transition-[background-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
            >
              Book a $400 specialty consult
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* Not included + cash-pay note */}
      <SectionWrapper bg="cream">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-8">
            <h2
              className="text-xl font-normal tracking-[-0.02em] mb-5 text-[var(--color-text-heading)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What&apos;s not included
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {notIncluded.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-[var(--color-text-secondary)] text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-tertiary)] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 pt-6 border-t border-[var(--color-border)] text-sm text-[var(--color-text-tertiary)] leading-relaxed">
              Phase 1 consults are cash-pay. Availability depends on state
              licensure and clinical eligibility. May be HSA/FSA eligible — check
              with your plan. The website assessment is educational and does not
              create a clinician-patient relationship.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
