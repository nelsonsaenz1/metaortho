"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";

const navLinks = [
  { label: "How It Works", href: "/home#how-it-works" },
  { label: "Services", href: "/pricing" },
  { label: "Our Team", href: "/about" },
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
      <div className="bg-[var(--color-bg-dark)] text-center py-2.5 px-4 text-sm text-white tracking-[-0.01em] relative z-50">
        <span>Multi-specialty telehealth · Orthopedic + Endocrine</span>
        <span className="mx-2 text-white/75">|</span>
        <Link href="/assessment" className="underline underline-offset-2 font-semibold hover:opacity-100 transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-out)]">
          Free risk assessment →
        </Link>
      </div>

      <nav
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-[var(--dur-panel)] ease-[var(--ease-out)] ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[var(--shadow-sm)] border-b border-[var(--color-border)]"
            : "bg-white border-b border-[var(--color-border)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/home" className="flex items-center gap-2.5 group text-[var(--color-bg-dark)]">
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
                  className="px-3.5 py-2 text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] transition-[color,background-color] duration-[var(--dur-hover)] ease-[var(--ease-out)] rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-cream)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/portal/login"
                className="text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)] px-3 py-2"
              >
                Log in
              </Link>
              <WaitlistCTA variant="dark" size="sm" source="navbar">
                Join waitlist
              </WaitlistCTA>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-2 text-[var(--color-text-primary)] cursor-pointer transition-transform duration-[var(--dur-press)] ease-[var(--ease-out)] active:scale-[0.9] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] rounded-[var(--radius-sm)]"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
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
          className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[var(--color-border)] shadow-[var(--shadow-lg)] transition-[opacity,transform] duration-[var(--dur-panel)] ease-[var(--ease-out)] origin-top ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-5 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-bg-cream)] rounded-[var(--radius-md)] transition-[color,background-color] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:bg-[var(--color-bg-warm)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link
                href="/portal/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-3 text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-bg-cream)] rounded-[var(--radius-md)] transition-[color,background-color] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:bg-[var(--color-bg-warm)] border border-[var(--color-border)]"
              >
                Log in
              </Link>
              <WaitlistCTA
                variant="dark"
                size="md"
                source="navbar-mobile"
                className="w-full"
              >
                Join waitlist
              </WaitlistCTA>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
