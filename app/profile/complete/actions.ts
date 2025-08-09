"use server"

import { redirect } from "next/navigation"
import { mockDb } from "@/lib/mock/db"
import { getSessionUserId } from "@/lib/mock/session"

export type CompleteProfileResult = { ok: boolean; error?: string; next?: string }

export async function completeFreelancerProfile(
  _prev: CompleteProfileResult | undefined,
  formData: FormData,
): Promise<CompleteProfileResult> {
  const userId = getSessionUserId()
  if (!userId) return { ok: false, error: "NOT_AUTHENTICATED" }

  const full_name = String(formData.get("full_name") || "")
  const bio = String(formData.get("bio") || "")
  const location = String(formData.get("location") || "")
  const skills = String(formData.get("skills") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const hourly_rate = Number(formData.get("hourly_rate") || 0) || null
  const experience_level = String(formData.get("experience_level") || "") || null
  const portfolio_url = String(formData.get("portfolio_url") || "") || null
  const linkedin_url = String(formData.get("linkedin_url") || "") || null
  const github_url = String(formData.get("github_url") || "") || null

  if (!full_name || !bio || skills.length === 0) {
    return { ok: false, error: "MISSING_FIELDS" }
  }

  try {
    mockDb.upsertProfile(userId, {
      full_name,
      bio,
      location: location || null,
      skills,
      hourly_rate,
      experience_level: experience_level as any,
      portfolio_url,
      linkedin_url,
      github_url,
      profile_completed: true,
    })

    return { ok: true, next: "/profile/complete?step=kyc" }
  } catch (error) {
    console.error("Error completing profile:", error)
    return { ok: false, error: "Failed to save profile" }
  }
}

export async function completeFreelancerKyc(_prev: any, formData: FormData) {
  const userId = getSessionUserId()
  if (!userId) return { ok: false, message: "NOT_AUTHENTICATED" }

  try {
    mockDb.upsertProfile(userId, { kyc_verified: true })
    return { ok: true, message: "KYC complete" }
  } catch (error) {
    console.error("Error completing KYC:", error)
    return { ok: false, message: "Failed to complete KYC" }
  }
}

export async function completeKyc(_prev: { ok: boolean; message: string }, _formData: FormData) {
  const userId = getSessionUserId()
  if (!userId) return { ok: false, message: "NOT_AUTHENTICATED" }

  try {
    mockDb.upsertProfile(userId, { kyc_verified: true })
    // Redirect after successful KYC
    redirect("/dashboard/freelancer/receiver")
  } catch (error) {
    console.error("Error completing KYC:", error)
    return { ok: false, message: "Failed to complete verification" }
  }
}
