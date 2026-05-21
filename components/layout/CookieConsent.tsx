"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "metaortho-cookie-consent";
const CONSENT_VERSION = 2; // bump to re-prompt all visitors when categories change
const CONSENT_EVENT = "metaortho:consent-changed";

type Consent = {
  version: number;
  necessary: true; // always on; here for shape only
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  setAt: string;
};

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(c: Omit<Consent, "version" | "setAt" | "necessary">) {
  const payload: Consent = {
    version: CONSENT_VERSION,
    necessary: true,
    functional: c.functional,
    analytics: c.analytics,
    marketing: c.marketing,
    setAt: new Date().toISOString(),
  };
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      const t = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(t);
    }
    // Hydrate the toggles from previously-saved consent. Reading localStorage
    // during render would cause an SSR/client mismatch, so this is the correct
    // place; the set-state-in-effect rule is a false positive here.
    /* eslint-disable react-hooks/set-state-in-effect */
    setFunctional(existing.functional);
    setAnalytics(existing.analytics);
    setMarketing(existing.marketing);
    /* eslint-enable react-hooks/set-state-in-effect */
    function onOpenRequest() {
      const cur = readConsent();
      if (cur) {
        setFunctional(cur.functional);
        setAnalytics(cur.analytics);
        setMarketing(cur.marketing);
      }
      setAdvanced(true);
      setOpen(true);
    }
    window.addEventListener("metaortho:open-cookie-settings", onOpenRequest);
    return () =>
      window.removeEventListener(
        "metaortho:open-cookie-settings",
        onOpenRequest,
      );
  }, []);

  function acceptAll() {
    writeConsent({ functional: true, analytics: true, marketing: true });
    setOpen(false);
  }
  function rejectAll() {
    writeConsent({ functional: false, analytics: false, marketing: false });
    setOpen(false);
  }
  function saveCustom() {
    writeConsent({ functional, analytics, marketing });
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-modal="false"
      className="fixed bottom-20 lg:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-[var(--color-bg-dark)] rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] p-6 text-white animate-fade-up"
    >
      <p className="text-base font-semibold mb-1">Your cookie preferences</p>
      <p className="text-sm text-white/75 mb-4 leading-relaxed">
        We use cookies that are necessary for the site to work, and (with your
        permission) cookies that help us measure marketing performance. We do
        not load tracking on the patient portal or after we ask any health
        questions.{" "}
        <Link
          href="/legal/cookie-policy"
          className="underline hover:text-white"
        >
          Learn more
        </Link>
        .
      </p>

      {advanced && (
        <fieldset className="mb-4 space-y-2 border border-white/10 rounded-[var(--radius-md)] p-3">
          <legend className="sr-only">Cookie categories</legend>
          <label className="flex items-start gap-3 text-sm text-white/85">
            <input
              type="checkbox"
              checked
              disabled
              aria-label="Necessary cookies (always on)"
              className="mt-1"
            />
            <span>
              <span className="font-semibold">Necessary</span> &mdash; required
              for the site to function. Always on.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-white/85">
            <input
              type="checkbox"
              checked={functional}
              onChange={(e) => setFunctional(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="font-semibold">Functional</span> &mdash; remember
              preferences and UI state.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-white/85">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="font-semibold">Analytics</span> &mdash; usage
              analytics in aggregate. Off by default.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-white/85">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="font-semibold">Marketing</span> &mdash; Google
              Ads conversion tracking on public pages.
            </span>
          </label>
        </fieldset>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={acceptAll}
          className="px-4 py-2 bg-white text-[var(--color-bg-dark)] text-sm font-semibold rounded-[var(--radius-pill)] hover:bg-white/90 cursor-pointer"
        >
          Accept all
        </button>
        <button
          onClick={rejectAll}
          className="px-4 py-2 border border-white/30 text-white text-sm font-semibold rounded-[var(--radius-pill)] hover:bg-white/5 cursor-pointer"
        >
          Reject non-essential
        </button>
        {!advanced ? (
          <button
            onClick={() => setAdvanced(true)}
            className="px-4 py-2 text-white/80 text-sm font-medium rounded-[var(--radius-pill)] hover:text-white cursor-pointer"
          >
            Customize
          </button>
        ) : (
          <button
            onClick={saveCustom}
            className="px-4 py-2 text-white/90 text-sm font-semibold rounded-[var(--radius-pill)] border border-white/30 hover:bg-white/5 cursor-pointer"
          >
            Save my choices
          </button>
        )}
      </div>
    </div>
  );
}
