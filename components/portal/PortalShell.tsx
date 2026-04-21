"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

/**
 * PortalShell
 *
 * Client-side prototype auth gate + layout wrapper for /portal/*.
 *
 * - /portal/login renders standalone (no sidebar, no auth check).
 * - All other /portal routes require a `portal-auth` localStorage key;
 *   missing auth → redirect to /portal/login.
 * - Adds `landing-mode` body class to suppress the marketing site's
 *   global Navbar/Footer/MobileCTA while inside the portal.
 *
 * NOTE: This is a prototype. Real authentication is NOT wired up.
 * Any email/password on the login form is accepted.
 */
export default function PortalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const isLoginRoute = pathname === "/portal/login";

  useEffect(() => {
    document.body.classList.add("landing-mode");
    return () => {
      document.body.classList.remove("landing-mode");
    };
  }, []);

  useEffect(() => {
    if (isLoginRoute) {
      setReady(true);
      return;
    }
    const authed =
      typeof window !== "undefined" &&
      window.localStorage.getItem("portal-auth") === "1";
    if (!authed) {
      router.replace("/portal/login");
      return;
    }
    setReady(true);
  }, [isLoginRoute, pathname, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (!ready) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[var(--color-bg-cream)]">
        <div className="text-sm text-[var(--color-text-tertiary)]">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] bg-[var(--color-bg-cream)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile-only top bar */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between px-5 py-3">
            <Link href="/portal" className="flex items-center gap-2 text-[var(--color-text-heading)]">
              <Logo size={22} />
              <span className="text-[14px] font-semibold tracking-[-0.02em]">
                MetaOrtho
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-primary)] ml-1">
                Portal
              </span>
            </Link>
            <Link
              href="/home"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)] active:opacity-70 motion-reduce:active:opacity-100 px-2 py-1 rounded-[var(--radius-sm)]"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Main site
            </Link>
          </div>
        </div>
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
