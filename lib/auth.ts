import { supabase } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export interface AuthUser extends User {
  user_metadata: {
    role?: "freelancer" | "employee"
    user_type?: "contractor" | "employer" | "dao" | "employee"
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user as AuthUser
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export function getUserRole(user: AuthUser | null): "freelancer" | "employee" | null {
  return user?.user_metadata?.role || null
}

export function getUserType(user: AuthUser | null): string | null {
  return user?.user_metadata?.user_type || null
}

export function getRedirectPath(user: AuthUser | null): string {
  if (!user) return "/auth"

  const role = getUserRole(user)
  const userType = getUserType(user)

  if (role === "employee") {
    if (userType === "employer") return "/payroll/employer"
    if (userType === "dao") return "/payroll/dao"
    return "/payroll/employee"
  }

  if (role === "freelancer") {
    if (userType === "contractor") return "/payroll/contractor"
    return "/dashboard"
  }

  return "/dashboard"
}
