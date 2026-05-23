"use client";

import { motion } from "framer-motion";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import { trackEvent } from "@/lib/analytics";

const ease = [0.23, 1, 0.32, 1] as const;

const segments = [
  {
    label: "Already taking a GLP-1",
    detail:
      "You're losing weight, but you're unsure whether your current medication, dose, side effects, nutrition, or monitoring plan is still right for you.",
  },
  {
    label: "Considering starting",
    detail:
      "You want a second opinion on candidacy, tradeoffs, risks, and what should be monitored before you begin therapy.",
  },
  {
    label: "Losing weight rapidly",
    detail:
      "You want to understand body-composition, lean-mass, bone-health, nutrition, and strength considerations before the scale becomes your only metric.",
  },
  {
    label: "Experiencing symptoms",
    detail:
      "You have fatigue, weakness, joint pain, gout concerns, nausea, appetite, or other symptoms you'd like reviewed in context.",
  },
  {
    label: "Higher-risk patients",
    detail:
      "You have low bone density, prior fractures, sarcopenia concerns, orthopedic issues, inflammatory conditions, older age, or significant weight-loss goals.",
  },
];

export default function IsThisYou() {
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
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary)] mb-5">
            Who this is for
          </p>
          <h2
            className="text-[clamp(2.25rem,5.5vw,4rem)] font-normal tracking-[-0.035em] leading-[1.02] text-[var(--color-text-heading)]"
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
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className={`glass-cream rounded-[var(--radius-lg)] px-6 py-6 md:px-7 md:py-7 hover:shadow-[var(--shadow-lg)] transition-[box-shadow] duration-[var(--dur-hover)] ease-[var(--ease-out)] ${
                i === segments.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)]" />
                <h3
                  className="text-xl font-normal tracking-[-0.02em] text-[var(--color-text-heading)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {seg.label}
                </h3>
              </div>
              <p className="text-[var(--color-text-secondary)] text-[15px] leading-relaxed pl-5">
                {seg.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="mt-16 text-center"
        >
          <p className="text-lg font-normal tracking-[-0.02em] text-[var(--color-text-secondary)] mb-8">
            Sound familiar?{" "}
            <span className="text-[var(--color-text-heading)] font-medium">
              Start with your GLP-1 Management Profile.
            </span>
          </p>
          <a
            href="/assessment"
            onClick={() => trackEvent("profile_cta_clicked", { location: "home-who-its-for" })}
            className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-md)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
          >
            Get my free GLP-1 profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
