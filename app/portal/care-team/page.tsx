"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/portal/PageHeader";

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ---------------- Data ---------------- */

const upcoming = [
  {
    id: "v-may-2",
    date: "Fri, May 2",
    time: "2:30 PM CT",
    kind: "Monthly check-in · Video",
    provider: "Dr. Saenz",
    durationMin: 20,
    prep: [
      "Review your last DEXA and have it handy",
      "Log 3 recent training sessions",
      "Note any new joint pain or gout symptoms",
    ],
  },
  {
    id: "v-may-1",
    date: "Thu, May 1",
    time: "9:00 AM CT",
    kind: "DEXA scan · Imaging center",
    provider: "RadNet — Midtown",
    durationMin: 30,
    prep: [
      "Wear no metal (zippers, underwire)",
      "Arrive 10 minutes early to complete paperwork",
      "Fast not required",
    ],
  },
];

const completed = [
  {
    id: "v-apr-4",
    date: "Apr 4, 2026",
    kind: "Monthly check-in · Video",
    provider: "Dr. Saenz",
    summary:
      "Protein target raised from 120g → 140g to match your higher training volume. Vitamin D repeat in 90 days. Continuing HMB + creatine.",
  },
  {
    id: "v-mar-7",
    date: "Mar 7, 2026",
    kind: "Monthly check-in · Video",
    provider: "Dr. Saenz",
    summary:
      "Uric acid rose 0.3 to 6.4 — within expected range during rapid weight loss. Hydration target 2.5L/day. No medication change yet.",
  },
  {
    id: "v-feb-10",
    date: "Feb 10, 2026",
    kind: "Lab review · Async",
    provider: "Dr. Saenz",
    summary:
      "Q1 baseline results reviewed. Vitamin D low at 26 ng/mL — prescription D3 50,000 IU × 8 weeks then 5,000 IU daily maintenance.",
  },
  {
    id: "v-jan-12",
    date: "Jan 12, 2026",
    kind: "Initial MSK Assessment · Video",
    provider: "Dr. Saenz",
    summary:
      "Baseline on GLP-1 (12 weeks in). Orders: DEXA, CMP, uric acid, vitamin D, hs-CRP. Protocol v1 issued: resistance 3×/wk, protein 120g, creatine 5g, mag 400mg.",
  },
];

const messages = [
  {
    id: "m-apr-20",
    from: "Wendy, RN · Care coordinator",
    time: "2h ago",
    preview: "Your DEXA requisition is ready. You can schedule directly with RadNet or I can book it for you.",
    unread: true,
  },
  {
    id: "m-apr-18",
    from: "Dr. Saenz",
    time: "Apr 18",
    preview: "Labcorp results came in — everything looks great except vitamin D is trending up nicely. Keep going.",
    unread: false,
  },
  {
    id: "m-apr-15",
    from: "Dr. Saenz",
    time: "Apr 15",
    preview: "Updated your protein target. Let me know if meeting 140g feels like a stretch.",
    unread: false,
  },
];

/* ---------------- Provider card ---------------- */

function ProviderCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="bg-white rounded-[var(--radius-xl)] p-6 border border-[var(--color-border)]"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-[var(--color-bg-dark)] text-white flex items-center justify-center text-lg font-semibold flex-shrink-0">
          NS
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-medium tracking-[-0.01em] text-[var(--color-text-heading)]">
            Dr. Nelson Saenz, MD
          </h3>
          <p className="text-[13px] text-[var(--color-text-secondary)]">
            Founder · Board-certified orthopedic surgeon
          </p>
          <p className="text-[12px] text-[var(--color-text-tertiary)] mt-1">
            Fellowship-trained · Licensed in 43 states
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-3 py-1.5 text-[12px] font-medium rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] transition-colors cursor-pointer">
              Send message
            </button>
            <button className="px-3 py-1.5 text-[12px] font-medium rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] text-[var(--color-text-heading)] hover:bg-[var(--color-bg-cream)] transition-colors cursor-pointer">
              Book a visit
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Upcoming ---------------- */

