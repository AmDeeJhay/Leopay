export type UserType = "contractor" | "employer" | "dao" | "employee"

export interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  user_type: UserType | null
  created_at: string
  updated_at: string
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
