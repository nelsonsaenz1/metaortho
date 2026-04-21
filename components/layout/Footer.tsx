"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";

export default function Footer() {
  return (
    <footer data-site-footer className="bg-[var(--color-bg-darkest)] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-12">
        {/* Top section — CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-16 border-b border-white/10">
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
              Join the waitlist — one short monthly update and a launch-day notice.
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

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
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
                  <Link href={link.href} className="text-[14px] text-white/90 hover:text-white transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]">
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
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14px] text-white/90 hover:text-white transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75 mb-5 font-[var(--font-body)]">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Dr. Saenz", href: "/about" },
                { label: "How It Works", href: "/home#how-it-works" },
                { label: "Patient Login", href: "/portal/login" },
                { label: "Contact", href: "mailto:info@metaortho.com" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14px] text-white/90 hover:text-white transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75 mb-5 font-[var(--font-body)]">
              Contact
            </h4>
            <ul className="space-y-3 text-[14px] text-white/80">
              <li>
                <a href="mailto:info@metaortho.com" className="hover:text-white transition-colors">
                  info@metaortho.com
                </a>
              </li>
              <li>Licensed in 43 states</li>
              <li>Telehealth only</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-white/80">
            <Logo size={22} />
            <span className="text-xs text-white/75">
              &copy; {new Date().getFullYear()} MetaOrthopedics. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6 text-xs text-white/75">
            <Link href="/privacy" className="hover:text-white transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]">Terms</Link>
            <Link href="/hipaa" className="hover:text-white transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]">HIPAA</Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-[11px] text-white/75 leading-relaxed max-w-3xl">
          MetaOrthopedics provides telehealth services and does not replace emergency medical care.
          If you are experiencing a medical emergency, call 911. This site does not provide medical advice
          for emergency conditions. All medical services are provided by licensed healthcare professionals.
        </p>
      </div>
    </footer>
  );
}
