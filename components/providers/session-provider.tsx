"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

type Subrole = "receiver" | "sender" | "client" | "admin" | "contributor"

type MockUser = {
  id: string
  email: string
  password: string
  createdAt: string
}

type RoleData = {
  roleName: string
  subrole: string
  kycCompleted: boolean
  kycData: Record<string, any>
  profileCompleted: boolean
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
  roles: RoleData[] // Changed from single role to array of roles
  total_earnings: number
  projects_completed: number
  client_rating: number
  created_at: string
  updated_at: string
}

type SessionState = {
  ready: boolean
  user: MockUser | null
  profile: MockProfile | null
  currentRole: RoleData | null
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string; next?: string }>
  signup: (email: string, password: string) => Promise<{ ok: boolean; error?: string; next?: string }>
  logout: () => void
  selectRole: (roleName: string, subrole: string) => { ok: boolean; next: string; error?: string }
  addRole: (roleName: string, subrole: string) => { ok: boolean; next: string }
  updateProfile: (patch: Partial<MockProfile>) => void
  completeKycForCurrentRole: () => { ok: boolean; next: string }
  getDashboardPath: (roleName?: string, subrole?: string) => string
  getUserRoles: () => Array<{ role: string; subrole: string; href: string }>
}

const SessionContext = React.createContext<SessionState | null>(null)

const USERS_KEY = "leopay:users"
const PROFILES_KEY = "leopay:profiles"
const SESSION_KEY = "leopay:session"
const CURRENT_ROLE_KEY = "leopay:current_role"

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
      roles: [
        { roleName: "freelancer", subrole: "receiver", kycCompleted: true, kycData: {}, profileCompleted: true },
        { roleName: "contractor", subrole: "receiver", kycCompleted: true, kycData: {}, profileCompleted: true },
      ],
      total_earnings: 45000,
      projects_completed: 28,
      client_rating: 5,
    },
  )

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
      roles: [
        { roleName: "employer", subrole: "sender", kycCompleted: true, kycData: {}, profileCompleted: true },
        { roleName: "freelancer", subrole: "sender", kycCompleted: true, kycData: {}, profileCompleted: true },
      ],
      total_earnings: 0,
      projects_completed: 0,
      client_rating: 0,
    },
  )

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
      roles: [
        { roleName: "contractor", subrole: "receiver", kycCompleted: true, kycData: {}, profileCompleted: true },
        { roleName: "dao", subrole: "contributor", kycCompleted: true, kycData: {}, profileCompleted: true },
      ],
      total_earnings: 32000,
      projects_completed: 15,
      client_rating: 4.7,
    },
  )

  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
}

