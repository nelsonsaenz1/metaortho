"use client";

import { motion } from "framer-motion";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import ShimmerBar from "@/components/ui/motion/ShimmerBar";
import AnimatedNumber from "@/components/ui/motion/AnimatedNumber";
import { trackEvent } from "@/lib/analytics";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * PortalPreview — marketing showcase of the member dashboard.
 * Intentionally a STYLED REPLICA, not an iframe. Lets us control motion,
 * lighting, and tilt without dragging the real app code through marketing.
 */
export default function PortalPreview() {
  return (
    <section
      id="portal-preview"
      className="relative overflow-hidden bg-[var(--color-bg-darkest)] text-white py-28 md:py-36"
    >
      <MeshBackground variant="dark" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 glass-dark rounded-[var(--radius-pill)] mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] animate-breath" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/90">
              Patient portal · Preview
            </span>
          </div>

          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-normal tracking-[-0.03em] leading-[1.05] mb-5"
            style={{ color: "white" }}
          >
            Your GLP-1 plan, tracked with a{" "}
            <span className="text-[var(--color-accent-primary)]">
              clinical dashboard
            </span>
            .
          </h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-xl">
            After your consult, your GLP-1 Optimization Score, medication
            response, side effects, nutrition and strength needs, and
            body-composition trends live in one place — tracked every time we
            see you.
          </p>
        </motion.div>

        {/* Portal frame — stable / still, ~70% of slide width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease }}
          className="relative w-full md:w-[70%] mx-auto"
        >
            {/* App window chrome */}
            <div className="glass-dark rounded-[var(--radius-xl)] p-3 md:p-5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-2 px-2 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="flex-1" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-success)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                  Live
                </span>
              </div>

              {/* Dashboard body */}
              <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-dark)] p-5 md:p-7 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-[var(--color-accent-primary)]/20 blur-[90px] pointer-events-none"
                />

                {/* Greeting row */}
                <div className="relative flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-2">
                      Good morning
                    </p>
                    <p
                      className="text-2xl md:text-3xl font-normal tracking-[-0.02em]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Jay, you&apos;re on track.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-pill)] bg-white/5 border border-white/10 text-[11px] text-white/75">
                    <svg
                      className="w-3.5 h-3.5 text-[var(--color-success)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Synced 2 min ago
                  </div>
                </div>

                {/* Bento grid */}
                <div className="relative grid grid-cols-6 gap-3 md:gap-4">
                  {/* GLP-1 Optimization Score — hero tile */}
                  <div className="col-span-6 md:col-span-4 relative rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-accent-primary)]/20 to-[var(--color-accent-teal)]/10 border border-white/10 p-5 md:p-6 overflow-hidden">
                    <div
                      aria-hidden
                      className="absolute -top-16 -right-12 w-52 h-52 rounded-full bg-[var(--color-accent-primary)]/30 blur-[80px]"
                    />
                    <div className="relative">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 mb-4">
                        GLP-1 Optimization Score
                      </p>
                      <div className="flex items-end gap-3 mb-4">
                        <span
                          className="text-[56px] md:text-[72px] leading-none font-normal tracking-[-0.04em]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          <AnimatedNumber value={82} duration={1400} />
                        </span>
                        <span className="text-sm text-white/70 mb-3">
                          / 100
                        </span>
                      </div>
                      <ShimmerBar
                        percent={82}
                        trackClassName="bg-white/8"
                        fillClassName="bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-teal)] to-[var(--color-accent-primary)]"
                        heightClassName="h-1.5"
                        shimmer={false}
                        className="mb-4"
                      />
                      <p className="text-[12px] text-white/80 leading-relaxed">
                        Maximizing benefit while minimizing downside — dose
                        response, side effects, nutrition, and body composition.{" "}
                        <span className="text-[var(--color-accent-primary)] font-semibold">
                          +3 vs last assessment
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Next visit */}
                  <div className="col-span-6 md:col-span-2 rounded-[var(--radius-lg)] bg-white/[0.06] border border-white/10 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-primary)] mb-3">
                      Next visit
                    </p>
                    <p
                      className="text-2xl font-normal tracking-[-0.02em] mb-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      May 2
                    </p>
                    <p className="text-[11px] text-white/70 mb-4">
                      2:30 PM CT · Your doctor
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-white">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Video visit
                    </div>
                  </div>

                  {/* Quick markers */}
                  {[
                    {
                      label: "Lean Mass",
                      value: 58.2,
                      unit: "kg",
                      delta: "+0.4",
                      good: true,
                    },
                    {
                      label: "DEXA T-score",
                      value: -0.8,
                      decimals: 1,
                      unit: "",
                      delta: "stable",
                      good: true,
                    },
                    {
                      label: "Vitamin D",
                      value: 38,
                      unit: "ng/mL",
                      delta: "+12",
                      good: true,
                    },
                    {
                      label: "Uric Acid",
                      value: 6.4,
                      decimals: 1,
                      unit: "mg/dL",
                      delta: "+0.3",
                      good: false,
                    },
                  ].map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + i * 0.06,
                        ease,
                      }}
                      className="col-span-3 md:col-span-3 lg:col-span-[1.5] rounded-[var(--radius-md)] bg-white/[0.04] border border-white/10 p-4"
                      style={{ gridColumn: "span 3" }}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/80 mb-2">
                        {m.label}
                      </p>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span
                          className="text-xl font-normal tracking-[-0.02em]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          <AnimatedNumber
                            value={m.value}
                            decimals={m.decimals ?? 1}
                            duration={1100}
                          />
                        </span>
                        {m.unit && (
                          <span className="text-[10px] text-white/80">
                            {m.unit}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-[11px] font-medium ${m.good ? "text-[var(--color-success)]" : "text-[var(--color-warning)]"}`}
                      >
                        {m.delta.includes("+") ? "↑" : m.delta.includes("-") ? "↓" : "→"}{" "}
                        {m.delta}
                      </p>
                    </motion.div>
                  ))}

                  {/* Lab progress */}
                  <div className="col-span-6 md:col-span-4 rounded-[var(--radius-lg)] bg-white/[0.06] border border-white/10 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-primary)] mb-1">
                          Q2 baseline panel
                        </p>
                        <p
                          className="text-[15px] font-normal tracking-[-0.01em]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Lab &amp; imaging status
                        </p>
                      </div>
                      <span className="text-[11px] font-medium text-white/75 tabular-nums">
                        3 of 4
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { label: "Requisition created", done: true },
                        { label: "Blood draw at Labcorp", done: true },
                        { label: "DEXA scan · May 1", active: true },
                        { label: "Doctor review", pending: true },
                      ].map((step) => (
                        <div
                          key={step.label}
                          className="flex items-center gap-3"
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${
                              step.done
                                ? "bg-[var(--color-success)]"
                                : step.active
                                  ? "bg-[var(--color-accent-primary)] ring-2 ring-[var(--color-accent-primary)]/30"
                                  : "bg-white/10"
                            }`}
                          >
                            {step.done && (
                              <svg
                                className="w-2.5 h-2.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                            {step.active && (
                              <span className="w-1 h-1 rounded-full bg-white" />
                            )}
                          </span>
                          <span
                            className={`text-[12px] ${
                              step.pending
                                ? "text-white/75"
                                : "text-white/90"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Checklist ring */}
                  <div className="col-span-6 md:col-span-2 rounded-[var(--radius-lg)] bg-white/[0.06] border border-white/10 p-5 flex flex-col items-start justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-primary)] mb-3">
                      Your checklist
                    </p>
                    <div className="flex items-center gap-4 w-full">
                      <div className="relative w-14 h-14 flex-shrink-0">
                        <svg
                          className="absolute inset-0 -rotate-90"
                          viewBox="0 0 56 56"
                        >
                          <circle
                            cx="28"
                            cy="28"
                            r="25"
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="3"
                          />
                          <motion.circle
                            cx="28"
                            cy="28"
                            r="25"
                            fill="none"
                            stroke="var(--color-accent-primary)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="157"
                            initial={{ strokeDashoffset: 157 }}
                            whileInView={{ strokeDashoffset: 157 - (2 / 5) * 157 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{
                              duration: 1.2,
                              delay: 0.4,
                              ease,
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-[13px] font-semibold tabular-nums"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            40%
                          </span>
                        </div>
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-[12px] text-white/90 font-medium leading-tight mb-1">
                          2 of 5 complete
                        </p>
                        <p className="text-[10px] text-white/80 leading-snug">
                          Schedule DEXA · log protein target
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        {/* Below-preview feature list + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-16 md:mt-20 grid md:grid-cols-3 gap-5 mb-12"
        >
          {[
            {
              title: "One GLP-1 Optimization Score",
              copy: "A single signal that rolls up dose response, side effects, nutrition, strength, and body composition — so you can see whether the plan is working.",
            },
            {
              title: "Every marker tracked",
              copy: "28 biomarkers + imaging measurements across 6 body systems, each plotted against its reference range.",
            },
            {
              title: "Prep + protocol in one place",
              copy: "Your next visit, the labs due, and your care team's protocol updates — all synced with every check-in.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="glass-dark rounded-[var(--radius-lg)] p-6"
            >
              <p
                className="text-lg font-normal tracking-[-0.01em] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {f.title}
              </p>
              <p className="text-[13px] text-white/80 leading-relaxed">
                {f.copy}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <a
            href="/assessment"
            onClick={() => trackEvent("profile_cta_clicked", { location: "portal-preview" })}
            className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[var(--shadow-xl)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em]"
          >
            Get my free GLP-1 profile
          </a>
          <a
            href="/book"
            onClick={() => trackEvent("consult_cta_clicked", { location: "portal-preview" })}
            className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] border border-white/20 text-white/85 hover:bg-white/5 hover:border-white/35 transition-[background-color,border-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em]"
          >
            Book a $400 consult
          </a>
        </motion.div>
      </div>
    </section>
  );
}
