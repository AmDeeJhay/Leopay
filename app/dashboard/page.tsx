"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/components/providers/session-provider"
import { RoleBasedSidebar } from "@/components/dashboard/role-based-sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { FreelancerDashboard } from "@/components/dashboard/freelancer-dashboard"
import { BusinessDashboard } from "@/components/dashboard/business-dashboard"
import type { UserRole, WalletStatus } from "@/lib/types"

export default function DashboardPage() {
  const router = useRouter()
  const { user, profile, getDashboardPath } = useSession()
  const [userRole, setUserRole] = useState<UserRole>("freelancer")
  const [userType, setUserType] = useState<string>("")
  const [walletStatus, setWalletStatus] = useState<WalletStatus>("not_connected")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.replace("/auth")
      return
    }
    // Ensure onboarding complete
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

    // Role handling
    if (profile.role) setUserRole(profile.role)
    // Simple heuristics mirroring previous logic based on email labels
    if (user.email?.includes("employer") || user.email?.includes("admin")) {
      setUserType("employer")
      router.replace("/payroll/employer")
      return
    } else if (user.email?.includes("dao")) {
      setUserType("dao")
      router.replace("/payroll/dao")
      return
    } else if (user.email?.includes("contractor")) {
      setUserType("contractor")
      router.replace("/payroll/contractor")
      return
    } else if (profile.role === "employee") {
      setUserType("employee")
      router.replace("/payroll/employee")
      return
    } else {
      setUserType("freelancer")
    }

    setLoading(false)
  }, [user, profile, router, getDashboardPath])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedSidebar userRole={userRole} userType={userType} />
      <div className="md:ml-64">
        <TopNavbar walletStatus={walletStatus} userName={profile?.full_name || "User"} />
        <main className="p-6">
          {userRole === "freelancer" ? (
            <FreelancerDashboard walletStatus={walletStatus} setWalletStatus={setWalletStatus} />
          ) : (
            <BusinessDashboard walletStatus={walletStatus} setWalletStatus={setWalletStatus} />
          )}
        </main>
      </div>
    </div>
  )
}
