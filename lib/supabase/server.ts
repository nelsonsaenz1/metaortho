import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key.
 *
 * NEVER import this from client components. Service role bypasses Row Level
 * Security and must not be exposed to the browser.
 *
 * Returns null if env vars are missing, so API routes can degrade gracefully
 * and surface a clear misconfiguration error to logs.
 */
let cached: SupabaseClient | null = null;

export function getSupabaseServiceClient(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  cached = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cached;
}
