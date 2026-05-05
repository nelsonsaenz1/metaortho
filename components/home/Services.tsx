"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Spotlight from "@/components/ui/motion/Spotlight";

const ease = [0.23, 1, 0.32, 1] as const;

type Service = {
  title: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Sarcopenia Prevention",
    description:
      "Muscle mass assessment, resistance training prescriptions, protein optimization, and creatine/HMB supplementation guidance.",
    tag: "Core",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Bone Density Monitoring",
    description:
      "DEXA scan ordering + interpretation. Osteoporosis risk assessment. Calcium and vitamin D optimization.",
    tag: "Core",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
  },
  {
    title: "Nutritional Optimization",
    description:
      "Comprehensive metabolic lab panels plus personalized supplementation protocols tailored to your GLP-1 therapy.",
    tag: "Core",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Gout Treatment",
    description:
      "Rapid weight loss can drive uric acid spikes. We diagnose acute flares and help reduce recurrence risk through evidence-based management.",
    tag: "Acute + Ongoing",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Lab & Imaging Orders",
    description:
      "DEXA scans, metabolic panels, vitamin D, uric acid — ordered through Quest or Labcorp near you.",
    tag: "Nationwide",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Exercise Prescriptions",
    description:
      "Structured resistance programs designed for GLP-1 patients. PT network coming soon.",
    tag: "Coming Soon",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <SectionWrapper bg="dark" id="services">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80 mb-4 font-[var(--font-body)]">
          Comprehensive care
        </p>
        <h2
          className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6"
          style={{ color: "white" }}
        >
          Everything your weight-loss doctor isn&apos;t monitoring
        </h2>
        <p className="text-lg text-white/85 leading-relaxed">
          MetaOrtho manages an entire category of side effects from GLP-1 rapid
          weight loss — not just one condition.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-5 md:gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: i * 0.07, ease }}
            className="h-full"
          >
            <Spotlight
              color="rgba(255, 255, 255, 0.4)"
              glow="rgba(255, 255, 255, 0.05)"
              className="group relative h-full rounded-[var(--radius-lg)] p-7 md:p-8 text-center flex flex-col items-center glass-dark border border-white/10 transition-[transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 overflow-hidden"
            >
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-white/10 border border-white/15 text-white flex items-center justify-center mb-5">
                {service.icon}
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/80 mb-3">
                {service.tag}
              </span>

              <h3
                className="text-lg md:text-xl font-normal mb-3 tracking-[-0.015em] leading-snug"
                style={{ fontFamily: "var(--font-heading)", color: "white" }}
              >
                {service.title}
              </h3>

              <p className="text-[13px] leading-relaxed text-white/85">
                {service.description}
              </p>
            </Spotlight>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
