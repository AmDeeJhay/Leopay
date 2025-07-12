export interface User {
  id: string
  email: string
  role?: "freelancer" | "business" | "employee" | "employer" | "contractor" | "dao"
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role?: "freelancer" | "business" | "employee" | "employer" | "contractor" | "dao"
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  type: "payment" | "withdrawal" | "deposit"
  status: "pending" | "completed" | "failed"
  description?: string
  created_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: "pending" | "in_progress" | "completed"
  assigned_to?: string
  created_by: string
  due_date?: string
  created_at: string
  updated_at: string
}

export interface Employee {
  id: string
  user_id: string
  employer_id: string
  position?: string
  salary?: number
  hire_date: string
  status: "active" | "inactive"
  created_at: string
}
