import { cookies } from "next/headers"

const SESSION_COOKIE = "mock_session"

export function setSession(userId: string) {
  const cookieStore = cookies()
  cookieStore.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export function getSessionUserId(): string | null {
  const cookieStore = cookies()
  return cookieStore.get(SESSION_COOKIE)?.value || null
}

export function clearSession() {
  const cookieStore = cookies()
  cookieStore.delete(SESSION_COOKIE)
}
