"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
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
  Shield,
  Github,
  MessageSquare,
  Settings,
  Bell,
  Copy,
  Star,
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
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "contributions", label: "Contribution Tracker", icon: CheckCircle },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "reputation", label: "DAO Reputation", icon: Award },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const mockContributions = [
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
        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${walletState.balance.toLocaleString()}</div>
            <p className="text-xs text-slate-400 mt-1">Available for withdrawal</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Last Payment</CardTitle>
            <Calendar className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$2,500</div>
            <p className="text-xs text-slate-400 mt-1">Jan 15, 2024</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Contributions</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$12,750</div>
            <p className="text-xs text-slate-400 mt-1">All-time earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">DAO</CardTitle>
            <Building2 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">AleoDAO</div>
            <p className="text-xs text-slate-400 mt-1">Core contributor</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              Recent Contributions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockContributions.slice(0, 3).map((contribution) => (
              <div
                key={contribution.id}
                className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
              >
                <div>
                  <p className="font-medium text-white">{contribution.title}</p>
                  <p className="text-sm text-slate-400">{contribution.type}</p>
                </div>
                <Badge
                  variant={
                    contribution.status === "Paid"
                      ? "default"
                      : contribution.status === "Approved"
                        ? "secondary"
                        : "outline"
                  }
                  className={
                    contribution.status === "Paid"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : contribution.status === "Approved"
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  }
                >
                  {contribution.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-400" />
              Reputation Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Contribution Score</span>
              <span className="text-2xl font-bold text-white">847</span>
            </div>
            <Progress value={84} className="h-2 bg-slate-700" />
            <div className="flex gap-2 flex-wrap">
              {mockBadges.slice(0, 2).map((badge, index) => (
                <Badge key={index} variant="outline" className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
                  {badge.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContributions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Contribution Tracker</h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Submit New Contribution</Button>
      </div>

      <div className="grid gap-4">
        {mockContributions.map((contribution) => (
          <Card
            key={contribution.id}
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{contribution.title}</h3>
                  <p className="text-slate-400">{contribution.type}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>Amount: ${contribution.amount.toLocaleString()}</span>
                    <span>Date: {contribution.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      contribution.status === "Paid"
                        ? "default"
                        : contribution.status === "Approved"
                          ? "secondary"
                          : "outline"
                    }
                    className={
                      contribution.status === "Paid"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : contribution.status === "Approved"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    }
                  >
                    {contribution.status}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {contribution.githubLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                )}
                {contribution.proposalLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
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
        <h2 className="text-2xl font-bold text-white">Payment History</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
            Filter by Month
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
            Export All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {mockPayments.map((payment) => (
          <Card
            key={payment.id}
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">${payment.amount.toLocaleString()}</h3>
                  <p className="text-slate-400">{payment.project}</p>
                  <p className="text-sm text-slate-500">{payment.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{payment.status}</Badge>
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    zkReceipt
                  </Button>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">zkProof Hash:</span>
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <p className="text-xs font-mono text-slate-300 mt-1 break-all">{payment.zkReceiptHash}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderReputation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">DAO Reputation</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-400" />
              Contribution Badges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockBadges.map((badge, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      badge.level === "Gold"
                        ? "bg-yellow-400"
                        : badge.level === "Silver"
                          ? "bg-gray-400"
                          : "bg-orange-400"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-white">{badge.name}</p>
                    <p className="text-sm text-slate-400">Earned: {badge.earned}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    badge.level === "Gold"
                      ? "border-yellow-400 text-yellow-400"
                      : badge.level === "Silver"
                        ? "border-gray-400 text-gray-400"
                        : "border-orange-400 text-orange-400"
                  }
                >
                  {badge.level}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-cyan-400" />
              zkProof of Contribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Contribution Hash:</span>
                <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <p className="text-xs font-mono text-slate-300 break-all">
                zk_contrib_0x7f8e9d6c5b4a3928374650192837465019283746
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Total Contributions</span>
                <span className="text-white font-semibold">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Success Rate</span>
                <span className="text-green-400 font-semibold">96%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Reputation Score</span>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">4.8</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Public Links</CardTitle>
          <CardDescription className="text-slate-400">
            Optional links to showcase your contributions publicly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
              <Github className="h-4 w-4 mr-2" />
              GitHub Profile
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
              <MessageSquare className="h-4 w-4 mr-2" />
              Forum Profile
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">DAO Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Connected DAO</Label>
              <Input value="AleoDAO" className="bg-slate-700 border-slate-600 text-white" readOnly />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Wallet Address</Label>
              <Input value={walletState.address} className="bg-slate-700 border-slate-600 text-white" readOnly />
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Update Connection</Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Payment Notifications</span>
              <Button variant="outline" size="sm" className="border-green-500 text-green-400 bg-transparent">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Task Updates</span>
              <Button variant="outline" size="sm" className="border-green-500 text-green-400 bg-transparent">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">DAO Announcements</span>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 bg-transparent">
                Disabled
              </Button>
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
      case "contributions":
        return renderContributions()
      case "payments":
        return renderPayments()
      case "reputation":
        return renderReputation()
      case "settings":
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700 z-10">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LeoPay DAO</span>
            </div>

            {/* Wallet Connection */}
            <div className="mb-8">
              {walletState.isConnected ? (
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-slate-300">Connected</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono truncate">{walletState.address}</p>
                </div>
              ) : (
                <Button
                  onClick={onConnectWallet}
                  className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white"
                >
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
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 text-white border border-indigo-500/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
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
