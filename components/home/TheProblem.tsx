"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const gaps = [
  {
    provider: "GLP-1 Prescriber",
    emoji: "💊",
    manages: "Weight, blood sugar, metabolic markers",
    misses: "Bone density, muscle mass, tendon health, gout risk",
  },
  {
    provider: "Primary Care Doctor",
    emoji: "🩺",
    manages: "General health, basic labs",
    misses: "Rarely orders DEXA for weight-loss patients; no MSK-specific protocol",
  },
  {
    provider: "MSK Telehealth (Hinge, Sword)",
    emoji: "💻",
    manages: "General MSK: back pain, knee pain, rehab",
    misses: "Not positioned for GLP-1 patients; no metabolic-orthopedic integration",
  },
  {
    provider: "Doing Nothing",
    emoji: "⏳",
    manages: "—",
    misses: "Lose muscle, thin bones, discover the damage years later",
  },
];

export default function TheProblem() {
  return (
    <SectionWrapper bg="primary" id="the-problem">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
          The gap in your care
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6">
          Nobody is watching what GLP-1s do to your bones &amp; muscles
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          You have a doctor managing your weight loss. But who is managing the structural consequences? Right now, the answer is probably: no one.
        </p>
      </div>

      {/* Comparison grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {gaps.map((gap) => (
          <div
            key={gap.provider}
            className="group bg-[var(--color-bg-cream)] rounded-[var(--radius-lg)] p-7 hover:bg-[var(--color-bg-warm)] transition-colors duration-300"
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl mt-0.5">{gap.emoji}</span>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[var(--color-text-heading)] mb-3 font-[var(--font-body)] tracking-[-0.01em]">
                  {gap.provider}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                      <span className="font-medium text-[var(--color-text-primary)]">Manages:</span>
                    </span>{" "}
                    {gap.manages}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-danger)]" />
                      <span className="font-medium text-[var(--color-danger)]">Misses:</span>
                    </span>{" "}
                    {gap.misses}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom callout */}
      <div className="mt-12 bg-[var(--color-bg-dark)] rounded-[var(--radius-xl)] px-8 py-7 text-center">
        <p className="text-white/80 text-base md:text-lg tracking-[-0.01em]">
          <span className="text-white font-medium">MetaOrtho fills this gap</span> — one practice monitoring everything your weight-loss doctor doesn&apos;t.
        </p>
      </div>
    </SectionWrapper>
  );
}
