import type { Metadata } from "next";
import BookContent from "./BookContent";

export const metadata: Metadata = {
  title: "Book Your MSK Assessment",
  description:
    "Schedule your comprehensive musculoskeletal assessment with MetaOrtho. Virtual visits with a board-certified orthopedic surgeon. Available in 43 states.",
};

export default function BookPage() {
  return <BookContent />;
}
