"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";
import { LICENSED_COUNT } from "@/lib/states";

function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("metaortho:open-cookie-settings"));
}

export default function Footer() {
  return (
    <footer
      data-site-footer
      className="bg-[var(--color-bg-darkest)] text-white"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-10">
        {/* Top — CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-2">
              Coming soon
            </p>
            <h3
              className="text-2xl md:text-3xl font-normal tracking-[-0.02em] mb-2"
              style={{ color: "white" }}
            >
              Be first when we open in your state.
            </h3>
            <p className="text-white/85 text-sm">
              Join the waitlist &mdash; one short monthly update and a
              launch-day notice.
            </p>
          </div>
          <WaitlistCTA
            variant="onDark"
            source="footer"
            eyebrow="Coming soon · Early access"
          >
            Join the waitlist
          </WaitlistCTA>
        </div>

        {/* Practice identification */}
        <div className="py-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8">
          <div>
            <p className="text-[15px] text-white/90 leading-relaxed mb-3">
              <strong className="text-white">MetaOrtho</strong> is a
              physician-led telemedicine practice. Currently licensed in{" "}
              <strong>{LICENSED_COUNT} U.S. states</strong>. Care is
              provided only by clinicians licensed in your state.
            </p>
            <p className="text-[13px] text-white/70 leading-relaxed mb-3">
              MetaOrthopedics, PLLC &middot; 3096 Chapel Woods Cove,
              Germantown, TN 38139
              <br />
              <a
                href="mailto:info@metaortho.com"
                className="hover:text-white"
              >
                info@metaortho.com
              </a>{" "}
              &middot; Phone:{" "}
              <span className="font-mono text-[12px]">[pending]</span>
            </p>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Medical Director: Jay M. Saenz, MD &mdash; Board-Certified
              Orthopedic Surgeon
              <br />
              NPI: <span className="font-mono text-[12px]">[pending]</span>
            </p>
          </div>
          <div className="rounded-[var(--radius-md)] border border-red-500/30 bg-red-500/5 p-4 text-[13px] text-red-100/90 leading-relaxed">
            <strong className="text-red-100">
              Not for medical emergencies.
            </strong>{" "}
            If you are experiencing a medical emergency, call 911 or go to
            your nearest emergency room.
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75 mb-5 font-[var(--font-body)]">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: "MSK Assessment", href: "/pricing" },
                { label: "Monitoring Plans", href: "/pricing" },
                { label: "Supplement Bundles", href: "/pricing" },
                { label: "Gout Treatment", href: "/pricing" },
                { label: "Lab & DEXA Orders", href: "/pricing" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75 mb-5 font-[var(--font-body)]">
              Learn
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Risk Assessment", href: "/assessment" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
                { label: "Sources", href: "/legal/sources" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75 mb-5 font-[var(--font-body)]">
              Practice
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Dr. Saenz", href: "/about" },
                { label: "Medical Team", href: "/about/medical-team" },
                { label: "Contact", href: "/about/contact" },
                { label: "Licensed States", href: "/legal/licensed-states" },
                { label: "Patient Login", href: "/portal/login" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75 mb-5 font-[var(--font-body)]">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/legal/privacy-policy" },
                {
                  label: "Notice of Privacy Practices",
                  href: "/legal/notice-of-privacy-practices",
                },
                { label: "Terms of Service", href: "/legal/terms-of-service" },
                {
                  label: "Telehealth Consent",
                  href: "/legal/telehealth-informed-consent",
                },
                {
                  label: "Pharmacy Partners",
                  href: "/legal/pharmacy-partners",
                },
                {
                  label: "Affiliate Disclosure",
                  href: "/legal/affiliate-disclosure",
                },
                { label: "Refund Policy", href: "/legal/refund-policy" },
                {
                  label: "Accessibility",
                  href: "/legal/accessibility-statement",
                },
                { label: "Grievances", href: "/legal/grievances" },
                { label: "Cookie Policy", href: "/legal/cookie-policy" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="text-[14px] text-white/90 hover:text-white transition-colors text-left"
                >
                  Manage cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-white/80">
            <Logo size={22} />
            <span className="text-xs text-white/75">
              &copy; {new Date().getFullYear()} MetaOrthopedics, PLLC. All
              rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white/55">
            <span>
              LegitScript ID: <span className="font-mono">[pending]</span>
            </span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={openCookieSettings}
              className="hover:text-white/80 underline"
            >
              Do Not Sell or Share
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
