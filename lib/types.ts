export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role?: "freelancer" | "employee" | "employer" | "business" | "dao"
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: "pending" | "in_progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high"
  due_date?: string
  assigned_to?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  amount: number
  currency: string
  type: "payment" | "refund" | "withdrawal"
  status: "pending" | "completed" | "failed"
  from_user_id?: string
  to_user_id?: string
  description?: string
  created_at: string
  updated_at: string
}

export interface PayrollEntry {
  id: string
  employee_id: string
  amount: number
  currency: string
  pay_period_start: string
  pay_period_end: string
  status: "draft" | "pending" | "paid" | "cancelled"
  created_by: string
  created_at: string
  updated_at: string
}
