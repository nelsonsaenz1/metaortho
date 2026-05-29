"use client";

import { motion } from "framer-motion";
import { useId, useState } from "react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import MagneticButton from "@/components/ui/motion/MagneticButton";
import { trackEvent } from "@/lib/analytics";
import {
  INITIAL_CONSULT_PRICE_LABEL,
  FOLLOW_UP_PRICE_LABEL,
} from "@/lib/site-config";

const ease = [0.23, 1, 0.32, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function BookContent() {
  const emailId = useId();
  const consentId = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage(null);
    trackEvent("booking_request_started", { source: "book-page" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source_component: "consult-request",
          consent_marketing: consent,
        }),
      });
      const data: { success: boolean; message?: string } = await res
        .json()
        .catch(() => ({ success: false }));
      if (!res.ok || !data.success) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage(
        data.message || "Request received. We'll reach out about your consult.",
      );
      setEmail("");
      trackEvent("booking_request_completed", { source: "book-page" });
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-bg-darkest)] text-white pt-24 pb-24 md:pb-32">
        <MeshBackground variant="dark" />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 px-3 py-1.5 glass-dark rounded-[var(--radius-pill)] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-breath" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/75">
              Cash-pay specialty consult
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-normal tracking-[-0.035em] leading-[1.02] mb-6"
            style={{ color: "white", fontFamily: "var(--font-heading)" }}
          >
            Book your Specialty
            <br />
            <span className="text-[var(--color-accent-primary)]">
              GLP-1 Consult.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed mb-8"
          >
            A focused specialty review for patients starting, taking, or
            questioning GLP-1 treatment.{" "}
            <strong className="text-white">{INITIAL_CONSULT_PRICE_LABEL}</strong>{" "}
            initial consult ·{" "}
            <strong className="text-white">{FOLLOW_UP_PRICE_LABEL}</strong>{" "}
            follow-ups.
          </motion.p>

          {/* Pre-booking note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="glass-dark rounded-[var(--radius-lg)] p-5 max-w-lg mx-auto mb-10 text-left"
          >
            <p className="text-[14px] text-white/85 leading-relaxed">
              <strong className="text-white">Start with your Profile first.</strong>{" "}
              If you haven&apos;t completed the GLP-1 Management Profile, take it
              first so your consult can focus on your specific questions.
            </p>
            <MagneticButton strength={5}>
              <Link
                href="/assessment"
                onClick={() => trackEvent("profile_cta_clicked", { location: "book-page" })}
                className="mt-4 inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:active:scale-100"
              >
                Get my free GLP-1 profile →
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Consult request capture */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="max-w-md mx-auto"
          >
            <p className="text-[13px] uppercase tracking-[0.12em] font-semibold text-white/60 mb-4">
              Or request a consult directly
            </p>
            {status === "success" ? (
              <div className="glass-dark rounded-[var(--radius-lg)] p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-5 h-5 text-[var(--color-success)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-white font-medium mb-1">Request received.</p>
                <p className="text-white/80 text-[13px]">{message}</p>
              </div>
            ) : (
              <>
                <form onSubmit={submit} noValidate>
                  <div className="glass-dark rounded-[var(--radius-pill)] p-1.5 flex items-center">
                    <label htmlFor={emailId} className="sr-only">
                      Email
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 min-w-0 bg-transparent px-5 py-3 text-[15px] text-white placeholder:text-white/70 focus:outline-none"
                    />
                    <MagneticButton strength={4}>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-6 py-3 text-[14px] font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:active:scale-100 disabled:opacity-60 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-darkest)]"
                      >
                        {status === "loading" ? "…" : "Request consult"}
                      </button>
                    </MagneticButton>
                  </div>
                  {status === "error" && message && (
                    <p
                      role="alert"
                      className="mt-3 text-[12px] font-medium text-red-300"
                    >
                      {message}
                    </p>
                  )}
                </form>
                <label
                  htmlFor={consentId}
                  className="mt-4 flex items-start gap-2.5 text-[12px] text-white/75 leading-relaxed max-w-sm mx-auto text-left cursor-pointer"
                >
                  <input
                    id={consentId}
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 accent-[var(--color-accent-primary)]"
                  />
                  <span>
                    Email me about my consult and occasional updates on specialty
                    GLP-1 management. Unsubscribe anytime.
                  </span>
                </label>
                <p className="mt-3 text-[12px] text-white/70">
                  Consult availability depends on state licensure and clinical
                  eligibility.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <SectionWrapper bg="cream">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4">
              What to expect
            </p>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-normal tracking-[-0.02em] mb-4">
              How your specialty consult works
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              A focused, structured visit — built around your GLP-1 Management
              Profile.
            </p>
          </div>
          <div className="space-y-5">
            {[
              {
                step: "1",
                title: "Complete your GLP-1 Management Profile",
                description:
                  "A structured assessment of your GLP-1 status, goals, medication history, side effects, and monitoring needs — so your consult starts informed.",
              },
              {
                step: "2",
                title: "Specialty video consult",
                description:
                  "Meet a licensed clinician via secure video to review your candidacy, medication context, side effects, and what to monitor.",
              },
              {
                step: "3",
                title: "Lab & imaging orders when appropriate",
                description:
                  "If clinically appropriate and available in your state, the team may recommend or coordinate labs or a DEXA scan near you.",
              },
              {
                step: "4",
                title: "Your management plan & next steps",
                description:
                  "Leave with a clearer understanding of your management tier, recommended next steps, and what should be monitored over time.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="glass-cream rounded-[var(--radius-lg)] p-6 flex gap-5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-bg-dark)] text-white flex items-center justify-center font-semibold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3
                    className="font-normal text-[var(--color-text-heading)] mb-1.5 tracking-[-0.01em] text-lg"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-[14px]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-accent-primary)] underline underline-offset-2 hover:opacity-80 transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-out)]"
            >
              See the full step-by-step: what happens next →
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-accent-primary)] underline underline-offset-2 hover:opacity-80 transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-out)]"
            >
              Browse GLP-1 resources →
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
