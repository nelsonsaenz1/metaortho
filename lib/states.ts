// Canonical source of truth for MetaOrtho state licensure.
// All UI surfaces (state selector, footer counter, /legal/licensed-states,
// intake gating) read from this file. To change the licensure footprint,
// edit this file only.
//
// Operations note: as of 2026-04-29 the canonical count is pending
// formal verification with the compliance team. The list below mirrors
// the working coverage from the in-house licensure planning document.
// Before any publicly displayed count is treated as authoritative,
// confirm each state's active license status with operations.

export type StateStatus = "licensed" | "pending" | "not-served";

export type StateEntry = {
  code: string;
  name: string;
  status: StateStatus;
};

export const STATES: StateEntry[] = [
  { code: "AL", name: "Alabama", status: "licensed" },
  { code: "AK", name: "Alaska", status: "licensed" },
  { code: "AZ", name: "Arizona", status: "licensed" },
  { code: "AR", name: "Arkansas", status: "licensed" },
  { code: "CA", name: "California", status: "licensed" },
  { code: "CO", name: "Colorado", status: "licensed" },
  { code: "CT", name: "Connecticut", status: "licensed" },
  { code: "DE", name: "Delaware", status: "licensed" },
  { code: "DC", name: "District of Columbia", status: "pending" },
  { code: "FL", name: "Florida", status: "licensed" },
  { code: "GA", name: "Georgia", status: "licensed" },
  { code: "HI", name: "Hawaii", status: "licensed" },
  { code: "ID", name: "Idaho", status: "licensed" },
  { code: "IL", name: "Illinois", status: "licensed" },
  { code: "IN", name: "Indiana", status: "licensed" },
  { code: "IA", name: "Iowa", status: "licensed" },
  { code: "KS", name: "Kansas", status: "licensed" },
  { code: "KY", name: "Kentucky", status: "licensed" },
  { code: "LA", name: "Louisiana", status: "pending" },
  { code: "ME", name: "Maine", status: "licensed" },
  { code: "MD", name: "Maryland", status: "licensed" },
  { code: "MA", name: "Massachusetts", status: "licensed" },
  { code: "MI", name: "Michigan", status: "licensed" },
  { code: "MN", name: "Minnesota", status: "licensed" },
  { code: "MS", name: "Mississippi", status: "licensed" },
  { code: "MO", name: "Missouri", status: "licensed" },
  { code: "MT", name: "Montana", status: "licensed" },
  { code: "NE", name: "Nebraska", status: "licensed" },
  { code: "NV", name: "Nevada", status: "licensed" },
  { code: "NH", name: "New Hampshire", status: "licensed" },
  { code: "NJ", name: "New Jersey", status: "licensed" },
  { code: "NM", name: "New Mexico", status: "pending" },
  { code: "NY", name: "New York", status: "licensed" },
  { code: "NC", name: "North Carolina", status: "licensed" },
  { code: "ND", name: "North Dakota", status: "licensed" },
  { code: "OH", name: "Ohio", status: "licensed" },
  { code: "OK", name: "Oklahoma", status: "licensed" },
  { code: "OR", name: "Oregon", status: "licensed" },
  { code: "PA", name: "Pennsylvania", status: "licensed" },
  { code: "RI", name: "Rhode Island", status: "licensed" },
  { code: "SC", name: "South Carolina", status: "licensed" },
  { code: "SD", name: "South Dakota", status: "pending" },
  { code: "TN", name: "Tennessee", status: "licensed" },
  { code: "TX", name: "Texas", status: "licensed" },
  { code: "UT", name: "Utah", status: "licensed" },
  { code: "VT", name: "Vermont", status: "pending" },
  { code: "VA", name: "Virginia", status: "licensed" },
  { code: "WA", name: "Washington", status: "licensed" },
  { code: "WV", name: "West Virginia", status: "licensed" },
  { code: "WI", name: "Wisconsin", status: "licensed" },
  { code: "WY", name: "Wyoming", status: "licensed" },
];

export const LICENSED_STATES = STATES.filter((s) => s.status === "licensed");
export const PENDING_STATES = STATES.filter((s) => s.status === "pending");

export const LICENSED_COUNT = LICENSED_STATES.length;

export function isLicensed(code: string): boolean {
  return LICENSED_STATES.some((s) => s.code === code.toUpperCase());
}

export function getStateByCode(code: string): StateEntry | undefined {
  return STATES.find((s) => s.code === code.toUpperCase());
}
