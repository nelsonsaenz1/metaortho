"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";

export type WaitlistVariant = "hero" | "inline" | "sticky_footer";

export type WaitlistFormProps = {
  variant: WaitlistVariant;
  /** Usually auto-detected from pathname. Pass explicitly for edge cases. */
  source_page?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  onSuccess?: (email: string) => void;
  /** Optional eyebrow above the hero form. */
  eyebrow?: string;
  /** Optional headline inside the hero variant. */
  headline?: React.ReactNode;
  /** Optional subcopy under the hero headline. */
  subcopy?: React.ReactNode;
  /** Close callback for the sticky footer dismiss button. */
  onDismiss?: () => void;
  /** Visual color mode — defaults by variant. */
  tone?: "light" | "dark";
};

type Status = "idle" | "loading" | "success" | "error";

/**
 * WaitlistForm — single component, three variants.
 *
 * - `hero`: large, centered block for top-of-page placement.
 * - `inline`: compact, single-row form to drop inside content sections.
 * - `sticky_footer`: slim bar pinned to viewport bottom, dismissible.
 *
 * Talks to POST /api/waitlist. Visible consent checkbox (default checked,
 * US-compatible). On submit, records `consent_timestamp` server-side via
 * the consent_marketing flag.
 */
export default function WaitlistForm(props: WaitlistFormProps) {
  const {
    variant,
    placeholder = "your@email.com",
    buttonText = "Join the waitlist",
    successMessage = "You're in. We'll be in touch.",
    onSuccess,
    eyebrow,
    headline,
    subcopy,
    onDismiss,
    tone: toneProp,
  } = props;

  const pathname = usePathname() ?? "/";
  const source_page = props.source_page ?? pathname;

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const emailId = useId();
  const consentId = useId();

  const tone: "light" | "dark" =
    toneProp ?? (variant === "hero" ? "dark" : "light");

  async function handleSubmit(e: React.FormEvent) {
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
          source_component: variant,
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
      setMessage(data.message || successMessage);
      setEmail("");
      onSuccess?.(email);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  // ---- Styles, per variant ------------------------------------------------

  // Shared input/button palette flipped by tone.
  const palette = {
    light: {
      input:
        "bg-white border-[var(--color-border)] text-[var(--color-text-heading)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent-primary)]",
      button:
        "bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)]",
      consentLabel: "text-[var(--color-text-secondary)]",
      consentBox: "border-[var(--color-border-strong)]",
      success: "text-[var(--color-success)]",
      error: "text-[var(--color-danger)]",
    },
    dark: {
      input:
        "bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/60 backdrop-blur-sm",
      button: "bg-white text-[var(--color-bg-dark)] hover:bg-white/90",
      consentLabel: "text-white/60",
      consentBox: "border-white/30",
      success: "text-[var(--color-success)]",
      error: "text-[#ff8a7b]",
    },
  }[tone];

  const SharedInput = (
    <input
      id={emailId}
      type="email"
      autoComplete="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={placeholder}
      aria-label="Email address"
      className={`flex-1 min-w-0 px-4 text-[15px] rounded-[var(--radius-pill)] border focus:outline-none transition-colors ${palette.input}`}
    />
  );

  const SharedButton = (
    <button
      type="submit"
      disabled={status === "loading"}
      className={`px-6 text-[14px] font-semibold rounded-[var(--radius-pill)] transition-all tracking-[-0.01em] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer ${palette.button}`}
    >
      {status === "loading" ? "…" : buttonText}
    </button>
  );

  const Status = (
    <>
      {status === "success" && message && (
        <p
          role="status"
          className={`text-[13px] font-medium ${palette.success}`}
        >
          {message}
        </p>
      )}
      {status === "error" && message && (
        <p role="alert" className={`text-[13px] font-medium ${palette.error}`}>
          {message}
        </p>
      )}
    </>
  );

  const Consent = (
    <label
      htmlFor={consentId}
      className={`flex items-start gap-2 text-[12px] leading-relaxed cursor-pointer ${palette.consentLabel}`}
    >
      <input
        id={consentId}
        type="checkbox"
        checked={consent}
        onChange={(e) => setConsent(e.target.checked)}
        className={`mt-[3px] w-3.5 h-3.5 rounded-[3px] border accent-[var(--color-accent-primary)] cursor-pointer ${palette.consentBox}`}
      />
      <span>I agree to receive updates from MetaOrtho. No spam; unsubscribe anytime.</span>
    </label>
  );

  // Track source_page as hidden attribute for analytics debugging.
  const rootProps = { "data-waitlist-source": source_page };

  // ---- HERO ----------------------------------------------------------------
  if (variant === "hero") {
    return (
      <section
        {...rootProps}
        className="relative overflow-hidden bg-[var(--color-bg-dark)]"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] rounded-full bg-[var(--color-accent-primary)]/10 blur-[160px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-20 md:py-28 text-center">
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60 mb-4">
              {eyebrow}
            </p>
          )}
          {headline && (
            <h2
              className="text-[clamp(2rem,4.5vw,3rem)] font-normal tracking-[-0.03em] leading-[1.05] text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {headline}
            </h2>
          )}
          {subcopy && (
            <p className="text-[15px] md:text-base text-white/60 max-w-xl mx-auto leading-relaxed mb-10">
              {subcopy}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="max-w-xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex-1">
                <input
                  id={emailId}
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  aria-label="Email address"
                  className={`w-full h-12 px-5 text-[15px] rounded-[var(--radius-pill)] border focus:outline-none transition-colors ${palette.input}`}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className={`h-12 px-7 text-[14px] font-semibold rounded-[var(--radius-pill)] transition-all tracking-[-0.01em] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer ${palette.button}`}
              >
                {status === "loading" ? "…" : buttonText}
              </button>
            </div>

            <div className="mt-4 flex justify-center">{Consent}</div>

            <div className="mt-3 min-h-[18px]">{Status}</div>
          </form>
        </div>
      </section>
    );
  }

  // ---- INLINE --------------------------------------------------------------
  if (variant === "inline") {
    return (
      <div
        {...rootProps}
        className="w-full bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] p-5"
      >
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col sm:flex-row gap-2 items-stretch">
            <div className="flex-1">
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                aria-label="Email address"
                className={`w-full h-10 px-4 text-[14px] rounded-[var(--radius-pill)] border focus:outline-none transition-colors ${palette.input}`}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className={`h-10 px-5 text-[13px] font-semibold rounded-[var(--radius-pill)] transition-all tracking-[-0.01em] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer ${palette.button}`}
            >
              {status === "loading" ? "…" : buttonText}
            </button>
          </div>
          <div className="mt-3">{Consent}</div>
          <div className="mt-2 min-h-[18px]">{Status}</div>
        </form>
      </div>
    );
  }

  // ---- STICKY FOOTER -------------------------------------------------------
  return (
    <div
      {...rootProps}
      className="w-full bg-[var(--color-bg-dark)] text-white shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col md:flex-row md:items-center gap-3"
        >
          <div className="flex-1 min-w-0 md:pr-4">
            <p className="text-[13px] font-medium leading-snug">
              Get early access to MetaOrtho —{" "}
              <span className="text-white/60">1–2 emails/mo, no filler.</span>
            </p>
          </div>
          <div className="flex items-stretch gap-2 flex-1 max-w-md">
            <input
              id={emailId}
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              aria-label="Email address"
              className={`flex-1 min-w-0 h-9 px-3 text-[13px] rounded-[var(--radius-pill)] border focus:outline-none transition-colors ${palette.input}`}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={`h-9 px-4 text-[12px] font-semibold rounded-[var(--radius-pill)] transition-all tracking-[-0.01em] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer ${palette.button}`}
            >
              {status === "loading" ? "…" : "Join"}
            </button>
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                aria-label="Dismiss"
                className="shrink-0 h-9 w-9 flex items-center justify-center rounded-full text-white/50 hover:text-white/90 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>
        {(status === "success" || status === "error") && message && (
          <div className="mt-1">
            <p
              className={`text-[11px] font-medium ${
                status === "success" ? palette.success : palette.error
              }`}
            >
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
