"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { TopNavbar } from "@/components/layout/top-navbar"
import {
  Wallet,
  DollarSign,
  FileText,
  Plus,
  Download,
  CheckCircle,
  Settings,
  Shield,
  TrendingUp,
  Clock,
  CreditCard,
} from "lucide-react"

interface ContractorReceiverDashboardProps {
  walletConnected?: boolean
  onConnectWallet?: () => void
}

export function ContractorReceiverDashboard({
  walletConnected = false,
  onConnectWallet,
}: ContractorReceiverDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  const navigationItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: TrendingUp },
    { id: "my-contracts", label: "My Contracts", icon: FileText },
    { id: "timesheets", label: "Timesheets", icon: Clock },
    { id: "earnings", label: "Earnings & Withdrawals", icon: CreditCard },
    { id: "disputes", label: "Disputes", icon: Shield },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  const mockContracts = [
    {
      id: 1,
      client: "TechCorp Inc.",
      project: "Website Development",
      amount: 2500,
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-02-15",
    },
    {
      id: 2,
      client: "StartupXYZ",
      project: "Mobile App UI",
      amount: 1800,
      status: "Completed",
      startDate: "2023-12-15",
      endDate: "2024-01-10",
    },
    {
      id: 3,
      client: "DesignStudio",
      project: "Logo Design",
      amount: 500,
      status: "Pending",
      startDate: "2024-01-20",
      endDate: "2024-02-05",
    },
  ]

  const mockTimesheets = [
    { id: 1, date: "2024-01-15", project: "Website Development", hours: 8, rate: 75, total: 600 },
    { id: 2, date: "2024-01-14", project: "Website Development", hours: 6, rate: 75, total: 450 },
    { id: 3, date: "2024-01-13", project: "Mobile App UI", hours: 7, rate: 65, total: 455 },
  ]

  const mockEarnings = [
    { id: 1, client: "TechCorp Inc.", amount: 2500, date: "2024-01-15", status: "Paid", zkReceipt: "zk_receipt_001" },
    { id: 2, client: "StartupXYZ", amount: 1200, date: "2024-01-08", status: "Pending", zkReceipt: "zk_receipt_002" },
    {
      id: 3,
      client: "DesignStudio",
      amount: 800,
      date: "2024-01-03",
      status: "Withdrawn",
      zkReceipt: "zk_receipt_003",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Paid":
        return "bg-green-500"
      case "Completed":
      case "Withdrawn":
        return "bg-blue-500"
      case "Pending":
        return "bg-yellow-500"
      case "Disputed":
        return "bg-red-500"
      default:
        return "bg-slate-500"
    }
  }

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
            <div className="text-2xl font-bold text-indigo-900">$12,450.00</div>
            <p className="text-xs text-indigo-600">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$45,230.00</div>
            <p className="text-xs text-slate-600">+12% this quarter</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Active Contracts</CardTitle>
            <FileText className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">3</div>
            <p className="text-xs text-emerald-600">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">This Month Hours</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">156</div>
            <p className="text-xs text-orange-600">Across all contracts</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEarnings.slice(0, 3).map((earning) => (
              <div key={earning.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-slate-900 font-medium">${earning.amount} payment</p>
                  <p className="text-slate-600 text-sm">from {earning.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-700 text-sm">{earning.date}</p>
                  <Badge className={`${getStatusColor(earning.status)} text-white`}>{earning.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMyContracts = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">My Contracts</CardTitle>
        <CardDescription className="text-slate-600">View and manage your active contracts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockContracts.map((contract) => (
            <div key={contract.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <h3 className="text-slate-900 font-medium">{contract.project}</h3>
                <p className="text-slate-600 text-sm">Client: {contract.client}</p>
                <p className="text-slate-600 text-sm">
                  Duration: {contract.startDate} - {contract.endDate}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-slate-900 font-bold">${contract.amount}</p>
                  <Badge className={`${getStatusColor(contract.status)} text-white`}>{contract.status}</Badge>
                </div>
                <Button size="sm" variant="outline" className="border-indigo-600 text-indigo-600 bg-transparent">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderTimesheets = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Timesheets</CardTitle>
        <CardDescription className="text-slate-600">Track your work hours and submit timesheets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add New Timesheet
          </Button>

          <div className="space-y-3">
            {mockTimesheets.map((timesheet) => (
              <div key={timesheet.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-slate-900 font-medium">{timesheet.project}</p>
                  <p className="text-slate-600 text-sm">
                    {timesheet.date} • {timesheet.hours} hours @ ${timesheet.rate}/hr
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-900 font-bold">${timesheet.total}</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Submitted
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderEarnings = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Earnings & Withdrawals</CardTitle>
        <CardDescription className="text-slate-600">View your earnings and manage withdrawals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-indigo-600 text-sm">Available Balance</p>
                  <p className="text-2xl font-bold text-indigo-900">$12,450</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-green-600 text-sm">Total Earned</p>
                  <p className="text-2xl font-bold text-green-900">$45,230</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-slate-600 text-sm">Withdrawn</p>
                  <p className="text-2xl font-bold text-slate-900">$32,780</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Request Withdrawal</Button>

          <div className="space-y-3">
            {mockEarnings.map((earning) => (
              <div key={earning.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <h3 className="text-slate-900 font-medium">${earning.amount}</h3>
                  <p className="text-slate-600 text-sm">from {earning.client}</p>
                  <p className="text-slate-600 text-sm">{earning.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${getStatusColor(earning.status)} text-white`}>{earning.status}</Badge>
                  <Button size="sm" variant="outline" className="border-indigo-600 text-indigo-600 bg-transparent">
                    <Download className="h-4 w-4 mr-1" />
                    Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderDisputes = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Disputes</CardTitle>
        <CardDescription className="text-slate-600">Manage contract disputes and resolutions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No active disputes</p>
          <p className="text-slate-500 text-sm">All your contracts are running smoothly</p>
        </div>
      </CardContent>
    </Card>
  )

  const renderProfile = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Profile Settings</CardTitle>
        <CardDescription className="text-slate-600">Manage your contractor profile and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full-name" className="text-slate-700">
                Full Name
              </Label>
              <Input id="full-name" defaultValue="Alex Johnson" className="bg-slate-50 border-slate-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email
              </Label>
              <Input id="email" defaultValue="alex@example.com" className="bg-slate-50 border-slate-300" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-slate-700">
              Bio
            </Label>
            <Textarea
              id="bio"
              defaultValue="Experienced contractor specializing in web development and mobile applications."
              className="bg-slate-50 border-slate-300"
              rows={3}
            />
          </div>

          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Update Profile</Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "my-contracts":
        return renderMyContracts()
      case "timesheets":
        return renderTimesheets()
      case "earnings":
        return renderEarnings()
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
        {" "}
        {/* Added pt-16 to account for fixed top navbar */}
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/90 backdrop-blur-sm border-r border-slate-200 z-10">
          <div className="p-6">
            {/* Wallet Connection */}
            <div className="mb-8">
              {walletConnected ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Wallet Connected</span>
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
