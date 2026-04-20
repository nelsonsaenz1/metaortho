"use client";

import { useState, useEffect } from "react";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      data-mobile-cta
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-t border-[var(--color-border)] px-5 py-3 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <a
        href="/book"
        className="flex items-center justify-center w-full px-6 py-3.5 bg-[var(--color-bg-dark)] text-white font-semibold rounded-[var(--radius-pill)] text-[15px] tracking-[-0.01em] shadow-[var(--shadow-md)]"
      >
        Get Started — Book Assessment
      </a>
    </div>
  );
}
