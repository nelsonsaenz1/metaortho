"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TiltCard from "@/components/ui/motion/TiltCard";
import Spotlight from "@/components/ui/motion/Spotlight";
import MeshBackground from "@/components/ui/motion/MeshBackground";

const ease = [0.23, 1, 0.32, 1] as const;

export default function KashifLatifContent() {
  return (
    <>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[var(--color-bg-cream)] pt-8"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <ol className="flex items-center gap-2 text-[13px] text-[var(--color-text-tertiary)]">
            <li>
              <Link
                href="/about"
                className="hover:text-[var(--color-text-heading)] underline-offset-2 hover:underline"
              >
                Our Medical Team
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-[var(--color-text-secondary)]">
              Dr. Kashif Latif, MD
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-bg-cream)] pt-12 pb-24">
        <MeshBackground variant="light" className="opacity-40" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-2 relative">
              <TiltCard
                max={5}
                glare="rgba(255,255,255,0.18)"
                className="max-w-md mx-auto"
              >
                <div className="aspect-[3/4] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-xl)] relative bg-[var(--color-bg-cream-deep)]">
                  <Image
                    src="/images/dr-latif.jpg"
                    alt="Dr. Kashif Latif, MD"
                    width={400}
                    height={533}
                    className="object-cover w-full h-full"
                    priority
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-darkest)]/25 via-transparent to-transparent pointer-events-none"
                  />
                </div>
              </TiltCard>
            </div>

            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
                Endocrine Director &amp; Chief Science Officer
              </p>
              <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-2">
                Dr. Kashif Latif, MD
              </h1>
              <p className="text-xl text-[var(--color-accent-primary)] mb-8 tracking-[-0.01em]">
                Board-Certified Endocrinologist
              </p>
              <div className="space-y-5 text-[var(--color-text-secondary)] leading-relaxed text-lg">
                <p>
                  Dr. Latif is a board-certified endocrinologist with more
                  than two decades of clinical experience treating diabetes,
                  obesity, and metabolic disease. He is the founder and
                  medical director of{" "}
                  <strong className="text-[var(--color-text-heading)]">
                    AM Diabetes &amp; Endocrinology Center
                  </strong>{" "}
                  in the Memphis metro and has been recognized with multiple
                  Patients&rsquo; Choice and Compassionate Doctor awards.
                </p>
                <p>
                  For several years he has led longitudinal{" "}
                  <strong className="text-[var(--color-text-heading)]">
                    DEXA-scan studies on the musculoskeletal effects of GLP-1
                    therapy
                  </strong>{" "}
                  &mdash; tracking how rapid weight loss reshapes bone
                  density and lean mass over time. That research is the
                  scientific backbone of MetaOrtho&rsquo;s monitoring
                  protocol.
                </p>
                <p>
                  <strong className="text-[var(--color-text-heading)]">
                    At MetaOrtho, Dr. Latif co-leads the standard of care
                    with Dr. Saenz
                  </strong>{" "}
                  &mdash; pairing endocrine and metabolic oversight with
                  orthopedic expertise so every patient gets coordinated
                  care across both systems GLP-1s affect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice + experience highlights */}
      <SectionWrapper bg="primary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-12 text-center">
            Practice &amp; Experience
          </h2>
          <div className="space-y-4">
            {[
              {
                institution: "AM Diabetes & Endocrinology Center",
                detail:
                  "Founder & Medical Director — Bartlett, TN (Memphis metro)",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 21h18M3 7l9-4 9 4M5 21V11m14 10V11M9 21v-6h6v6M10 9h4"
                    />
                  </svg>
                ),
              },
              {
                institution: "24+ years in clinical endocrinology",
                detail:
                  "Diabetes, obesity, thyroid, and metabolic disease management",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                institution: "Hospital affiliations",
                detail:
                  "Affiliated with 25+ hospitals across the Memphis metro",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                ),
              },
              {
                institution: "Published research",
                detail:
                  "Six+ peer-reviewed publications and ongoing clinical research in metabolic disease",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
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
                    <p className="text-[var(--color-text-secondary)]">
                      {edu.detail}
                    </p>
                  </div>
                </Spotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Recognition */}
      <SectionWrapper bg="cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-12 text-center">
            Recognition
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Patients' Choice Award (multiple years)",
              "Compassionate Doctor Recognition",
              "Board Certified — Endocrinology, Diabetes & Metabolism",
              "American Medical Association (AMA)",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-white rounded-[var(--radius-md)] px-5 py-4 border border-[var(--color-border)]"
              >
                <svg
                  className="w-4 h-4 text-[var(--color-success)] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[var(--color-text-primary)] font-medium tracking-[-0.01em]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Back to team + CTA */}
      <SectionWrapper bg="cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
            <Link
              href="/about"
              className="underline underline-offset-2 hover:text-[var(--color-text-heading)]"
            >
              ← Back to our medical team
            </Link>
          </p>
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-6">
            Care that comes to you.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed">
            MetaOrtho is fully telehealth &mdash; every visit, every protocol
            update, every follow-up happens from wherever you are. No travel,
            no waiting rooms, no compromises on the depth of care.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-md)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] motion-reduce:active:scale-100 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
          >
            Get my free GLP-1 profile
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
