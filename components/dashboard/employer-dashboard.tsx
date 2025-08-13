"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  Wallet,
  DollarSign,
  Calendar,
  Upload,
  Download,
  Search,
  Settings,
  BarChart3,
  TrendingUp,
  CreditCard,
  FileText,
  Shield,
  Plus,
  Eye,
} from "lucide-react"

interface WalletState {
  isConnected: boolean
  address?: string
  balance?: number
}

interface EmployerDashboardProps {
  walletState: WalletState
  onConnectWallet: () => void
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ walletState, onConnectWallet }) => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "pay", label: "Pay Employees", icon: CreditCard },
    { id: "employees", label: "Employee Management", icon: Users },
    { id: "history", label: "Payroll History", icon: FileText },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "treasury", label: "zkTreasury Overview", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const employees = [
    { id: 1, name: "Alice Johnson", role: "Senior Developer", salary: 5500, wallet: "0x1234...5678", status: "Active" },
    { id: 2, name: "Bob Smith", role: "Product Manager", salary: 6000, wallet: "0x2345...6789", status: "Active" },
    { id: 3, name: "Carol Davis", role: "Designer", salary: 4800, wallet: "0x3456...7890", status: "Active" },
  ]

  const payrollHistory = [
    { id: 1, date: "2024-12-15", amount: 16300, employees: 3, status: "Completed", zkProof: "zk_batch_dec_2024_xyz" },
    { id: 2, date: "2024-11-15", amount: 16300, employees: 3, status: "Completed", zkProof: "zk_batch_nov_2024_abc" },
    { id: 3, date: "2024-10-15", amount: 16300, employees: 3, status: "Completed", zkProof: "zk_batch_oct_2024_def" },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-900 to-indigo-800 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Treasury Balance</p>
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
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Monthly Payroll</p>
                <p className="text-xl font-semibold text-gray-900">$16,300</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Employees</p>
                <p className="text-xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Next Payroll</p>
                <p className="text-xl font-semibold text-gray-900">Jan 15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 bg-indigo-600 hover:bg-indigo-700" onClick={() => setActiveTab("pay")}>
              <div className="text-center">
                <CreditCard className="h-6 w-6 mx-auto mb-1" />
                <p>Pay Employees</p>
              </div>
            </Button>
            <Button variant="outline" className="h-20 bg-transparent" onClick={() => setActiveTab("employees")}>
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-1" />
                <p>Manage Employees</p>
              </div>
            </Button>
            <Button variant="outline" className="h-20 bg-transparent" onClick={() => setActiveTab("treasury")}>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-1" />
                <p>Treasury Overview</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payroll Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payrollHistory.slice(0, 3).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Payroll Completed</p>
                    <p className="text-sm text-gray-600">
                      {record.date} - ${record.amount.toLocaleString()} to {record.employees} employees
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPayEmployees = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pay Employees</CardTitle>
          <CardDescription>Send zkPayments to your employees individually or in bulk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Single Payment
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Bulk Payment
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload CSV
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Employee List</h3>
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-indigo-600">{employee.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-gray-600">
                        {employee.role} - ${employee.salary.toLocaleString()}/month
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {employee.status}
                    </Badge>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderEmployeeManagement = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>Manage employee details, salaries, and wallet connections</CardDescription>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search employees..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-3">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-indigo-600">{employee.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                      <p className="text-xs text-gray-500">Wallet: {employee.wallet}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">${employee.salary.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {employee.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPayrollHistory = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payroll History</CardTitle>
          <CardDescription>View and download historical payroll records with zkProof verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search payroll records..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-3">
              {payrollHistory.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium">Payroll - {record.date}</p>
                      <p className="text-sm text-gray-600">
                        ${record.amount.toLocaleString()} to {record.employees} employees
                      </p>
                      <p className="text-xs text-gray-500">zkProof: {record.zkProof}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {record.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payroll Analytics</CardTitle>
          <CardDescription>Insights into your payroll spending and employee costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Spending Chart */}
            <div className="space-y-4">
              <h3 className="font-medium">Monthly Payroll Spending</h3>
              <div className="h-48 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 flex items-end justify-between">
                <div className="flex items-end space-x-2 h-full">
                  {[12, 15, 16, 14, 16, 16].map((height, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-indigo-600 rounded-t w-8 transition-all duration-500"
                        style={{ height: `${height * 8}px` }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-1">
                        {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-indigo-600">$16.3K</p>
                  <p className="text-sm text-gray-600">This Month</p>
                </div>
              </div>
            </div>

            {/* Employee Cost Breakdown */}
            <div className="space-y-4">
              <h3 className="font-medium">Employee Cost Breakdown</h3>
              <div className="space-y-3">
                {employees.map((employee, index) => (
                  <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === 0 ? "bg-indigo-600" : index === 1 ? "bg-blue-500" : "bg-purple-500"
                        }`}
                      ></div>
                      <span className="font-medium">{employee.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${employee.salary.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">{((employee.salary / 16300) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">98.5%</p>
                  <p className="text-sm text-green-700">On-time Payments</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">$195K</p>
                  <p className="text-sm text-blue-700">YTD Payroll</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">2.3s</p>
                  <p className="text-sm text-purple-700">Avg Payment Time</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">100%</p>
                  <p className="text-sm text-orange-700">zkProof Verified</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTreasury = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>zkTreasury Overview</CardTitle>
          <CardDescription>Secure treasury management with zero-knowledge proofs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Treasury Balance */}
            <div className="space-y-4">
              <h3 className="font-medium">Treasury Balance</h3>
              <Card className="bg-gradient-to-br from-indigo-900 to-indigo-800 text-white">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Shield className="h-8 w-8" />
                      <Badge className="bg-green-500 text-white">Secured</Badge>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">
                        {walletState.isConnected
                          ? `$${walletState.balance?.toLocaleString() || "0"}`
                          : "Connect Wallet"}
                      </p>
                      <p className="text-sm opacity-90">Available Balance</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <p className="opacity-90">Reserved for Payroll</p>
                        <p className="font-medium">$16,300</p>
                      </div>
                      <div>
                        <p className="opacity-90">Emergency Fund</p>
                        <p className="font-medium">$50,000</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* zkProof Status */}
            <div className="space-y-4">
              <h3 className="font-medium">zkProof Verification Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Treasury Integrity</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Payment History</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Compliance Check</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Treasury Actions */}
          <div className="mt-6">
            <h3 className="font-medium mb-4">Treasury Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-16 bg-indigo-600 hover:bg-indigo-700">
                <div className="text-center">
                  <Plus className="h-5 w-5 mx-auto mb-1" />
                  <p className="text-sm">Add Funds</p>
                </div>
              </Button>
              <Button variant="outline" className="h-16 bg-transparent">
                <div className="text-center">
                  <Download className="h-5 w-5 mx-auto mb-1" />
                  <p className="text-sm">Export Records</p>
                </div>
              </Button>
              <Button variant="outline" className="h-16 bg-transparent">
                <div className="text-center">
                  <Shield className="h-5 w-5 mx-auto mb-1" />
                  <p className="text-sm">Generate Proof</p>
                </div>
              </Button>
            </div>
          </div>

          {/* Recent Treasury Activity */}
          <div className="mt-6">
            <h3 className="font-medium mb-4">Recent Treasury Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Payroll Payment Sent</p>
                    <p className="text-sm text-gray-600">Dec 15, 2024 - $16,300 to 3 employees</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Treasury Deposit</p>
                    <p className="text-sm text-gray-600">Dec 10, 2024 - $25,000 added to treasury</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">zkProof Generated</p>
                    <p className="text-sm text-gray-600">Dec 8, 2024 - Compliance verification completed</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Generated
                </Badge>
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
      case "pay":
        return renderPayEmployees()
      case "employees":
        return renderEmployeeManagement()
      case "history":
        return renderPayrollHistory()
      case "analytics":
        return renderAnalytics()
      case "treasury":
        return renderTreasury()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold">LeoPay Employer</h1>
          <p className="text-sm opacity-90">Payroll Management</p>
        </div>

        <nav className="px-4 space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id ? "bg-white/20 text-white font-medium" : "text-white/80 hover:bg-white/10"
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
            <Button onClick={onConnectWallet} className="w-full bg-white text-indigo-900 hover:bg-gray-100">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          ) : (
            <div className="p-3 bg-white/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium">Treasury Connected</span>
              </div>
              <p className="text-xs opacity-80 mt-1">
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
