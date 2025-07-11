"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { RoleBasedSidebar } from "@/components/dashboard/role-based-sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { FreelancerDashboard } from "@/components/dashboard/freelancer-dashboard"
import { BusinessDashboard } from "@/components/dashboard/business-dashboard"
import type { UserRole, WalletStatus } from "@/lib/types"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<UserRole>("freelancer")
  const [userType, setUserType] = useState<string>("")
  const [walletStatus, setWalletStatus] = useState<WalletStatus>("not_connected")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const user = await getCurrentUser()
        if (!user) {
          router.push("/auth")
          return
        }

        setUserRole(user.role)

        // Determine user type based on email or other factors
        if (user.email?.includes("employer") || user.email?.includes("admin")) {
          setUserType("employer")
          router.push("/payroll/employer")
          return
        } else if (user.email?.includes("dao")) {
          setUserType("dao")
          router.push("/payroll/dao")
          return
        } else if (user.email?.includes("contractor")) {
          setUserType("contractor")
          router.push("/payroll/contractor")
          return
        } else if (user.role === "employee") {
          setUserType("employee")
          router.push("/payroll/employee")
          return
        }

        // Default to freelancer dashboard
        setUserType("freelancer")
      } catch (error) {
        console.error("Error initializing user:", error)
        router.push("/auth")
      } finally {
        setLoading(false)
      }
    }

    initializeUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedSidebar userRole={userRole} userType={userType} />
      <div className="md:ml-64">
        <TopNavbar walletStatus={walletStatus} userName="Alex Johnson" />
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
