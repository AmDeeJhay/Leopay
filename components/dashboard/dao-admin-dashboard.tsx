"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TopNavbar } from "@/components/layout/top-navbar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Wallet, Users, TrendingUp, Calendar, UserPlus, FileText, BarChart3, Settings, Shield, Zap } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface WalletState {
  isConnected: boolean
  address: string
  balance: number
}

interface DAOAdminDashboardProps {
  walletState: WalletState
  onConnectWallet: () => void
}

export const DAOAdminDashboard: React.FC<DAOAdminDashboardProps> = ({ walletState, onConnectWallet }) => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedContributors, setSelectedContributors] = useState<number[]>([])

  const navigationItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: TrendingUp },
    { id: "proposals", label: "Proposals", icon: FileText },
    { id: "tasks", label: "Task Management", icon: BarChart3 },
    { id: "treasury", label: "Treasury", icon: Shield },
    { id: "members", label: "Members", icon: Users },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  const mockContributors = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer",
      wallet: "aleo1abc...def123",
      status: "Active",
      totalEarned: 15000,
      tasksCompleted: 12,
      lastActive: "2024-01-15",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Smart Contract Auditor",
      wallet: "aleo1xyz...789abc",
      status: "Active",
      totalEarned: 25000,
      tasksCompleted: 8,
      lastActive: "2024-01-14",
    },
    {
      id: 3,
      name: "Carol Davis",
      role: "Community Manager",
      wallet: "aleo1def...456ghi",
      status: "Inactive",
      totalEarned: 8000,
      tasksCompleted: 15,
      lastActive: "2024-01-10",
    },
  ]

  const mockTreasuryLogs = [
    {
      id: 1,
      recipient: "Alice Johnson",
      amount: 2500,
      project: "Frontend Redesign",
      date: "2024-01-15",
      zkReceiptHash: "zk_0x1a2b3c4d5e6f7890abcdef1234567890",
      status: "Confirmed",
    },
    {
      id: 2,
      recipient: "Bob Smith",
      amount: 5000,
      project: "Security Audit",
      date: "2024-01-14",
      zkReceiptHash: "zk_0x9876543210fedcba0987654321abcdef",
      status: "Confirmed",
    },
  ]

  const monthlySpendData = [
    { month: "Oct", amount: 45000 },
    { month: "Nov", amount: 52000 },
    { month: "Dec", amount: 48000 },
    { month: "Jan", amount: 65000 },
  ]

  const categoryData = [
    { name: "Development", value: 40, color: "#6366f1" },
    { name: "Security", value: 25, color: "#06b6d4" },
    { name: "Community", value: 20, color: "#10b981" },
    { name: "Governance", value: 15, color: "#8b5cf6" },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-700">Treasury Balance</CardTitle>
            <Wallet className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-900">${walletState.balance.toLocaleString()}</div>
            <p className="text-xs text-indigo-600 mt-1">Available for payouts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Total Disbursed</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$248,500</div>
            <p className="text-xs text-slate-600 mt-1">This quarter</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Contributors</CardTitle>
            <Users className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">24</div>
            <p className="text-xs text-emerald-600 mt-1">Active members</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Next Payout</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">Jan 30</div>
            <p className="text-xs text-orange-600 mt-1">Monthly cycle</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Monthly Treasury Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySpendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-600" />
            Recent Treasury Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTreasuryLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">
                    ${log.amount.toLocaleString()} → {log.recipient}
                  </p>
                  <p className="text-sm text-slate-600">
                    {log.project} • {log.date}
                  </p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{log.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProposals = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Proposals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No active proposals</p>
          <p className="text-slate-500 text-sm">Create a new proposal to get started</p>
        </div>
      </CardContent>
    </Card>
  )

  const renderTasks = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Task Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No active tasks</p>
          <p className="text-slate-500 text-sm">Assign tasks to contributors</p>
        </div>
      </CardContent>
    </Card>
  )

  const renderTreasury = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Treasury Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-indigo-900">Treasury Balance</p>
                <p className="text-2xl font-bold text-indigo-600">${walletState.balance.toLocaleString()}</p>
              </div>
              <Shield className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderMembers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Members</h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-4">
        {mockContributors.map((contributor) => (
          <Card key={contributor.id} className="bg-white border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      {contributor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{contributor.name}</h3>
                    <p className="text-slate-600">{contributor.role}</p>
                    <p className="text-sm text-slate-500 font-mono mt-1">{contributor.wallet}</p>
                    <div className="flex gap-4 mt-2 text-sm text-slate-600">
                      <span>Total Earned: ${contributor.totalEarned.toLocaleString()}</span>
                      <span>Tasks: {contributor.tasksCompleted}</span>
                      <span>Last Active: {contributor.lastActive}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      contributor.status === "Active"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : "bg-slate-100 text-slate-800 border-slate-200"
                    }
                  >
                    {contributor.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-slate-300 bg-transparent">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderProfile = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">DAO Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-slate-700">DAO Name</Label>
          <Input value="AleoDAO" className="border-slate-300" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700">Purpose</Label>
          <Textarea value="Building privacy-preserving applications on Aleo blockchain" className="border-slate-300" />
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Update Configuration</Button>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "proposals":
        return renderProposals()
      case "tasks":
        return renderTasks()
      case "treasury":
        return renderTreasury()
      case "members":
        return renderMembers()
      case "profile":
        return renderProfile()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <TopNavbar />

      <div className="flex pt-16">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/90 backdrop-blur-sm border-r border-slate-200 z-10">
          <div className="p-6">
            {/* Wallet Connection */}
            <div className="mb-8">
              {walletState.isConnected ? (
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-indigo-700">Treasury Connected</span>
                  </div>
                  <p className="text-xs text-indigo-600 font-mono truncate">{walletState.address}</p>
                </div>
              ) : (
                <Button onClick={onConnectWallet} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Treasury
                </Button>
              )}
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className="p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
