/**
 * Simple Supabase browser client.
 *
 * Note:
 * - For client-side usage, only NEXT_PUBLIC_* env vars can be read at runtime.
 * - If you also need a server-side Supabase client, create lib/supabase/server.ts
 *   and use SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY there.
 */

import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  (typeof window !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined) ||
  (process.env.NEXT_PUBLIC_SUPABASE_URL as string)

const supabaseAnonKey =
  (typeof window !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined) ||
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)

if (!supabaseUrl || !supabaseAnonKey) {
  // This warning helps identify env config issues without crashing the app
  console.warn(
    "Supabase client: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Client will be created with empty credentials.",
  )
}

/**
 * Named export required by deployment check:
 * - supabase as a named export
 */
export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "")
