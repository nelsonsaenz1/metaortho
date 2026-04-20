"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const services = [
  {
    title: "Sarcopenia Prevention",
    description: "Muscle mass assessment, resistance training prescriptions, protein optimization, and creatine/HMB supplementation guidance.",
    icon: "💪",
    tag: "Core",
  },
  {
    title: "Bone Density Monitoring",
    description: "DEXA scan ordering and interpretation, osteoporosis risk assessment, calcium and vitamin D optimization.",
    icon: "🦴",
    tag: "Core",
  },
  {
    title: "Nutritional Optimization",
    description: "Comprehensive metabolic lab panels plus personalized supplementation protocols tailored to your GLP-1 therapy.",
    icon: "🧬",
    tag: "Core",
  },
  {
    title: "Gout Treatment",
    description: "Rapid weight loss causes uric acid spikes. We diagnose acute flares and provide ongoing prevention.",
    icon: "🦶",
    tag: "Acute + Preventive",
  },
  {
    title: "Lab & Imaging Orders",
    description: "DEXA scans, metabolic panels, vitamin D, uric acid — ordered through Quest or Labcorp near you.",
    icon: "🔬",
    tag: "Nationwide",
  },
  {
    title: "Exercise Prescriptions",
    description: "Structured resistance programs designed for GLP-1 patients. Referrals to physical therapists and trainers.",
    icon: "🏋️",
    tag: "Coming Soon: PT Network",
  },
];

export default function Services() {
  return (
    <SectionWrapper bg="dark" id="services">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-4 font-[var(--font-body)]">
          Comprehensive care
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6" style={{ color: 'white' }}>
          Everything your weight-loss doctor isn&apos;t monitoring
        </h2>
        <p className="text-lg text-white/70 leading-relaxed">
          MetaOrtho manages an entire category of side effects from GLP-1 rapid weight loss — not just one condition.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.title}
            className="group bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-[var(--radius-lg)] p-7 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-5">
              <span className="text-2xl">{service.icon}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 font-[var(--font-body)]">
                {service.tag}
              </span>
            </div>
            <h3 className="text-lg font-normal mb-3 tracking-[-0.01em]" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              {service.title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
