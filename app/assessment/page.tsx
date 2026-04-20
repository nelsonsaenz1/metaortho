import type { Metadata } from "next";
import AssessmentPage from "./AssessmentPage";

export const metadata: Metadata = {
  title: "GLP-1 MSK Risk Assessment",
  description:
    "Free quiz: Are your bones and muscles at risk from GLP-1 weight loss drugs? Take a 2-minute assessment to find out. From MetaOrtho, led by a board-certified orthopedic surgeon.",
};

export default function Assessment() {
  return <AssessmentPage />;
}
