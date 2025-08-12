"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Briefcase,
  Clock,
  Star,
  CheckCircle,
  Send,
  Home,
  Search,
  History,
  CreditCard,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import type { WalletStatus } from "@/lib/types"

interface ReceiverDashboardProps {
  walletStatus: WalletStatus
  setWalletStatus: (status: WalletStatus) => void
}

export function ReceiverDashboard({ walletStatus, setWalletStatus }: ReceiverDashboardProps) {
  const dashboardStats = {
    totalEarnings: 28750,
    monthlyEarnings: 8500,
    activeTasks: 5,
    completedTasks: 32,
    avgTaskValue: 1200,
    pendingPayments: 2,
    clientRating: 4.8,
    responseRate: 95,
  }

  const earningsData = [
    { month: "Jan", amount: 6200 },
    { month: "Feb", amount: 7800 },
    { month: "Mar", amount: 5400 },
    { month: "Apr", amount: 9100 },
    { month: "May", amount: 8500 },
  ]

  const activeWork = [
    { client: "TechCorp Inc.", project: "E-commerce Platform", progress: 75, value: 4500, deadline: "Jan 15" },
    { client: "StartupXYZ", project: "Mobile App Design", progress: 45, value: 3200, deadline: "Jan 20" },
    { client: "Digital Agency", project: "Brand Identity", progress: 90, value: 2800, deadline: "Jan 12" },
  ]

  const recentPayments = [
    { client: "TechCorp Inc.", amount: 2250, project: "Frontend Development", date: "2 days ago", status: "completed" },
    { client: "StartupXYZ", amount: 1600, project: "UI Design Phase 1", date: "5 days ago", status: "completed" },
    {
      client: "E-commerce Co.",
      amount: 3200,
      project: "Full Stack Development",
      date: "1 week ago",
      status: "completed",
    },
  ]

  const handleConnectWallet = () => {
    setWalletStatus("connecting")
    setTimeout(() => setWalletStatus("connected"), 2000)
  }

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Search, label: "Explore Tasks" },
    { icon: History, label: "Task History" },
    { icon: Send, label: "Request Payment" },
    { icon: CreditCard, label: "Payment History" },
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-64 bg-slate-800/50 border-r border-slate-700 flex flex-col backdrop-blur-sm">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">LeoPay Freelancer</h2>
          <p className="text-sm text-slate-300">Earnings Dashboard</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <li key={index}>
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      item.active
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : "text-slate-300 hover:bg-slate-700/50"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-700/50 rounded-lg">
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
              <h1 className="text-3xl font-bold text-white">Freelancer Dashboard</h1>
              <p className="text-slate-300">Earnings overview and work progress tracking</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-300">Total Earnings</p>
                <p className="text-2xl font-bold text-white">${dashboardStats.totalEarnings.toLocaleString()}</p>
              </div>
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
              <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
                <Send className="h-4 w-4" />
                Request Payment
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Monthly Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${dashboardStats.monthlyEarnings.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Active Tasks</CardTitle>
                <Briefcase className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{dashboardStats.activeTasks}</div>
                <div className="flex items-center text-xs text-blue-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +1 this week
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Client Rating</CardTitle>
                <Star className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{dashboardStats.clientRating}</div>
                <div className="flex items-center text-xs text-yellow-400">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Excellent rating
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Pending Payments</CardTitle>
                <Clock className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{dashboardStats.pendingPayments}</div>
                <div className="flex items-center text-xs text-orange-400">
                  <Clock className="h-3 w-3 mr-1" />
                  Awaiting approval
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Work Progress */}
          <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Active Work Progress</CardTitle>
              <CardDescription className="text-slate-400">Track your current projects and deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeWork.map((work, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{work.project}</h4>
                      <p className="text-sm text-slate-300">for {work.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">${work.value.toLocaleString()}</p>
                      <p className="text-sm text-slate-400">Due {work.deadline}</p>
                    </div>
                  </div>
                  <Progress value={work.progress} className="h-2 bg-slate-600" />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{work.progress}% complete</span>
                    <span>Estimated: ${Math.round((work.value * work.progress) / 100).toLocaleString()} earned</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Earnings Chart */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Monthly Earnings</CardTitle>
              <CardDescription className="text-slate-400">Your income over the last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">
                    ${dashboardStats.monthlyEarnings.toLocaleString()}
                  </div>
                  <p className="text-sm text-slate-400">This month</p>
                </div>
                <div className="space-y-3">
                  {earningsData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">{data.month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-green-400 h-2 rounded-full"
                            style={{ width: `${(data.amount / 10000) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-white">${data.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Payments</CardTitle>
              <CardDescription className="text-slate-400">Your latest zkPayment transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">${payment.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-300">{payment.client}</p>
                    <p className="text-xs text-slate-400">{payment.date}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    {payment.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Performance Metrics</CardTitle>
              <CardDescription className="text-slate-400">Your freelancing statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Response Rate</span>
                  <span className="text-sm font-semibold text-white">{dashboardStats.responseRate}%</span>
                </div>
                <Progress value={dashboardStats.responseRate} className="h-2 bg-slate-600" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Completed Tasks</span>
                  <span className="text-sm font-semibold text-white">{dashboardStats.completedTasks}</span>
                </div>
                <div className="text-xs text-slate-400">+5 this month</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Avg Task Value</span>
                  <span className="text-sm font-semibold text-white">${dashboardStats.avgTaskValue}</span>
                </div>
                <div className="flex items-center text-xs text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last month
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
