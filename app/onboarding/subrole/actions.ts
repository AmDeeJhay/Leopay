'use server'

import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export type SetSubroleResult = { ok: boolean; error?: string; next?: string }

export async function setUserSubrole(_prev: SetSubroleResult | undefined, formData: FormData): Promise<SetSubroleResult> {
  const subrole = String(formData.get("subrole") || "")
  if (!subrole || !["receiver","sender"].includes(subrole)) return { ok: false, error: "Please select a valid subrole." }

  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (n) => cookieStore.get(n)?.value,
        set: (n, v, o) => cookieStore.set({ name: n, value: v, ...o }),
        remove: (n, o) => cookieStore.set({ name: n, value: "", ...o }),
      },
    }
  )

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return { ok: false, error: "NOT_AUTHENTICATED" }

  // Read current role
  const { data: profile, error: profErr } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profErr || !profile?.role) return { ok: false, error: "Please select a role first." }

  const role = profile.role as string

  // Compute gating for freelancer receiver only
  const requiresKyc = role === "freelancer" && subrole === "receiver"

  const { error: updateErr } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      role,
      subrole,
      profile_completed: requiresKyc ? false : true,
      kyc_verified: requiresKyc ? false : true,
      updated_at: new Date().toISOString(),
    })

  if (updateErr) {
    console.error("setUserSubrole updateErr:", updateErr)
    return { ok: false, error: "Failed to save subrole." }
  }

  if (requiresKyc) {
    return { ok: true, next: "/profile/complete" }
  }

  // Route to dashboards
  switch (role) {
    case "freelancer":
      return { ok: true, next: subrole === "sender" ? "/dashboard/freelancer/sender" : "/dashboard/freelancer/receiver" }
    case "contractor":
      return { ok: true, next: subrole === "sender" ? "/dashboard/contractor/sender" : "/dashboard/contractor/receiver" }
    case "employee":
      return { ok: true, next: "/dashboard/employee/receiver" }
    case "employer":
      return { ok: true, next: "/dashboard/employer/sender" }
    case "dao":
      return { ok: true, next: subrole === "sender" ? "/dashboard/dao/admin" : "/dashboard/dao/contributor" }
    default:
      return { ok: true, next: "/dashboard" }
  }
}
