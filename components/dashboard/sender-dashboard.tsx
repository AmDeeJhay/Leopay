"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Home,
  Briefcase,
  UserPlus,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react"
import type { WalletStatus } from "@/lib/types"

interface SenderDashboardProps {
  walletStatus: WalletStatus
  setWalletStatus: (status: WalletStatus) => void
}

export function SenderDashboard({ walletStatus, setWalletStatus }: SenderDashboardProps) {
  const dashboardStats = {
    totalSpent: 45250,
    activeProjects: 8,
    completedProjects: 24,
    avgProjectCost: 1885,
    monthlySpend: 12500,
    pendingPayments: 3,
    topFreelancers: 12,
  }

  const recentActivity = [
    { type: "payment", amount: 2500, freelancer: "Sarah Chen", project: "E-commerce Site", time: "2 hours ago" },
    {
      type: "milestone",
      freelancer: "Alex Rodriguez",
      project: "Mobile App Design",
      progress: 75,
      time: "5 hours ago",
    },
    { type: "completion", amount: 3200, freelancer: "David Kim", project: "Smart Contract Audit", time: "1 day ago" },
  ]

  const topProjects = [
    { name: "E-commerce Website", freelancer: "Sarah Chen", progress: 75, budget: 5000, spent: 3750 },
    { name: "Mobile App Design", freelancer: "Alex Rodriguez", progress: 45, budget: 3500, spent: 1575 },
    { name: "Smart Contract Audit", freelancer: "David Kim", progress: 90, budget: 8000, spent: 7200 },
  ]

  const handleConnectWallet = () => {
    setWalletStatus("connecting")
    setTimeout(() => setWalletStatus("connected"), 2000)
  }

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Plus, label: "Post Task" },
    { icon: Briefcase, label: "Manage Tasks" },
    { icon: UserPlus, label: "Find Freelancers" },
    { icon: CreditCard, label: "Payment History" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">LeoPay Client</h2>
          <p className="text-sm text-slate-600">Project Management</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    item.active
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Client Dashboard</h1>
              <p className="text-slate-600">Project spending and freelancer management overview</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={handleConnectWallet}
                variant={walletStatus === "connected" ? "outline" : "default"}
                className="flex items-center gap-2"
                disabled={walletStatus === "connecting"}
              >
                <Wallet className="h-4 w-4" />
                {walletStatus === "connecting"
                  ? "Connecting..."
                  : walletStatus === "connected"
                    ? "Connected"
                    : "Connect Wallet"}
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardStats.totalSpent.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.activeProjects}</div>
                <div className="flex items-center text-xs text-blue-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 this week
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Project Cost</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardStats.avgProjectCost}</div>
                <div className="flex items-center text-xs text-red-600">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -5% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.pendingPayments}</div>
                <div className="flex items-center text-xs text-orange-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Requires attention
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Progress Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Active Projects Overview</CardTitle>
              <CardDescription>Track progress and spending across your current projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {topProjects.map((project, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">with {project.freelancer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">{project.progress}% complete</p>
                    </div>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Budget utilization: {Math.round((project.spent / project.budget) * 100)}%</span>
                    <span>Remaining: ${(project.budget - project.spent).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === "payment" && (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {activity.type === "milestone" && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === "completion" && (
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">
                      {activity.type === "payment" && (
                        <>
                          <span className="font-semibold">${activity.amount?.toLocaleString()}</span> paid to{" "}
                          <span className="font-medium">{activity.freelancer}</span>
                        </>
                      )}
                      {activity.type === "milestone" && (
                        <>
                          <span className="font-medium">{activity.freelancer}</span> updated progress to{" "}
                          <span className="font-semibold">{activity.progress}%</span>
                        </>
                      )}
                      {activity.type === "completion" && (
                        <>
                          <span className="font-medium">{activity.freelancer}</span> completed project for{" "}
                          <span className="font-semibold">${activity.amount?.toLocaleString()}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.project}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Monthly Spending Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending</CardTitle>
              <CardDescription>Your project investment over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    ${dashboardStats.monthlySpend.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <div className="space-y-2">
                  {["Jan", "Feb", "Mar", "Apr", "May"].map((month, index) => (
                    <div key={month} className="flex items-center justify-between">
                      <span className="text-sm">{month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.random() * 100}%` }} />
                        </div>
                        <span className="text-sm font-medium">
                          ${Math.floor(Math.random() * 15000 + 5000).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Freelancers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Freelancers</CardTitle>
              <CardDescription>Your most trusted collaborators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Sarah Chen", projects: 5, spent: 12500, rating: 4.9 },
                { name: "Alex Rodriguez", projects: 3, spent: 8200, rating: 4.8 },
                { name: "David Kim", projects: 4, spent: 15600, rating: 5.0 },
              ].map((freelancer, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                    <AvatarFallback>
                      {freelancer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{freelancer.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {freelancer.projects} projects • ${freelancer.spent.toLocaleString()} spent
                    </p>
                  </div>
                  <Badge variant="secondary">{freelancer.rating}★</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
