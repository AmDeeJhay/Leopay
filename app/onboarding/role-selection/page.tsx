"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { setRoleAndSubrole } from "./actions"
import ModernRoleSelection from "@/components/onboarding/modern-role-selection"
import { useSession } from "@/components/providers/session-provider"

const roles = [
  { value: "freelancer", label: "Freelancer", description: "Independent contractor offering services" },
  { value: "contractor", label: "Contractor", description: "Project-based work specialist" },
  { value: "employee", label: "Employee", description: "Full-time or part-time worker" },
  { value: "employer", label: "Employer", description: "Business hiring workers" },
  { value: "dao", label: "DAO", description: "Decentralized autonomous organization" },
] as const

const subroles = [
  { value: "receiver", label: "Receiver", description: "Receive payments for work" },
  { value: "sender", label: "Sender", description: "Send payments to others" },
] as const

export default function RoleSelectionPage() {
  const { user } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [role, setRole] = useState<string>(searchParams.get("role") || "")
  const [subrole, setSubrole] = useState<string>(searchParams.get("subrole") || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(searchParams.get("error") || "")

  useEffect(() => {
    if (!user) router.replace("/auth")
  }, [user, router])

  useEffect(() => {
    // Clear error when user makes changes
    if (error && (role || subrole)) {
      setError("")
    }
  }, [role, subrole, error])

  async function onSubmit() {
    setIsSubmitting(true)
    setError("")

    try {
      const fd = new FormData()
      fd.set("role", role)
      if (subrole) fd.set("subrole", subrole)

      // Server action will redirect
      await setRoleAndSubrole(fd)
    } catch (err: any) {
      setError(err.message || "An error occurred")
      setIsSubmitting(false)
    }
  }

  const subroleRequired = role === "freelancer" || role === "contractor" || role === "dao"
  const canSubmit = role && (!subroleRequired || subrole)

  return (
    <main className="min-h-[calc(100svh-0px)] p-4 flex items-center justify-center">
      <ModernRoleSelection />
    </main>
  )
}
