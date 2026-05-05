import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "Our Physicians",
  description:
    "Meet the physicians who lead MetaOrtho — Dr. Jay M. Saenz (board-certified orthopedic surgeon) and Dr. Kashif Latif (board-certified endocrinologist).",
};

export default function AboutPage() {
  return <AboutContent />;
}
