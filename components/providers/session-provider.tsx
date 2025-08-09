"use client"

import React from "react"
import type { UserRole } from "@/lib/types"
import { useRouter } from "next/navigation"

type Subrole = "receiver" | "sender"

type MockUser = {
  id: string
  email: string
  password: string
  createdAt: string
}

type MockProfile = {
  id: string
  email: string
  full_name: string | null
  bio: string | null
  location: string | null
  skills: string[]
  hourly_rate: number | null
  experience_level: "entry" | "intermediate" | "senior" | "expert" | null
  portfolio_url: string | null
  linkedin_url: string | null
  github_url: string | null
  website: string | null
  avatar_url: string | null
  phone_number: string | null
  role: UserRole | null
  subrole: Subrole | null
  kyc_verified: boolean
  profile_completed: boolean
  total_earnings: number
  projects_completed: number
  client_rating: number
  created_at: string
  updated_at: string
}

type SessionState = {
  user: MockUser | null
  profile: MockProfile | null
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string; next?: string }>
  signup: (email: string, password: string) => Promise<{ ok: boolean; error?: string; next?: string }>
  logout: () => void
  setRoleAndSubrole: (role: UserRole, subrole: Subrole | null) => { ok: boolean; next: string }
  updateProfile: (patch: Partial<MockProfile>) => void
  completeKycAndProfile: () => { ok: boolean; next: string }
  getDashboardPath: (role?: UserRole | null, subrole?: Subrole | null) => string
}

const SessionContext = React.createContext<SessionState | null>(null)

const USERS_KEY = "leopay:users"
const PROFILES_KEY = "leopay:profiles"
const SESSION_KEY = "leopay:session"

function nowISO() {
  return new Date().toISOString()
}

function seedIfEmpty() {
  if (typeof window === "undefined") return
  const usersRaw = localStorage.getItem(USERS_KEY)
  const profilesRaw = localStorage.getItem(PROFILES_KEY)
  if (usersRaw && profilesRaw) return

  const users: MockUser[] = []
  const profiles: MockProfile[] = []

  const add = (
    u: Omit<MockUser, "createdAt"> & { createdAt?: string },
    p: Omit<MockProfile, "created_at" | "updated_at">,
  ) => {
    const user: MockUser = { ...u, createdAt: u.createdAt ?? nowISO() }
    const profile: MockProfile = {
      ...p,
      created_at: nowISO(),
      updated_at: nowISO(),
    }
    users.push(user)
    profiles.push(profile)
  }

  // Demo user 1 - needs onboarding
  add(
    { id: "demo-user-1", email: "demo@leopay.app", password: "password" },
    {
      id: "demo-user-1",
      email: "demo@leopay.app",
      full_name: "Alex Johnson",
      bio: "Full-stack developer exploring LeoPay.",
      location: "Remote",
      skills: ["JavaScript", "React", "Next.js"],
      hourly_rate: 85,
      experience_level: "senior",
      portfolio_url: "https://alex.dev",
      linkedin_url: "",
      github_url: "",
      website: "",
      avatar_url: "",
      phone_number: "",
      role: null,
      subrole: null,
      kyc_verified: false,
      profile_completed: false,
      total_earnings: 45000,
      projects_completed: 28,
      client_rating: 5,
    },
  )

  // Demo user 2 - employee (receiver)
  add(
    { id: "demo-user-2", email: "business@leopay.app", password: "password" },
    {
      id: "demo-user-2",
      email: "business@leopay.app",
      full_name: "Sarah Chen",
      bio: "Operations at TechStart",
      location: "New York, NY",
      skills: [],
      hourly_rate: null,
      experience_level: "expert",
      portfolio_url: "https://techstart.com",
      linkedin_url: "https://linkedin.com/in/sarahchen",
      github_url: "",
      website: "https://techstart.com",
      avatar_url: "",
      phone_number: "",
      role: "employee",
      subrole: "receiver",
      kyc_verified: true,
      profile_completed: true,
      total_earnings: 0,
      projects_completed: 0,
      client_rating: 0,
    },
  )

  // Demo user 3 - contractor (sender)
  add(
    { id: "demo-user-3", email: "contractor@leopay.app", password: "password" },
    {
      id: "demo-user-3",
      email: "contractor@leopay.app",
      full_name: "Mike Rodriguez",
      bio: "Independent contractor specializing in mobile apps.",
      location: "Austin, TX",
      skills: ["React Native", "Flutter"],
      hourly_rate: 75,
      experience_level: "intermediate",
      portfolio_url: "",
      linkedin_url: "",
      github_url: "https://github.com/mike",
      website: "",
      avatar_url: "",
      phone_number: "",
      role: "freelancer",
      subrole: "sender",
      kyc_verified: true,
      profile_completed: true,
      total_earnings: 32000,
      projects_completed: 15,
      client_rating: 4.7,
    },
  )

  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
}

