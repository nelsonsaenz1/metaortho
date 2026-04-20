"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-cream)]">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-text-heading) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh] py-20 lg:py-24">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] mb-8 shadow-[var(--shadow-sm)]"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span>Now accepting patients in 43 states</span>
            </motion.div>

            <h1 className="text-[clamp(2.5rem,5.5vw,4rem)] font-normal leading-[1.05] mb-8 tracking-[-0.03em]">
              You&apos;re losing weight.
              <br />
              <span className="text-[var(--color-accent-primary)]">What else are you losing?</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-[1.6] mb-5 max-w-lg tracking-[-0.01em]">
              Up to <strong className="text-[var(--color-text-heading)] font-semibold">40% of weight lost on GLP-1 drugs</strong>{" "}
              like Ozempic and Mounjaro may be muscle and bone — not fat.
            </p>

            <p className="text-base text-[var(--color-text-secondary)] leading-[1.6] mb-10 max-w-lg tracking-[-0.01em]">
              MetaOrtho monitors your bones, muscles, and joints while you lose weight — led by a board-certified orthopedic surgeon, all via telehealth.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="/book" size="lg" variant="dark">
                Book Assessment — $149
              </Button>
              <Button href="/assessment" variant="outline" size="lg">
                Free Risk Quiz
              </Button>
            </div>
          </motion.div>

          {/* Right — Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="bg-[var(--color-bg-dark)] rounded-[var(--radius-xl)] p-8 md:p-10 text-white relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-primary)]/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-2 font-[var(--font-body)]">
                  AAOS 2026 Research
                </p>
                <h3 className="text-xl md:text-2xl font-normal tracking-[-0.02em] mb-8 opacity-90" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
                  The hidden cost of GLP-1 weight loss
                </h3>

                <div className="space-y-5">
                  {[
                    { stat: "+30%", label: "Osteoporosis risk", sub: "Over 5 years of GLP-1 use", color: "text-red-400" },
                    { stat: "+150%", label: "Osteomalacia risk", sub: "Bone softening vs. controls", color: "text-orange-400" },
                    { stat: "15-40%", label: "Of weight lost is lean mass", sub: "Muscle, bone & connective tissue", color: "text-amber-300" },
                    { stat: "+12%", label: "Gout risk increase", sub: "From rapid weight loss", color: "text-yellow-300" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-5 py-3 border-b border-white/8 last:border-0">
                      <span className={`text-2xl md:text-3xl font-bold ${item.color} w-24 flex-shrink-0 tracking-tight`}>
                        {item.stat}
                      </span>
                      <div>
                        <p className="text-white/80 text-sm font-medium">{item.label}</p>
                        <p className="text-white/60 text-xs">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/8 text-center">
                  <p className="text-white/60 text-sm">
                    Your scale says you lost 40 lbs. <span className="text-white/90 font-medium">How much was muscle?</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Floating trust badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-white px-5 py-3 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] border border-[var(--color-border)]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[var(--color-success-bg)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--color-text-heading)]">HIPAA Compliant</p>
                  <p className="text-[11px] text-[var(--color-text-tertiary)]">Secure telehealth</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-t border-[var(--color-border)] bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-8 gap-y-3 text-sm text-[var(--color-text-secondary)]">
            {[
              { icon: "⚕️", text: "Board-certified orthopedic surgeon" },
              { icon: "🏥", text: "Licensed in 43 states" },
              { icon: "🔒", text: "HIPAA-compliant telehealth" },
              { icon: "💊", text: "No controlled substances" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="tracking-[-0.01em]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
