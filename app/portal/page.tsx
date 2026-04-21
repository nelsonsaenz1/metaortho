"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHeader from "@/components/portal/PageHeader";

const ease = [0.23, 1, 0.32, 1] as const;

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

/* ---------------- MSK Score ---------------- */
function MSKScoreCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="bg-[var(--color-bg-dark)] text-white rounded-[var(--radius-xl)] p-8 relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--color-accent-primary)]/20 blur-[80px] pointer-events-none" />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85 mb-4">
          Your MSK Score
        </p>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-[72px] font-normal leading-none tracking-[-0.04em]">82</span>
          <span className="text-sm text-white/80 mb-3">/ 100</span>
        </div>
        <p className="text-sm text-white/85 leading-relaxed">
          Composite score across muscle mass, bone density, joint function, and nutrition markers.
          <span className="block mt-1 text-[var(--color-accent-primary)]">+3 points since last assessment</span>
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------- Next Visit ---------------- */
function NextVisitCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05, ease }}
      className="bg-white rounded-[var(--radius-xl)] p-8 border border-[var(--color-border)]"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4">
        Next visit
      </p>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-[36px] font-normal tracking-[-0.03em] text-[var(--color-text-heading)]" style={{ fontFamily: "var(--font-heading)" }}>
          May 2
        </span>
        <span className="text-sm text-[var(--color-text-secondary)]">· 2:30 PM CT</span>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] mb-5">
        Monthly check-in with <strong className="text-[var(--color-text-heading)]">Dr. Saenz</strong> · 20 min video visit
      </p>
      <div className="flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Join video visit
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] text-[var(--color-text-heading)] hover:bg-[var(--color-bg-cream)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2">
          Reschedule
        </button>
      </div>
    </motion.div>
  );
}

/* ---------------- Quick markers ---------------- */
type Trend = "up" | "down" | "flat";
const quickMarkers: {
  label: string;
  value: string;
  unit: string;
  delta: string;
  trend: Trend;
  good: boolean;
}[] = [
  { label: "Lean Mass", value: "58.2", unit: "kg", delta: "+0.4", trend: "up", good: true },
  { label: "DEXA T-score", value: "-0.8", unit: "", delta: "stable", trend: "flat", good: true },
  { label: "Vitamin D", value: "38", unit: "ng/mL", delta: "+12", trend: "up", good: true },
  { label: "Uric Acid", value: "6.4", unit: "mg/dL", delta: "+0.3", trend: "up", good: false },
];

function QuickMarkersGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {quickMarkers.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease }}
          className="bg-white rounded-[var(--radius-lg)] p-5 border border-[var(--color-border)]"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-tertiary)] mb-2">
            {m.label}
          </p>
          <div className="flex items-baseline gap-1 mb-1.5">
            <span className="text-[26px] font-normal tracking-[-0.02em] text-[var(--color-text-heading)] tabular-nums">
              {m.value}
            </span>
            {m.unit && (
              <span className="text-xs text-[var(--color-text-tertiary)]">{m.unit}</span>
            )}
          </div>
          <p
            className={`text-[11px] font-medium ${
              m.good ? "text-[var(--color-success)]" : "text-[var(--color-warning)]"
            }`}
          >
            {m.trend === "up" && "↑"}
            {m.trend === "down" && "↓"}
            {m.trend === "flat" && "→"} {m.delta}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- Lab Order Status ---------------- */
const labSteps = [
  { label: "Requisition created", status: "done", date: "Apr 14" },
  { label: "Blood draw at Labcorp", status: "done", date: "Apr 18" },
  { label: "DEXA scan", status: "active", date: "Scheduled May 1" },
  { label: "Results reviewed by Dr. Saenz", status: "pending", date: "" },
];

function LabStatusCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease }}
      className="bg-white rounded-[var(--radius-xl)] p-8 border border-[var(--color-border)]"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-2">
            Lab & imaging status
          </p>
          <h2 className="text-[22px] font-normal tracking-[-0.02em] text-[var(--color-text-heading)]" style={{ fontFamily: "var(--font-heading)" }}>
            Q2 baseline panel
          </h2>
        </div>
        <button className="text-[13px] font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors cursor-pointer">
          Download requisition
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-3 top-3 bottom-3 w-px bg-[var(--color-border)]" aria-hidden />
        <div className="space-y-5">
          {labSteps.map((step) => (
            <div key={step.label} className="relative flex items-start gap-4">
              <div
                className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.status === "done"
                    ? "bg-[var(--color-success)] text-white"
                    : step.status === "active"
                      ? "bg-[var(--color-accent-primary)] text-white ring-4 ring-[var(--color-accent-primary)]/20"
                      : "bg-[var(--color-bg-cream)] border border-[var(--color-border)] text-[var(--color-text-tertiary)]"
                }`}
              >
                {step.status === "done" && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {step.status === "active" && <span className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p
                  className={`text-[14px] font-medium tracking-[-0.01em] ${
                    step.status === "pending"
                      ? "text-[var(--color-text-tertiary)]"
                      : "text-[var(--color-text-heading)]"
                  }`}
                >
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">
                    {step.date}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Checklist ---------------- */
const checklist = [
  { label: "Complete your health profile", done: true },
  { label: "Take baseline strength self-assessment", done: true },
  { label: "Schedule your DEXA scan", done: false },
  { label: "Set a daily protein target", done: false },
  { label: "Log a resistance training session", done: false },
];

function ChecklistCard() {
  const done = checklist.filter((i) => i.done).length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease }}
      className="bg-white rounded-[var(--radius-xl)] p-8 border border-[var(--color-border)]"
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-2">
            Your checklist
          </p>
          <h2 className="text-[22px] font-normal tracking-[-0.02em] text-[var(--color-text-heading)]" style={{ fontFamily: "var(--font-heading)" }}>
            {done} of {checklist.length} complete
          </h2>
        </div>
        <div className="text-right">
          <div className="w-14 h-14 rounded-full border-[3px] border-[var(--color-bg-cream)] flex items-center justify-center relative">
            <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 56 56">
              <circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="var(--color-accent-primary)"
                strokeWidth="3"
                strokeDasharray={`${(done / checklist.length) * 157} 157`}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[13px] font-semibold text-[var(--color-text-heading)] tabular-nums">
              {Math.round((done / checklist.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {checklist.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] transition-colors ${
              item.done ? "bg-[var(--color-bg-cream)]/60" : "hover:bg-[var(--color-bg-cream)]"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.done
                  ? "bg-[var(--color-success)] text-white"
                  : "border-2 border-[var(--color-border-strong)]"
              }`}
            >
              {item.done && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span
              className={`text-[14px] ${
                item.done
                  ? "text-[var(--color-text-tertiary)] line-through"
                  : "text-[var(--color-text-heading)]"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Referral ---------------- */
function ReferralCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease }}
      className="bg-[var(--color-bg-cream)] rounded-[var(--radius-xl)] p-6 border border-[var(--color-border)]"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[var(--color-accent-primary)]/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-[var(--color-accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-[15px] font-medium text-[var(--color-text-heading)] mb-1">
            Know someone else on a GLP-1?
          </h3>
          <p className="text-[13px] text-[var(--color-text-secondary)] mb-3 leading-relaxed">
            Refer a friend or family member and they get their initial MSK assessment for $99 (reg. $149).
          </p>
          <button className="text-[13px] font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors cursor-pointer">
            Copy referral link →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Page ---------------- */
export default function PortalDashboard() {
  return (
    <>
      <PageHeader
        eyebrow={greeting()}
        title="Jay, you're on track."
        subtitle="Your protocol is working. Here's where things stand this week."
      />

      <div className="px-6 md:px-10 py-8 space-y-6 max-w-6xl">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MSKScoreCard />
          <NextVisitCard />
        </div>

        {/* Quick markers */}
        <QuickMarkersGrid />

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LabStatusCard />
          <ChecklistCard />
        </div>

        <div className="max-w-2xl">
          <ReferralCard />
        </div>

        <div className="pt-4 pb-10 text-center">
          <Link
            href="/portal/body"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            View all markers and labs →
          </Link>
        </div>
      </div>
    </>
  );
}
