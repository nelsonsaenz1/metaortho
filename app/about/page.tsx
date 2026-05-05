import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "Our Medical Team",
  description:
    "Meet the physicians behind MetaOrtho — Dr. Jay M. Saenz (board-certified orthopedic surgeon) and Dr. Kashif Latif (board-certified endocrinologist) — the team built around the multi-system reach of GLP-1 therapy.",
};

export default function AboutPage() {
  return <AboutContent />;
}
