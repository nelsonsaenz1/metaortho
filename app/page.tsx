"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import Logo from "@/components/ui/Logo";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import MagneticButton from "@/components/ui/motion/MagneticButton";
import AnimatedNumber from "@/components/ui/motion/AnimatedNumber";
import ShimmerBar from "@/components/ui/motion/ShimmerBar";
import { trackEvent } from "@/lib/analytics";
import { BOOK_CONSULT_LABEL } from "@/lib/site-config";

const ease = [0.23, 1, 0.32, 1] as const;

/* -----------------------------------------------------------------
   LANDING SHELL — hides global Navbar/Footer/MobileCTA via body class
----------------------------------------------------------------- */
function useLandingMode() {
  useEffect(() => {
    document.body.classList.add("landing-mode");
    return () => {
      document.body.classList.remove("landing-mode");
    };
  }, []);
}

/* -----------------------------------------------------------------
   TOP BAR
----------------------------------------------------------------- */
function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-dark)]/70 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        <Link
          href="/home"
          className="flex items-center gap-3 text-white transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-out)] active:opacity-70"
        >
          <Logo size={34} />
          <span className="text-[18px] font-semibold tracking-[-0.03em]">
            MetaOrtho
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/75">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-breath" />
            Physician-led GLP-1 care
          </span>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------
   SLIDE INDICATOR
----------------------------------------------------------------- */
function SlideDots() {
  return (
    <div className="fixed right-5 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <a
          key={i}
          href={`#slide-${i}`}
          className="w-2 h-2 rounded-full bg-white/25 hover:bg-white/75 transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]"
          aria-label={`Go to slide ${i}`}
        />
      ))}
    </div>
  );
}

/* -----------------------------------------------------------------
   SLIDE 1 — HERO
----------------------------------------------------------------- */
function Slide1Hero() {
  return (
    <section
      id="slide-1"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[var(--color-bg-darkest)] snap-start"
    >
      <MeshBackground variant="dark" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2.5 px-4 py-2 glass-dark rounded-[var(--radius-pill)] text-sm text-white/85 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] animate-breath" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
          </span>
          <span className="text-[13px]">
            Physician-led specialty GLP-1 management
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="text-[clamp(2.5rem,6.5vw,5.25rem)] font-normal leading-[1.02] tracking-[-0.04em] mb-8"
          style={{ fontFamily: "var(--font-heading)", color: "white" }}
        >
          GLP-1 care should be personalized
          <br />
          <span className="text-[var(--color-accent-primary)] opacity-95">
            — not one-size-fits-all.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-14 tracking-[-0.01em]"
        >
          MetaOrtho is a physician-led specialty GLP-1 practice. Start with a
          free GLP-1 Management Profile to understand your candidacy, medication
          and dose questions, side-effect concerns, and monitoring needs —
          before your specialty consult.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton strength={8}>
            <Link
              href="/assessment"
              onClick={() => trackEvent("profile_cta_clicked", { location: "splash-hero" })}
              className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[0_0_60px_rgba(255,255,255,0.18)] transition-[background-color,box-shadow,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em]"
            >
              Get my free GLP-1 profile
            </Link>
          </MagneticButton>
          <MagneticButton strength={5}>
            <Link
              href="/home"
              className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold rounded-[var(--radius-pill)] border border-white/20 text-white/85 hover:bg-white/5 hover:border-white/35 transition-[background-color,border-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em]"
            >
              See how MetaOrtho helps →
            </Link>
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
          className="text-[13px] font-medium text-white/70 mt-10 tracking-[0.01em]"
        >
          Free profile · FSA/HSA eligible consults · No credit card required.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="text-[12px] text-white/45 mt-3 tracking-[0.02em] max-w-md mx-auto leading-relaxed"
        >
          Educational assessment only. Final treatment decisions require
          consultation with a licensed clinician.
        </motion.p>
      </div>

      <motion.a
        href="#slide-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-label="Scroll to next slide"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.a>
    </section>
  );
}

/* -----------------------------------------------------------------
   SLIDE 2 — THE FULL PICTURE (the scale is one data point)
----------------------------------------------------------------- */
const dimensions = [
  { label: "Symptoms", note: "Reviewed in context" },
  { label: "Nutrition", note: "Protein & intake" },
  { label: "Strength", note: "Function the scale misses" },
  { label: "Labs", note: "What's worth checking" },
  { label: "Medication response", note: "Drug & dose fit" },
  { label: "Body composition", note: "Lean mass & bone" },
];

