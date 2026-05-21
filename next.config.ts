import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project directory. Without this, Next.js
  // infers the root from the nearest lockfile and was selecting a parent
  // directory because stray package-lock.json files exist above the repo
  // (~/package-lock.json and ~/Mission Control/package-lock.json). Pinning it
  // keeps Turbopack file tracing and module resolution scoped to this app.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/legal/terms-of-service",
        permanent: true,
      },
      {
        source: "/hipaa",
        destination: "/legal/notice-of-privacy-practices",
        permanent: true,
      },
      // Welcome-series emails (E1, E2, E3) link to /quiz as the "free 5-minute
      // risk quiz" CTA, but the live route is /assessment. Permanent redirect
      // future-proofs the link.
      {
        source: "/quiz",
        destination: "/assessment",
        permanent: true,
      },
      // Old "pharmacy-partners" slug implied a commercial relationship that
      // doesn't exist; the page is now /legal/pharmacy-selection with a
      // patient-directed framing.
      {
        source: "/legal/pharmacy-partners",
        destination: "/legal/pharmacy-selection",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
