"use server"

import { redirect } from "next/navigation"
import { createSupabaseServer } from "@/lib/supabase/server"

type Subrole = "receiver" | "sender"

function normalizeSubrole(role: string, raw: string | null): Subrole {
  // Employee is always receiver; Employer is always sender
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

/**
 * Server Action: Persist role and subrole, then redirect server-side.
 * If the user is unauthenticated, redirect to /auth preserving selections.
 */
export async function setRoleAndSubrole(formData: FormData) {
  const role = String(formData.get("role") || "").toLowerCase()
  const subroleRaw = formData.get("subrole") ? String(formData.get("subrole")) : null

  if (!role) {
    // Back to selection with error (no role)
    redirect(`/onboarding/role-selection?error=${encodeURIComponent("Please select a role.")}`)
  }

  const supabase = createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no server-visible session, send to auth and preserve selection
  if (!user) {
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

  // Only freelancer receiver is gated by profile/KYC
  const requiresKyc = role === "freelancer" && subrole === "receiver"

  const payload: Record<string, any> = {
    id: user!.id,
    role,
    subrole,
    updated_at: new Date().toISOString(),
  }
  if (requiresKyc) {
    payload.profile_completed = false
    payload.kyc_verified = false
  }

  const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" })
  if (error) {
    redirect(
      `/onboarding/role-selection?role=${encodeURIComponent(role)}&subrole=${encodeURIComponent(
        subrole,
      )}&error=${encodeURIComponent("Failed to save selection. Please try again.")}`,
    )
  }

  if (requiresKyc) {
    redirect("/profile/complete")
  } else {
    redirect(dashboardPath(role, subrole))
  }
}
