"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import CostComparison from "@/components/home/CostComparison";
import PortalPreview from "@/components/home/PortalPreview";
import { trackEvent } from "@/lib/analytics";

const ease = [0.23, 1, 0.32, 1] as const;

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
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[var(--color-bg-dark)]"
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
        <motion.div style={{ y: yText, opacity: opacityText }}>
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pill)] border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/80 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            Physician-led specialty GLP-1 management
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.04em] mb-8"
            style={{ fontFamily: "var(--font-heading)", color: "white" }}
          >
            GLP-1 care should manage more than
            <br />
            <span className="text-[var(--color-accent-primary)] opacity-90">
              the number on the scale.
            </span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-12 tracking-[-0.01em]"
          >
            A physician-led specialty consult for people starting, taking, or
            questioning GLP-1 treatment. Start with a personalized GLP-1
            Management Profile that previews what your consult should focus on.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/assessment"
              onClick={() => trackEvent("profile_cta_clicked", { location: "landing-hero" })}
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.12)] transition-all duration-300 tracking-[-0.01em]"
            >
              Get my free GLP-1 profile
            </a>
            <a
              href="/book"
              onClick={() => trackEvent("consult_cta_clicked", { location: "landing-hero" })}
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] border border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30 transition-all duration-300 tracking-[-0.01em]"
            >
              Book a $400 specialty consult
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 text-[12px] text-white/45 tracking-[0.02em] max-w-md mx-auto leading-relaxed"
          >
            Educational assessment only. Final treatment decisions require
            consultation with a licensed clinician.
          </motion.p>
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
   SECTION 2 — THE PROBLEM (the bigger questions)
--------------------------------------------------------------- */
const questions = [
  "Am I a good candidate for a GLP-1?",
  "Is my current medication and dose still the right fit?",
  "Are my side effects normal, or a sign I need a change?",
  "Am I losing fat, muscle, or both?",
  "Should I be tracking labs, DEXA, strength, or bone health?",
  "Who is looking at the full picture?",
];

