"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TiltCard from "@/components/ui/motion/TiltCard";
import Spotlight from "@/components/ui/motion/Spotlight";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";

const ease = [0.23, 1, 0.32, 1] as const;

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-bg-cream)] pt-12 pb-24">
        <MeshBackground variant="light" className="opacity-40" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-2 relative">
              <TiltCard max={5} glare="rgba(255,255,255,0.18)" className="max-w-md mx-auto">
                <div className="aspect-[3/4] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-xl)] relative">
                  <Image
                    src="/images/dr-saenz.jpg"
                    alt="Dr. Jay M. Saenz, MD"
                    width={400}
                    height={533}
                    className="object-cover w-full h-full"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-darkest)]/25 via-transparent to-transparent pointer-events-none" />
                </div>
              </TiltCard>
            </div>

            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
                Medical Director &amp; Founder
              </p>
              <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-2">
                Dr. Jay M. Saenz, MD
              </h1>
              <p className="text-xl text-[var(--color-accent-primary)] mb-8 tracking-[-0.01em]">
                Board-Certified Orthopedic Surgeon
              </p>
              <div className="space-y-5 text-[var(--color-text-secondary)] leading-relaxed text-lg">
                <p>
                  Dr. Saenz is a board-certified orthopedic surgeon who founded MetaOrthopedics to address one of the most significant unmet needs in modern medicine: the musculoskeletal consequences of GLP-1 weight loss medications.
                </p>
                <p>
                  With millions of Americans on Ozempic, Wegovy, Mounjaro, and Zepbound, patients are losing weight rapidly — but up to 40% of that loss is lean mass. Their prescribing physicians focus on metabolic markers. Nobody is monitoring what the weight loss is doing to their bodies structurally.
                </p>
                <p>
                  <strong className="text-[var(--color-text-heading)]">MetaOrtho was created to fill that gap.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Training */}
      <SectionWrapper bg="primary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-12 text-center">Education &amp; Training</h2>
          <div className="space-y-4">
            {[
              {
                institution: "University of Arkansas",
                detail: "Bachelor of Science",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                ),
              },
              {
                institution: "University of Arkansas for Medical Sciences (UAMS)",
                detail: "Doctor of Medicine",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 3h6M14 3v5a1 1 0 001 1h5M5 6a3 3 0 013-3h6l6 6v9a3 3 0 01-3 3H8a3 3 0 01-3-3V6z" />
                  </svg>
                ),
              },
              {
                institution: "University of Tennessee–Campbell Clinic",
                detail: "Orthopedic Surgery Residency — Memphis, TN",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
              },
            ].map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <Spotlight className="glass-cream rounded-[var(--radius-lg)] p-7 flex items-start gap-5 transition-[transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
                  <div className="w-11 h-11 rounded-[var(--radius-md)] bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent-primary)] flex-shrink-0">
                    {edu.icon}
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-[var(--color-text-heading)] text-lg tracking-[-0.01em]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {edu.institution}
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">{edu.detail}</p>
                  </div>
                </Spotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Professional Memberships */}
      <SectionWrapper bg="cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-12 text-center">Professional Memberships</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "American Academy of Orthopaedic Surgeons (AAOS)",
              "Tennessee Orthopaedic Society",
              "Memphis Medical Society",
              "American Medical Association (AMA)",
            ].map((membership) => (
              <div key={membership} className="flex items-center gap-3 bg-white rounded-[var(--radius-md)] px-5 py-4 border border-[var(--color-border)]">
                <svg className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[var(--color-text-primary)] font-medium tracking-[-0.01em]">{membership}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Why an Orthopedic Surgeon */}
      <SectionWrapper bg="dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-6" style={{ color: 'white' }}>
            Why an orthopedic surgeon for GLP-1 care?
          </h2>
          <p className="text-lg text-white/70 mb-16 max-w-2xl mx-auto">
            GLP-1 weight loss medications affect your entire musculoskeletal system. Here&apos;s why an orthopedic surgeon is the right specialist.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Bone Health Expert", description: "Orthopedic surgeons understand bone biology, density, metabolism, and fracture risk at a depth no other specialty matches." },
              { title: "Muscle & Tendon Authority", description: "From sarcopenia to tendon weakening, orthopedic surgeons manage the full spectrum of soft tissue health." },
              { title: "Joint Protection", description: "Weight loss changes joint mechanics. An orthopedic perspective ensures joints are protected as body composition shifts." },
            ].map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
              >
                <Spotlight
                  color="rgba(255,255,255,0.4)"
                  glow="rgba(42,111,151,0.08)"
                  className="glass-dark text-left rounded-[var(--radius-lg)] p-7 h-full transition-[transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                >
                  <h3
                    className="text-lg font-normal mb-3 tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-heading)", color: "white" }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {reason.description}
                  </p>
                </Spotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Telehealth + CTA */}
      <SectionWrapper bg="cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-6">Care that comes to you.</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed">
            MetaOrtho is fully telehealth — every visit, every protocol update, every follow-up happens from wherever you are. No travel, no waiting rooms, no compromises on the depth of care.
          </p>
          <WaitlistCTA
            variant="dark"
            size="lg"
            source="about-bottom"
            eyebrow="Early access · MetaOrtho"
          >
            Join the waitlist
          </WaitlistCTA>
        </div>
      </SectionWrapper>
    </>
  );
}
