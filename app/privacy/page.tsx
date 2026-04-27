import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy — MetaOrtho",
  description:
    "How MetaOrtho collects, uses, and protects your personal and health information.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
