"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import Logo from "@/components/ui/Logo";

const ease = [0.25, 0.1, 0.25, 1] as const;

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
   TOP BAR — minimal logo bar
----------------------------------------------------------------- */
function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-dark)] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-center">
        <Link href="/home" className="flex items-center gap-3 text-white">
          <Logo size={36} />
          <span className="text-xl font-semibold tracking-[-0.03em]">
            MetaOrtho
          </span>
        </Link>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------
   SLIDE INDICATOR — dots on the right edge
----------------------------------------------------------------- */
function SlideDots() {
  return (
    <div className="fixed right-5 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <a
          key={i}
          href={`#slide-${i}`}
          className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/60 transition-colors"
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg-dark)] snap-start"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[var(--color-accent-primary)]/8 blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent-teal)]/6 blur-[140px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pill)] border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/60 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
          Now accepting patients in 43 states
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.04em] mb-8"
          style={{ fontFamily: "var(--font-heading)", color: "white" }}
        >
          The weight is coming off.
          <br />
          <span className="text-[var(--color-accent-primary)] opacity-90">
            So are your muscles.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-14 tracking-[-0.01em]"
        >
          Research shows up to{" "}
          <strong className="text-white/90 font-semibold">
            40% of weight lost on GLP-1 drugs
          </strong>{" "}
          like Ozempic and Mounjaro is muscle and bone — not fat. MetaOrtho is
          the first physician-led practice built to protect what the scale
          can&apos;t measure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/home"
            className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.12)] transition-all duration-300 tracking-[-0.01em]"
          >
            Proceed to Full Site →
          </Link>
          <a
            href="#slide-2"
            className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] border border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30 transition-all duration-300 tracking-[-0.01em]"
          >
            See More
          </a>
        </motion.div>
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
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.a>
    </section>
  );
}

/* -----------------------------------------------------------------
   SLIDE 2 — COST COMPARISON
----------------------------------------------------------------- */
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

function Slide2Cost() {
  return (
    <section
      id="slide-2"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-bg-dark)] snap-start"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-accent-primary)]/5 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 mb-4">
            The cost of inaction
          </p>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-5"
            style={{ color: "white" }}
          >
            Prevention costs a fraction of treatment
          </h2>
          <p className="text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
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

        <div className="mt-16 text-center">
          <a
            href="#slide-3"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            Continue
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------
   SLIDE 3 — FINAL CTA
----------------------------------------------------------------- */
function Slide3CTA() {
  return (
    <section
      id="slide-3"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-bg-dark)] snap-start"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[var(--color-accent-primary)]/4 blur-[180px]" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 mb-6">
            One assessment. Total clarity.
          </p>

          <h2
            className="text-[clamp(2.25rem,5.5vw,4rem)] font-normal tracking-[-0.03em] leading-[1.05] mb-8"
            style={{ color: "white" }}
          >
            You took control of your weight.
            <br />
            <span className="text-[var(--color-accent-primary)]">
              Now take control of what&apos;s left.
            </span>
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-14">
            A 30-minute telehealth visit with a board-certified orthopedic
            surgeon. Baseline labs. A DEXA scan. A plan to protect your muscles,
            bones, and joints while the weight keeps coming off.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/home"
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-all duration-300 tracking-[-0.01em]"
            >
              Proceed to Full Site →
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold rounded-[var(--radius-pill)] border border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30 transition-all duration-300 tracking-[-0.01em]"
            >
              Book Your Assessment — $149
            </Link>
          </div>

          <p className="text-sm text-white/40">
            No insurance needed · Results within 48 hours · Licensed in 43 states
          </p>
        </motion.div>
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
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
        <Slide1Hero />
        <Slide2Cost />
        <Slide3CTA />
      </main>
    </>
  );
}
