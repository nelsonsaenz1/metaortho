"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-cream)]">
        <div className="text-sm text-[var(--color-text-tertiary)]">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-cream)]">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <MobileNav />
    </div>
  );
}
