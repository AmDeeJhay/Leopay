"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Briefcase,
  CreditCard,
  Wallet,
  Settings,
  Users,
  FileText,
  BarChart3,
  Home,
  Receipt,
  TrendingUp,
  Building,
  UserCheck,
  Shield,
  History,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { UserRole } from "@/lib/types"

interface RoleBasedSidebarProps {
  userRole: UserRole
  userType?: string
}

export function RoleBasedSidebar({ userRole, userType }: RoleBasedSidebarProps) {
  const pathname = usePathname()

  const getNavigationItems = () => {
    if (userRole === "employee") {
      if (userType === "employer" || userType === "business") {
        return [
          { href: "/payroll/employer", icon: LayoutDashboard, label: "Dashboard" },
          { href: "/payroll/employees", icon: Users, label: "Employees" },
          { href: "/payroll/transactions", icon: FileText, label: "Transactions" },
          { href: "/payroll/analytics", icon: BarChart3, label: "Analytics" },
          { href: "/payroll/settings", icon: Settings, label: "Settings" },
        ]
      } else if (userType === "dao") {
        return [
          { href: "/payroll/dao", icon: LayoutDashboard, label: "Treasury" },
          { href: "/payroll/contributors", icon: Users, label: "Contributors" },
          { href: "/payroll/batch", icon: Receipt, label: "Batch Payroll" },
          { href: "/payroll/analytics", icon: TrendingUp, label: "Analytics" },
          { href: "/payroll/settings", icon: Settings, label: "Settings" },
        ]
      } else {
        return [
          { href: "/payroll/employee", icon: LayoutDashboard, label: "Dashboard" },
          { href: "/payroll/history", icon: History, label: "Payment History" },
          { href: "/payroll/proofs", icon: Shield, label: "zkProofs" },
          { href: "/payroll/settings", icon: Settings, label: "Settings" },
        ]
      }
    } else {
      // Freelancer role
      if (userType === "contractor") {
        return [
          { href: "/payroll/contractor", icon: LayoutDashboard, label: "Contracts" },
          { href: "/payroll/invoices", icon: FileText, label: "Invoices" },
          { href: "/payroll/payments", icon: CreditCard, label: "Payments" },
          { href: "/payroll/wallet", icon: Wallet, label: "Wallet" },
          { href: "/payroll/settings", icon: Settings, label: "Settings" },
        ]
      } else {
        return [
          { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
          { href: "/tasks", icon: Briefcase, label: "Tasks", badge: "3" },
          { href: "/payments", icon: CreditCard, label: "Payments" },
          { href: "/wallet", icon: Wallet, label: "Wallet" },
          { href: "/settings", icon: Settings, label: "Settings" },
        ]
      }
    }
  }

  const navItems = getNavigationItems()

  const getTitle = () => {
    if (userRole === "employee") {
      if (userType === "employer" || userType === "business") return "Employer Portal"
      if (userType === "dao") return "DAO Treasury"
      return "Employee Portal"
    }
    if (userType === "contractor") return "Contractor Portal"
    return "Freelancer Portal"
  }

  const getIcon = () => {
    if (userRole === "employee") {
      if (userType === "employer" || userType === "business") return Building
      if (userType === "dao") return Users
      return UserCheck
    }
    return Briefcase
  }

  const IconComponent = getIcon()

  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 bg-white border-r border-gray-200 shadow-lg z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-aleo-gradient rounded-xl flex items-center justify-center">
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl gradient-text">LeoPay</h1>
            <p className="text-xs text-gray-500">{getTitle()}</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12 rounded-2xl font-medium transition-all duration-200",
                  isActive
                    ? "bg-aleo-gradient text-white shadow-lg"
                    : "hover:bg-gray-50 text-gray-600 hover:text-gray-900",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-200">
        <Link href="/">
          <Button variant="outline" className="w-full mb-3 rounded-2xl bg-transparent">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-4">
          <h3 className="font-semibold text-gray-900 mb-1">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-3">Check our documentation</p>
          <Link href="/docs">
            <Button size="sm" variant="outline" className="w-full rounded-xl bg-transparent">
              View Docs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
