"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/portal/PageHeader";

const ease = [0.25, 0.1, 0.25, 1] as const;

type MarkerType = "biomarker" | "imaging" | "self-assessment";
type Zone = "optimal" | "watch" | "risk" | "unknown";

type Marker = {
  name: string;
  type: MarkerType;
  value?: string;
  unit?: string;
  reference?: string;
  zone: Zone;
  trend?: "up" | "down" | "flat";
  delta?: string;
};

type System = {
  id: string;
  title: string;
  summary: string;
  markers: Marker[];
};

const systems: System[] = [
  {
    id: "musculoskeletal",
    title: "Musculoskeletal",
    summary:
      "Lean mass, skeletal muscle index, and functional strength — the most important axis on your protocol.",
    markers: [
      { name: "DEXA Lean Mass", type: "imaging", value: "58.2", unit: "kg", reference: "≥ 55 kg", zone: "optimal", trend: "up", delta: "+0.4 kg vs Jan" },
      { name: "Skeletal Muscle Index", type: "imaging", value: "8.4", unit: "kg/m²", reference: "> 7.0 (M)", zone: "optimal", trend: "flat", delta: "Stable" },
      { name: "Fat Mass", type: "imaging", value: "21.6", unit: "kg", reference: "—", zone: "optimal", trend: "down", delta: "−2.1 kg vs Jan" },
      { name: "Grip Strength (R)", type: "self-assessment", value: "44", unit: "kg", reference: "≥ 40 kg (M)", zone: "optimal", trend: "up", delta: "+2 kg" },
      { name: "Sit-to-Stand (30s)", type: "self-assessment", value: "18", unit: "reps", reference: "≥ 15", zone: "optimal", trend: "flat" },
      { name: "Balance (single-leg)", type: "self-assessment", value: "32", unit: "sec", reference: "≥ 20", zone: "optimal", trend: "up", delta: "+6s" },
    ],
  },
  {
    id: "bone",
    title: "Bone Health",
    summary:
      "Bone mineral density (spine + hip) and the nutritional cofactors that make bone possible.",
    markers: [
      { name: "DEXA T-score, Lumbar Spine", type: "imaging", value: "-0.8", reference: "≥ -1.0", zone: "optimal", trend: "flat", delta: "Stable vs baseline" },
      { name: "DEXA T-score, Left Hip", type: "imaging", value: "-1.1", reference: "≥ -1.0", zone: "watch", trend: "down", delta: "−0.2 vs baseline" },
      { name: "Vitamin D, 25-OH", type: "biomarker", value: "38", unit: "ng/mL", reference: "40–60", zone: "watch", trend: "up", delta: "+12 from 26" },
      { name: "Serum Calcium", type: "biomarker", value: "9.4", unit: "mg/dL", reference: "8.5–10.2", zone: "optimal", trend: "flat" },
      { name: "PTH (parathyroid)", type: "biomarker", value: "42", unit: "pg/mL", reference: "15–65", zone: "optimal", trend: "flat" },
      { name: "Phosphorus", type: "biomarker", value: "3.4", unit: "mg/dL", reference: "2.5–4.5", zone: "optimal", trend: "flat" },
    ],
  },
  {
    id: "metabolic",
    title: "Metabolic & Glycemic",
    summary:
      "How your body is handling glucose and insulin as GLP-1 therapy continues.",
    markers: [
      { name: "HbA1c", type: "biomarker", value: "5.4", unit: "%", reference: "< 5.7", zone: "optimal", trend: "down", delta: "−0.3" },
      { name: "Fasting Glucose", type: "biomarker", value: "88", unit: "mg/dL", reference: "70–99", zone: "optimal", trend: "flat" },
      { name: "Fasting Insulin", type: "biomarker", value: "6.2", unit: "μIU/mL", reference: "< 10", zone: "optimal", trend: "down", delta: "−1.8" },
      { name: "TSH", type: "biomarker", value: "2.1", unit: "μIU/mL", reference: "0.4–4.0", zone: "optimal", trend: "flat" },
    ],
  },
  {
    id: "gout",
    title: "Gout & Renal",
    summary:
      "Rapid weight loss can push uric acid up. We monitor closely until you're stable.",
    markers: [
      { name: "Uric Acid", type: "biomarker", value: "6.4", unit: "mg/dL", reference: "< 6.0", zone: "watch", trend: "up", delta: "+0.3" },
      { name: "Creatinine", type: "biomarker", value: "0.9", unit: "mg/dL", reference: "0.7–1.2", zone: "optimal", trend: "flat" },
      { name: "eGFR", type: "biomarker", value: "102", unit: "mL/min", reference: "> 90", zone: "optimal", trend: "flat" },
      { name: "Hydration (self-reported)", type: "self-assessment", value: "2.2", unit: "L/day", reference: "≥ 2.5 L", zone: "watch" },
    ],
  },
  {
    id: "nutrition",
    title: "Nutrition Markers",
    summary:
      "The vitamins and minerals most commonly under-eaten on a GLP-1 appetite profile.",
    markers: [
      { name: "Protein Intake (7-day avg)", type: "self-assessment", value: "128", unit: "g/day", reference: "≥ 140 g", zone: "watch", delta: "Under target by 12 g" },
      { name: "Vitamin B12", type: "biomarker", value: "612", unit: "pg/mL", reference: "> 400", zone: "optimal", trend: "flat" },
      { name: "Folate", type: "biomarker", value: "14.2", unit: "ng/mL", reference: "> 7", zone: "optimal", trend: "flat" },
      { name: "Ferritin", type: "biomarker", value: "94", unit: "ng/mL", reference: "30–300", zone: "optimal", trend: "flat" },
      { name: "Magnesium", type: "biomarker", value: "2.1", unit: "mg/dL", reference: "1.7–2.3", zone: "optimal", trend: "flat" },
    ],
  },
  {
    id: "inflammation",
    title: "Inflammation",
    summary:
      "Systemic inflammation markers. Relevant to joint pain and cardiovascular risk.",
    markers: [
      { name: "hs-CRP", type: "biomarker", value: "0.9", unit: "mg/L", reference: "< 1.0", zone: "optimal", trend: "down", delta: "−0.4" },
      { name: "Homocysteine", type: "biomarker", value: "9.1", unit: "μmol/L", reference: "< 10", zone: "optimal", trend: "flat" },
    ],
  },
];

