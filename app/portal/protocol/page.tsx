"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/portal/PageHeader";

const ease = [0.25, 0.1, 0.25, 1] as const;

type Status = "daily" | "weekly" | "monthly" | "quarterly" | "as-needed";

type Practice = {
  title: string;
  detail: string;
  status: Status;
  active?: boolean;
};

type Category = {
  id: string;
  title: string;
  intro: string;
  icon: React.ReactNode;
  practices: Practice[];
};

const categories: Category[] = [
  {
    id: "resistance",
    title: "Resistance Training",
    intro:
      "Your most important intervention. Without mechanical loading, GLP-1 weight loss drives disproportionate muscle and bone loss.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    practices: [
      { title: "Full-body resistance, 3× per week", detail: "60–90 min sessions, compound lifts: squat, hinge, push, pull, carry.", status: "weekly", active: true },
      { title: "Progressive overload", detail: "Add 2–5% load every 1–2 weeks when form holds. Never chase failure while on a GLP-1.", status: "weekly", active: true },
      { title: "Weighted carries (farmer's walks)", detail: "Preserves grip strength, posterior chain, and bone loading in the spine and hips.", status: "weekly" },
      { title: "Single-leg work (lunges, step-ups)", detail: "Catches asymmetries early. Critical for fall prevention as bone density shifts.", status: "weekly" },
      { title: "Zone 2 cardio, 2× per week", detail: "30–45 min easy-pace work. Aids recovery without cannibalizing muscle protein.", status: "weekly" },
    ],
  },
  {
    id: "nutrition",
    title: "Nutrition & Protein",
    intro:
      "GLP-1s suppress appetite and make it easy to under-eat protein. Hitting your daily target is non-negotiable.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    practices: [
      { title: "Protein target: 140 g / day", detail: "Calibrated to your lean mass (1.6 g/kg). Four meals of ~35 g each.", status: "daily", active: true },
      { title: "Front-load protein in breakfast", detail: "30+ g within an hour of waking. Resets the muscle protein synthesis window.", status: "daily", active: true },
      { title: "Leucine-rich foods", detail: "Eggs, whey, Greek yogurt, poultry. Drives the mTOR signal that protects lean mass.", status: "daily" },
      { title: "Creatine: 5 g per day", detail: "Daily, no loading. Timing doesn't matter. Synergistic with resistance training.", status: "daily", active: true },
      { title: "Hit your calcium floor (1,200 mg)", detail: "Dairy, leafy greens, fortified plant milk, or a modest supplement.", status: "daily" },
    ],
  },
  {
    id: "supplements",
    title: "Supplements",
    intro: "Physician-curated bundle. Taken exactly as prescribed — not the Instagram stack.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    practices: [
      { title: "Vitamin D3: 5,000 IU", detail: "Taken with a fatty meal. Target serum 25-OH-D of 40–60 ng/mL.", status: "daily", active: true },
      { title: "Whey protein isolate (optional)", detail: "25–30 g if you're under your protein target. Post-workout or mid-morning.", status: "daily" },
      { title: "HMB: 3 g", detail: "Split into two doses. Reduces protein breakdown during caloric restriction.", status: "daily", active: true },
      { title: "Magnesium glycinate: 400 mg", detail: "Evening. Supports muscle recovery and sleep depth.", status: "daily", active: true },
      { title: "Collagen peptides: 15 g", detail: "With vitamin C, ideally 30–60 min pre-training. Tendon and joint support.", status: "daily" },
      { title: "Omega-3 (EPA/DHA): 2 g", detail: "Combined EPA+DHA daily. Anti-inflammatory, supports muscle protein synthesis.", status: "daily" },
    ],
  },
  {
    id: "labs",
    title: "Lab & Imaging Schedule",
    intro: "We measure what matters so you don't find out about bone loss after a fracture.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    practices: [
      { title: "DEXA scan — every 12 months", detail: "Body composition + bone density (spine and hip). Next: May 1.", status: "quarterly", active: true },
      { title: "Vitamin D, 25-OH", detail: "Every 3 months until optimized, then every 6 months.", status: "quarterly", active: true },
      { title: "Comprehensive metabolic panel", detail: "Kidney, liver, glucose, electrolytes. Every 3 months on GLP-1s.", status: "quarterly", active: true },
      { title: "Uric acid + kidney function", detail: "Gout screen. More frequent if serum uric acid ever exceeded 6.8 mg/dL.", status: "quarterly", active: true },
      { title: "hs-CRP", detail: "Systemic inflammation. Every 6 months.", status: "quarterly" },
      { title: "CBC with differential", detail: "Baseline and annually, or sooner if nutrition markers shift.", status: "quarterly" },
    ],
  },
  {
    id: "gout",
    title: "Gout Prevention",
    intro:
      "Rapid weight loss transiently elevates uric acid. You're on our watchlist — we monitor until your levels stabilize.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    practices: [
      { title: "Hydration: 2.5 L/day minimum", detail: "Helps renal clearance of uric acid. Increase with exercise and heat.", status: "daily", active: true },
      { title: "Limit high-purine foods", detail: "Minimize organ meats, anchovies, sardines, high-fructose corn syrup, excess beer.", status: "daily" },
      { title: "Acute flare protocol (on file)", detail: "If joint swells, redden, or throbs: message care team for same-day Rx.", status: "as-needed" },
    ],
  },
  {
    id: "sleep",
    title: "Sleep & Recovery",
    intro: "Muscle is built overnight. Under-sleeping sabotages everything above.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    practices: [
      { title: "Sleep window: 7.5 hours", detail: "Consistent in-bed and wake times. Muscle protein synthesis peaks in deep sleep.", status: "daily", active: true },
      { title: "Protein snack within 2 hours of bed", detail: "Casein, cottage cheese, or Greek yogurt. Sustains overnight amino acid supply.", status: "daily" },
      { title: "No alcohol on training days", detail: "Alcohol blunts muscle protein synthesis for up to 36 hours.", status: "daily" },
    ],
  },
  {
    id: "fall-prevention",
    title: "Fall Prevention",
    intro: "Once bone density starts trending down, a minor fall can become a hip fracture. Prevention starts now.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    practices: [
      { title: "Balance training, 3× per week", detail: "Single-leg stands, tandem walking, BOSU work. Integrated into warm-ups.", status: "weekly" },
      { title: "Home hazard audit", detail: "Rugs, cords, poor lighting, clutter. Audit once; fix once.", status: "quarterly" },
      { title: "Vision check", detail: "Annual. A surprising share of falls trace to uncorrected vision changes.", status: "quarterly" },
    ],
  },
];

