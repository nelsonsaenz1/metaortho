import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://metaortho.com";
  const now = new Date();

  const blogPosts = getAllSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const marketing = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/home`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/about/medical-team`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/about/contact`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/pricing`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/faq`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/book`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/assessment`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
  ].map((p) => ({ ...p, lastModified: now }));

  const legal = [
    `${base}/legal/privacy-policy`,
    `${base}/legal/notice-of-privacy-practices`,
    `${base}/legal/terms-of-service`,
    `${base}/legal/telehealth-informed-consent`,
    `${base}/legal/licensed-states`,
    `${base}/legal/pharmacy-partners`,
    `${base}/legal/sources`,
    `${base}/legal/affiliate-disclosure`,
    `${base}/legal/refund-policy`,
    `${base}/legal/accessibility-statement`,
    `${base}/legal/grievances`,
    `${base}/legal/cookie-policy`,
  ].map((url) => ({
    url,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  return [...marketing, ...legal, ...blogPosts];
}
