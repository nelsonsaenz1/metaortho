"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Spotlight from "@/components/ui/motion/Spotlight";

const ease = [0.23, 1, 0.32, 1] as const;
const maxCost = 65000;

const treatmentCosts = [
  {
    label: "MetaOrtho assessment",
    range: "$149",
    high: 149,
    tone: "good",
    note: "Baseline MSK review",
  },
  {
    label: "ER visit · gout flare",
    range: "$2K–$5K",
    high: 5000,
    tone: "bad",
    note: "Single acute visit",
  },
  {
    label: "Osteoporosis treatment",
    range: "$8K–$15K/yr",
    high: 15000,
    tone: "bad",
    note: "Annual care, ongoing",
  },
  {
    label: "Hip fracture surgery",
    range: "$30K–$65K",
    high: 65000,
    tone: "bad",
    note: "Procedure-level cost",
  },
] as const;

function barHeightPct(high: number) {
  if (high === 149) return 6;
  return Math.max(12, Math.round((high / maxCost) * 100));
}

function barWidthPct(high: number) {
  if (high === 149) return 8;
  return Math.max(10, Math.round((high / maxCost) * 100));
}

export default function CostComparison() {
  return (
    <SectionWrapper
      bg="dark"
      id="cost-comparison"
      className="relative overflow-hidden"
    >
      {/* single muted ambient blob — replaces grid + dual-blob clutter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="mesh-blob-slow absolute -right-40 top-12 h-[34rem] w-[34rem] rounded-full bg-[var(--color-success)]/8 blur-3xl" />
      </div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-[0.92fr_1.25fr] lg:items-end">
        {/* LEFT — heading + entry-point card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-xl"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
            Cost avoidance
          </p>
          <h2
            className="mb-6 text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Catch it early, or pay later.
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-white/85">
            GLP-1 patients lose bone, muscle, and uric-acid control faster than
            most prescribers screen for. A baseline reading is $149. The
            complications, once they show up, are not.
          </p>

          <div className="glass-dark mt-10 rounded-[var(--radius-lg)] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/65">
              MetaOrtho entry point
            </p>
            <div className="mt-4 flex items-baseline gap-3">
              <span
                className="text-6xl font-bold tracking-[-0.04em] text-white md:text-7xl"
                style={{ color: "var(--color-success)" }}
              >
                $149
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.12em] text-white/65">
                assessment
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/75">
              Includes DEXA orders, intake, and a written protocol from your
              MetaOrtho physician.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              An assessment isn&apos;t a guarantee against future care — it&apos;s
              a chance to act before a number becomes a procedure.
            </p>
          </div>
        </motion.div>

        {/* RIGHT — comparison panel */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="relative"
        >
          <Spotlight
            color="rgba(255, 255, 255, 0.4)"
            glow="rgba(255, 255, 255, 0.05)"
            className="glass-dark relative overflow-hidden rounded-[var(--radius-xl)] p-5 sm:p-7 lg:p-8"
          >
            {/* header row */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white/85">
                  High-end cost comparison
                </p>
                <p className="mt-1 text-sm text-white/55">
                  Scaled to a $65K ceiling
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3 text-left sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
                  Difference
                </p>
                <p
                  className="mt-1 text-2xl font-bold tabular-nums"
                  style={{ color: "var(--color-success)" }}
                >
                  436×
                </p>
                <p className="text-xs text-white/55">$65K vs $149</p>
              </div>
            </div>

            {/* MOBILE — horizontal bars */}
            <div className="space-y-5 sm:hidden">
              {treatmentCosts.map((cost, index) => {
                const isGood = cost.tone === "good";
                return (
                  <motion.div
                    key={cost.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.07,
                      ease,
                    }}
                  >
                    <div className="mb-2 flex items-baseline justify-between gap-4">
                      <p
                        className="text-sm font-semibold leading-tight"
                        style={{
                          color: isGood
                            ? "var(--color-success)"
                            : "rgba(255,255,255,0.95)",
                        }}
                      >
                        {cost.label}
                      </p>
                      <p
                        className="shrink-0 text-sm font-bold tabular-nums"
                        style={{
                          color: isGood
                            ? "var(--color-success)"
                            : "rgba(244, 162, 152, 1)",
                        }}
                      >
                        {cost.range}
                      </p>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${barWidthPct(cost.high)}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.75,
                          delay: 0.28 + index * 0.07,
                          ease,
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: isGood
                            ? "var(--color-success)"
                            : "linear-gradient(90deg, rgba(192, 57, 43, 0.95), rgba(244, 162, 152, 0.95))",
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* DESKTOP — vertical bars */}
            <div className="relative hidden min-h-[420px] sm:block">
              {/* baseline only, no tick labels */}
              <div className="absolute inset-x-0 bottom-8 h-px bg-white/12" />

              <div className="absolute inset-x-0 bottom-8 grid h-[360px] grid-cols-4 items-end gap-6">
                {treatmentCosts.map((cost, index) => {
                  const isGood = cost.tone === "good";
                  return (
                    <motion.div
                      key={cost.label}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.55,
                        delay: 0.22 + index * 0.08,
                        ease,
                      }}
                      className="flex h-full min-w-0 flex-col justify-end"
                    >
                      <div className="mb-3 min-h-[5.5rem]">
                        <p
                          className="text-balance text-sm font-semibold leading-tight"
                          style={{
                            color: isGood
                              ? "var(--color-success)"
                              : "rgba(255,255,255,0.95)",
                          }}
                        >
                          {cost.label}
                        </p>
                        <p
                          className="mt-1 text-sm font-bold tabular-nums"
                          style={{
                            color: isGood
                              ? "var(--color-success)"
                              : "rgba(244, 162, 152, 1)",
                          }}
                        >
                          {cost.range}
                        </p>
                        <p className="mt-1 hidden text-[11px] leading-tight text-white/45 sm:block">
                          {cost.note}
                        </p>
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${barHeightPct(cost.high)}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 0.32 + index * 0.08,
                          ease,
                        }}
                        className="rounded-t-[var(--radius-md)]"
                        style={{
                          background: isGood
                            ? "var(--color-success)"
                            : "linear-gradient(180deg, rgba(244, 162, 152, 1), rgba(192, 57, 43, 0.95))",
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* bottom highlight */}
            <div className="mt-2 rounded-[var(--radius-lg)] border border-white/10 bg-white/5 px-5 py-4">
              <p
                className="text-xl font-normal leading-snug tracking-[-0.015em] text-white md:text-2xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                One hip-fracture bill could cover 436 MetaOrtho assessments.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                That&apos;s the gap between monitoring early and reacting late.
              </p>
            </div>
          </Spotlight>

          <p className="mt-4 text-xs leading-relaxed text-white/45">
            U.S. high-end estimates: hip fracture surgery $30K–$65K;
            osteoporosis care $8K–$15K/year; ER gout flare $2K–$5K; MetaOrtho
            assessment $149. Actual costs vary by patient, geography, and
            insurance.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