const statusLabel: Record<Status, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  "as-needed": "As needed",
};

const statusColor: Record<Status, string> = {
  daily: "text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10",
  weekly: "text-[var(--color-accent-teal)] bg-[var(--color-accent-teal)]/10",
  monthly: "text-[var(--color-accent-warm)] bg-[var(--color-accent-warm)]/10",
  quarterly: "text-[var(--color-warning)] bg-[var(--color-warning)]/10",
  "as-needed": "text-[var(--color-text-tertiary)] bg-[var(--color-bg-cream)]",
};

function PracticeCard({ practice, delay }: { practice: Practice; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay, ease }}
      className={`bg-white rounded-[var(--radius-lg)] p-5 border transition-all hover:shadow-[var(--shadow-md)] ${
        practice.active
          ? "border-[var(--color-accent-primary)]/30"
          : "border-[var(--color-border)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-[15px] font-medium tracking-[-0.01em] text-[var(--color-text-heading)] leading-snug">
          {practice.title}
        </h3>
        <span
          className={`flex-shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] px-2 py-1 rounded-[var(--radius-sm)] ${statusColor[practice.status]}`}
        >
          {statusLabel[practice.status]}
        </span>
      </div>
      <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
        {practice.detail}
      </p>
      {practice.active && (
        <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center gap-1.5 text-[11px] text-[var(--color-accent-primary)] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)]" />
          Active in your current protocol
        </div>
      )}
    </motion.div>
  );
}

function CategorySection({ category, index }: { category: Category; index: number }) {
  const activeCount = category.practices.filter((p) => p.active).length;
  return (
    <section id={category.id} className="scroll-mt-24">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-bg-cream)] text-[var(--color-accent-primary)] flex items-center justify-center flex-shrink-0">
          {category.icon}
        </div>
        <div>
          <div className="flex items-baseline gap-3">
            <h2
              className="text-[22px] font-normal tracking-[-0.02em] text-[var(--color-text-heading)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {category.title}
            </h2>
            <span className="text-[12px] text-[var(--color-text-tertiary)]">
              {activeCount}/{category.practices.length} active
            </span>
          </div>
          <p className="mt-1 text-[13px] text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            {category.intro}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.practices.map((p, i) => (
          <PracticeCard key={p.title} practice={p} delay={index * 0.02 + i * 0.03} />
        ))}
      </div>
    </section>
  );
}

export default function ProtocolPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your plan"
        title="Your Protocol"
        subtitle="A personalized plan from Dr. Saenz to protect muscle, bone, and joints while you stay on a GLP-1. Updated every visit."
        right={
          <div className="flex gap-2">
            <button className="px-4 py-2 text-[13px] font-medium rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] text-[var(--color-text-heading)] hover:bg-[var(--color-bg-cream)] transition-colors cursor-pointer">
              Download PDF
            </button>
            <button className="px-4 py-2 text-[13px] font-medium rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] transition-colors cursor-pointer">
              Ask about a change
            </button>
          </div>
        }
      />

      {/* Category chip nav */}
      <div className="sticky top-0 z-20 bg-[var(--color-bg-cream)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
        <div className="px-6 md:px-10 py-3 flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="flex-shrink-0 px-3.5 py-1.5 text-[12px] font-medium rounded-[var(--radius-pill)] bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] hover:border-[var(--color-border-strong)] transition-colors whitespace-nowrap"
            >
              {c.title}
            </a>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 py-10 space-y-14 max-w-6xl">
        {categories.map((category, i) => (
          <CategorySection key={category.id} category={category} index={i} />
        ))}
      </div>
    </>
  );
}
