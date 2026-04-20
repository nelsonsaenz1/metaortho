"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

const supplements = [
  { name: "High-Quality Protein", purpose: "Prevent muscle wasting", icon: "🥛" },
  { name: "Vitamin D3 + K2", purpose: "Protect bone density", icon: "☀️" },
  { name: "Calcium", purpose: "Bone strength", icon: "🦴" },
  { name: "Creatine Monohydrate", purpose: "Muscle preservation", icon: "💪" },
  { name: "HMB", purpose: "Reduce protein breakdown", icon: "🧬" },
  { name: "Vitamin B12", purpose: "Energy & nerve health", icon: "⚡" },
];

export default function Supplements() {
  return (
    <SectionWrapper bg="warm">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-warm)] mb-4 font-[var(--font-body)]">
            Coming Soon
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6">
            GLP-1 Body Protection supplement bundle
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
            Physician-curated supplement kits designed specifically for GLP-1 patients. Everything your body needs to maintain muscle, protect bones, and optimize nutrition during weight loss.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            Each bundle is selected by Dr. Saenz based on the latest evidence. No guesswork — just the right supplements at the right doses, delivered monthly.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button href="/book" variant="dark">
              Join the Waitlist
            </Button>
            <p className="text-sm text-[var(--color-text-tertiary)] self-center">
              Starting at $59/month
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {supplements.map((supp) => (
            <div
              key={supp.name}
              className="bg-white rounded-[var(--radius-lg)] px-5 py-5 border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-all duration-300"
            >
              <span className="text-2xl mb-3 block">{supp.icon}</span>
              <p className="font-semibold text-[var(--color-text-heading)] text-sm tracking-[-0.01em] mb-1">
                {supp.name}
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)]">{supp.purpose}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
