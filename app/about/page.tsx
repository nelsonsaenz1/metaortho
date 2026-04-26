import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Dr. Jay M. Saenz, MD",
  description:
    "Meet the board-certified orthopedic surgeon leading MetaOrtho. Dr. Saenz specializes in musculoskeletal care for GLP-1 weight loss patients.",
};

export default function AboutPage() {
  return <AboutContent />;
}
