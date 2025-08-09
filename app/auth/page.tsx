"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ModernAuthForm } from "@/components/auth/modern-auth-form"
import { useSession } from "@/components/providers/session-provider"

export default function AuthPage() {
  const router = useRouter()
  const sp = useSearchParams()
  const next = sp.get("next") || undefined
  const { user, profile } = useSession()

  // If already logged in, route away based on onboarding state
  useEffect(() => {
    if (!user) return
    if (!profile?.role) {
      router.replace("/onboarding/role-selection")
      return
    }
    if (
      profile.role === "freelancer" &&
      profile.subrole === "receiver" &&
      (!profile.profile_completed || !profile.kyc_verified)
    ) {
      router.replace("/profile/complete")
      return
    }
    router.replace(next || "/dashboard")
  }, [user, profile, router, next])

  return (
    <main className="min-h-[calc(100svh-0px)] flex items-center justify-center p-4">
      <ModernAuthForm />
    </main>
  )
}
