import { NextResponse } from "next/server"
import { mockDb } from "@/lib/mock/db"
import { setSession } from "@/lib/mock/session"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const existing = mockDb.getUserByEmail(email)
    if (existing) {
      return NextResponse.json({ error: "User already exists. Please sign in." }, { status: 409 })
    }

    const user = mockDb.createUser(email, password)
    setSession(user.id)

    const profile = mockDb.getProfile(user.id)

    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, role: profile?.role ?? null },
      profile,
      next: "/onboarding/role-selection",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
