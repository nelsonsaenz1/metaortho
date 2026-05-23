"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Spotlight from "@/components/ui/motion/Spotlight";

const ease = [0.23, 1, 0.32, 1] as const;

const dimensions = [
  {
    label: "Symptoms",
    copy: "Nausea, fatigue, weakness, joint pain, and other side effects — reviewed in context, not dismissed.",
  },
  {
    label: "Nutrition",
    copy: "Protein intake and eating patterns that protect strength and energy while you lose weight.",
  },
  {
    label: "Strength",
    copy: "Resistance training and functional changes that the scale never captures.",
  },
  {
    label: "Labs",
    copy: "The lab markers worth checking on GLP-1 therapy — and when to recheck them.",
  },
  {
    label: "Medication response",
    copy: "How your drug and dose are actually working, and whether they still fit your goals.",
  },
  {
    label: "Body composition",
    copy: "Lean mass and bone health — including DEXA when it's clinically appropriate.",
  },
];

export default function CostComparison() {
  return (
    <SectionWrapper bg="dark" id="full-picture" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mesh-blob-slow absolute -right-40 top-12 h-[34rem] w-[34rem] rounded-full bg-[var(--color-accent-primary)]/8 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center mb-14">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
          The full picture
        </p>
        <h2
          className="mb-6 text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          The scale is only one data point.
        </h2>
        <p className="text-lg leading-relaxed text-white/85">
          Patients on GLP-1 therapy often need a broader view — symptoms,
          nutrition, strength, labs, medication response, and body composition.
          A specialty consult looks at all of it.
        </p>
      </div>

      <div className="relative z-10 grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {dimensions.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease }}
          >
            <Spotlight
              color="rgba(255, 255, 255, 0.4)"
              glow="rgba(255, 255, 255, 0.05)"
              className="h-full glass-dark rounded-[var(--radius-lg)] border border-white/10 p-6 transition-[transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 overflow-hidden"
            >
              <p
                className="text-lg font-normal tracking-[-0.01em] mb-2 text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {d.label}
              </p>
              <p className="text-[13px] leading-relaxed text-white/80">{d.copy}</p>
            </Spotlight>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
