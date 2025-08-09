import { NextResponse } from "next/server"
import { getSessionUserId } from "@/lib/mock/session"
import { mockDb } from "@/lib/mock/db"

export async function GET() {
  try {
    const userId = getSessionUserId()
    if (!userId) {
      return NextResponse.json({ error: "NOT_AUTHENTICATED" }, { status: 401 })
    }

    const profile = mockDb.getProfile(userId)
    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const userId = getSessionUserId()
    if (!userId) {
      return NextResponse.json({ error: "NOT_AUTHENTICATED" }, { status: 401 })
    }

    const patch = await req.json()
    const updated = mockDb.upsertProfile(userId, patch)

    return NextResponse.json({ profile: updated })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
