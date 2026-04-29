// Canonical source of truth for MetaOrtho state licensure.
// All UI surfaces (state selector, footer counter, /legal/licensed-states,
// intake gating) read from this file. To change the licensure footprint,
// edit this file only.
//
// As of 2026-04-29, only Tennessee is documented as actively licensed.
// Every other state is marked "pending" — these represent the intended
// expansion footprint, not active licensure. Move a state to "licensed"
// only when (a) the practice has the active license number on file and
// (b) operations has confirmed the license is current. The /about/medical-team
// page must add the per-state license number for any state moved to
// "licensed" before that change is published.

export type StateStatus = "licensed" | "pending" | "not-served";

export type StateEntry = {
  code: string;
  name: string;
  status: StateStatus;
};

export const STATES: StateEntry[] = [
  { code: "AL", name: "Alabama", status: "pending" },
  { code: "AK", name: "Alaska", status: "pending" },
  { code: "AZ", name: "Arizona", status: "pending" },
  { code: "AR", name: "Arkansas", status: "pending" },
  { code: "CA", name: "California", status: "pending" },
  { code: "CO", name: "Colorado", status: "pending" },
  { code: "CT", name: "Connecticut", status: "pending" },
  { code: "DE", name: "Delaware", status: "pending" },
  { code: "DC", name: "District of Columbia", status: "pending" },
  { code: "FL", name: "Florida", status: "pending" },
  { code: "GA", name: "Georgia", status: "pending" },
  { code: "HI", name: "Hawaii", status: "pending" },
  { code: "ID", name: "Idaho", status: "pending" },
  { code: "IL", name: "Illinois", status: "pending" },
  { code: "IN", name: "Indiana", status: "pending" },
  { code: "IA", name: "Iowa", status: "pending" },
  { code: "KS", name: "Kansas", status: "pending" },
  { code: "KY", name: "Kentucky", status: "pending" },
  { code: "LA", name: "Louisiana", status: "pending" },
  { code: "ME", name: "Maine", status: "pending" },
  { code: "MD", name: "Maryland", status: "pending" },
  { code: "MA", name: "Massachusetts", status: "pending" },
  { code: "MI", name: "Michigan", status: "pending" },
  { code: "MN", name: "Minnesota", status: "pending" },
  { code: "MS", name: "Mississippi", status: "pending" },
  { code: "MO", name: "Missouri", status: "pending" },
  { code: "MT", name: "Montana", status: "pending" },
  { code: "NE", name: "Nebraska", status: "pending" },
  { code: "NV", name: "Nevada", status: "pending" },
  { code: "NH", name: "New Hampshire", status: "pending" },
  { code: "NJ", name: "New Jersey", status: "pending" },
  { code: "NM", name: "New Mexico", status: "pending" },
  { code: "NY", name: "New York", status: "pending" },
  { code: "NC", name: "North Carolina", status: "pending" },
  { code: "ND", name: "North Dakota", status: "pending" },
  { code: "OH", name: "Ohio", status: "pending" },
  { code: "OK", name: "Oklahoma", status: "pending" },
  { code: "OR", name: "Oregon", status: "pending" },
  { code: "PA", name: "Pennsylvania", status: "pending" },
  { code: "RI", name: "Rhode Island", status: "pending" },
  { code: "SC", name: "South Carolina", status: "pending" },
  { code: "SD", name: "South Dakota", status: "pending" },
  { code: "TN", name: "Tennessee", status: "licensed" },
  { code: "TX", name: "Texas", status: "pending" },
  { code: "UT", name: "Utah", status: "pending" },
  { code: "VT", name: "Vermont", status: "pending" },
  { code: "VA", name: "Virginia", status: "pending" },
  { code: "WA", name: "Washington", status: "pending" },
  { code: "WV", name: "West Virginia", status: "pending" },
  { code: "WI", name: "Wisconsin", status: "pending" },
  { code: "WY", name: "Wyoming", status: "pending" },
];

export const LICENSED_STATES = STATES.filter((s) => s.status === "licensed");
export const PENDING_STATES = STATES.filter((s) => s.status === "pending");

export const LICENSED_COUNT = LICENSED_STATES.length;

export function licensedStatesCopy(): string {
  return `${LICENSED_COUNT} U.S. ${LICENSED_COUNT === 1 ? "state" : "states"}`;
}

export function isLicensed(code: string): boolean {
  return LICENSED_STATES.some((s) => s.code === code.toUpperCase());
}

export function getStateByCode(code: string): StateEntry | undefined {
  return STATES.find((s) => s.code === code.toUpperCase());
}
