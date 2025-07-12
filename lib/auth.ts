import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export async function signUp(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function updateUserProfile(userId: string, updates: any) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...updates })
    .select()

  if (error) {
    throw error
  }

  return data
}
