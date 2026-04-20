"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const riskTimeline = [
  {
    month: "Month 1–3",
    title: "The weight drops fast",
    detail:
      "You’re on Ozempic, Wegovy, Mounjaro, or Zepbound. The scale is moving. No one mentions what else is changing.",
    severity: 1,
    color: "var(--color-accent-primary)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
  },
  {
    month: "Month 3–6",
    title: "Muscle starts disappearing",
    detail:
      "20+ lbs gone — but you’re not resistance training. Up to 40% of what you lost is lean tissue, not fat. You feel weaker. Your prescriber says “that’s normal.”",
    severity: 2,
    color: "var(--color-warning)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    month: "Month 6–12",
    title: "Bones weaken silently",
    detail:
      "No DEXA scan ordered. No vitamin D or calcium checked. Bone density is declining but you have zero symptoms — until you don’t.",
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
      "A fracture from a minor fall. A gout flare that sends you to the ER. Joint pain that won’t resolve. Weakness that limits your life. The weight is gone — and so is your structural health.",
    severity: 4,
    color: "var(--color-danger)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" />
      </svg>
    ),
  },
];

export default function IsThisYou() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading */}
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
                <div className="relative z-10 flex-shrink-0 hidden sm:flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center ring-[3px] ring-white"
                    style={{ backgroundColor: "var(--color-bg-cream)", color: "var(--color-accent-primary)" }}
                  >
                    {stage.icon}
                  </div>
                </div>

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
          <p className="text-lg font-normal tracking-[-0.02em] text-[var(--color-text-secondary)] mb-6">
            Recognize yourself?{" "}
            <span className="text-[var(--color-text-heading)] font-medium">
              You can change the outcome.
            </span>
          </p>
          <a
            href="/book"
            className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-lg)] transition-all duration-300 tracking-[-0.01em]"
          >
            Get Your Assessment — $149
          </a>
        </motion.div>
      </div>
    </section>
  );
}
