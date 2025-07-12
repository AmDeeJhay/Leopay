export type UserRole = "freelancer" | "contractor" | "employer" | "dao" | "employee"

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole | null
  phone: string | null
  bio: string | null
  skills: string[] | null
  experience_level: "beginner" | "intermediate" | "expert" | null
  hourly_rate: number | null
  location: string | null
  website: string | null
  linkedin: string | null
  github: string | null
  portfolio_url: string | null
  kyc_verified: boolean
  profile_completed: boolean
  created_at: string
  updated_at: string
}

export interface KYCDocument {
  id: string
  user_id: string
  document_type: "passport" | "drivers_license" | "national_id"
  document_url: string
  status: "pending" | "approved" | "rejected"
  uploaded_at: string
  reviewed_at: string | null
  reviewer_notes: string | null
}

export interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  due_date: string | null
  assigned_to: string | null
  created_by: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  amount: number
  currency: string
  type: "payment" | "refund" | "fee"
  status: "pending" | "completed" | "failed"
  from_user: string
  to_user: string
  description: string | null
  created_at: string
  updated_at: string
}

export type WalletStatus = "not_connected" | "connected_unverified" | "connected_active"

export const FREELANCER_SKILLS = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "Content Writing",
  "SEO Optimization",
  "Digital Marketing",
  "Video Editing",
  "Data Entry",
  "Virtual Assistant",
  "Blockchain Development",
  "Smart Contract Auditing",
  "DeFi Consulting",
  "NFT Art Creation",
  "Community Management",
  "Technical Writing",
  "Cybersecurity",
  "Cloud Computing",
  "Machine Learning",
  "Data Science",
] as const

export const EXPERIENCE_LEVELS = ["beginner", "intermediate", "expert"] as const
