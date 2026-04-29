"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const GOOGLE_ADS_TAG_ID = "AW-18123956048";

const BLOCKED_PREFIXES = [
  "/portal",
  "/login",
  "/assessment",
  "/api",
];

function isAllowedPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return !BLOCKED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function readMarketingConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem("metaortho-cookie-consent");
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { marketing?: boolean };
    return Boolean(parsed.marketing);
  } catch {
    return false;
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const [marketingConsented, setMarketingConsented] = useState(false);

  useEffect(() => {
    setMarketingConsented(readMarketingConsent());
    function onChange() {
      setMarketingConsented(readMarketingConsent());
    }
    window.addEventListener("metaortho:consent-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("metaortho:consent-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!isAllowedPath(pathname)) return null;
  if (!marketingConsented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_TAG_ID}');`}
      </Script>
    </>
  );
}
