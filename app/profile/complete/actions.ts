"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export async function completeKyc(_: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => cookieStore.set({ name, value, ...options }),
        remove: (name, options) => cookieStore.set({ name, value: "", ...options }),
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/auth?next=${encodeURIComponent("/profile/complete")}`)
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      profile_completed: true,
      kyc_verified: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user!.id)

  if (error) {
    return { ok: false, message: error.message }
  }

  // After KYC, freelancer receiver goes to their dashboard
  redirect("/dashboard/freelancer/receiver")
}
