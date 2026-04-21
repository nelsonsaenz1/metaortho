/**
 * Supabase SSR server client — cookie-based auth for Server Components.
 *
 * Uses the ANON key. Row Level Security policies decide what the current
 * user can see/do. Safe to use for rendering authenticated pages.
 *
 * Do NOT use this to write to the waitlist table — RLS blocks anon writes.
 * For privileged server-side writes (inserts that bypass RLS), use
 * `lib/supabase/server.ts` instead, which returns a service-role client.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = (
  cookieStore: Awaited<ReturnType<typeof cookies>>,
) => {
  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
};