const zoneStyles: Record<Zone, { bar: string; text: string; label: string }> = {
  optimal: { bar: "bg-[var(--color-success)]", text: "text-[var(--color-success)]", label: "Optimal" },
  watch: { bar: "bg-[var(--color-warning)]", text: "text-[var(--color-warning)]", label: "Watch" },
  risk: { bar: "bg-[var(--color-danger)]", text: "text-[var(--color-danger)]", label: "At risk" },
  unknown: { bar: "bg-[var(--color-text-tertiary)]", text: "text-[var(--color-text-tertiary)]", label: "Unknown" },
};

const typeLabel: Record<MarkerType, string> = {
  biomarker: "Biomarker",
  imaging: "Imaging",
  "self-assessment": "Self-assessment",
};

function MarkerCard({ marker, delay }: { marker: Marker; delay: number }) {
  const zone = zoneStyles[marker.zone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay, ease }}
      className="bg-white rounded-[var(--radius-lg)] p-5 border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <h3 className="text-[14px] font-medium tracking-[-0.01em] text-[var(--color-text-heading)] leading-snug mb-0.5 truncate">
            {marker.name}
          </h3>
          <p className="text-[11px] text-[var(--color-text-tertiary)]">
            {typeLabel[marker.type]}
          </p>
        </div>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${zone.text} flex-shrink-0`}>
          {zone.label}
        </span>
      </div>

      {marker.value !== undefined ? (
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-[22px] font-normal tracking-[-0.02em] text-[var(--color-text-heading)] tabular-nums">
            {marker.value}
          </span>
          {marker.unit && (
            <span className="text-[11px] text-[var(--color-text-tertiary)]">{marker.unit}</span>
          )}
        </div>
      ) : (
        <p className="text-[13px] text-[var(--color-text-tertiary)] italic mb-2">Not yet recorded</p>
      )}

      {marker.reference && (
        <div className="mb-3">
          <div className="h-1.5 bg-[var(--color-bg-cream)] rounded-full overflow-hidden">
            <div className={`h-full ${zone.bar} w-full`} style={{ width: marker.zone === "optimal" ? "100%" : marker.zone === "watch" ? "55%" : "25%" }} />
          </div>
          <p className="mt-2 text-[11px] text-[var(--color-text-tertiary)]">
            Reference: <span className="text-[var(--color-text-secondary)]">{marker.reference}</span>
          </p>
        </div>
      )}

      {marker.delta && (
        <p className={`text-[11px] font-medium ${zone.text}`}>
          {marker.trend === "up" && "↑"}
          {marker.trend === "down" && "↓"}
          {marker.trend === "flat" && "→"} {marker.delta}
        </p>
      )}
    </motion.div>
  );
}

function SystemSection({ system, filter }: { system: System; filter: string }) {
  const markers =
    filter === "all" ? system.markers : system.markers.filter((m) => m.type === filter);
  if (markers.length === 0) return null;

  return (
    <section id={system.id} className="scroll-mt-24">
      <div className="mb-4">
        <h2
          className="text-[22px] font-normal tracking-[-0.02em] text-[var(--color-text-heading)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {system.title}
          <span className="ml-3 text-[12px] font-normal text-[var(--color-text-tertiary)]">
            {markers.length} markers
          </span>
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
          {system.summary}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {markers.map((m, i) => (
          <MarkerCard key={m.name} marker={m} delay={i * 0.02} />
        ))}
      </div>
    </section>
  );
}

const filters = [
  { id: "all", label: "All" },
  { id: "biomarker", label: "Biomarkers" },
  { id: "imaging", label: "Imaging" },
  { id: "self-assessment", label: "Self-reported" },
];

export default function BodyPage() {
  const [filter, setFilter] = useState("all");

  const total = systems.reduce((n, s) => n + s.markers.length, 0);
  const optimal = systems.reduce(
    (n, s) => n + s.markers.filter((m) => m.zone === "optimal").length,
    0,
  );
  const watch = systems.reduce(
    (n, s) => n + s.markers.filter((m) => m.zone === "watch").length,
    0,
  );

  return (
    <>
      <PageHeader
        eyebrow="Your body"
        title="Body Composition & Markers"
        subtitle="Every measurement we track to keep your muscles, bones, and joints ahead of your GLP-1."
        right={
          <div className="flex gap-2">
            <button className="px-4 py-2 text-[13px] font-medium rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] text-[var(--color-text-heading)] hover:bg-[var(--color-bg-cream)] transition-colors cursor-pointer">
              Upload labs
            </button>
            <button className="px-4 py-2 text-[13px] font-medium rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] transition-colors cursor-pointer">
              Download results
            </button>
          </div>
        }
      />

      {/* Summary row */}
      <div className="px-6 md:px-10 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-[var(--radius-lg)] p-5 border border-[var(--color-border)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-tertiary)] mb-2">
              Tracking
            </p>
            <p className="text-[26px] font-normal tracking-[-0.02em] text-[var(--color-text-heading)]">
              {total} <span className="text-[13px] text-[var(--color-text-tertiary)]">markers</span>
            </p>
          </div>
          <div className="bg-white rounded-[var(--radius-lg)] p-5 border border-[var(--color-border)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-success)] mb-2">
              In optimal range
            </p>
            <p className="text-[26px] font-normal tracking-[-0.02em] text-[var(--color-text-heading)]">
              {optimal}{" "}
              <span className="text-[13px] text-[var(--color-text-tertiary)]">/ {total}</span>
            </p>
          </div>
          <div className="bg-white rounded-[var(--radius-lg)] p-5 border border-[var(--color-border)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-warning)] mb-2">
              On watchlist
            </p>
            <p className="text-[26px] font-normal tracking-[-0.02em] text-[var(--color-text-heading)]">
              {watch}{" "}
              <span className="text-[13px] text-[var(--color-text-tertiary)]">
                {watch === 1 ? "marker" : "markers"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-20 bg-[var(--color-bg-cream)]/95 backdrop-blur-sm border-b border-[var(--color-border)] mt-8">
        <div className="px-6 md:px-10 py-3 flex items-center gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-shrink-0 px-3.5 py-1.5 text-[12px] font-medium rounded-[var(--radius-pill)] border transition-colors whitespace-nowrap cursor-pointer ${
                filter === f.id
                  ? "bg-[var(--color-bg-dark)] text-white border-[var(--color-bg-dark)]"
                  : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:text-[var(--color-text-heading)] hover:border-[var(--color-border-strong)]"
              }`}
            >
              {f.label}
            </button>
          ))}
          <div className="w-px h-5 bg-[var(--color-border)] mx-2" />
          {systems.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex-shrink-0 px-3.5 py-1.5 text-[12px] font-medium rounded-[var(--radius-pill)] bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] hover:border-[var(--color-border-strong)] transition-colors whitespace-nowrap"
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 py-10 space-y-14 max-w-6xl">
        {systems.map((system) => (
          <SystemSection key={system.id} system={system} filter={filter} />
        ))}
      </div>
    </>
  );
}
