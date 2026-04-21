/**
 * Simple in-memory per-IP rate limiter.
 *
 * MVP only. State is per Node process, so on Vercel (which runs many
 * serverless instances) this is best-effort — a determined attacker could
 * still exhaust different instances. For anything beyond MVP, swap to
 * Upstash Redis and keep this module's API the same.
 */

type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 60_000;
const LIMIT = 5;

// WeakRef would be ideal but Map is fine for MVP; memory stays small because
// we prune expired entries on each check.
const store = new Map<string, Bucket>();

export function checkRateLimit(ip: string): {
  ok: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const bucket = store.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    const fresh: Bucket = { count: 1, resetAt: now + WINDOW_MS };
    store.set(ip, fresh);
    pruneExpired(now);
    return { ok: true, remaining: LIMIT - 1, resetAt: fresh.resetAt };
  }

  if (bucket.count >= LIMIT) {
    return { ok: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { ok: true, remaining: LIMIT - bucket.count, resetAt: bucket.resetAt };
}

function pruneExpired(now: number) {
  if (store.size < 1000) return;
  for (const [key, bucket] of store) {
    if (bucket.resetAt <= now) store.delete(key);
  }
}

export const RATE_LIMIT_CONFIG = { WINDOW_MS, LIMIT } as const;
