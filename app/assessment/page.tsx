import type { Metadata } from "next";
import AssessmentPage from "./AssessmentPage";

export const metadata: Metadata = {
  title: "GLP-1 Management Profile",
  description:
    "Get your personalized GLP-1 Management Profile — a clinical-style assessment of candidacy, drug-and-dose context, side effects, and monitoring needs, including bone, muscle, and joint health. Built by an endocrinologist and an orthopedic surgeon at MetaOrtho.",
};

export default function Assessment() {
  return <AssessmentPage />;
}
