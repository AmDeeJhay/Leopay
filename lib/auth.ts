export interface AuthUser {
  id: string
  email: string
  role: "freelancer" | "employee" | null
  user_metadata?: {
    role?: "freelancer" | "employee"
    user_type?: "contractor" | "employer" | "dao" | "employee"
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const res = await fetch("/api/auth/me", { cache: "no-store" })
    const data = await res.json()
    if (!data?.user) return null
    return data.user as AuthUser
  } catch {
    return null
  }
}

export async function signOut() {
  try {
    await fetch("/api/auth/logout", { method: "POST" })
    // Redirect to home page after logout
    window.location.href = "/"
  } catch (error) {
    console.error("Sign out error:", error)
  }
}

export function getUserRole(user: AuthUser | null): "freelancer" | "employee" | null {
  return user?.role ?? null
}

export function getUserType(_user: AuthUser | null): string | null {
  // User type is decided by profile.role/subrole and email heuristics in the UI
  return null
}

export function getRedirectPath(user: AuthUser | null): string {
  if (!user) return "/auth"
  return "/dashboard"
}
