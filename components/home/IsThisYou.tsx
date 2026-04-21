"use client";

import { motion, useReducedMotion } from "framer-motion";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";

const ease = [0.23, 1, 0.32, 1] as const;

const riskTimeline = [
  {
    month: "Month 1–3",
    title: "The weight drops fast",
    detail:
      "You're on Ozempic, Wegovy, Mounjaro, or Zepbound. The scale is moving. No one mentions what else is changing.",
    dotTone: "var(--color-accent-primary)",
  },
  {
    month: "Month 3–6",
    title: "Muscle starts disappearing",
    detail:
      "20+ lbs gone — but you're not resistance training. Up to 40% of what you lost is lean tissue, not fat. You feel weaker. Your prescriber says \"that's normal.\"",
    dotTone: "var(--color-warning)",
  },
  {
    month: "Month 6–12",
    title: "Bones weaken silently",
    detail:
      "No DEXA scan ordered. No vitamin D or calcium checked. Bone density is declining but you have zero symptoms — until you don't.",
    dotTone: "#E67E22",
  },
  {
    month: "Month 12+",
    title: "The damage surfaces",
    detail:
      "A fracture from a minor fall. A gout flare that sends you to the ER. Joint pain that won't resolve. Weakness that limits your life. The weight is gone — and so is your structural health.",
    dotTone: "var(--color-danger)",
  },
];

export default function IsThisYou() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-36 bg-white overflow-hidden">
      <MeshBackground variant="light" className="opacity-40" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary)] mb-5">
            The arc most people don&apos;t see coming
          </p>
          <h2
            className="text-[clamp(3rem,8vw,6.5rem)] font-normal tracking-[-0.045em] leading-[0.95] text-[var(--color-text-heading)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Is this you?
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-base text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed"
          >
            Here&apos;s what unmonitored GLP-1 weight loss looks like over time.
          </motion.p>
        </motion.div>

        {/* Timeline with drawn vertical path */}
        <div className="relative max-w-2xl mx-auto">
          {/* Animated connector line — drawn on scroll */}
          <svg
            aria-hidden
            className="absolute left-[19px] top-[20px] -translate-x-1/2 h-[calc(100%-40px)] overflow-visible hidden sm:block"
            width="2"
            viewBox="0 0 2 800"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="1"
              x2="1"
              y1="0"
              y2="800"
              stroke="url(#timelineGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduce ? 0 : 2.2, ease }}
            />
            <defs>
              <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent-primary)" />
                <stop offset="50%" stopColor="var(--color-warning)" />
                <stop offset="100%" stopColor="var(--color-danger)" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-6">
            {riskTimeline.map((stage, i) => (
              <motion.div
                key={stage.month}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.12,
                  ease,
                }}
                className="relative grid sm:grid-cols-[40px_1fr] gap-4 items-start"
              >
                <div className="relative z-10 flex-shrink-0 hidden sm:flex items-center justify-center pt-5">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: 0.2 + i * 0.12,
                      ease,
                    }}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center ring-[3px] ring-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] border"
                    style={{ borderColor: stage.dotTone }}
                  >
                    <span
                      className="text-[13px] font-bold tabular-nums"
                      style={{ color: stage.dotTone, fontFamily: "var(--font-heading)" }}
                    >
                      {i + 1}
                    </span>
                  </motion.div>
                </div>

                <div className="glass-cream rounded-[var(--radius-lg)] px-6 py-6 hover:shadow-[var(--shadow-lg)] transition-[box-shadow] duration-[var(--dur-hover)] ease-[var(--ease-out)]">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: stage.dotTone }}
                    />
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: stage.dotTone }}
                    >
                      {stage.month}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-normal tracking-[-0.02em] mb-2 text-[var(--color-text-heading)]"
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
          className="mt-20 text-center"
        >
          <p className="text-lg font-normal tracking-[-0.02em] text-[var(--color-text-secondary)] mb-8">
            Recognize yourself?{" "}
            <span className="text-[var(--color-text-heading)] font-medium">
              You can change the outcome.
            </span>
          </p>
          <WaitlistCTA
            variant="dark"
            size="lg"
            source="is-this-you"
            eyebrow="Early access"
            headline={
              <>
                Change the outcome —
                <br />
                join the waitlist.
              </>
            }
          >
            Join the waitlist
          </WaitlistCTA>
        </motion.div>
      </div>
    </section>
  );
}
