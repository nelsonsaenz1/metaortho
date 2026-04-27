"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TiltCard from "@/components/ui/motion/TiltCard";

const ease = [0.23, 1, 0.32, 1] as const;

const credentials = [
  "University of Arkansas — Bachelor of Science",
  "UAMS — Doctor of Medicine",
  "University of Tennessee–Campbell Clinic — Ortho Residency",
  "AAOS Member",
  "Multi-State Licensed",
  "Board Certified",
];

export default function DoctorPreview() {
  return (
    <SectionWrapper bg="cream">
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="lg:col-span-2 relative"
        >
          <TiltCard max={6} glare="rgba(255,255,255,0.18)" className="max-w-sm mx-auto lg:mx-0">
            <div className="aspect-[3/4] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-xl)] relative">
              <Image
                src="/images/dr-saenz.jpg"
                alt="Dr. Jay M. Saenz, MD — Board-Certified Orthopedic Surgeon"
                width={400}
                height={533}
                className="object-cover w-full h-full"
              />
              {/* Gradient fade */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-darkest)]/30 via-transparent to-transparent pointer-events-none"
              />
              {/* Name pill */}
              <div className="absolute bottom-4 left-4 right-4 glass-dark rounded-[var(--radius-md)] px-4 py-3">
                <p
                  className="text-white text-[15px] font-normal tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Dr. Jay M. Saenz, MD
                </p>
                <p className="text-white/80 text-[11px] mt-0.5">
                  Board-Certified Orthopedic Surgeon
                </p>
              </div>
            </div>
          </TiltCard>

          {/* Floating verification */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease }}
            className="hidden lg:flex absolute -top-3 -right-3 glass-light rounded-[var(--radius-md)] px-4 py-3 items-center gap-2.5 shadow-[var(--shadow-lg)] animate-float"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--color-success-bg)] flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[var(--color-success)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--color-text-heading)]">
                Verified credentials
              </p>
              <p className="text-[10px] text-[var(--color-text-tertiary)]">
                UT–Campbell Clinic · AAOS
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bio */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
              Your physician
            </p>

            <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-2">
              Dr. Jay M. Saenz, MD
            </h2>
            <p className="text-lg text-[var(--color-accent-primary)] mb-8 tracking-[-0.01em]">
              Board-Certified Orthopedic Surgeon
            </p>

            <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed mb-8">
              <p>
                Dr. Saenz founded MetaOrtho to address one of the most significant
                unmet needs in modern medicine: the musculoskeletal consequences of
                GLP-1 weight loss medications.
              </p>
              <p>
                As an orthopedic surgeon, Dr. Saenz brings the exact clinical
                credentialing needed to monitor bone density, muscle mass, joint
                health, and structural integrity during rapid weight loss —
                expertise no other GLP-1 telehealth platform offers.
              </p>
            </div>

            {/* Credentials grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
              {credentials.map((cred, i) => (
                <motion.div
                  key={cred}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.2 + i * 0.05,
                    ease,
                  }}
                  className="glass-light flex items-center gap-2 text-[13px] text-[var(--color-text-primary)] rounded-[var(--radius-md)] px-3.5 py-2.5 hover:-translate-y-0.5 transition-transform duration-[var(--dur-hover)] ease-[var(--ease-out)] motion-reduce:hover:translate-y-0"
                >
                  <svg
                    className="w-3.5 h-3.5 text-[var(--color-success)] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="tracking-[-0.01em]">{cred}</span>
                </motion.div>
              ))}
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold rounded-[var(--radius-pill)] border-2 border-[var(--color-text-heading)] text-[var(--color-text-heading)] hover:bg-[var(--color-text-heading)] hover:text-white transition-[background-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 tracking-[-0.01em]"
            >
              Full bio &amp; credentials
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
