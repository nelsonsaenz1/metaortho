import type { Metadata } from "next";
import BookContent from "./BookContent";

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description:
    "MetaOrtho is opening soon. Join the waitlist to be first when we begin accepting new patients in your state. Telehealth MSK care from a board-certified orthopedic surgeon.",
};

export default function BookPage() {
  return <BookContent />;
}
