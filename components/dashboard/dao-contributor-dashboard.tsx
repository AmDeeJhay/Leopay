"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { TopNavbar } from "@/components/layout/top-navbar"
import {
  Wallet,
  Calendar,
  TrendingUp,
  Building2,
  CheckCircle,
  DollarSign,
  Download,
  ExternalLink,
  Award,
  Github,
  MessageSquare,
  Settings,
  Copy,
  Zap,
} from "lucide-react"

interface WalletState {
  isConnected: boolean
  address: string
  balance: number
}

interface DAOContributorDashboardProps {
  walletState: WalletState
  onConnectWallet: () => void
}

export const DAOContributorDashboard: React.FC<DAOContributorDashboardProps> = ({ walletState, onConnectWallet }) => {
  const [activeTab, setActiveTab] = useState("dashboard")

  const navigationItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: TrendingUp },
    { id: "tasks", label: "Assigned Tasks", icon: CheckCircle },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "voting", label: "DAO Voting", icon: Award },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  const mockTasks = [
    {
      id: 1,
      title: "Frontend UI Redesign",
      type: "Development",
      status: "Paid",
      amount: 2500,
      date: "2024-01-15",
      githubLink: "https://github.com/dao/frontend-redesign",
      proposalLink: "https://forum.dao.org/proposal/123",
    },
    {
      id: 2,
      title: "Smart Contract Audit",
      type: "Security",
      status: "Approved",
      amount: 5000,
      date: "2024-01-10",
      githubLink: "https://github.com/dao/audit-report",
    },
    {
      id: 3,
      title: "Community Governance Proposal",
      type: "Governance",
      status: "Pending",
      amount: 1000,
      date: "2024-01-08",
      proposalLink: "https://forum.dao.org/proposal/124",
    },
  ]

  const mockPayments = [
    {
      id: 1,
      amount: 2500,
      project: "Frontend UI Redesign",
      date: "2024-01-15",
      zkReceiptHash: "zk_0x1a2b3c4d5e6f7890abcdef1234567890",
      status: "Confirmed",
    },
    {
      id: 2,
      amount: 3000,
      project: "Documentation Update",
      date: "2024-01-01",
      zkReceiptHash: "zk_0x9876543210fedcba0987654321abcdef",
      status: "Confirmed",
    },
  ]

  const mockBadges = [
    { name: "Core Contributor", level: "Gold", earned: "2024-01-01" },
    { name: "Security Expert", level: "Silver", earned: "2023-12-15" },
    { name: "Community Builder", level: "Bronze", earned: "2023-11-20" },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-700">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-900">${walletState.balance.toLocaleString()}</div>
            <p className="text-xs text-indigo-600 mt-1">Available for withdrawal</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Last Payment</CardTitle>
            <Calendar className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$2,500</div>
            <p className="text-xs text-slate-600 mt-1">Jan 15, 2024</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Total Contributions</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">$12,750</div>
            <p className="text-xs text-emerald-600 mt-1">All-time earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">DAO</CardTitle>
            <Building2 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">AleoDAO</div>
            <p className="text-xs text-orange-600 mt-1">Core contributor</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-600" />
              Recent Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{task.title}</p>
                  <p className="text-sm text-slate-600">{task.type}</p>
                </div>
                <Badge
                  className={
                    task.status === "Paid"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : task.status === "Approved"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }
                >
                  {task.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-600" />
              Reputation Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Contribution Score</span>
              <span className="text-2xl font-bold text-slate-900">847</span>
            </div>
            <Progress value={84} className="h-2" />
            <div className="flex gap-2 flex-wrap">
              {mockBadges.slice(0, 2).map((badge, index) => (
                <Badge key={index} variant="outline" className="text-indigo-600 border-indigo-200">
                  {badge.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Assigned Tasks</h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Submit New Task</Button>
      </div>

      <div className="grid gap-4">
        {mockTasks.map((task) => (
          <Card key={task.id} className="bg-white border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                  <p className="text-slate-600">{task.type}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>Amount: ${task.amount.toLocaleString()}</span>
                    <span>Date: {task.date}</span>
                  </div>
                </div>
                <Badge
                  className={
                    task.status === "Paid"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : task.status === "Approved"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }
                >
                  {task.status}
                </Badge>
              </div>

              <div className="flex gap-2 mt-4">
                {task.githubLink && (
                  <Button variant="outline" size="sm" className="border-slate-300 bg-transparent">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                )}
                {task.proposalLink && (
                  <Button variant="outline" size="sm" className="border-slate-300 bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Proposal
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Payment History</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-300 bg-transparent">
            Filter by Month
          </Button>
          <Button variant="outline" className="border-slate-300 bg-transparent">
            Export All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {mockPayments.map((payment) => (
          <Card key={payment.id} className="bg-white border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">${payment.amount.toLocaleString()}</h3>
                  <p className="text-slate-600">{payment.project}</p>
                  <p className="text-sm text-slate-500">{payment.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800 border-green-200">{payment.status}</Badge>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    zkReceipt
                  </Button>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">zkProof Hash:</span>
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <p className="text-xs font-mono text-slate-700 mt-1 break-all">{payment.zkReceiptHash}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderVoting = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">DAO Voting</CardTitle>
        <CardDescription className="text-slate-600">Participate in governance decisions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Award className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No active proposals</p>
          <p className="text-slate-500 text-sm">Check back later for governance votes</p>
        </div>
      </CardContent>
    </Card>
  )

  const renderProfile = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Profile Settings</CardTitle>
        <CardDescription className="text-slate-600">Manage your DAO contributor profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-slate-700">Connected DAO</Label>
          <Input value="AleoDAO" className="border-slate-300" readOnly />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700">Wallet Address</Label>
          <Input value={walletState.address} className="border-slate-300" readOnly />
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Update Profile</Button>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "tasks":
        return renderTasks()
      case "payments":
        return renderPayments()
      case "voting":
        return renderVoting()
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
                    <span className="text-sm text-indigo-700">Connected</span>
                  </div>
                  <p className="text-xs text-indigo-600 font-mono truncate">{walletState.address}</p>
                </div>
              ) : (
                <Button onClick={onConnectWallet} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
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