function UpcomingTab() {
  if (upcoming.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border)]">
        <p className="text-[15px] text-[var(--color-text-heading)] font-medium mb-1">
          Nothing on the calendar
        </p>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Your next check-in will appear here once scheduled.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {upcoming.map((v, i) => (
        <motion.div
          key={v.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05, ease }}
          className="bg-white rounded-[var(--radius-xl)] p-6 border border-[var(--color-border)]"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className="text-[22px] font-normal tracking-[-0.02em] text-[var(--color-text-heading)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {v.date}
                </span>
                <span className="text-[13px] text-[var(--color-text-secondary)]">
                  · {v.time}
                </span>
              </div>
              <p className="text-[13px] text-[var(--color-text-secondary)]">
                {v.kind} · with <strong className="text-[var(--color-text-heading)]">{v.provider}</strong> · {v.durationMin} min
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-[13px] font-medium rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] transition-colors cursor-pointer">
                Join visit
              </button>
              <button className="px-4 py-2 text-[13px] font-medium rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] text-[var(--color-text-heading)] hover:bg-[var(--color-bg-cream)] transition-colors cursor-pointer">
                Reschedule
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--color-border)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-primary)] mb-2">
              How to prepare
            </p>
            <ul className="space-y-1.5">
              {v.prep.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-accent-primary)] mt-1.5">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- Completed ---------------- */

function CompletedTab() {
  return (
    <div className="space-y-3">
      {completed.map((v, i) => (
        <motion.div
          key={v.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.03, ease }}
          className="bg-white rounded-[var(--radius-lg)] p-5 border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-all"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
            <div>
              <p className="text-[15px] font-medium tracking-[-0.01em] text-[var(--color-text-heading)]">
                {v.kind}
              </p>
              <p className="text-[12px] text-[var(--color-text-tertiary)]">
                {v.date} · {v.provider}
              </p>
            </div>
            <button className="self-start md:self-auto text-[12px] font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors cursor-pointer whitespace-nowrap">
              View notes →
            </button>
          </div>
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            {v.summary}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- Messages ---------------- */

function MessagesTab() {
  return (
    <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between border-b border-[var(--color-border)]">
        <p className="text-[13px] font-medium text-[var(--color-text-heading)]">
          Inbox
        </p>
        <button className="text-[12px] font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors cursor-pointer">
          + New message
        </button>
      </div>
      <div className="divide-y divide-[var(--color-border)]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`px-6 py-4 hover:bg-[var(--color-bg-cream)] transition-colors cursor-pointer ${
              m.unread ? "bg-[var(--color-accent-primary)]/[0.03]" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              {m.unread && (
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] mt-1.5 flex-shrink-0" />
              )}
              {!m.unread && <span className="w-2 h-2 mt-1.5 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <p className={`text-[13px] truncate ${m.unread ? "font-semibold text-[var(--color-text-heading)]" : "font-medium text-[var(--color-text-heading)]"}`}>
                    {m.from}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-tertiary)] flex-shrink-0">
                    {m.time}
                  </p>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                  {m.preview}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

type Tab = "upcoming" | "completed" | "messages";

export default function CareTeamPage() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <>
      <PageHeader
        eyebrow="Your care"
        title="Care Team"
        subtitle="Visits, messages, and everything from your time with Dr. Saenz — all in one place."
        right={
          <button className="px-4 py-2 text-[13px] font-medium rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] text-[var(--color-text-heading)] hover:bg-[var(--color-bg-cream)] transition-colors cursor-pointer">
            Download comprehensive report
          </button>
        }
      />

      <div className="px-6 md:px-10 py-8 space-y-6 max-w-5xl">
        <ProviderCard />

        {/* Tabs */}
        <div className="border-b border-[var(--color-border)]">
          <div className="flex gap-1">
            {([
              { id: "upcoming" as Tab, label: `Upcoming (${upcoming.length})` },
              { id: "completed" as Tab, label: `Completed (${completed.length})` },
              {
                id: "messages" as Tab,
                label: `Messages${unreadCount ? ` (${unreadCount})` : ""}`,
              },
            ]).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${
                  tab === t.id
                    ? "border-[var(--color-accent-primary)] text-[var(--color-text-heading)]"
                    : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {tab === "upcoming" && <UpcomingTab />}
        {tab === "completed" && <CompletedTab />}
        {tab === "messages" && <MessagesTab />}
      </div>
    </>
  );
}
