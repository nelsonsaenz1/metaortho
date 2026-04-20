"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const steps = [
  {
    step: "01",
    title: "Comprehensive MSK assessment",
    description:
      "A 30-minute virtual visit with our clinical team. We review your GLP-1 history, assess your musculoskeletal risk factors, and order baseline labs and imaging.",
    detail: "DEXA scan, vitamin D, metabolic panel, uric acid",
    price: "Starting at $149",
  },
  {
    step: "02",
    title: "Personalized protection plan",
    description:
      "Dr. Saenz creates your personalized protocol: resistance training prescriptions, nutritional optimization, and any necessary medications.",
    detail: "Protein, vitamin D, calcium, creatine, B12 targets",
    price: "Reviewed by orthopedic surgeon",
  },
  {
    step: "03",
    title: "Ongoing monitoring",
    description:
      "Monthly check-ins track your bone density trends, muscle composition, lab values, and symptoms. We adjust your protocol as your weight loss progresses.",
    detail: "DEXA tracking, lab trends, exercise progression",
    price: "Plans from $79/month",
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper bg="cream" id="how-it-works">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
          How it works
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6">
          Three steps to protect your body while you lose weight
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          All from home. No travel. No waiting rooms. Expert orthopedic care via secure video.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={step.step}
            className="relative bg-white rounded-[var(--radius-xl)] p-8 border border-[var(--color-border)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 group"
          >
            {/* Step number */}
            <div className="text-[80px] font-bold text-[var(--color-bg-warm)] leading-none mb-4 tracking-tighter transition-colors group-hover:text-[var(--color-accent-light)]" style={{ fontFamily: 'var(--font-heading)' }}>
              {step.step}
            </div>

            <h3 className="text-xl font-normal text-[var(--color-text-heading)] mb-4 tracking-[-0.02em]" style={{ fontFamily: 'var(--font-heading)' }}>
              {step.title}
            </h3>

            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5">
              {step.description}
            </p>

            <div className="pt-4 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-text-tertiary)] mb-1">{step.detail}</p>
              <p className="text-sm font-semibold text-[var(--color-accent-primary)] tracking-[-0.01em]">
                {step.price}
              </p>
            </div>

            {/* Connector line on desktop */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-[var(--color-border)]" />
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
