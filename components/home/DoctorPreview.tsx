"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

const credentials = [
  "University of Arkansas — BS",
  "UAMS — Doctor of Medicine",
  "Campbell Clinic — Ortho Residency",
  "AAOS Member",
  "43 State Licenses",
  "Board Certified",
];

export default function DoctorPreview() {
  return (
    <SectionWrapper bg="cream">
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        {/* Photo — 2 columns */}
        <div className="lg:col-span-2 relative">
          <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-xl)]">
            <Image
              src="/images/dr-saenz.jpg"
              alt="Dr. Jay M. Saenz, MD — Board-Certified Orthopedic Surgeon"
              width={400}
              height={533}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Bio — 3 columns */}
        <div className="lg:col-span-3">
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
              Dr. Saenz founded MetaOrtho to address one of the most significant unmet needs in modern medicine: the musculoskeletal consequences of GLP-1 weight loss medications.
            </p>
            <p>
              As an orthopedic surgeon, Dr. Saenz brings the exact clinical credentialing needed to monitor bone density, muscle mass, joint health, and structural integrity during rapid weight loss — expertise no other GLP-1 telehealth platform offers.
            </p>
          </div>

          {/* Credentials grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {credentials.map((cred) => (
              <div
                key={cred}
                className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] bg-white rounded-[var(--radius-md)] px-4 py-3 border border-[var(--color-border)]"
              >
                <svg className="w-3.5 h-3.5 text-[var(--color-success)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="tracking-[-0.01em]">{cred}</span>
              </div>
            ))}
          </div>

          <Button href="/about" variant="outline" size="md">
            Full bio & credentials
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
