"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Marquee from "@/components/ui/motion/Marquee";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";

const ease = [0.23, 1, 0.32, 1] as const;

const supplements = [
  { name: "High-Quality Protein", purpose: "Supports muscle preservation", dose: "140 g/day" },
  { name: "Vitamin D3 + K2", purpose: "Supports bone health", dose: "5,000 IU + 180 mcg" },
  { name: "Calcium Citrate", purpose: "Supports bone strength", dose: "1,200 mg/day" },
  { name: "Creatine Monohydrate", purpose: "Supports lean muscle", dose: "5 g/day" },
  { name: "HMB", purpose: "Supports muscle preservation", dose: "3 g/day" },
  { name: "Vitamin B12", purpose: "Supports energy & nerve health", dose: "1,000 mcg" },
  { name: "Magnesium Glycinate", purpose: "Supports muscle recovery & sleep", dose: "400 mg" },
  { name: "Omega-3 (EPA/DHA)", purpose: "Supports joint comfort", dose: "2 g EPA+DHA" },
];

function SupplementPill({
  name,
  purpose,
  dose,
}: {
  name: string;
  purpose: string;
  dose: string;
}) {
  return (
    <div className="glass-light rounded-[var(--radius-lg)] px-6 py-5 w-[280px] shrink-0 hover:-translate-y-0.5 transition-transform duration-[var(--dur-hover)] ease-[var(--ease-out)] motion-reduce:hover:translate-y-0">
      <div className="flex items-start justify-between mb-2">
        <p className="font-semibold text-[var(--color-text-heading)] text-[14px] tracking-[-0.01em]">
          {name}
        </p>
        <span className="text-[10px] font-mono text-[var(--color-accent-primary)] tabular-nums bg-[var(--color-accent-light)] rounded-[var(--radius-sm)] px-2 py-0.5 whitespace-nowrap">
          {dose}
        </span>
      </div>
      <p className="text-[12px] text-[var(--color-text-tertiary)] leading-relaxed">
        {purpose}
      </p>
    </div>
  );
}

export default function Supplements() {
  return (
    <SectionWrapper bg="warm">
      <div className="grid lg:grid-cols-[1.1fr_1.3fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-[var(--radius-pill)] border border-[var(--color-border)] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-warm)] animate-breath" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-warm)]">
              Coming soon · Bundles
            </span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6">
            GLP-1 Body Protection
            <br />
            supplement bundle
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
            Physician-curated supplement kits designed specifically for GLP-1
            patients. Everything your body needs to maintain muscle, protect
            bones, and optimize nutrition during weight loss.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            Each bundle is selected by Dr. Saenz based on the latest evidence.
            No guesswork — just the right supplements at the right doses,
            delivered monthly.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <WaitlistCTA
              variant="dark"
              size="md"
              source="supplements"
              eyebrow="Supplement bundle · Waitlist"
              headline={
                <>
                  Be first to get the
                  <br />
                  MetaOrtho bundle.
                </>
              }
              subcopy="Monthly, physician-curated, delivered to your door. You'll be first in line."
            >
              Join bundle waitlist
            </WaitlistCTA>
            <p className="text-sm text-[var(--color-text-tertiary)] self-center">
              Est. $59–$89
            </p>
          </div>
          <p className="mt-6 text-[11px] text-[var(--color-text-tertiary)] leading-relaxed max-w-md">
            These statements have not been evaluated by the Food and Drug
            Administration. These products are not intended to diagnose,
            treat, cure, or prevent any disease.
          </p>
        </motion.div>

        {/* Marquee of supplement pills */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="relative -mx-5 sm:-mx-8 lg:mx-0"
        >
          <div className="space-y-3">
            <Marquee>
              {supplements.slice(0, 4).map((s) => (
                <SupplementPill key={s.name} {...s} />
              ))}
            </Marquee>
            <div style={{ direction: "rtl" }}>
              <Marquee>
                {supplements.slice(4).map((s) => (
                  <SupplementPill key={s.name} {...s} />
                ))}
              </Marquee>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
