"use client";

import { motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

const costs = [
  { label: "Hip fracture surgery", range: "$30,000 – $65,000", pct: 100 },
  {
    label: "Osteoporosis treatment (annual)",
    range: "$8,000 – $15,000",
    pct: 55,
  },
  { label: "ER visit for gout flare", range: "$2,000 – $5,000", pct: 25 },
  {
    label: "MetaOrtho assessment",
    range: "$149",
    pct: 5,
    highlight: true,
  },
];

export default function CostComparison() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/75 mb-4">
            The cost of inaction
          </p>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-5"
            style={{ color: "white", fontFamily: "var(--font-heading)" }}
          >
            Prevention costs a fraction of treatment
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
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
