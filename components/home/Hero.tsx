"use client";

import { motion } from "framer-motion";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import TiltCard from "@/components/ui/motion/TiltCard";
import MagneticButton from "@/components/ui/motion/MagneticButton";
import AnimatedNumber from "@/components/ui/motion/AnimatedNumber";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";

const ease = [0.23, 1, 0.32, 1] as const;

const stats = [
  {
    stat: 30,
    suffix: "%",
    prefix: "+",
    label: "Osteoporosis risk",
    sub: "Over 5 years of GLP-1 use",
    tone: "text-red-700",
  },
  {
    stat: 150,
    suffix: "%",
    prefix: "+",
    label: "Osteomalacia risk",
    sub: "Bone softening vs. controls",
    tone: "text-orange-700",
  },
  {
    stat: 40,
    suffix: "%",
    label: "Of weight lost is lean mass",
    sub: "Muscle, bone & connective tissue",
    tone: "text-amber-700",
  },
  {
    stat: 12,
    suffix: "%",
    prefix: "+",
    label: "Gout risk increase",
    sub: "From rapid weight loss",
    tone: "text-yellow-700",
  },
];

const trustItems = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Board-certified orthopedic surgeon",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    text: "HIPAA-compliant telehealth",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    text: "No controlled substances",
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
                Accepting waitlist signups
              </span>
            </motion.div>

            <h1 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal leading-[1.03] mb-8 tracking-[-0.035em]">
              You&apos;re losing weight.
              <br />
              <span className="text-[var(--color-accent-primary)]">
                What else are you losing?
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-[1.55] mb-5 max-w-lg tracking-[-0.01em]">
              Up to{" "}
              <strong className="text-[var(--color-text-heading)] font-semibold">
                40% of weight lost on GLP-1 drugs
              </strong>{" "}
              like Ozempic and Mounjaro may be muscle and bone — not fat.
            </p>

            <p className="text-base text-[var(--color-text-secondary)] leading-[1.6] mb-10 max-w-lg tracking-[-0.01em]">
              MetaOrtho monitors your bones, muscles, and joints while you lose
              weight — led by a board-certified orthopedic surgeon, all via
              telehealth.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55, ease }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <MagneticButton strength={8}>
                <WaitlistCTA
                  variant="dark"
                  size="lg"
                  source="hero-primary"
                  eyebrow="Early access · MetaOrtho"
                  headline={
                    <>
                      Be first when MetaOrtho
                      <br />
                      opens in your state.
                    </>
                  }
                >
                  Join the waitlist
                </WaitlistCTA>
              </MagneticButton>
              <MagneticButton strength={6}>
                <a
                  href="/assessment"
                  className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] border-2 border-[var(--color-text-heading)] text-[var(--color-text-heading)] hover:bg-[var(--color-text-heading)] hover:text-white transition-[background-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
                >
                  Take free risk quiz
                </a>
              </MagneticButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 text-[13px] text-[var(--color-text-secondary)]"
            >
              <span className="font-semibold text-[var(--color-text-heading)]">
                Coming soon.
              </span>{" "}
              Join the waitlist — no credit card, unsubscribe anytime. Includes
              our weekly newsletter on GLP-1 side effects, new research, and
              counteraction protocols.
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
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                      AAOS 2026 Research
                    </p>
                    <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] tabular-nums">
                      n = 2,431
                    </span>
                  </div>

                  <h3
                    className="text-[22px] md:text-[26px] font-normal tracking-[-0.02em] mb-8 leading-[1.15] text-[var(--color-text-heading)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    The hidden cost of GLP-1
                    <br />
                    weight loss.
                  </h3>

                  <div className="space-y-5">
                    {stats.map((item, i) => (
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
                        className="flex items-center gap-5 py-3 border-b border-[var(--color-border)] last:border-0"
                      >
                        <span
                          className={`text-[28px] md:text-[34px] font-bold ${item.tone} w-[120px] flex-shrink-0 tracking-tight leading-none`}
                        >
                          <AnimatedNumber
                            value={item.stat}
                            prefix={item.prefix}
                            suffix={item.suffix}
                            duration={1200}
                          />
                        </span>
                        <div>
                          <p className="text-[var(--color-text-heading)] text-sm font-medium">
                            {item.label}
                          </p>
                          <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">
                            {item.sub}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
                    <p className="text-[var(--color-text-primary)] text-sm leading-relaxed">
                      Your scale says you lost 40 lbs.{" "}
                      <span className="text-[var(--color-text-heading)] font-semibold">
                        How much was muscle?
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
