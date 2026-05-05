"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type OpenOptions = {
  /** Eyebrow shown above the modal headline. */
  eyebrow?: string;
  /** Headline override. */
  headline?: ReactNode;
  /** Subcopy override. */
  subcopy?: ReactNode;
  /** Button label. */
  buttonText?: string;
  /** What triggered the open — captured as source_component. */
  source?: string;
};

type Ctx = {
  open: (opts?: OpenOptions) => void;
  close: () => void;
};

const WaitlistCtx = createContext<Ctx | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistCtx);
  if (!ctx) {
    throw new Error("useWaitlist must be used inside <WaitlistProvider>");
  }
  return ctx;
}

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [opts, setOpts] = useState<OpenOptions>({});
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const emailId = useId();
  const consentId = useId();
  const reduce = useReducedMotion();

  const open = useCallback((o?: OpenOptions) => {
    setOpts(o ?? {});
    setStatus("idle");
    setMessage(null);
    setEmail("");
    setConsent(true);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source_component: opts.source ?? "modal",
          consent_marketing: consent,
        }),
      });
      const data: { success: boolean; message?: string } = await res
        .json()
        .catch(() => ({ success: false }));
      if (!res.ok || !data.success) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(data.message || "You're in. We'll be in touch.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <WaitlistCtx.Provider value={{ open, close }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Join the MetaOrtho waitlist"
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              aria-hidden
              onClick={close}
              className="absolute inset-0 bg-[var(--color-bg-darkest)]/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Panel */}
            <motion.div
              initial={
                reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }
              }
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className="glass-light relative w-full max-w-md rounded-[var(--radius-xl)] p-7 md:p-8 overflow-hidden"
            >
              {/* Close */}
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-heading)] hover:bg-black/5 transition-[color,background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.92] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Header */}
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-3">
                {opts.eyebrow ?? "Coming soon · Join the waitlist"}
              </p>
              <h2
                className="text-[28px] font-normal tracking-[-0.03em] leading-[1.1] text-[var(--color-text-heading)] mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {opts.headline ?? (
                  <>
                    Be first when MetaOrtho
                    <br />
                    opens to new patients.
                  </>
                )}
              </h2>
              <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {opts.subcopy ??
                  "Joining the waitlist subscribes you to our weekly newsletter on GLP-1 side effects, new research, and counteraction protocols — plus first notice the day we begin accepting patients in your state."}
              </p>

              {/* Form */}
              {status === "success" ? (
                <div className="rounded-[var(--radius-lg)] bg-[var(--color-success-bg)] border border-[var(--color-success)]/20 p-5 text-[14px] text-[var(--color-text-heading)] leading-relaxed">
                  <p className="font-medium text-[var(--color-success)] mb-1">
                    You&apos;re in.
                  </p>
                  <p>{message}</p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <label htmlFor={emailId} className="sr-only">
                    Email address
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      id={emailId}
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 min-w-0 h-11 px-4 text-[14px] rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white text-[var(--color-text-heading)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="h-11 px-6 text-[13px] font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
                    >
                      {status === "loading"
                        ? "…"
                        : (opts.buttonText ?? "Join the waitlist")}
                    </button>
                  </div>

                  <label
                    htmlFor={consentId}
                    className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-[var(--color-text-secondary)] cursor-pointer"
                  >
                    <input
                      id={consentId}
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-[3px] w-3.5 h-3.5 rounded-[3px] border border-[var(--color-border-strong)] accent-[var(--color-accent-primary)] cursor-pointer"
                    />
                    <span>
                      I agree to receive updates from MetaOrtho. No spam;
                      unsubscribe anytime.
                    </span>
                  </label>

                  {status === "error" && message && (
                    <p
                      role="alert"
                      className="mt-3 text-[12px] font-medium text-[var(--color-danger)]"
                    >
                      {message}
                    </p>
                  )}
                </form>
              )}

              {/* Mini trust row */}
              <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[var(--color-text-tertiary)]">
                <span>Orthopedic + Endocrine led</span>
                <span className="opacity-40">·</span>
                <span>HIPAA-compliant</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WaitlistCtx.Provider>
  );
}
