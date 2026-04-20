"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("metaortho-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("metaortho-cookie-consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 bg-[var(--color-bg-dark)] rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] p-5 text-white animate-fade-up">
      <p className="text-sm text-white/80 mb-4 leading-relaxed">
        We use cookies to improve your experience. By continuing, you agree to our use of cookies.
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="px-5 py-2 bg-white text-[var(--color-bg-dark)] text-sm font-semibold rounded-[var(--radius-pill)] hover:bg-white/90 transition-colors cursor-pointer"
        >
          Accept
        </button>
        <button
          onClick={accept}
          className="px-5 py-2 text-white/70 text-sm font-medium rounded-[var(--radius-pill)] hover:text-white/80 transition-colors cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
