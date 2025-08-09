import "server-only"
import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Service role client for privileged operations (server only)
export const supabaseAdmin = createSupabaseAdmin(supabaseUrl, supabaseServiceKey)

/**
 * Creates a Supabase server client bound to Next.js cookies so that auth state
 * is available to server actions, route handlers, and middleware.
 */
export function createSupabaseServer() {
  const cookieStore = cookies()
  return createServerClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}
