"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { TopNavbar } from "@/components/layout/top-navbar"
import {
  Users,
  Wallet,
  DollarSign,
  Calendar,
  Upload,
  Settings,
  BarChart3,
  CreditCard,
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

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: BarChart3 },
    { id: "postings", label: "Job Postings", icon: Plus },
    { id: "applicants", label: "Applicants", icon: Users },
    { id: "payroll", label: "Payroll", icon: CreditCard },
    { id: "disputes", label: "Disputes", icon: Shield },
    { id: "profile", label: "Profile", icon: Settings },
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

  const jobPostings = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      applicants: 12,
      status: "Active",
      posted: "2024-01-10",
    },
    { id: 2, title: "UX Designer", department: "Design", applicants: 8, status: "Active", posted: "2024-01-08" },
    { id: 3, title: "Product Manager", department: "Product", applicants: 15, status: "Closed", posted: "2024-01-05" },
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
                <p className="text-sm text-indigo-700">Treasury Balance</p>
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
              <DollarSign className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-sm text-slate-700">Monthly Payroll</p>
                <p className="text-xl font-semibold text-slate-900">$16,300</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-emerald-700">Employees</p>
                <p className="text-xl font-semibold text-emerald-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-700">Next Payroll</p>
                <p className="text-xl font-semibold text-orange-900">Jan 15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              className="h-20 bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => setActiveTab("payroll")}
            >
              <div className="text-center">
                <CreditCard className="h-6 w-6 mx-auto mb-1" />
                <p>Run Payroll</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-20 border-slate-300 bg-transparent"
              onClick={() => setActiveTab("postings")}
            >
              <div className="text-center">
                <Plus className="h-6 w-6 mx-auto mb-1" />
                <p>Post Job</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-20 border-slate-300 bg-transparent"
              onClick={() => setActiveTab("applicants")}
            >
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-1" />
                <p>View Applicants</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Payroll Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payrollHistory.slice(0, 3).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-slate-900">Payroll Completed</p>
                    <p className="text-sm text-slate-600">
                      {record.date} - ${record.amount.toLocaleString()} to {record.employees} employees
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">{record.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderJobPostings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Job Postings</h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      <div className="grid gap-4">
        {jobPostings.map((job) => (
          <Card key={job.id} className="bg-white border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                  <p className="text-slate-600">{job.department}</p>
                  <p className="text-sm text-slate-500">Posted: {job.posted}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">{job.applicants}</p>
                    <p className="text-sm text-slate-600">Applicants</p>
                  </div>
                  <Badge
                    className={
                      job.status === "Active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-slate-100 text-slate-800 border-slate-200"
                    }
                  >
                    {job.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-slate-300 bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderApplicants = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Job Applicants</CardTitle>
        <CardDescription className="text-slate-600">Review and manage job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No pending applications</p>
          <p className="text-slate-500 text-sm">Applications will appear here when candidates apply</p>
        </div>
      </CardContent>
    </Card>
  )

  const renderPayroll = () => (
    <div className="space-y-6">
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Payroll Management</CardTitle>
          <CardDescription className="text-slate-600">Manage employee salaries and run payroll</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <CreditCard className="h-4 w-4 mr-2" />
                Run Payroll
              </Button>
              <Button variant="outline" className="border-slate-300 bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Upload CSV
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium text-slate-900">Employee List</h3>
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-indigo-600">{employee.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{employee.name}</p>
                      <p className="text-sm text-slate-600">
                        {employee.role} - ${employee.salary.toLocaleString()}/month
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">{employee.status}</Badge>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
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

  const renderDisputes = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Disputes</CardTitle>
        <CardDescription className="text-slate-600">Manage employment disputes and resolutions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No active disputes</p>
          <p className="text-slate-500 text-sm">All employment matters are running smoothly</p>
        </div>
      </CardContent>
    </Card>
  )

  const renderProfile = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Company Profile</CardTitle>
        <CardDescription className="text-slate-600">Manage your company information and settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Company Name</label>
            <Input defaultValue="TechCorp Inc." className="border-slate-300" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Industry</label>
            <Input defaultValue="Technology" className="border-slate-300" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Company Description</label>
          <textarea
            defaultValue="Leading technology company specializing in innovative solutions."
            className="w-full p-3 border border-slate-300 rounded-md"
            rows={3}
          />
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Update Profile</Button>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "postings":
        return renderJobPostings()
      case "applicants":
        return renderApplicants()
      case "payroll":
        return renderPayroll()
      case "disputes":
        return renderDisputes()
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
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-indigo-900">Treasury Connected</span>
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
