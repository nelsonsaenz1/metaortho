"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

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
      aria-hidden={!visible}
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-light border-t border-[var(--color-border)] px-5 py-3 transition-[opacity,transform] duration-[var(--dur-panel)] ease-[var(--ease-out)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <Link
        href="/assessment"
        onClick={() => trackEvent("profile_cta_clicked", { location: "mobile-cta" })}
        className="flex w-full items-center justify-center px-7 py-3.5 text-[15px] font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-md)] transition-[background-color] duration-[var(--dur-hover)] ease-[var(--ease-out)]"
      >
        Get my free GLP-1 profile
      </Link>
    </div>
  );
}