function Slide2FullPicture() {
  return (
    <section
      id="slide-2"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[var(--color-bg-dark)] snap-start"
    >
      <MeshBackground variant="dark" className="opacity-70" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 mb-4">
            The full picture
          </p>
          <h2
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-normal tracking-[-0.025em] mb-5"
            style={{ color: "white", fontFamily: "var(--font-heading)" }}
          >
            The scale is only
            <br />
            one data point.
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Patients on GLP-1 therapy often need a broader view. A specialty
            consult looks at all of it.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dimensions.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="glass-dark rounded-[var(--radius-lg)] border border-white/10 p-6"
            >
              <p
                className="text-lg font-normal tracking-[-0.01em] text-white mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {d.label}
              </p>
              <p className="text-[12px] text-white/65">{d.note}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#slide-3"
            className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]"
          >
            See how it works
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------
   SLIDE 3 — PATIENT PORTAL PREVIEW
----------------------------------------------------------------- */
function Slide3Portal() {
  return (
    <section
      id="slide-3"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[var(--color-bg-darkest)] snap-start"
    >
      <MeshBackground variant="dark" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full py-24">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
          {/* Left — Copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75 mb-5">
              Patient portal · Preview
            </p>
            <h2
              className="text-[clamp(2rem,5vw,3.75rem)] font-normal tracking-[-0.035em] leading-[1.02] mb-6"
              style={{ color: "white", fontFamily: "var(--font-heading)" }}
            >
              Your GLP-1 plan, tracked
              <br />
              with a{" "}
              <span className="text-[var(--color-accent-primary)]">
                clinical dashboard.
              </span>
            </h2>
            <p className="text-lg text-white/80 max-w-lg leading-relaxed mb-10">
              After your consult, your patient portal keeps your GLP-1
              Optimization Score, medication response, side effects, labs, and
              protocol updates from your care team in one place — tracked over
              time.
            </p>

            {/* Portal feature pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                "GLP-1 Optimization Score",
                "Side-effect tracking",
                "Dose-history review",
                "Lean mass & bone monitoring",
                "Consult-ready profile",
              ].map((f) => (
                <span
                  key={f}
                  className="glass-dark text-[12px] text-white/80 px-3 py-1.5 rounded-[var(--radius-pill)]"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/assessment"
                onClick={() => trackEvent("profile_cta_clicked", { location: "splash-profile" })}
                className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[var(--shadow-xl)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:active:scale-100"
              >
                Get my free GLP-1 profile
              </Link>
              <Link
                href="/book"
                onClick={() => trackEvent("consult_cta_clicked", { location: "splash-profile" })}
                className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold rounded-[var(--radius-pill)] border border-white/20 text-white/85 hover:bg-white/5 hover:border-white/35 transition-[background-color,border-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:active:scale-100"
              >
                {BOOK_CONSULT_LABEL}
              </Link>
            </div>
            <p className="mt-5 text-[12px] text-white/50">
              Free · ~5 minutes · educational, not a diagnosis
            </p>
          </motion.div>

          {/* Right — Patient portal preview (stable / still) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            <div>
              <div className="glass-dark rounded-[var(--radius-xl)] p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
                {/* Document chrome */}
                <div className="flex items-center gap-2 px-2 pb-3">
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                </div>

                <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-dark)] p-5 relative overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute -top-16 -right-10 w-52 h-52 rounded-full bg-[var(--color-accent-primary)]/25 blur-[80px]"
                  />

                  <div className="relative space-y-3">
                    {/* GLP-1 Optimization Score */}
                    <div className="rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-accent-primary)]/25 to-[var(--color-accent-teal)]/10 border border-white/10 p-5">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 mb-3">
                        GLP-1 Optimization Score
                      </p>
                      <div className="flex items-end gap-2 mb-3">
                        <span
                          className="text-[52px] leading-none font-normal tracking-[-0.04em] text-white"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          <AnimatedNumber value={82} duration={1400} />
                        </span>
                        <span className="text-xs text-white/70 mb-2">/ 100</span>
                      </div>
                      <ShimmerBar
                        percent={82}
                        trackClassName="bg-white/8"
                        fillClassName="bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-teal)] to-[var(--color-accent-primary)]"
                        heightClassName="h-1.5"
                        shimmer={false}
                      />
                    </div>

                    {/* Mini markers */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Lean Mass", v: "58.2", u: "kg", good: true },
                        { label: "Vit D", v: "38", u: "ng/mL", good: true },
                        { label: "Uric Acid", v: "6.4", u: "mg/dL", good: false },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="rounded-[var(--radius-md)] bg-white/[0.04] border border-white/10 p-3"
                        >
                          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/80 mb-1">
                            {m.label}
                          </p>
                          <div className="flex items-baseline gap-1">
                            <span
                              className="text-[18px] font-normal text-white"
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {m.v}
                            </span>
                            <span className="text-[9px] text-white/80">{m.u}</span>
                          </div>
                          <span
                            className={`text-[10px] font-medium ${m.good ? "text-[var(--color-success)]" : "text-[var(--color-warning)]"}`}
                          >
                            {m.good ? "↑ trending" : "↑ watch"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Next visit */}
                    <div className="rounded-[var(--radius-lg)] bg-white/[0.04] border border-white/10 p-4 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-primary)] mb-0.5">
                          Next visit
                        </p>
                        <p
                          className="text-[18px] font-normal text-white"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          May 2 · 2:30 PM
                        </p>
                      </div>
                      <span className="text-[11px] font-medium text-white/75 glass-dark rounded-[var(--radius-pill)] px-3 py-1.5">
                        Your doctor
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------
   PAGE
----------------------------------------------------------------- */
export default function LandingPage() {
  useLandingMode();

  return (
    <>
      <TopBar />
      <SlideDots />
      <main className="snap-y snap-proximity h-[100dvh] overflow-y-scroll scroll-smooth [scroll-padding-top:0]">
        <Slide1Hero />
        <Slide2FullPicture />
        <Slide3Portal />
      </main>
    </>
  );
}
