// Central launch-state + offer configuration for the MetaOrtho site.
//
// This is the single source of truth for launch mode, the service-state
// footprint, consult pricing, and the booking destination. UI surfaces,
// emails, and route metadata import from here so a price or mode change
// touches exactly one file. Licensure lives in ./states (the canonical
// source); this config re-derives the served states from it.

import { LICENSED_STATES } from "./states";

export type LaunchMode =
  | "waitlist"
  | "assessment"
  | "booking_limited"
  | "full_launch";

export type BookingProvider = "healthie" | "stripe" | "waitlist";

export const BRAND_NAME = "MetaOrtho";

// --- Pricing -------------------------------------------------------------
// Change a consult price here and every surface (pages, CTAs, emails,
// metadata) updates. Keep raw "$400"/"$200" string literals out of the
// rest of the codebase — import these instead.

export const INITIAL_CONSULT_PRICE = 400;
export const FOLLOW_UP_PRICE = 200;

export function formatPrice(amount: number): string {
  return `$${amount}`;
}

export const INITIAL_CONSULT_PRICE_LABEL = formatPrice(INITIAL_CONSULT_PRICE);
export const FOLLOW_UP_PRICE_LABEL = formatPrice(FOLLOW_UP_PRICE);

// Copy fragments reused verbatim across CTAs and marketing surfaces.
export const CONSULT_PRICE_SUMMARY = `${INITIAL_CONSULT_PRICE_LABEL} initial · ${FOLLOW_UP_PRICE_LABEL} follow-up`;
export const BOOK_CONSULT_LABEL = `Book a ${INITIAL_CONSULT_PRICE_LABEL} consult`;
export const BOOK_CONSULT_SPECIALTY_LABEL = `Book a ${INITIAL_CONSULT_PRICE_LABEL} specialty consult`;

// --- Booking destination -------------------------------------------------
// Wire NEXT_PUBLIC_BOOKING_URL to the Healthie scheduling URL once live;
// until then booking CTAs fall back to the /book consult-request page.

export const HEALTHIE_BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
export const BOOKING_URL = HEALTHIE_BOOKING_URL || "/book";

export interface SiteConfig {
  brandName: string;
  mode: LaunchMode;
  serviceStates: string[];
  initialConsultPrice: number;
  followUpPrice: number;
  bookingProvider: BookingProvider;
  healthieBookingUrl: string;
  showPortalPrototype: boolean;
}

export const siteConfig: SiteConfig = {
  brandName: BRAND_NAME,
  // Phase 1: free GLP-1 Management Profile + cash-pay specialty consult,
  // booking gated to states where a clinician is licensed (see ./states).
  mode: "assessment",
  serviceStates: LICENSED_STATES.map((s) => s.code),
  initialConsultPrice: INITIAL_CONSULT_PRICE,
  followUpPrice: FOLLOW_UP_PRICE,
  bookingProvider: HEALTHIE_BOOKING_URL ? "healthie" : "waitlist",
  healthieBookingUrl: HEALTHIE_BOOKING_URL,
  // Portal pages are hard-coded design prototypes. Outside production they
  // may be shown for demos; production must not present them as real records.
  showPortalPrototype: process.env.NODE_ENV !== "production",
};
