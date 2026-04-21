/**
 * Supabase SSR middleware helper — keeps session cookies fresh on every
 * request. Intended for use from `proxy.ts` (Next.js 16 middleware).
 *
 * Not yet wired up to the project's proxy — will be needed when we
 * introduce real patient authentication in the portal.
 */

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const _supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Touch the client so the lint doesn't complain about unused vars.
  // When we wire up auth, call `await _supabase.auth.getUser()` here.
  void _supabase;

  return supabaseResponse;
};
