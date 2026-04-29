import type { Metadata } from "next";
import HIPAAContent from "@/app/hipaa/HIPAAContent";

export const metadata: Metadata = {
  title: "Notice of Privacy Practices",
  description:
    "How MetaOrtho may use and disclose your protected health information under HIPAA, your rights, and our duties.",
};

export default function NoticeOfPrivacyPracticesPage() {
  return <HIPAAContent />;
}
