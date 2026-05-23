"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Spotlight from "@/components/ui/motion/Spotlight";

const ease = [0.23, 1, 0.32, 1] as const;

const questions: string[] = [
  "Am I a good candidate for a GLP-1?",
  "Is my current medication and dose still the right fit?",
  "Are my side effects normal, or a sign I need a management adjustment?",
  "Am I losing fat, muscle, or both?",
  "Should I be tracking labs, DEXA, strength, nutrition, or bone health?",
  "Who is looking at the full picture?",
];

export default function TheProblem() {
  return (
    <SectionWrapper bg="primary" id="the-problem">
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
          The bigger picture
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6">
          Most GLP-1 care focuses on weight.
          <br className="hidden md:block" /> But patients often have bigger
          questions.
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          GLP-1 therapy is one of the most consequential drug classes in modern
          medicine. The questions worth asking go well beyond the number on the
          scale.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {questions.map((q, i) => (
          <motion.div
            key={q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.07, ease }}
            className="h-full"
          >
            <Spotlight
              color="rgba(42, 111, 151, 0.4)"
              glow="rgba(42, 111, 151, 0.06)"
              className="h-full rounded-[var(--radius-lg)] bg-[var(--color-bg-cream)] border border-[var(--color-border)] p-7 md:p-8 flex items-start gap-4 transition-[transform,box-shadow] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 overflow-hidden"
            >
              <span
                className="flex-shrink-0 w-9 h-9 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-accent-primary)] flex items-center justify-center text-[15px] font-semibold tabular-nums"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {i + 1}
              </span>
              <p
                className="text-lg md:text-xl font-normal tracking-[-0.01em] leading-snug text-[var(--color-text-heading)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {q}
              </p>
            </Spotlight>
          </motion.div>
        ))}
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
            MetaOrtho was built for these questions —
          </span>{" "}
          a structured, physician-led review of candidacy, medication fit, side
          effects, and what to monitor over time.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
