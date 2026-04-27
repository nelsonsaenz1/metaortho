import type { Metadata } from "next";
import HIPAAContent from "./HIPAAContent";

export const metadata: Metadata = {
  title: "HIPAA Notice of Privacy Practices — MetaOrtho",
  description:
    "MetaOrtho's Notice of Privacy Practices under HIPAA, explaining how we use and disclose your protected health information.",
};

export default function HIPAAPage() {
  return <HIPAAContent />;
}
