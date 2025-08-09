"use server"

import { mockDb } from "@/lib/mock/db"
import { getSessionUserId } from "@/lib/mock/session"

export type SetSubroleResult = { ok: boolean; error?: string; next?: string }

export async function setUserSubrole(
  _prev: SetSubroleResult | undefined,
  formData: FormData,
): Promise<SetSubroleResult> {
  const subrole = String(formData.get("subrole") || "")
  if (!subrole || !["receiver", "sender"].includes(subrole)) {
    return { ok: false, error: "Please select a valid subrole." }
  }

  const userId = getSessionUserId()
  if (!userId) return { ok: false, error: "NOT_AUTHENTICATED" }

  try {
    const profile = mockDb.getProfile(userId)
    if (!profile?.role) return { ok: false, error: "Please select a role first." }

    const requiresKyc = profile.role === "freelancer" && subrole === "receiver"

    mockDb.upsertProfile(userId, {
      subrole: subrole as any,
      profile_completed: requiresKyc ? false : true,
      kyc_verified: requiresKyc ? false : true,
    })

    if (requiresKyc) return { ok: true, next: "/profile/complete" }

    switch (profile.role) {
      case "freelancer":
        return {
          ok: true,
          next: subrole === "sender" ? "/dashboard/freelancer/sender" : "/dashboard/freelancer/receiver",
        }
      case "contractor":
        return {
          ok: true,
          next: subrole === "sender" ? "/dashboard/contractor/sender" : "/dashboard/contractor/receiver",
        }
      case "employee":
        return { ok: true, next: "/dashboard/employee/receiver" }
      case "employer":
        return { ok: true, next: "/dashboard/employer/sender" }
      case "dao":
        return { ok: true, next: subrole === "sender" ? "/dashboard/dao/admin" : "/dashboard/dao/contributor" }
      default:
        return { ok: true, next: "/dashboard" }
    }
  } catch (error) {
    console.error("Error setting subrole:", error)
    return { ok: false, error: "Failed to save subrole. Please try again." }
  }
}
