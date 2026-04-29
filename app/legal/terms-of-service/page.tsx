import type { Metadata } from "next";
import TermsContent from "@/app/terms/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of MetaOrtho services, telehealth visits, and the patient portal.",
};

export default function TermsOfServicePage() {
  return <TermsContent />;
}
