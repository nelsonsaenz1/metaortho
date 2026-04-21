"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Spotlight from "@/components/ui/motion/Spotlight";

const ease = [0.23, 1, 0.32, 1] as const;

type Gap = {
  provider: string;
  manages: string;
  misses: string;
  tone: "warn" | "bad";
  icon: React.ReactNode;
};

const gaps: Gap[] = [
  {
    provider: "Doing nothing",
    manages: "—",
    misses:
      "Lose muscle, thin bones silently, discover the damage years later — often at the fracture.",
    tone: "bad",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    provider: "GLP-1 prescriber",
    manages: "Weight, blood sugar, metabolic markers",
    misses: "Bone density, muscle mass, tendon health, gout risk",
    tone: "warn",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    provider: "Primary care",
    manages: "General health, basic labs",
    misses:
      "Rarely orders DEXA for weight-loss patients; no MSK-specific protocol",
    tone: "warn",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    provider: "MSK telehealth (Hinge, Sword)",
    manages: "General MSK: back pain, knee pain, rehab",
    misses:
      "Not positioned for GLP-1 patients; no metabolic-orthopedic integration",
    tone: "warn",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const toneStyles = {
  warn: {
    dot: "bg-[var(--color-warning)]",
    accent: "text-[var(--color-warning)]",
  },
  bad: {
    dot: "bg-[var(--color-danger)]",
    accent: "text-[var(--color-danger)]",
  },
};

export default function TheProblem() {
  return (
    <SectionWrapper bg="primary" id="the-problem">
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
          The gap in your care
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6">
          Nobody is watching what GLP-1s do
          <br className="hidden md:block" /> to your bones &amp; muscles
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          You have a doctor managing your weight loss. But who is managing the
          structural consequences? Right now, the answer is probably: no one.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {gaps.map((gap, i) => {
          const tone = toneStyles[gap.tone];
          return (
            <motion.div
              key={gap.provider}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease }}
              className="h-full"
            >
              <Spotlight
                color="rgba(42, 111, 151, 0.4)"
                glow="rgba(42, 111, 151, 0.06)"
                className="h-full rounded-[var(--radius-lg)] bg-[var(--color-bg-cream)] border border-[var(--color-border)] p-7 md:p-8 text-center flex flex-col items-center transition-[transform,box-shadow] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 overflow-hidden"
              >
                <div className="w-12 h-12 rounded-[var(--radius-md)] bg-white border border-[var(--color-border)] text-[var(--color-accent-primary)] flex items-center justify-center mb-5">
                  {gap.icon}
                </div>

                <h3
                  className="text-lg md:text-xl font-normal tracking-[-0.01em] mb-5 text-[var(--color-text-heading)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {gap.provider}
                </h3>

                <div className="w-full max-w-sm space-y-3 text-left">
                  {gap.manages !== "—" && (
                    <div className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 bg-[var(--color-success)]" />
                      <p className="text-sm leading-snug text-[var(--color-text-primary)]">
                        <span className="font-semibold text-[var(--color-text-heading)]">
                          Manages:
                        </span>{" "}
                        {gap.manages}
                      </p>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 ${tone.dot}`}
                    />
                    <p className="text-sm leading-snug text-[var(--color-text-primary)]">
                      <span className={`font-semibold ${tone.accent}`}>
                        Misses:
                      </span>{" "}
                      {gap.misses}
                    </p>
                  </div>
                </div>
              </Spotlight>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.2, ease }}
        className="max-w-3xl mx-auto mt-10 md:mt-12 rounded-[var(--radius-xl)] px-8 py-7 text-center border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-bg-cream)] to-white"
      >
        <p className="text-base md:text-lg tracking-[-0.01em] text-[var(--color-text-secondary)]">
          <span className="text-[var(--color-accent-primary)] font-medium">
            MetaOrtho fills this gap —
          </span>{" "}
          one practice monitoring everything your weight-loss doctor
          doesn&apos;t.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
