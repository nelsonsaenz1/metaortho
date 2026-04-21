/**
 * Parse standard UTM parameters out of a URL string.
 *
 * Used on the server to pull UTMs from the Referer header, so attribution
 * survives even if the client-side form doesn't forward them in the payload.
 */

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Utms = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

export function emptyUtms(): Utms {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
  };
}

export function parseUtmsFromUrl(urlOrSearch: string | null | undefined): Utms {
  const out = emptyUtms();
  if (!urlOrSearch) return out;

  try {
    // Accept either a full URL or a raw search string like "?utm_source=x"
    const search = urlOrSearch.includes("?")
      ? new URL(urlOrSearch).search
      : urlOrSearch.startsWith("?")
        ? urlOrSearch
        : `?${urlOrSearch}`;

    const params = new URLSearchParams(search);
    for (const key of KEYS) {
      const v = params.get(key);
      if (v) out[key] = v.slice(0, 256); // cap length defensively
    }
  } catch {
    // Ignore malformed referer
  }

  return out;
}

/**
 * Extract the pathname portion of the referer (e.g. "/home"). Used as the
 * source_page fallback when the client didn't supply one.
 */
export function parsePathFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).pathname || null;
  } catch {
    return null;
  }
}
