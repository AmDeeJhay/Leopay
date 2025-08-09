import { NextResponse } from "next/server"
import { getSessionUserId } from "@/lib/mock/session"
import { mockDb } from "@/lib/mock/db"

export async function GET() {
  try {
    const userId = getSessionUserId()
    if (!userId) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const user = mockDb.getUserById(userId)
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const profile = mockDb.getProfile(userId)

    return NextResponse.json({
      user: { id: user.id, email: user.email, role: profile?.role ?? null },
      profile,
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
