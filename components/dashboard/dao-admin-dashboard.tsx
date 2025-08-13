"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Wallet,
  Users,
  TrendingUp,
  Calendar,
  Send,
  UserPlus,
  FileText,
  BarChart3,
  Settings,
  Shield,
  Download,
  Upload,
  Search,
  Filter,
  Zap,
  Building2,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
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
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "pay", label: "Pay Contributors", icon: Send },
    { id: "manage", label: "Manage Contributors", icon: Users },
    { id: "treasury", label: "zkTreasury Logs", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
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
        <Card className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Treasury Balance</CardTitle>
            <Wallet className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${walletState.balance.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">Available for payouts</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Disbursed</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$248,500</div>
            <p className="text-xs text-slate-500 mt-1">This quarter</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Contributors</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">24</div>
            <p className="text-xs text-slate-500 mt-1">Active members</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Next Payout</CardTitle>
            <Calendar className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">Jan 30</div>
            <p className="text-xs text-slate-500 mt-1">Monthly cycle</p>
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

  const renderPayContributors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Pay Contributors</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-300 bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Bulk CSV Upload
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Single Payment</Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="text-slate-900">Send zkPayment</DialogTitle>
                <DialogDescription className="text-slate-600">
                  Send a privacy-preserving payment to a contributor
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">Contributor Wallet</Label>
                  <Input placeholder="aleo1abc...def123" className="border-slate-300" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">Amount (USD)</Label>
                  <Input placeholder="2500" type="number" className="border-slate-300" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">Project/Task Label</Label>
                  <Input placeholder="Frontend Development" className="border-slate-300" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">Notes (Optional)</Label>
                  <Textarea placeholder="Additional payment details..." className="border-slate-300" />
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Shield className="h-4 w-4 mr-2" />
                  Send zkPayment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        {mockContributors.map((contributor) => (
          <Card key={contributor.id} className="bg-white border-slate-200 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedContributors.includes(contributor.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedContributors([...selectedContributors, contributor.id])
                      } else {
                        setSelectedContributors(selectedContributors.filter((id) => id !== contributor.id))
                      }
                    }}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <Avatar>
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      {contributor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-slate-900">{contributor.name}</h3>
                    <p className="text-slate-600">{contributor.role}</p>
                    <p className="text-sm text-slate-500 font-mono">{contributor.wallet}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">${contributor.totalEarned.toLocaleString()}</p>
                    <p className="text-sm text-slate-600">{contributor.tasksCompleted} tasks</p>
                  </div>
                  <Badge
                    variant={contributor.status === "Active" ? "default" : "secondary"}
                    className={
                      contributor.status === "Active" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : ""
                    }
                  >
                    {contributor.status}
                  </Badge>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Pay Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedContributors.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white border border-slate-200 rounded-lg shadow-lg p-4">
          <p className="text-sm text-slate-600 mb-2">{selectedContributors.length} contributors selected</p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Batch Payment</Button>
        </div>
      )}
    </div>
  )

  const renderManageContributors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Manage Contributors</h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Contributor
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search contributors..."
            className="border-slate-300"
            prefix={<Search className="h-4 w-4 text-slate-400" />}
          />
        </div>
        <Button variant="outline" className="border-slate-300 bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filter
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
                    variant={contributor.status === "Active" ? "default" : "secondary"}
                    className={
                      contributor.status === "Active" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : ""
                    }
                  >
                    {contributor.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-slate-300 bg-transparent">
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      contributor.status === "Active"
                        ? "border-red-300 text-red-600"
                        : "border-emerald-300 text-emerald-600"
                    }
                  >
                    {contributor.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderTreasuryLogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">zkTreasury Logs</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-300 bg-transparent">
            Export Logs
          </Button>
          <Button variant="outline" className="border-slate-300 bg-transparent">
            Filter by Date
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {mockTreasuryLogs.map((log) => (
          <Card key={log.id} className="bg-white border-slate-200 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-900">${log.amount.toLocaleString()}</h3>
                    <span className="text-slate-500">→</span>
                    <span className="text-slate-700">{log.recipient}</span>
                  </div>
                  <p className="text-slate-600">{log.project}</p>
                  <p className="text-sm text-slate-500">{log.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{log.status}</Badge>
                  <Button size="sm" variant="outline" className="border-slate-300 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    zkReceipt
                  </Button>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">zkProof Hash:</span>
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                    View Details
                  </Button>
                </div>
                <p className="text-xs font-mono text-slate-500 mt-1 break-all">{log.zkReceiptHash}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Monthly Expenditure</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySpendData}>
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
                <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockContributors.map((contributor, index) => (
                <div key={contributor.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{contributor.name}</p>
                      <p className="text-sm text-slate-600">{contributor.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">${contributor.totalEarned.toLocaleString()}</p>
                    <p className="text-sm text-slate-600">{contributor.tasksCompleted} tasks</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <Textarea
                value="Building privacy-preserving applications on Aleo blockchain"
                className="border-slate-300"
              />
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Update Configuration</Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Treasury Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700">Treasury Wallet</Label>
              <Input value={walletState.address} className="border-slate-300" readOnly />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Multisig Threshold</Label>
              <Input value="3 of 5" className="border-slate-300" readOnly />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">zkProof Verification</span>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Enabled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "pay":
        return renderPayContributors()
      case "manage":
        return renderManageContributors()
      case "treasury":
        return renderTreasuryLogs()
      case "analytics":
        return renderAnalytics()
      case "settings":
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 z-10">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DAO Admin</span>
            </div>

            {/* Wallet Connection */}
            <div className="mb-8">
              {walletState.isConnected ? (
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm text-slate-300">Treasury Connected</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono truncate">{walletState.address}</p>
                </div>
              ) : (
                <Button
                  onClick={onConnectWallet}
                  className="w-full bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white"
                >
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
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-indigo-600 to-teal-600 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
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
