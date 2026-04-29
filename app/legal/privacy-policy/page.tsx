import type { Metadata } from "next";
import PrivacyContent from "@/app/privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MetaOrtho collects, uses, and protects your personal information. Includes state privacy law disclosures.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
