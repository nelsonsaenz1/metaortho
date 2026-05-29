"use client";

import { motion } from "framer-motion";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import TiltCard from "@/components/ui/motion/TiltCard";
import MagneticButton from "@/components/ui/motion/MagneticButton";
import { trackEvent } from "@/lib/analytics";
import {
  CONSULT_PRICE_SUMMARY,
  BOOK_CONSULT_SPECIALTY_LABEL,
} from "@/lib/site-config";

const ease = [0.23, 1, 0.32, 1] as const;

const issues = [
  {
    label: "Nausea, reflux, or food aversion",
    detail: "Suboptimal dose escalation can make treatment harder to tolerate.",
  },
  {
    label: "Plateaus or under-response",
    detail: "A dose or medication may not match your goals, history, or response.",
  },
  {
    label: "Fatigue and low intake",
    detail: "Appetite suppression without nutrition planning can leave you depleted.",
  },
  {
    label: "Muscle and bone loss",
    detail: "Rapid weight loss can involve lean mass and bone density — not just fat.",
  },
];

const trustItems = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Physician-led: orthopedic + endocrine",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: `Cash-pay consult: ${CONSULT_PRICE_SUMMARY}`,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    text: "Candidacy, medication & monitoring review",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-cream)]">
      <MeshBackground variant="light" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center min-h-[80vh] py-20 lg:py-24">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 glass-light rounded-[var(--radius-pill)] text-sm text-[var(--color-text-secondary)] mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-60 animate-breath" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
              </span>
              <span className="text-[13px]">
                Physician-led specialty GLP-1 management
              </span>
            </motion.div>

            <h1 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal leading-[1.03] mb-8 tracking-[-0.035em]">
              GLP-1 care should manage
              <br />
              <span className="text-[var(--color-accent-primary)]">
                more than the number on the scale.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-[1.55] mb-6 max-w-lg tracking-[-0.01em]">
              MetaOrtho helps patients starting, taking, or questioning GLP-1
              treatment get a physician-led review of candidacy, medication fit,
              side-effect concerns, and monitoring needs.
            </p>

            <p className="text-base text-[var(--color-text-secondary)] leading-[1.6] mb-10 max-w-lg tracking-[-0.01em]">
              Start with a personalized{" "}
              <strong className="text-[var(--color-text-heading)] font-semibold">
                GLP-1 Management Profile
              </strong>
              , then meet with our team — a board-certified endocrinologist and
              orthopedic surgeon — for a specialty consult, all via telehealth.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55, ease }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <MagneticButton strength={8}>
                <a
                  href="/assessment"
                  onClick={() => trackEvent("profile_cta_clicked", { location: "home-hero" })}
                  className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-md)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
                >
                  Get my free GLP-1 profile
                </a>
              </MagneticButton>
              <MagneticButton strength={6}>
                <a
                  href="/book"
                  onClick={() => trackEvent("consult_cta_clicked", { location: "home-hero" })}
                  className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] border-2 border-[var(--color-text-heading)] text-[var(--color-text-heading)] hover:bg-[var(--color-text-heading)] hover:text-white transition-[background-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
                >
                  {BOOK_CONSULT_SPECIALTY_LABEL}
                </a>
              </MagneticButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.55 }}
              className="mt-6 text-[13px] font-medium text-[var(--color-text-secondary)]"
            >
              Free profile · FSA/HSA eligible consults · No credit card required.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-3 text-[13px] text-[var(--color-text-tertiary)] max-w-lg leading-relaxed"
            >
              Educational assessment only. Final treatment decisions require
              consultation with a licensed clinician.
            </motion.p>
          </motion.div>

          {/* Right — Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="relative"
          >
            <TiltCard max={5} glare="rgba(255,255,255,0.25)">
              <div className="glass-cream rounded-[var(--radius-xl)] p-8 md:p-10 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-primary)]/10 rounded-full blur-3xl mesh-blob-slow"
                />
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 w-52 h-52 bg-[var(--color-accent-teal)]/8 rounded-full blur-[80px] mesh-blob"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary)]">
                      When GLP-1 care is one-size-fits-all
                    </p>
                  </div>

                  <h3
                    className="text-[22px] md:text-[26px] font-normal tracking-[-0.02em] mb-8 leading-[1.15] text-[var(--color-text-heading)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Suboptimal dosing can create
                    <br />
                    avoidable tradeoffs.
                  </h3>

                  <div className="space-y-5">
                    {issues.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.05 + i * 0.08,
                          ease,
                        }}
                        className="flex items-start gap-4 py-3 border-b border-[var(--color-border)] last:border-0"
                      >
                        <span className="mt-[7px] w-2 h-2 rounded-full bg-[var(--color-accent-primary)] flex-shrink-0" />
                        <div>
                          <p className="text-[var(--color-text-heading)] text-[15px] font-medium tracking-[-0.01em]">
                            {item.label}
                          </p>
                          <p className="text-[var(--color-text-secondary)] text-[13px] mt-0.5 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
                    <p className="text-[var(--color-text-primary)] text-sm leading-relaxed">
                      The goal isn&apos;t simply losing weight.{" "}
                      <span className="text-[var(--color-text-heading)] font-semibold">
                        It&apos;s better-managed GLP-1 care.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Floating trust badge */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -bottom-5 -left-4 lg:-left-8 glass-light px-5 py-3 rounded-[var(--radius-md)] animate-float"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[var(--color-success-bg)] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[var(--color-success)]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--color-text-heading)]">
                    HIPAA Compliant
                  </p>
                  <p className="text-[11px] text-[var(--color-text-tertiary)]">
                    Secure telehealth
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative border-t border-[var(--color-border)] bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-8 gap-y-3 text-sm text-[var(--color-text-secondary)]">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span className="text-[var(--color-accent-primary)]">
                  {item.icon}
                </span>
                <span className="tracking-[-0.01em]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
