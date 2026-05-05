import type { Metadata } from "next";
import JaySaenzContent from "./JaySaenzContent";

export const metadata: Metadata = {
  title: "Dr. Jay M. Saenz, MD",
  description:
    "Board-certified orthopedic surgeon, founder, and Medical Director of MetaOrtho. UT–Campbell Clinic-trained, AAOS member, multi-state licensed.",
};

export default function JaySaenzPage() {
  return <JaySaenzContent />;
}
