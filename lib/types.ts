export type AuthType = "email" | "wallet"
export type UserRole = "freelancer" | "employee"
export type TaskStatus = "open" | "in_progress" | "completed"
export type PaymentType = "freelance" | "payroll"

export interface User {
  id: string
  auth_type: AuthType
  email?: string
  wallet_address?: string
  role: UserRole
  name?: string
  skills?: string[]
  zk_verified: boolean
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description: string
  required_skills: string[]
  client_wallet?: string
  is_escrowed: boolean
  amount?: number
  status: TaskStatus
  deadline?: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  sender_wallet?: string
  receiver_wallet?: string
  amount: number
  proof_hash?: string
  type: PaymentType
  employee_name?: string
  paid_at: string
  created_at: string
}

export type WalletStatus = "not_connected" | "connected_unverified" | "connected_active"

export const FREELANCER_SKILLS = [
  "Student",
  "Developer",
  "Designer",
  "Community Manager",
  "Product Manager",
  "Blockchain Engineer",
  "Data Analyst",
  "Marketer",
  "Technical Writer",
  "Builder/Hacker",
  "Other",
] as const

export const EMPLOYEE_TYPES = ["Employee", "Contractor", "DAO Member"] as const
