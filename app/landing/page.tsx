"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ---------------------------------------------------------------
   MINI LOGO BAR — replaces the full navbar
--------------------------------------------------------------- */
function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-dark)] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-3 text-white">
          <Logo size={36} />
          <span className="text-xl font-semibold tracking-[-0.03em]">
            MetaOrtho
          </span>
        </Link>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SECTION 1 — HERO
   Full-viewport emotional hook. Provocative headline.
--------------------------------------------------------------- */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-bg-dark)]"
    >
      {/* Atmospheric gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[var(--color-accent-primary)]/8 blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent-teal)]/6 blur-[140px]" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center pt-24 pb-32">
        <motion.div
          style={{ y: yText, opacity: opacityText }}
        >
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pill)] border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/60 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            Now accepting patients in 43 states
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.04em] mb-8"
            style={{ fontFamily: "var(--font-heading)", color: "white" }}
          >
            The weight is coming off.
            <br />
            <span className="text-[var(--color-accent-primary)] opacity-90">
              So are your muscles.
            </span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-14 tracking-[-0.01em]"
          >
            Research shows up to{" "}
            <strong className="text-white/90 font-semibold">
              40% of weight lost on GLP-1 drugs
            </strong>{" "}
            like Ozempic and Mounjaro is muscle and bone — not fat. MetaOrtho is
            the first physician-led practice built to protect what the scale
            can&apos;t measure.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#get-started"
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.12)] transition-all duration-300 tracking-[-0.01em]"
            >
              Protect Your Body — $149
            </a>
            <a
              href="#risk-factors"
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] border border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30 transition-all duration-300 tracking-[-0.01em]"
            >
              See the Research
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 2 — THE PROBLEM (stat ticker)
   Dramatic stats on cream background. Fear of loss > desire for gain.
--------------------------------------------------------------- */
const stats = [
  {
    value: "+30%",
    label: "Osteoporosis Risk",
    detail: "After 5 years on GLP-1 medications",
    color: "var(--color-danger)",
  },
  {
    value: "+150%",
    label: "Bone Softening Risk",
    detail: "Osteomalacia incidence vs. controls",
    color: "#E67E22",
  },
  {
    value: "40%",
    label: "Weight Lost Is Muscle",
    detail: "Not fat — lean tissue, bone & connective tissue",
    color: "var(--color-warning)",
  },
  {
    value: "+12%",
    label: "Gout Risk Increase",
    detail: "From rapid uric acid fluctuations",
    color: "var(--color-accent-warm)",
  },
];

function ProblemSection() {
  return (
    <section
      id="risk-factors"
      className="relative py-28 md:py-36 bg-[var(--color-bg-cream)]"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-text-heading) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4">
            AAOS 2026 Research
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-normal tracking-[-0.03em] mb-6 max-w-3xl mx-auto">
            What your prescriber isn&apos;t monitoring
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Weight loss clinics track pounds on the scale. No one is tracking
            what&apos;s happening underneath — until something breaks.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="bg-white rounded-[var(--radius-xl)] p-7 border border-[var(--color-border)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
            >
              <span
                className="block text-4xl md:text-5xl font-bold tracking-tighter mb-3 leading-none"
                style={{ color: stat.color, fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </span>
              <p className="text-[var(--color-text-heading)] font-semibold text-sm mb-2 tracking-[-0.01em]">
                {stat.label}
              </p>
              <p className="text-[var(--color-text-tertiary)] text-xs leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mt-12 bg-[var(--color-bg-dark)] rounded-[var(--radius-xl)] p-8 md:p-10 text-center"
        >
          <p
            className="text-lg md:text-xl font-normal tracking-[-0.02em] leading-snug"
            style={{
              fontFamily: "var(--font-heading)",
              color: "white",
            }}
          >
            Your weight loss doctor manages the scale.{" "}
            <span className="text-[var(--color-accent-primary)]">
              Who&apos;s managing everything else?
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 3 — WHO THIS IS FOR
   Symptom timeline that escalates in urgency.
--------------------------------------------------------------- */
const riskTimeline = [
  {
    month: "Month 1\u20133",
    title: "The weight drops fast",
    detail:
      "You\u2019re on Ozempic, Wegovy, Mounjaro, or Zepbound. The scale is moving. No one mentions what else is changing.",
    severity: 1,
    color: "var(--color-accent-primary)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
  },
  {
    month: "Month 3\u20136",
    title: "Muscle starts disappearing",
    detail:
      "20+ lbs gone \u2014 but you\u2019re not resistance training. Up to 40% of what you lost is lean tissue, not fat. You feel weaker. Your prescriber says \u201Cthat\u2019s normal.\u201D",
    severity: 2,
    color: "var(--color-warning)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    month: "Month 6\u201312",
    title: "Bones weaken silently",
    detail:
      "No DEXA scan ordered. No vitamin D or calcium checked. Bone density is declining but you have zero symptoms \u2014 until you don\u2019t.",
    severity: 3,
    color: "#E67E22",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    month: "Month 12+",
    title: "The damage surfaces",
    detail:
      "A fracture from a minor fall. A gout flare that sends you to the ER. Joint pain that won\u2019t resolve. Weakness that limits your life. The weight is gone \u2014 and so is your structural health.",
    severity: 4,
    color: "var(--color-danger)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" />
      </svg>
    ),
  },
];

function WhoSection() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading — one line */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <h2
            className="text-[clamp(3rem,8vw,6rem)] font-normal tracking-[-0.04em] leading-[1] text-[var(--color-text-heading)] whitespace-nowrap"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Is this you?
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-5 text-base text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed"
          >
            Here&apos;s what unmonitored GLP-1 weight loss looks like over time.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--color-border-strong)] hidden sm:block" />

          <div className="space-y-5">
            {riskTimeline.map((stage, i) => (
              <motion.div
                key={stage.month}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="relative grid sm:grid-cols-[40px_1fr] gap-4 items-start"
              >
                {/* Timeline node */}
                <div className="relative z-10 flex-shrink-0 hidden sm:flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center ring-[3px] ring-white"
                    style={{ backgroundColor: "var(--color-bg-cream)", color: "var(--color-accent-primary)" }}
                  >
                    {stage.icon}
                  </div>
                </div>

                {/* Compact card */}
                <div className="bg-[var(--color-bg-cream)] rounded-[var(--radius-lg)] px-6 py-5 border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent-primary)]">
                      {stage.month}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-normal tracking-[-0.02em] mb-1.5 text-[var(--color-text-heading)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stage.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="mt-14 text-center"
        >
          <p
            className="text-lg font-normal tracking-[-0.02em] text-[var(--color-text-secondary)] mb-6"
          >
            Recognize yourself?{" "}
            <span className="text-[var(--color-text-heading)] font-medium">
              You can change the outcome.
            </span>
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-lg)] transition-all duration-300 tracking-[-0.01em]"
          >
            Get Your Assessment &mdash; $149
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 4 — THE SOLUTION (what MetaOrtho does)
   Visual comparison: what others miss vs. what we monitor
--------------------------------------------------------------- */
function SolutionSection() {
  return (
    <section className="relative py-28 md:py-36 bg-[var(--color-bg-cream)]">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-text-heading) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4">
            The MetaOrtho difference
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6 max-w-3xl mx-auto">
            The only practice built to protect GLP-1 patients from the inside
            out
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* What others do */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-white rounded-[var(--radius-xl)] p-8 border border-[var(--color-border)]"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--color-danger-bg)] flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[var(--color-danger)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3
              className="text-lg font-normal tracking-[-0.02em] mb-5 text-[var(--color-text-heading)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What your current provider monitors
            </h3>
            <ul className="space-y-3">
              {[
                "Scale weight",
                "BMI",
                "Appetite changes",
                "GI side effects",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[var(--color-text-secondary)] text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-tertiary)] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-danger)] font-semibold uppercase tracking-wide">
                Not monitoring muscle, bone, or joints
              </p>
            </div>
          </motion.div>

          {/* What MetaOrtho does */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="bg-[var(--color-bg-dark)] rounded-[var(--radius-xl)] p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-accent-primary)]/8 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/15 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3
                className="text-lg font-normal tracking-[-0.02em] mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "white",
                }}
              >
                What MetaOrtho monitors
              </h3>
              <ul className="space-y-3">
                {[
                  "DEXA-verified bone density",
                  "Lean muscle mass tracking",
                  "Vitamin D, calcium & metabolic panels",
                  "Uric acid & gout risk",
                  "Resistance training prescription",
                  "Supplement & nutrition protocols",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white/75 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-xs text-[var(--color-success)] font-semibold uppercase tracking-wide">
                  Led by a board-certified orthopedic surgeon
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 5 — HOW IT WORKS (3 steps)
--------------------------------------------------------------- */
const steps = [
  {
    num: "01",
    title: "Book your assessment",
    body: "A 30-minute telehealth visit with our clinical team. We review your GLP-1 history, assess risk factors, and order baseline labs and a DEXA scan.",
    tag: "$149 one-time",
  },
  {
    num: "02",
    title: "Get your protection plan",
    body: "Dr. Saenz reviews everything and builds your personalized protocol: resistance training, nutrition targets, supplements, and any needed medications.",
    tag: "Board-certified surgeon",
  },
  {
    num: "03",
    title: "Monitor as you lose",
    body: "Monthly video check-ins track bone density, muscle composition, and lab trends. Your protocol adapts as your weight loss progresses.",
    tag: "Plans from $79/mo",
  },
];

function HowSection() {
  return (
    <section className="relative py-28 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4">
            How it works
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-5">
            Three steps. All from home.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
            No travel. No waiting rooms. Expert orthopedic care delivered via
            secure telehealth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="relative bg-[var(--color-bg-cream)] rounded-[var(--radius-xl)] p-8 border border-[var(--color-border)] group hover:shadow-[var(--shadow-lg)] transition-all duration-300"
            >
              <div
                className="text-[72px] font-bold text-[var(--color-accent-primary)]/40 leading-none mb-4 tracking-tighter transition-colors duration-300 group-hover:text-[var(--color-accent-primary)]/55"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {step.num}
              </div>
              <h3
                className="text-xl font-normal text-[var(--color-text-heading)] mb-4 tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {step.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6">
                {step.body}
              </p>
              <span className="inline-block text-xs font-semibold text-[var(--color-accent-primary)] tracking-[-0.01em] px-3 py-1.5 bg-[var(--color-accent-light)] rounded-[var(--radius-pill)]">
                {step.tag}
              </span>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-[var(--color-border)]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 6 — CREDIBILITY STRIP
   Trust signals in a tight bar
--------------------------------------------------------------- */
function TrustStrip() {
  return (
    <section className="py-12 bg-[var(--color-bg-cream)] border-y border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-sm text-[var(--color-text-secondary)]">
          {[
            { icon: "⚕\uFE0F", text: "Board-certified orthopedic surgeon" },
            { icon: "\uD83C\uDFE5", text: "Licensed in 43 states" },
            { icon: "\uD83D\uDD12", text: "HIPAA-compliant telehealth" },
            { icon: "\uD83D\uDCCA", text: "DEXA + lab-verified tracking" },
            { icon: "\uD83D\uDCAA", text: "No controlled substances" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2.5">
              <span className="text-base">{item.icon}</span>
              <span className="tracking-[-0.01em] whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 7 — COST COMPARISON
   Puts $149 in perspective against what's at stake
--------------------------------------------------------------- */
const costs = [
  { label: "Hip fracture surgery", range: "$30,000 \u2013 $65,000", pct: 100 },
  {
    label: "Osteoporosis treatment (annual)",
    range: "$8,000 \u2013 $15,000",
    pct: 55,
  },
  { label: "ER visit for gout flare", range: "$2,000 \u2013 $5,000", pct: 25 },
  {
    label: "MetaOrtho assessment",
    range: "$149",
    pct: 5,
    highlight: true,
  },
];

function CostSection() {
  return (
    <section className="relative py-28 md:py-36 bg-[var(--color-bg-dark)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-accent-primary)]/5 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 mb-4">
            The cost of inaction
          </p>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-5"
            style={{ color: "white" }}
          >
            Prevention costs a fraction of treatment
          </h2>
          <p className="text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
            The complications of unmonitored GLP-1 use are expensive, painful,
            and preventable.
          </p>
        </motion.div>

        <div className="space-y-5">
          {costs.map((cost, i) => (
            <motion.div
              key={cost.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
            >
              <div className="flex items-baseline justify-between mb-2">
                <span
                  className={`text-sm ${cost.highlight ? "text-[var(--color-success)] font-semibold" : "text-white/70"}`}
                >
                  {cost.label}
                </span>
                <span
                  className={`text-sm font-bold tabular-nums ${cost.highlight ? "text-[var(--color-success)]" : "text-red-400"}`}
                >
                  {cost.range}
                </span>
              </div>
              <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${cost.pct}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.1,
                    ease,
                  }}
                  className={`h-full rounded-full ${cost.highlight ? "bg-[var(--color-success)]" : "bg-red-400/60"}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 8 — FAQ (mini, 3 questions)
--------------------------------------------------------------- */
const faqs = [
  {
    q: "Do I need a referral from my prescriber?",
    a: "No referral needed. MetaOrtho is a direct-to-patient telehealth practice. You can book an assessment whether your GLP-1 was prescribed by a primary care doctor, weight loss clinic, or online platform.",
  },
  {
    q: "What happens during the initial assessment?",
    a: "A 30-minute video visit where we review your GLP-1 history, assess musculoskeletal risk factors, order baseline labs (DEXA, vitamin D, metabolic panel, uric acid), and build your personalized protection protocol.",
  },
  {
    q: "Is this covered by insurance?",
    a: "The MetaOrtho consultation is a cash-pay service ($149). However, labs and DEXA scans ordered through the visit are typically covered by insurance when processed through Quest Diagnostics or Labcorp.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-28 md:py-36 bg-[var(--color-bg-cream)]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4">
            Common questions
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em]">
            Quick answers
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <span className="text-[var(--color-text-heading)] font-medium text-[15px] tracking-[-0.01em] pr-4">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[var(--color-text-tertiary)] text-xl flex-shrink-0"
                >
                  +
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: open === i ? "auto" : 0,
                  opacity: open === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/faq"
            className="text-sm text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] font-medium transition-colors"
          >
            View all FAQs &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 9 — FINAL CTA
   High-urgency conversion section
--------------------------------------------------------------- */
function FinalCTASection() {
  return (
    <section
      id="get-started"
      className="relative py-32 md:py-44 bg-[var(--color-bg-dark)] overflow-hidden"
    >
      {/* Layered glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[var(--color-accent-primary)]/4 blur-[180px]" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 mb-6">
            One assessment. Total clarity.
          </p>

          <h2
            className="text-[clamp(2.25rem,5.5vw,4rem)] font-normal tracking-[-0.03em] leading-[1.05] mb-8"
            style={{ color: "white" }}
          >
            You took control of your weight.
            <br />
            <span className="text-[var(--color-accent-primary)]">
              Now take control of what&apos;s left.
            </span>
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-14">
            A 30-minute telehealth visit with a board-certified orthopedic
            surgeon. Baseline labs. A DEXA scan. A plan to protect your muscles,
            bones, and joints while the weight keeps coming off.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/book"
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-all duration-300 tracking-[-0.01em]"
            >
              Book Your Assessment &mdash; $149
            </a>
            <a
              href="/assessment"
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] border border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30 transition-all duration-300 tracking-[-0.01em]"
            >
              Take the Free Risk Quiz
            </a>
          </div>

          <p className="text-sm text-white/40">
            No insurance needed &middot; Results within 48 hours &middot;
            Licensed in 43 states
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   BOTTOM BAR — Minimal footer
--------------------------------------------------------------- */
function BottomBar() {
  return (
    <footer className="bg-[var(--color-bg-darkest)] py-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-white/50">
            <Logo size={24} />
            <span className="text-sm">
              &copy; {new Date().getFullYear()} MetaOrthopedics
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/35">
            <Link href="/about" className="hover:text-white/60 transition-colors">
              About
            </Link>
            <Link href="/" className="hover:text-white/60 transition-colors">
              Full Site
            </Link>
            <Link href="/faq" className="hover:text-white/60 transition-colors">
              FAQ
            </Link>
            <span>HIPAA Compliant</span>
          </div>
        </div>

        <p className="text-[11px] text-white/20 mt-6 leading-relaxed max-w-4xl">
          MetaOrthopedics provides telehealth consultations for musculoskeletal
          health monitoring. This site is for informational purposes and does not
          constitute medical advice. Always consult your healthcare provider
          before making changes to your treatment plan.
        </p>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------
   PAGE ASSEMBLY
--------------------------------------------------------------- */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <HeroSection />
      <ProblemSection />
      <WhoSection />
      <SolutionSection />
      <TrustStrip />
      <HowSection />
      <CostSection />
      <FAQSection />
      <FinalCTASection />
      <BottomBar />
    </div>
  );
}
