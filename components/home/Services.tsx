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
    title: "Candidacy & goals",
    description:
      "Whether GLP-1 therapy may be appropriate for you, based on your profile, history, goals, and risk factors.",
    tag: "Candidacy",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Medication & dose context",
    description:
      "A review of your current or potential GLP-1 — drug class, dosing history, response, and tolerability. Drug decisions stay with your clinician; the consult reviews the considerations.",
    tag: "Medication",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Side effects & tolerability",
    description:
      "Clinical questions worth discussing — nausea, fatigue, weakness, joint symptoms, gout concerns, nutrition, and the effects of rapid weight loss.",
    tag: "Side effects",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Weight-loss pace & nutrition",
    description:
      "Your pace of loss, protein and nutrition, and how to support strength and energy while the weight comes off.",
    tag: "Nutrition",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Body composition, muscle & bone",
    description:
      "Whether DEXA, strength tracking, or musculoskeletal monitoring may make sense for your situation — the orthopedic depth most GLP-1 programs skip.",
    tag: "Monitoring",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
  },
  {
    title: "Labs, DEXA & follow-up",
    description:
      "Which labs or imaging may be worth ordering when clinically appropriate, and what a sensible follow-up cadence looks like for you.",
    tag: "Labs & follow-up",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <SectionWrapper bg="dark" id="services">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80 mb-4 font-[var(--font-body)]">
          What your consult reviews
        </p>
        <h2
          className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-6"
          style={{ color: "white" }}
        >
          A specialty GLP-1 consult, not another generic weight-loss program
        </h2>
        <p className="text-lg text-white/85 leading-relaxed">
          One focused visit that looks at the whole picture — candidacy,
          medication, side effects, nutrition, and the musculoskeletal monitoring
          most programs leave out.
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
