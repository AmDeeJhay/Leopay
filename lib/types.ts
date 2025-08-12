/**
 * Shared app types and constants.
 * Make sure to keep literal unions in sync with usage across the app.
 */

export type UserRole = "employee" | "freelancer"

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

// Matches usages across navbar and dashboards:
// connected_active | connected_unverified | (fallback/disconnected)
export type WalletStatus = "connected_active" | "connected_unverified" | "disconnected"

// Sub-roles used in role-based navigation and onboarding.
// Includes business/employer/dao/employee/contractor per usage in RoleBasedSidebar and onboarding.
export const EMPLOYEE_TYPES = ["employer", "business", "dao", "employee", "contractor"] as const
export type EmployeeType = (typeof EMPLOYEE_TYPES)[number]

export const FREELANCER_SKILLS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Solidity",
  "Smart Contracts",
  "Blockchain",
  "Web3",
  "Next.js",
  "Vue.js",
  "Angular",
  "Tailwind CSS",
  "CSS",
  "HTML",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "GraphQL",
  "REST API",
  "AWS",
  "Docker",
  "Kubernetes",
  "DevOps",
  "UI/UX Design",
  "Figma",
  "Photoshop",
  "Illustrator",
  "Mobile Development",
  "React Native",
  "Flutter",
  "iOS",
  "Android",
  "Machine Learning",
  "AI",
  "Data Science",
  "Security",
  "Testing",
  "QA",
] as const

export type FreelancerSkill = (typeof FREELANCER_SKILLS)[number]

// Minimal AuthUser shape to satisfy components expecting it
export type AuthUser = {
  id: string
  email?: string | null
  name?: string | null
  role?: UserRole
  subrole?: EmployeeType
}