function getDashboardPath(roleName?: string, subrole?: string) {
  switch (roleName) {
    case "freelancer":
      return subrole === "sender" ? "/dashboard/freelancer/sender" : "/dashboard/freelancer/receiver"
    case "contractor":
      return subrole === "client" ? "/dashboard/contractor/client" : "/dashboard/contractor/receiver"
    case "employee":
      return "/dashboard/employee"
    case "employer":
      return "/dashboard/employer"
    case "dao":
      return subrole === "admin" ? "/dashboard/dao/admin" : "/dashboard/dao/contributor"
    default:
      return "/role-selection"
  }
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = React.useState(false)
  const [users, setUsers] = React.useState<MockUser[]>([])
  const [profiles, setProfiles] = React.useState<MockProfile[]>([])
  const [userId, setUserId] = React.useState<string | null>(null)
  const [currentRole, setCurrentRole] = React.useState<RoleData | null>(null)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    seedIfEmpty()
    const u = localStorage.getItem(USERS_KEY)
    const p = localStorage.getItem(PROFILES_KEY)
    const sessionId = localStorage.getItem(SESSION_KEY)
    const currentRoleData = localStorage.getItem(CURRENT_ROLE_KEY)

    setUsers(u ? JSON.parse(u) : [])
    setProfiles(p ? JSON.parse(p) : [])
    setUserId(sessionId)
    setCurrentRole(currentRoleData ? JSON.parse(currentRoleData) : null)
    setReady(true)
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

      const profile = profiles.find((p) => p.id === user.id) || null
      if (!profile || profile.roles.length === 0) {
        return { ok: true, next: "/role-selection" }
      }

      if (profile.roles.length > 1) {
        return { ok: true, next: "/role-selection" }
      }

      const role = profile.roles[0]
      setCurrentRole(role)
      if (typeof window !== "undefined") localStorage.setItem(CURRENT_ROLE_KEY, JSON.stringify(role))

      if (!role.kycCompleted || !role.profileCompleted) {
        return { ok: true, next: "/profile/complete" }
      }

      return { ok: true, next: getDashboardPath(role.roleName, role.subrole) }
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
        roles: [], // Start with empty roles array
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
      return { ok: true, next: "/role-selection" }
    },
    [users, profiles, persist],
  )

  const logout = React.useCallback(() => {
    setUserId(null)
    setCurrentRole(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY)
      localStorage.removeItem(CURRENT_ROLE_KEY)
    }
    router.push("/auth")
  }, [router])

  const selectRole = React.useCallback(
    (roleName: string, subrole: string) => {
      if (!userId || !currentProfile) return { ok: false, next: "/auth", error: "Not authenticated" }

      const existingRole = currentProfile.roles.find((r) => r.roleName === roleName && r.subrole === subrole)
      if (!existingRole) {
        return { ok: false, next: "/role-selection", error: "Role not found. Please add this role first." }
      }

      setCurrentRole(existingRole)
      if (typeof window !== "undefined") localStorage.setItem(CURRENT_ROLE_KEY, JSON.stringify(existingRole))

      if (!existingRole.kycCompleted || !existingRole.profileCompleted) {
        return { ok: true, next: "/profile/complete" }
      }

      return { ok: true, next: getDashboardPath(roleName, subrole) }
    },
    [userId, currentProfile],
  )

  const addRole = React.useCallback(
    (roleName: string, subrole: string) => {
      if (!userId) return { ok: false, next: "/auth" }
      const idx = profiles.findIndex((p) => p.id === userId)
      if (idx === -1) return { ok: false, next: "/auth" }

      const newRole: RoleData = {
        roleName,
        subrole,
        kycCompleted: false,
        kycData: {},
        profileCompleted: false,
      }

      const updated: MockProfile = {
        ...profiles[idx],
        roles: [...profiles[idx].roles, newRole],
        updated_at: nowISO(),
      }

      const nextProfiles = [...profiles]
      nextProfiles[idx] = updated
      persist(users, nextProfiles)

      setCurrentRole(newRole)
      if (typeof window !== "undefined") localStorage.setItem(CURRENT_ROLE_KEY, JSON.stringify(newRole))

      return { ok: true, next: "/profile/complete" }
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

  const completeKycForCurrentRole = React.useCallback(() => {
    if (!userId || !currentRole) return { ok: false, next: "/auth" }
    const idx = profiles.findIndex((p) => p.id === userId)
    if (idx === -1) return { ok: false, next: "/auth" }

    const updatedRoles = profiles[idx].roles.map((role) =>
      role.roleName === currentRole.roleName && role.subrole === currentRole.subrole
        ? { ...role, kycCompleted: true, profileCompleted: true }
        : role,
    )

    const updated: MockProfile = {
      ...profiles[idx],
      roles: updatedRoles,
      updated_at: nowISO(),
    }

    const nextProfiles = [...profiles]
    nextProfiles[idx] = updated
    persist(users, nextProfiles)

    const updatedCurrentRole = { ...currentRole, kycCompleted: true, profileCompleted: true }
    setCurrentRole(updatedCurrentRole)
    if (typeof window !== "undefined") localStorage.setItem(CURRENT_ROLE_KEY, JSON.stringify(updatedCurrentRole))

    return { ok: true, next: getDashboardPath(currentRole.roleName, currentRole.subrole) }
  }, [userId, currentRole, profiles, users, persist])

  const getUserRoles = React.useCallback(() => {
    if (!currentProfile || !currentProfile.roles) return []
    return currentProfile.roles.map((role) => ({
      role: role.roleName,
      subrole: role.subrole,
      href: getDashboardPath(role.roleName, role.subrole),
    }))
  }, [currentProfile])

  const value: SessionState = {
    ready,
    user: currentUser,
    profile: currentProfile,
    currentRole,
    login,
    signup,
    logout,
    selectRole,
    addRole,
    updateProfile,
    completeKycForCurrentRole,
    getDashboardPath,
    getUserRoles,
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = React.useContext(SessionContext)
  if (!ctx) throw new Error("useSession must be used within SessionProvider")
  return ctx
}
