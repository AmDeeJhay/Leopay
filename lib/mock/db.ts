import type { UserRole } from "@/lib/types"

export type Subrole = "receiver" | "sender"

export interface MockUser {
  id: string
  email: string
  password: string // plain for mock only
  createdAt: string
}

export interface MockProfile {
  id: string // user id
  email: string
  full_name: string | null
  bio: string | null
  location: string | null
  skills: string[] | null
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

type DB = {
  users: Map<string, MockUser>
  profiles: Map<string, MockProfile>
}

const db: DB = {
  users: new Map(),
  profiles: new Map(),
}

// Seed demo users
function seed() {
  if (db.users.size > 0) return

  // Demo user 1 - Freelancer
  const id1 = "demo-user-1"
  const email1 = "demo@leopay.app"
  db.users.set(id1, {
    id: id1,
    email: email1,
    password: "password",
    createdAt: new Date().toISOString(),
  })
  db.profiles.set(id1, {
    id: id1,
    email: email1,
    full_name: "Alex Johnson",
    bio: "Full-stack developer with 5+ years of experience in React, Node.js, and blockchain technologies.",
    location: "San Francisco, CA",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Blockchain"],
    hourly_rate: 85,
    experience_level: "senior",
    portfolio_url: "https://alexjohnson.dev",
    linkedin_url: "https://linkedin.com/in/alexjohnson",
    github_url: "https://github.com/alexjohnson",
    website: null,
    avatar_url: null,
    phone_number: "+1-555-0123",
    role: null, // force onboarding
    subrole: null,
    kyc_verified: false,
    profile_completed: false,
    total_earnings: 45000,
    projects_completed: 28,
    client_rating: 4.9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  // Demo user 2 - Business owner
  const id2 = "demo-user-2"
  const email2 = "business@leopay.app"
  db.users.set(id2, {
    id: id2,
    email: email2,
    password: "password",
    createdAt: new Date().toISOString(),
  })
  db.profiles.set(id2, {
    id: id2,
    email: email2,
    full_name: "Sarah Chen",
    bio: "CEO of TechStart Inc. Looking to hire talented developers for our growing team.",
    location: "New York, NY",
    skills: ["Management", "Strategy", "Product Development"],
    hourly_rate: null,
    experience_level: "expert",
    portfolio_url: "https://techstart.com",
    linkedin_url: "https://linkedin.com/in/sarahchen",
    github_url: null,
    website: "https://techstart.com",
    avatar_url: null,
    phone_number: "+1-555-0456",
    role: "employee",
    subrole: "receiver",
    kyc_verified: true,
    profile_completed: true,
    total_earnings: 0,
    projects_completed: 0,
    client_rating: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  // Demo user 3 - Contractor
  const id3 = "demo-user-3"
  const email3 = "contractor@leopay.app"
  db.users.set(id3, {
    id: id3,
    email: email3,
    password: "password",
    createdAt: new Date().toISOString(),
  })
  db.profiles.set(id3, {
    id: id3,
    email: email3,
    full_name: "Mike Rodriguez",
    bio: "Independent contractor specializing in mobile app development and UI/UX design.",
    location: "Austin, TX",
    skills: ["React Native", "Flutter", "UI/UX Design", "Figma"],
    hourly_rate: 75,
    experience_level: "intermediate",
    portfolio_url: "https://mikerodriguez.design",
    linkedin_url: "https://linkedin.com/in/mikerodriguez",
    github_url: "https://github.com/mikerodriguez",
    website: null,
    avatar_url: null,
    phone_number: "+1-555-0789",
    role: "freelancer",
    subrole: "sender",
    kyc_verified: true,
    profile_completed: true,
    total_earnings: 32000,
    projects_completed: 15,
    client_rating: 4.7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
}

seed()

export const mockDb = {
  // User helpers
  getUserByEmail(email: string) {
    for (const u of db.users.values()) {
      if (u.email.toLowerCase() === email.toLowerCase()) return u
    }
    return null
  },
  getUserById(id: string) {
    return db.users.get(id) ?? null
  },
  createUser(email: string, password: string) {
    const id = crypto.randomUUID()
    const user: MockUser = {
      id,
      email,
      password,
      createdAt: new Date().toISOString(),
    }
    db.users.set(id, user)

    // Create default profile
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
      linkedin_url: null,
      github_url: null,
      website: null,
      avatar_url: null,
      phone_number: null,
      role: null,
      subrole: null,
      kyc_verified: false,
      profile_completed: false,
      total_earnings: 0,
      projects_completed: 0,
      client_rating: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    db.profiles.set(id, profile)
    return user
  },

  // Profile helpers
  getProfile(userId: string) {
    return db.profiles.get(userId) ?? null
  },
  upsertProfile(userId: string, patch: Partial<MockProfile>) {
    const existing = db.profiles.get(userId)
    if (!existing) {
      throw new Error("Profile not found")
    }
    const merged: MockProfile = {
      ...existing,
      ...patch,
      id: userId,
      updated_at: new Date().toISOString(),
    }
    db.profiles.set(userId, merged)
    return merged
  },

  // Get all users (for admin purposes)
  getAllUsers() {
    return Array.from(db.users.values())
  },

  // Get all profiles (for admin purposes)
  getAllProfiles() {
    return Array.from(db.profiles.values())
  },
}
