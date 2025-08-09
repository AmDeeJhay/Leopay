"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ModernRoleSelection } from "@/components/onboarding/modern-role-selection"
import { useSession } from "@/components/providers/session-provider"

export default function RoleSelectionPage() {
  const { ready, user, profile } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!ready) return
    if (!user) {
      router.replace("/auth?next=/onboarding/role-selection")
    }
  }, [ready, user, router])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4">
      <ModernRoleSelection />
    </main>
  )
}
