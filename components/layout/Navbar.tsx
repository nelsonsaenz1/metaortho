"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Services", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Risk Assessment", href: "/assessment" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div data-site-navbar>
      {/* Top announcement bar */}
      <div className="bg-[var(--color-bg-dark)] text-center py-2.5 px-4 text-sm text-[var(--color-text-on-dark)] tracking-[-0.01em] relative z-50">
        <span className="opacity-80">Orthopedic surgeon-led telehealth</span>
        <span className="mx-2 opacity-40">|</span>
        <span className="opacity-80">Licensed in 43 states</span>
        <span className="mx-2 opacity-40">|</span>
        <Link href="/assessment" className="underline underline-offset-2 font-medium hover:opacity-100 transition-opacity">
          Free risk assessment →
        </Link>
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[var(--shadow-sm)] border-b border-[var(--color-border)]"
            : "bg-white border-b border-[var(--color-border)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group text-[var(--color-bg-dark)]">
              <Logo size={32} />
              <span className="text-[19px] font-semibold text-[var(--color-text-heading)] tracking-[-0.03em]">
                MetaOrtho
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] transition-colors rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-cream)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button href="/book" size="sm" variant="dark">
                Get Started
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-2 text-[var(--color-text-primary)] cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {mobileOpen ? (
                  <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[var(--color-border)] shadow-[var(--shadow-lg)] transition-all duration-300 ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-5 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-bg-cream)] rounded-[var(--radius-md)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button href="/book" className="w-full" variant="dark">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
