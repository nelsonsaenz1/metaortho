"use client";

import { motion } from "framer-motion";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";
import { trackEvent } from "@/lib/analytics";
import {
  INITIAL_CONSULT_PRICE_LABEL,
  FOLLOW_UP_PRICE_LABEL,
  BOOK_CONSULT_SPECIALTY_LABEL,
} from "@/lib/site-config";

const ease = [0.23, 1, 0.32, 1] as const;

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-40 bg-[var(--color-bg-dark)] overflow-hidden">
      <MeshBackground variant="dark" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 glass-dark rounded-[var(--radius-pill)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-breath" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/90">
              Physician-led · Telehealth
            </span>
          </div>

          <h2
            className="text-[clamp(2.25rem,5vw,3.75rem)] font-normal mb-8 tracking-[-0.035em] leading-[1.05]"
            style={{ color: "white" }}
          >
            Start with your
            <br />
            <span className="text-white/85">GLP-1 Management Profile.</span>
          </h2>

          <p className="text-lg text-white/85 max-w-2xl mx-auto mb-12 leading-relaxed tracking-[-0.01em]">
            A structured assessment that previews what a specialty consult would
            focus on for you — candidacy, medication context, side effects, and
            monitoring needs. Initial consults are {INITIAL_CONSULT_PRICE_LABEL};
            follow-ups are {FOLLOW_UP_PRICE_LABEL}.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/assessment"
              onClick={() => trackEvent("profile_cta_clicked", { location: "home-final-cta" })}
              className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em]"
            >
              Get my free GLP-1 profile
            </a>
            <a
              href="/book"
              onClick={() => trackEvent("consult_cta_clicked", { location: "home-final-cta" })}
              className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold rounded-[var(--radius-pill)] border border-white/20 text-white/85 hover:bg-white/5 hover:border-white/35 transition-[background-color,border-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em]"
            >
              {BOOK_CONSULT_SPECIALTY_LABEL}
            </a>
          </div>

          <p className="text-[13px] text-white/70 leading-relaxed max-w-xl mx-auto">
            Educational assessment only. Final treatment decisions require
            consultation with a licensed clinician. If you&apos;re experiencing
            urgent or severe symptoms, seek immediate medical care.
          </p>

          <p className="mt-6 text-[13px] text-white/60">
            Not in a state where we&apos;re licensed yet?{" "}
            <WaitlistCTA
              variant="ghost"
              size="sm"
              source="home-final-cta-waitlist"
              eyebrow="Waitlist · Early access"
              headline={
                <>
                  Tell me when MetaOrtho
                  <br />
                  opens in my state.
                </>
              }
              subcopy="One short email when we go live where you live. No spam."
              className="!px-2 !py-1 align-baseline underline underline-offset-2 !text-white/85 hover:!bg-transparent hover:!text-white"
            >
              Join the waitlist
            </WaitlistCTA>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
