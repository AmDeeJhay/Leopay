"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { TopNavbar } from "@/components/layout/top-navbar"
import {
  Wallet,
  DollarSign,
  FileText,
  Users,
  CheckCircle,
  XCircle,
  Settings,
  CreditCard,
  TrendingUp,
  Plus,
  Briefcase,
} from "lucide-react"

interface ContractorClientDashboardProps {
  walletConnected?: boolean
  onConnectWallet?: () => void
}

export function ContractorClientDashboard({
  walletConnected = false,
  onConnectWallet,
}: ContractorClientDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  const navigationItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: TrendingUp },
    { id: "post-contract", label: "Post Contract", icon: Plus },
    { id: "my-contracts", label: "My Contracts", icon: Briefcase },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "disputes", label: "Disputes", icon: XCircle },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  const mockContracts = [
    {
      id: 1,
      contractor: "Alice Johnson",
      project: "Website Development",
      amount: 2500,
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-02-15",
    },
    {
      id: 2,
      contractor: "Bob Smith",
      project: "Mobile App UI",
      amount: 1800,
      status: "Completed",
      startDate: "2023-12-15",
      endDate: "2024-01-10",
    },
    {
      id: 3,
      contractor: "Carol Davis",
      project: "Logo Design",
      amount: 500,
      status: "Pending",
      startDate: "2024-01-20",
      endDate: "2024-02-05",
    },
  ]

  const mockInvoices = [
    {
      id: 1,
      contractor: "Alice Johnson",
      project: "Website Development",
      amount: 2500,
      status: "Pending",
      date: "2024-01-15",
      wallet: "0x1234...5678",
    },
    {
      id: 2,
      contractor: "Bob Smith",
      project: "Mobile App UI",
      amount: 1800,
      status: "Approved",
      date: "2024-01-10",
      wallet: "0x8765...4321",
    },
    {
      id: 3,
      contractor: "Carol Davis",
      project: "Logo Design",
      amount: 500,
      status: "Paid",
      date: "2024-01-05",
      wallet: "0x9876...1234",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Paid":
        return "bg-green-500"
      case "Completed":
      case "Approved":
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
            <div className="text-2xl font-bold text-indigo-900">$25,450.00</div>
            <p className="text-xs text-indigo-600">Available for payments</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$78,230.00</div>
            <p className="text-xs text-slate-600">To contractors this year</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Active Contracts</CardTitle>
            <Users className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">12</div>
            <p className="text-xs text-emerald-600">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">3</div>
            <p className="text-xs text-orange-600">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockContracts.slice(0, 3).map((contract) => (
              <div key={contract.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-slate-900 font-medium">{contract.project}</p>
                  <p className="text-slate-600 text-sm">with {contract.contractor}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-900 font-bold">${contract.amount}</p>
                  <Badge className={`${getStatusColor(contract.status)} text-white`}>{contract.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPostContract = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Post New Contract</CardTitle>
        <CardDescription className="text-slate-600">Create a new contract opportunity for contractors</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="project-title" className="text-slate-700">
              Project Title
            </Label>
            <Input id="project-title" placeholder="Website Development" className="bg-slate-50 border-slate-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-slate-700">
              Budget (USD)
            </Label>
            <Input id="budget" type="number" placeholder="2500.00" className="bg-slate-50 border-slate-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-slate-700">
              Start Date
            </Label>
            <Input id="start-date" type="date" className="bg-slate-50 border-slate-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-slate-700">
              End Date
            </Label>
            <Input id="end-date" type="date" className="bg-slate-50 border-slate-300" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-slate-700">
            Project Description
          </Label>
          <textarea
            id="description"
            placeholder="Describe the project requirements..."
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-md"
            rows={4}
          />
        </div>

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Post Contract</Button>
      </CardContent>
    </Card>
  )

  const renderMyContracts = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">My Contracts</CardTitle>
        <CardDescription className="text-slate-600">Manage your active and completed contracts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockContracts.map((contract) => (
            <div key={contract.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <h3 className="text-slate-900 font-medium">{contract.project}</h3>
                <p className="text-slate-600 text-sm">Contractor: {contract.contractor}</p>
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

  const renderInvoices = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Invoices</CardTitle>
        <CardDescription className="text-slate-600">Review and manage invoices from contractors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <h3 className="text-slate-900 font-medium">{invoice.project}</h3>
                <p className="text-slate-600 text-sm">Contractor: {invoice.contractor}</p>
                <p className="text-slate-600 text-sm">Wallet: {invoice.wallet}</p>
                <p className="text-slate-600 text-sm">Date: {invoice.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-slate-900 font-bold">${invoice.amount}</p>
                  <Badge className={`${getStatusColor(invoice.status)} text-white`}>{invoice.status}</Badge>
                </div>
                {invoice.status === "Pending" && (
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
                {invoice.status === "Approved" && (
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <CreditCard className="h-4 w-4 mr-1" />
                    Pay
                  </Button>
                )}
              </div>
            </div>
          ))}
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
          <XCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
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
        <CardDescription className="text-slate-600">Manage your client profile and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-slate-700">
                Company Name
              </Label>
              <Input id="company-name" defaultValue="TechCorp Inc." className="bg-slate-50 border-slate-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email
              </Label>
              <Input id="email" defaultValue="contact@techcorp.com" className="bg-slate-50 border-slate-300" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">
              Company Description
            </Label>
            <textarea
              id="description"
              defaultValue="Leading technology company specializing in innovative solutions."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-md"
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
      case "post-contract":
        return renderPostContract()
      case "my-contracts":
        return renderMyContracts()
      case "invoices":
        return renderInvoices()
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
