"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Spotlight from "@/components/ui/motion/Spotlight";

const ease = [0.23, 1, 0.32, 1] as const;

const steps = [
  {
    step: "01",
    title: "Comprehensive MSK assessment",
    description:
      "A 30-minute virtual visit with our clinical team. We review your GLP-1 history, assess your musculoskeletal risk factors, and order baseline labs and imaging.",
    includes: ["DEXA scan order", "Vitamin D + metabolic panel", "Uric acid + risk stratification"],
    duration: "30 min",
  },
  {
    step: "02",
    title: "Personalized protection plan",
    description:
      "Dr. Saenz reviews your results and builds your protocol: resistance training prescriptions, nutritional optimization, and any medications needed.",
    includes: ["Protein & creatine targets", "Exercise prescription", "Supplement dosing"],
    duration: "Delivered within 48h",
  },
  {
    step: "03",
    title: "Ongoing monitoring",
    description:
      "Monthly video check-ins track your bone density trends, muscle composition, lab values, and symptoms. We adjust your protocol as your weight loss progresses.",
    includes: ["DEXA tracking", "Lab trend analysis", "Protocol adjustments"],
    duration: "Monthly",
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
          Three steps to protect your body
          <br className="hidden md:block" /> while you lose weight
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          All from home. No travel. No waiting rooms. Expert orthopedic care via secure video.
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
      </div>
    </SectionWrapper>
  );
}
