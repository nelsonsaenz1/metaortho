"use client";

import { useEffect } from "react";

/**
 * Suppresses the global Navbar, Footer, and MobileCTA
 * when rendered inside the /landing route. Adds a body class
 * that CSS rules target; cleans up on unmount.
 */
export default function LandingShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.classList.add("landing-mode");
    return () => {
      document.body.classList.remove("landing-mode");
    };
  }, []);

  return <>{children}</>;
}
