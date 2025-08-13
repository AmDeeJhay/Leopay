"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { TopNavbar } from "@/components/layout/top-navbar"
import {
  Wallet,
  DollarSign,
  Calendar,
  FileText,
  Download,
  Settings,
  BarChart3,
  Shield,
  Clock,
  Building,
  TrendingUp,
} from "lucide-react"

interface WalletState {
  isConnected: boolean
  address?: string
  balance?: number
}

interface EmployeeDashboardProps {
  walletState: WalletState
  onConnectWallet: () => void
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ walletState, onConnectWallet }) => {
  const [activeTab, setActiveTab] = useState("dashboard")

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: BarChart3 },
    { id: "jobs", label: "My Jobs", icon: Building },
    { id: "payslips", label: "Payslips", icon: FileText },
    { id: "benefits", label: "Benefits", icon: Shield },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  const payslips = [
    { id: 1, month: "December 2024", amount: 5500, date: "2024-12-15", zkProof: "zk_payslip_dec_2024_xyz" },
    { id: 2, month: "November 2024", amount: 5500, date: "2024-11-15", zkProof: "zk_payslip_nov_2024_abc" },
    { id: 3, month: "October 2024", amount: 5500, date: "2024-10-15", zkProof: "zk_payslip_oct_2024_def" },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-sm text-indigo-700">Wallet Balance</p>
                <p className="text-xl font-semibold text-indigo-900">
                  {walletState.isConnected ? `$${walletState.balance?.toLocaleString() || "0"}` : "Connect Wallet"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-sm text-slate-700">Last Salary</p>
                <p className="text-xl font-semibold text-slate-900">Dec 15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-emerald-700">Monthly Earnings</p>
                <p className="text-xl font-semibold text-emerald-900">$5,500</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-700">Employer</p>
                <p className="text-xl font-semibold text-orange-900">TechCorp</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Summary */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div>
                  <p className="font-medium text-indigo-900">Next Expected Salary</p>
                  <p className="text-2xl font-bold text-indigo-600">$5,500</p>
                </div>
                <Clock className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="text-sm text-slate-700 mb-2">Countdown to Payday</p>
                <p className="text-lg font-semibold text-slate-900">12 days remaining</p>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="text-sm text-slate-700 mb-2">Payment Method</p>
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-indigo-600" />
                  <span className="font-medium text-slate-900">zkPayment Wallet</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {walletState.isConnected ? walletState.address?.slice(0, 10) + "..." : "Not connected"}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 mb-1">All-time Earnings</p>
                <p className="text-2xl font-bold text-green-600">$16,500</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Salary Received</p>
                <p className="text-sm text-slate-600">December 2024 - $5,500</p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">zkPayslip Generated</p>
                <p className="text-sm text-slate-600">December 2024 payslip available</p>
              </div>
              <Button variant="outline" size="sm" className="border-slate-300 bg-transparent">
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderJobs = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">My Jobs</CardTitle>
        <CardDescription className="text-slate-600">Current employment and job details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">Senior Developer</h3>
                <p className="text-slate-600">TechCorp Inc.</p>
                <p className="text-sm text-slate-500">Full-time • Remote</p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Start Date</p>
                <p className="font-medium text-slate-900">Jan 15, 2023</p>
              </div>
              <div>
                <p className="text-slate-600">Salary</p>
                <p className="font-medium text-slate-900">$5,500/month</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderPayslips = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Payslips</CardTitle>
        <CardDescription className="text-slate-600">
          Download your payslips with cryptographic proof verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payslips.map((payslip) => (
            <div
              key={payslip.id}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <FileText className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-slate-900">{payslip.month}</p>
                  <p className="text-sm text-slate-600">
                    ${payslip.amount.toLocaleString()} - {payslip.date}
                  </p>
                  <p className="text-xs text-slate-500">zkProof: {payslip.zkProof}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">Available</Badge>
                <Button variant="outline" size="sm" className="border-slate-300 bg-transparent">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderBenefits = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Benefits</CardTitle>
        <CardDescription className="text-slate-600">Your employment benefits and coverage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="font-medium text-indigo-900">Health Insurance</p>
                <p className="text-sm text-indigo-700">Premium plan with dental and vision</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">401(k) Retirement</p>
                <p className="text-sm text-green-700">Company matches up to 4%</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-900">Paid Time Off</p>
                <p className="text-sm text-orange-700">25 days annually</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderProfile = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Profile Settings</CardTitle>
        <CardDescription className="text-slate-600">Manage your employee profile and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <Input defaultValue="John Doe" className="border-slate-300" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <Input defaultValue="john@techcorp.com" className="border-slate-300" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Department</label>
          <Input defaultValue="Engineering" className="border-slate-300" />
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Update Profile</Button>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "jobs":
        return renderJobs()
      case "payslips":
        return renderPayslips()
      case "benefits":
        return renderBenefits()
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
              {!walletState.isConnected ? (
                <Button onClick={onConnectWallet} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-indigo-900">Wallet Connected</span>
                  </div>
                  <p className="text-xs text-indigo-600 mt-1">
                    {walletState.address?.slice(0, 6)}...{walletState.address?.slice(-4)}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.label}</span>
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