function ProblemSection() {
  return (
    <section
      id="bigger-questions"
      className="relative py-28 md:py-36 bg-[var(--color-bg-cream)]"
    >
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
            The bigger picture
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-normal tracking-[-0.03em] mb-6 max-w-3xl mx-auto">
            Most GLP-1 care focuses on weight. But patients have bigger
            questions.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            GLP-1 therapy is one of the most consequential drug classes in modern
            medicine. The questions worth asking go beyond the scale.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {questions.map((q, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="bg-white rounded-[var(--radius-xl)] p-7 border border-[var(--color-border)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 flex items-start gap-3"
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-bg-cream)] text-[var(--color-accent-primary)] flex items-center justify-center text-sm font-semibold tabular-nums"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {i + 1}
              </span>
              <p
                className="text-[var(--color-text-heading)] text-lg font-normal tracking-[-0.01em] leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {q}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mt-12 bg-[var(--color-bg-dark)] rounded-[var(--radius-xl)] p-8 md:p-10 text-center max-w-3xl mx-auto"
        >
          <p
            className="text-lg md:text-xl font-normal tracking-[-0.02em] leading-snug"
            style={{ fontFamily: "var(--font-heading)", color: "white" }}
          >
            MetaOrtho was built for these questions —{" "}
            <span className="text-[var(--color-accent-primary)]">
              a structured, physician-led review.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 3 — WHO THIS IS FOR
--------------------------------------------------------------- */
const segments = [
  {
    label: "Already taking a GLP-1",
    detail:
      "You're losing weight but unsure whether your current medication, dose, side effects, nutrition, or monitoring plan is still right.",
  },
  {
    label: "Considering starting",
    detail:
      "You want a second opinion on candidacy, tradeoffs, risks, and what should be monitored before you begin.",
  },
  {
    label: "Losing weight rapidly",
    detail:
      "You want to understand body-composition, lean-mass, bone-health, and strength considerations before the scale becomes the only metric.",
  },
  {
    label: "Experiencing symptoms",
    detail:
      "Fatigue, weakness, joint pain, gout concerns, nausea, or appetite changes you'd like reviewed in context.",
  },
  {
    label: "Higher-risk patients",
    detail:
      "Low bone density, prior fractures, orthopedic issues, older age, or significant weight-loss goals.",
  },
];

function WhoSection() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4">
            Who this is for
          </p>
          <h2
            className="text-[clamp(2.25rem,5vw,3.5rem)] font-normal tracking-[-0.035em] leading-[1.02] text-[var(--color-text-heading)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Built for patients who want more
            <br className="hidden md:block" /> structure around GLP-1 treatment.
          </h2>
        </motion.div>

        <div className="grid gap-4 md:gap-5 md:grid-cols-2">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className={`bg-[var(--color-bg-cream)] rounded-[var(--radius-lg)] px-6 py-6 border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-all duration-300 ${
                i === segments.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)]" />
                <h3
                  className="text-lg font-normal tracking-[-0.02em] text-[var(--color-text-heading)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {seg.label}
                </h3>
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed pl-5">
                {seg.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 4 — SPECIALTY CONSULT vs GENERIC PROGRAM
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
            A specialty consult, not another generic weight-loss program
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Typical program */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-white rounded-[var(--radius-xl)] p-8 border border-[var(--color-border)]"
          >
            <h3
              className="text-lg font-normal tracking-[-0.02em] mb-5 text-[var(--color-text-heading)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              A typical GLP-1 program
            </h3>
            <ul className="space-y-3">
              {[
                "Scale weight and a prescription",
                "Monthly refills",
                "Limited side-effect review",
                "No body-composition or bone monitoring",
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
          </motion.div>

          {/* MetaOrtho specialty consult */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="bg-[var(--color-bg-dark)] rounded-[var(--radius-xl)] p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-accent-primary)]/8 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h3
                className="text-lg font-normal tracking-[-0.02em] mb-5"
                style={{ fontFamily: "var(--font-heading)", color: "white" }}
              >
                A MetaOrtho specialty consult
              </h3>
              <ul className="space-y-3">
                {[
                  "Candidacy and goals review",
                  "Medication and dose context",
                  "Side-effect and tolerability discussion",
                  "Body composition, muscle & bone monitoring",
                  "Labs and DEXA when clinically appropriate",
                  "Recommended next steps and follow-up",
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
                  Led by a board-certified endocrinologist &amp; orthopedic surgeon
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
   SECTION 5 — CREDIBILITY STRIP
--------------------------------------------------------------- */
function TrustStrip() {
  return (
    <section className="py-12 bg-[var(--color-bg-cream)] border-y border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-sm text-[var(--color-text-secondary)]">
          {[
            { icon: "⚕️", text: "Board-certified endocrinologist + orthopedic surgeon" },
            { icon: "🔒", text: "HIPAA-compliant telehealth" },
            { icon: "📋", text: "Cash-pay: $400 initial · $200 follow-up" },
            { icon: "🧭", text: "Candidacy, medication & monitoring review" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2.5">
              <span className="text-base">{item.icon}</span>
              <span className="tracking-[-0.01em]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION 6 — HOW IT WORKS (3 steps)
--------------------------------------------------------------- */
const steps = [
  {
    num: "01",
    title: "Get my free GLP-1 profile",
    body: "Answer questions about your GLP-1 status, goals, medication history, side effects, nutrition, strength, and body-composition concerns.",
    tag: "~5 minutes · free",
  },
  {
    num: "02",
    title: "Receive your profile preview",
    body: "Your results summarize your management complexity — Standard, Enhanced, or High-Risk — and preview what a specialty consult would focus on.",
    tag: "Instant",
  },
  {
    num: "03",
    title: "Book a specialty consult",
    body: "Meet a licensed clinician for a cash-pay specialty review. Initial consults are $400; follow-ups are $200.",
    tag: "$400 initial · $200 follow-up",
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
            Profile, preview, then a consult.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
            No travel. No waiting rooms. A structured assessment, then a focused
            specialty consult — all via secure telehealth.
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
   SECTION 8 — FAQ (mini)
--------------------------------------------------------------- */
const faqs = [
  {
    q: "Do I need to already be on a GLP-1?",
    a: "No. The GLP-1 Management Profile is built for current users, former users, and people considering treatment for the first time.",
  },
  {
    q: "What does the $400 consult include?",
    a: "A specialty review of your GLP-1 status, goals, relevant history, medication and dose context, side-effect concerns, monitoring needs, and recommended next steps. Follow-up consults are $200.",
  },
  {
    q: "Is this covered by insurance?",
    a: "Phase 1 consults are cash-pay. Some labs, imaging, or third-party services may have separate costs or insurance options depending on provider and location.",
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
--------------------------------------------------------------- */
function FinalCTASection() {
  return (
    <section
      id="get-started"
      className="relative py-32 md:py-44 bg-[var(--color-bg-dark)] overflow-hidden"
    >
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
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/75 mb-6">
            Start with the Profile
          </p>

          <h2
            className="text-[clamp(2.25rem,5.5vw,4rem)] font-normal tracking-[-0.03em] leading-[1.05] mb-8"
            style={{ color: "white" }}
          >
            Get your GLP-1
            <br />
            <span className="text-[var(--color-accent-primary)]">
              Management Profile.
            </span>
          </h2>

          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-14">
            A structured assessment that previews what a specialty consult would
            focus on — candidacy, medication context, side effects, and
            monitoring. Initial consults are $400; follow-ups are $200.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/assessment"
              onClick={() => trackEvent("profile_cta_clicked", { location: "landing-final-cta" })}
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-all duration-300 tracking-[-0.01em]"
            >
              Get my free GLP-1 profile
            </a>
            <a
              href="/book"
              onClick={() => trackEvent("consult_cta_clicked", { location: "landing-final-cta" })}
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] border border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30 transition-all duration-300 tracking-[-0.01em]"
            >
              Book a $400 specialty consult
            </a>
          </div>

          <p className="text-[13px] text-white/65 max-w-xl mx-auto leading-relaxed">
            Educational assessment only. Final treatment decisions require
            consultation with a licensed clinician. Consult availability depends
            on state licensure and clinical eligibility.
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
          <div className="flex items-center gap-2.5 text-white/75">
            <Logo size={24} />
            <span className="text-sm">
              &copy; {new Date().getFullYear()} MetaOrthopedics
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/70">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/home" className="hover:text-white transition-colors">
              Full Site
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <span>HIPAA Compliant</span>
          </div>
        </div>

        <p className="text-[11px] text-white/75 mt-6 leading-relaxed max-w-4xl">
          MetaOrtho is a physician-led telemedicine practice providing specialty
          GLP-1 management. This site is for educational purposes and does not
          constitute medical advice. Care is provided only by clinicians
          licensed in your state. Always consult a licensed clinician before
          starting, stopping, or changing any medication. Individual results
          vary.
        </p>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------
   PAGE ASSEMBLY
--------------------------------------------------------------- */
export default function LandingPage() {
  useEffect(() => {
    trackEvent("landing_view", { page: "landing" });
  }, []);

  return (
    <div className="min-h-[100dvh]">
      <TopBar />
      <HeroSection />
      <PortalPreview />
      <ProblemSection />
      <WhoSection />
      <SolutionSection />
      <TrustStrip />
      <HowSection />
      <CostComparison />
      <FAQSection />
      <FinalCTASection />
      <BottomBar />
    </div>
  );
}
