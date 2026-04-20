import { post as glp1MuscleLoss } from "./glp1-muscle-loss-what-you-need-to-know";
import { post as ozempicBoneDensity } from "./ozempic-bone-density-what-aaos-2026-found";
import { post as goutGlp1 } from "./gout-glp1-weight-loss-connection";

export const allPosts = [glp1MuscleLoss, ozempicBoneDensity, goutGlp1];

export function getPostBySlug(slug: string) {
  return allPosts.find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs() {
  return allPosts.map((p) => p.slug);
}
