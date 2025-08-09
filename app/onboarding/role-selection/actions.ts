"use server"

import { redirect } from "next/navigation"
import { getSessionUserId } from "@/lib/mock/session"
import { mockDb } from "@/lib/mock/db"

type Subrole = "receiver" | "sender"

function normalizeSubrole(role: string, raw: string | null): Subrole {
  if (role === "employee") return "receiver"
  if (role === "employer") return "sender"
  const s = (raw || "").toLowerCase()
  if (s === "receiver" || s === "sender") return s
  throw new Error("INVALID_SUBROLE")
}

function dashboardPath(role: string, subrole: Subrole) {
  switch (role) {
    case "freelancer":
      return `/dashboard/freelancer/${subrole === "receiver" ? "receiver" : "sender"}`
    case "contractor":
      return `/dashboard/contractor/${subrole === "receiver" ? "receiver" : "sender"}`
    case "employee":
      return `/dashboard/employee/receiver`
    case "employer":
      return `/dashboard/employer/sender`
    case "dao":
      return `/dashboard/dao/${subrole === "receiver" ? "contributor" : "admin"}`
    default:
      return "/dashboard"
  }
}

export async function setRoleAndSubrole(formData: FormData) {
  const role = String(formData.get("role") || "").toLowerCase()
  const subroleRaw = formData.get("subrole") ? String(formData.get("subrole")) : null

  if (!role) {
    redirect(`/onboarding/role-selection?error=${encodeURIComponent("Please select a role.")}`)
  }

  const userId = getSessionUserId()
  if (!userId) {
    const qs = new URLSearchParams()
    qs.set("role", role)
    if (subroleRaw) qs.set("subrole", subroleRaw)
    redirect(`/auth?next=${encodeURIComponent(`/onboarding/role-selection?${qs}`)}`)
  }

  let subrole: Subrole
  try {
    subrole = normalizeSubrole(role, subroleRaw)
  } catch {
    redirect(
      `/onboarding/role-selection?role=${encodeURIComponent(role)}&error=${encodeURIComponent(
        "Please choose a valid subrole.",
      )}`,
    )
  }

  const requiresKyc = role === "freelancer" && subrole === "receiver"

  try {
    mockDb.upsertProfile(userId!, {
      role: role as any,
      subrole,
      profile_completed: requiresKyc ? false : true,
      kyc_verified: requiresKyc ? false : true,
    })

    if (requiresKyc) {
      redirect("/profile/complete")
    } else {
      redirect(dashboardPath(role, subrole))
    }
  } catch (error) {
    console.error("Error setting role and subrole:", error)
    redirect(
      `/onboarding/role-selection?role=${encodeURIComponent(role)}&error=${encodeURIComponent(
        "Failed to save selection. Please try again.",
      )}`,
    )
  }
}