function getDashboardPath(role?: UserRole | null, subrole?: Subrole | null) {
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

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [users, setUsers] = React.useState<MockUser[]>([])
  const [profiles, setProfiles] = React.useState<MockProfile[]>([])
  const [userId, setUserId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    seedIfEmpty()
    const u = localStorage.getItem(USERS_KEY)
    const p = localStorage.getItem(PROFILES_KEY)
    const s = localStorage.getItem(SESSION_KEY)
    setUsers(u ? JSON.parse(u) : [])
    setProfiles(p ? JSON.parse(p) : [])
    setUserId(s || null)
  }, [])

  const persist = React.useCallback((nextUsers: MockUser[], nextProfiles: MockProfile[]) => {
    setUsers(nextUsers)
    setProfiles(nextProfiles)
    if (typeof window !== "undefined") {
      localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers))
      localStorage.setItem(PROFILES_KEY, JSON.stringify(nextProfiles))
    }
  }, [])

  const currentUser = React.useMemo(() => users.find((u) => u.id === userId) || null, [users, userId])
  const currentProfile = React.useMemo(() => profiles.find((p) => p.id === userId) || null, [profiles, userId])

  const login = React.useCallback(
    async (email: string, password: string) => {
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
      if (!user) return { ok: false, error: "Invalid email or password" }
      setUserId(user.id)
      if (typeof window !== "undefined") localStorage.setItem(SESSION_KEY, user.id)
      // route next
      const profile = profiles.find((p) => p.id === user.id) || null
      if (!profile?.role) return { ok: true, next: "/onboarding/role-selection" }
      if (
        profile.role === "freelancer" &&
        profile.subrole === "receiver" &&
        (!profile.profile_completed || !profile.kyc_verified)
      ) {
        return { ok: true, next: "/profile/complete" }
      }
      return { ok: true, next: getDashboardPath(profile.role, profile.subrole) }
    },
    [users, profiles],
  )

  const signup = React.useCallback(
    async (email: string, password: string) => {
      if (!email || !password) return { ok: false, error: "Email and password are required." }
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
        return { ok: false, error: "Email is already registered." }

      const id = crypto.randomUUID()
      const user: MockUser = { id, email, password, createdAt: nowISO() }
      const profile: MockProfile = {
        id,
        email,
        full_name: null,
        bio: null,
        location: null,
        skills: [],
        hourly_rate: null,
        experience_level: null,
        portfolio_url: null,
        linkedin_url: "",
        github_url: "",
        website: "",
        avatar_url: "",
        phone_number: "",
        role: null,
        subrole: null,
        kyc_verified: false,
        profile_completed: false,
        total_earnings: 0,
        projects_completed: 0,
        client_rating: 0,
        created_at: nowISO(),
        updated_at: nowISO(),
      }
      const nextUsers = [...users, user]
      const nextProfiles = [...profiles, profile]
      persist(nextUsers, nextProfiles)
      setUserId(id)
      if (typeof window !== "undefined") localStorage.setItem(SESSION_KEY, id)
      return { ok: true, next: "/onboarding/role-selection" }
    },
    [users, profiles, persist],
  )

  const logout = React.useCallback(() => {
    setUserId(null)
    if (typeof window !== "undefined") localStorage.removeItem(SESSION_KEY)
    router.push("/auth")
  }, [router])

  const setRoleAndSubrole = React.useCallback(
    (role: UserRole, subrole: Subrole | null) => {
      if (!userId) return { ok: false, next: "/auth" }
      const idx = profiles.findIndex((p) => p.id === userId)
      if (idx === -1) return { ok: false, next: "/auth" }

      // normalize
      let finalSubrole: Subrole | null = subrole
      if (role === "employee") finalSubrole = "receiver"
      if (role === "employer") finalSubrole = "sender"

      const requiresKyc = role === "freelancer" && finalSubrole === "receiver"
      const updated: MockProfile = {
        ...profiles[idx],
        role,
        subrole: finalSubrole,
        profile_completed: requiresKyc ? false : true,
        kyc_verified: requiresKyc ? false : true,
        updated_at: nowISO(),
      }
      const nextProfiles = [...profiles]
      nextProfiles[idx] = updated
      persist(users, nextProfiles)

      if (requiresKyc) {
        return { ok: true, next: "/profile/complete" }
      }
      return { ok: true, next: getDashboardPath(role, finalSubrole) }
    },
    [userId, profiles, users, persist],
  )

  const updateProfile = React.useCallback(
    (patch: Partial<MockProfile>) => {
      if (!userId) return
      const idx = profiles.findIndex((p) => p.id === userId)
      if (idx === -1) return
      const merged: MockProfile = { ...profiles[idx], ...patch, updated_at: nowISO() }
      const nextProfiles = [...profiles]
      nextProfiles[idx] = merged
      persist(users, nextProfiles)
    },
    [userId, profiles, users, persist],
  )

  const completeKycAndProfile = React.useCallback(() => {
    if (!userId) return { ok: false, next: "/auth" }
    const idx = profiles.findIndex((p) => p.id === userId)
    if (idx === -1) return { ok: false, next: "/auth" }
    const updated: MockProfile = {
      ...profiles[idx],
      kyc_verified: true,
      profile_completed: true,
      updated_at: nowISO(),
    }
    const nextProfiles = [...profiles]
    nextProfiles[idx] = updated
    persist(users, nextProfiles)
    return { ok: true, next: getDashboardPath(updated.role, updated.subrole) }
  }, [userId, profiles, users, persist])

  const value: SessionState = {
    user: currentUser,
    profile: currentProfile,
    login,
    signup,
    logout,
    setRoleAndSubrole,
    updateProfile,
    completeKycAndProfile,
    getDashboardPath,
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = React.useContext(SessionContext)
  if (!ctx) throw new Error("useSession must be used within SessionProvider")
  return ctx
}
