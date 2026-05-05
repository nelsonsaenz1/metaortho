import { createHmac, timingSafeEqual } from "crypto";

// HMAC-SHA256(email) -> first 24 hex chars. The secret is the existing
// Supabase service-role key, which is always present in this app's env
// and never exposed to the client. This keeps the unsubscribe link
// guessable only by someone who already controls the server secret.
//
// CAN-SPAM only requires that the unsubscribe link be functional; this
// adds the protection that an outsider who knows or guesses an email
// address cannot unsubscribe that person.
function getSecret(): string {
  return (
    process.env.UNSUBSCRIBE_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  );
}

export function unsubscribeToken(email: string): string {
  const secret = getSecret();
  if (!secret) return "";
  return createHmac("sha256", secret)
    .update(email.trim().toLowerCase())
    .digest("hex")
    .slice(0, 24);
}

export function verifyUnsubscribeToken(
  email: string,
  presented: string,
): boolean {
  const expected = unsubscribeToken(email);
  if (!expected || !presented) return false;
  if (expected.length !== presented.length) return false;
  try {
    return timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(presented, "utf8"),
    );
  } catch {
    return false;
  }
}

export function unsubscribeUrl(email: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://metaortho.com";
  const token = unsubscribeToken(email);
  const params = new URLSearchParams({ email });
  if (token) params.set("token", token);
  return `${base}/api/waitlist/unsubscribe?${params.toString()}`;
}
