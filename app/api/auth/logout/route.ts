import { NextResponse } from "next/server"
import { clearSession } from "@/lib/mock/session"

export async function POST() {
  try {
    clearSession()
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
