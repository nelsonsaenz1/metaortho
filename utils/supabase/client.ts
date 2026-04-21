/**
 * Supabase SSR browser client — anon key, used from client components.
 *
 * Safe to expose: the anon key is public by design. All privilege
 * enforcement happens through Row Level Security policies on the
 * Supabase side.
 */

import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!);
