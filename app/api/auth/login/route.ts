import { NextResponse } from "next/server"
import { mockDb } from "@/lib/mock/db"
import { setSession } from "@/lib/mock/session"
import type { UserRole } from "@/lib/types"

function mapDashboardPath(role?: string | null, subrole?: string | null) {
  switch (role) {
    case "freelancer":
      return subrole === "sender" ? "/dashboard/freelancer/sender" : "/dashboard/freelancer/receiver"
    case "contractor":
      return subrole === "sender" ? "/dashboard/contractor/sender" : "/dashboard/contractor/receiver"
    case "employee":
      return "/dashboard/employee/receiver"
    case "employer":
      return "/dashboard/employer/sender"
    case "dao":
      return subrole === "sender" ? "/dashboard/dao/admin" : "/dashboard/dao/contributor"
    default:
      return "/dashboard"
  }
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const user = mockDb.getUserByEmail(email)
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    setSession(user.id)

    const profile = mockDb.getProfile(user.id)

    // Determine next path (mimics previous behavior)
    let next = "/onboarding/role-selection"
    if (profile?.role) {
      if (
        profile.role === "freelancer" &&
        profile.subrole === "receiver" &&
        (!profile.profile_completed || !profile.kyc_verified)
      ) {
        next = "/profile/complete"
      } else {
        next = mapDashboardPath(profile.role as UserRole, profile?.subrole || null)
      }
    }

    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, role: profile?.role ?? null },
      profile,
      next,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
