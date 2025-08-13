"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
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
    { id: "dashboard", label: "My Dashboard", icon: BarChart3 },
    { id: "payroll", label: "My Payroll", icon: DollarSign },
    { id: "payslips", label: "zkPayslips", icon: FileText },
    { id: "proof", label: "Proof of Income", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
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
        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Wallet Balance</p>
                <p className="text-xl font-semibold">
                  {walletState.isConnected ? `$${walletState.balance?.toLocaleString() || "0"}` : "Connect Wallet"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Last Salary</p>
                <p className="text-xl font-semibold text-gray-900">Dec 15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Monthly Earnings</p>
                <p className="text-xl font-semibold text-gray-900">$5,500</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Employer</p>
                <p className="text-xl font-semibold text-gray-900">TechCorp</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                <div>
                  <p className="font-medium text-indigo-900">Next Expected Salary</p>
                  <p className="text-2xl font-bold text-indigo-600">$5,500</p>
                </div>
                <Clock className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Countdown to Payday</p>
                <p className="text-lg font-semibold">12 days remaining</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Payment Method</p>
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-indigo-600" />
                  <span className="font-medium">zkPayment Wallet</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {walletState.isConnected ? walletState.address?.slice(0, 10) + "..." : "Not connected"}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 mb-1">All-time Earnings</p>
                <p className="text-2xl font-bold text-green-600">$16,500</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Salary Received</p>
                <p className="text-sm text-gray-600">December 2024 - $5,500</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Completed
              </Badge>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">zkPayslip Generated</p>
                <p className="text-sm text-gray-600">December 2024 payslip available</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPayroll = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Payroll</CardTitle>
          <CardDescription>Track your salary schedule and payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-lg">
                <h3 className="font-semibold mb-2">Next Salary Payment</h3>
                <p className="text-3xl font-bold mb-2">$5,500</p>
                <p className="text-sm opacity-90">Expected: January 15, 2025</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress to payday</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium">zkPayment Wallet</p>
                      <p className="text-sm text-gray-600">{walletState.isConnected ? "Connected" : "Not connected"}</p>
                    </div>
                  </div>
                  {!walletState.isConnected && (
                    <Button size="sm" onClick={onConnectWallet}>
                      Connect
                    </Button>
                  )}
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-3">Salary Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Salary</span>
                    <span className="font-medium">$5,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Frequency</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Payment</span>
                    <span className="font-medium">Jan 15, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPayslips = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>zkPayslips</CardTitle>
          <CardDescription>Download your payslips with cryptographic proof verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payslips.map((payslip) => (
              <div
                key={payslip.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium">{payslip.month}</p>
                    <p className="text-sm text-gray-600">
                      ${payslip.amount.toLocaleString()} - {payslip.date}
                    </p>
                    <p className="text-xs text-gray-500">zkProof: {payslip.zkProof}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Available
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProofOfIncome = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Proof of Income</CardTitle>
          <CardDescription>Generate cryptographic salary verification for third-party use</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-indigo-50 border-indigo-200">
                <h3 className="font-semibold mb-2 text-indigo-900">Income Range Proof</h3>
                <p className="text-sm text-indigo-700 mb-4">
                  Prove you earn within a specific range without revealing exact amount
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-indigo-900">Minimum Amount</label>
                    <Input placeholder="e.g., $4,000" className="mt-1" />
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Generate Range Proof</Button>
                </div>
              </Card>

              <Card className="p-4 bg-green-50 border-green-200">
                <h3 className="font-semibold mb-2 text-green-900">Employment Verification</h3>
                <p className="text-sm text-green-700 mb-4">Prove employment status and payment reliability</p>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-green-900">Verification includes:</p>
                    <ul className="list-disc list-inside text-green-700 mt-1 space-y-1">
                      <li>Employment status</li>
                      <li>Payment consistency</li>
                      <li>Employment duration</li>
                    </ul>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Generate Employment Proof</Button>
                </div>
              </Card>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-4">Generated Proofs</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Income Range Proof</p>
                    <p className="text-sm text-gray-600">Generated on Dec 20, 2024</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Valid
                    </Badge>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "payroll":
        return renderPayroll()
      case "payslips":
        return renderPayslips()
      case "proof":
        return renderProofOfIncome()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">LeoPay Employee</h1>
          <p className="text-sm text-gray-600">Personal Dashboard</p>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-indigo-50 text-indigo-700 font-medium border border-indigo-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Wallet Connection */}
        <div className="absolute bottom-4 left-4 right-4">
          {!walletState.isConnected ? (
            <Button onClick={onConnectWallet} className="w-full bg-indigo-600 hover:bg-indigo-700">
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
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  )
}
