import type { Metadata } from "next";
import KashifLatifContent from "./KashifLatifContent";

export const metadata: Metadata = {
  title: "Dr. Kashif Latif, MD",
  description:
    "Board-certified endocrinologist with 24+ years of clinical experience and multi-year DEXA-scan research on GLP-1 effects. Endocrine Director at MetaOrtho.",
};

export default function KashifLatifPage() {
  return <KashifLatifContent />;
}
