"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ModernAuthForm } from "@/components/auth/modern-auth-form"
import { useSession } from "@/components/providers/session-provider"

export default function AuthPage() {
  const router = useRouter()
  const sp = useSearchParams()
  const next = sp.get("next") || undefined
  const { ready, user, profile, getDashboardPath } = useSession()

  // Only redirect after hydration and when we have a session.
  useEffect(() => {
    if (!ready) return
    if (!user || !profile) return
    if (!profile.role) {
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
    router.replace(next || getDashboardPath(profile.role, profile.subrole))
  }, [ready, user, profile, router, next, getDashboardPath])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <ModernAuthForm />
    </main>
  )
}
