"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-40 bg-[var(--color-bg-dark)] overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-accent-primary)]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--color-accent-teal)]/5 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-6 font-[var(--font-body)]">
            Start today
          </p>

          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal mb-6 tracking-[-0.03em] leading-[1.1]" style={{ color: 'white' }}>
            Your scale says you lost 40 pounds.
            <br />
            <span className="opacity-80">How much of that was muscle?</span>
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed tracking-[-0.01em]">
            Don&apos;t wait until a fracture, gout attack, or sarcopenia diagnosis reveals the damage. Get a comprehensive assessment from a board-certified orthopedic surgeon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book"
              className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[var(--shadow-xl)] transition-all duration-300 tracking-[-0.01em]"
            >
              Book Your Assessment — $149
            </a>
            <a
              href="/assessment"
              className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 tracking-[-0.01em]"
            >
              Take Free Risk Quiz
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/50">
            <span>43 states</span>
            <span>·</span>
            <span>HIPAA compliant</span>
            <span>·</span>
            <span>No controlled substances</span>
            <span>·</span>
            <span>Results within 48 hours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
