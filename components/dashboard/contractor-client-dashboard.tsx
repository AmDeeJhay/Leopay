"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wallet,
  DollarSign,
  FileText,
  Users,
  Search,
  CheckCircle,
  XCircle,
  Settings,
  CreditCard,
  TrendingUp,
  Receipt,
  UserCheck,
  Filter,
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
  const [isPayModalOpen, setIsPayModalOpen] = useState(false)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "pay-contractor", label: "Pay Contractor", icon: CreditCard },
    { id: "manage-invoices", label: "Manage Invoices", icon: FileText },
    { id: "payment-history", label: "zkPayment History", icon: Receipt },
    { id: "contractor-search", label: "Contractor Search", icon: Search },
    { id: "settings", label: "Settings", icon: Settings },
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

  const mockPayments = [
    {
      id: 1,
      contractor: "Alice Johnson",
      amount: 2500,
      date: "2024-01-15",
      project: "Website Development",
      zkReceipt: "zk_receipt_001",
    },
    {
      id: 2,
      contractor: "Bob Smith",
      amount: 1200,
      date: "2024-01-08",
      project: "Mobile App",
      zkReceipt: "zk_receipt_002",
    },
    {
      id: 3,
      contractor: "Carol Davis",
      amount: 800,
      date: "2024-01-03",
      project: "Logo Design",
      zkReceipt: "zk_receipt_003",
    },
  ]

  const mockContractors = [
    { id: 1, name: "Alice Johnson", skills: ["React", "TypeScript", "Node.js"], rating: 4.9, jobs: 23, verified: true },
    { id: 2, name: "Bob Smith", skills: ["UI/UX", "Figma", "Prototyping"], rating: 4.8, jobs: 18, verified: true },
    {
      id: 3,
      name: "Carol Davis",
      skills: ["Graphic Design", "Branding", "Illustration"],
      rating: 4.7,
      jobs: 31,
      verified: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500"
      case "Approved":
        return "bg-blue-500"
      case "Pending":
        return "bg-yellow-500"
      case "Rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
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

      {/* Recent Invoices */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvoices.slice(0, 3).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-slate-900 font-medium">{invoice.project}</p>
                  <p className="text-slate-600 text-sm">by {invoice.contractor}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-900 font-bold">${invoice.amount}</p>
                  <Badge className={`${getStatusColor(invoice.status)} text-white`}>{invoice.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPayContractor = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Pay Contractor</CardTitle>
        <CardDescription className="text-slate-600">Send payment to a contractor for completed work</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contractor-wallet" className="text-slate-700">
              Contractor Wallet Address
            </Label>
            <Input
              id="contractor-wallet"
              placeholder="0x1234567890abcdef..."
              className="bg-slate-50 border-slate-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="select-invoice" className="text-slate-700">
              Select Invoice/Project
            </Label>
            <Select>
              <SelectTrigger className="bg-slate-50 border-slate-300">
                <SelectValue placeholder="Choose invoice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invoice-1">Website Development - $2,500</SelectItem>
                <SelectItem value="invoice-2">Mobile App UI - $1,800</SelectItem>
                <SelectItem value="custom">Custom Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="payment-amount" className="text-slate-700">
              Payment Amount (USD)
            </Label>
            <Input id="payment-amount" type="number" placeholder="2500.00" className="bg-slate-50 border-slate-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment-type" className="text-slate-700">
              Payment Type
            </Label>
            <Select>
              <SelectTrigger className="bg-slate-50 border-slate-300">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Payment</SelectItem>
                <SelectItem value="milestone">Milestone Payment</SelectItem>
                <SelectItem value="partial">Partial Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <h3 className="text-indigo-900 font-medium mb-2">zkPayment Summary</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-indigo-700">Amount:</span>
              <span className="text-indigo-900 font-medium">$2,500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-700">Network Fee:</span>
              <span className="text-indigo-900 font-medium">$2.50</span>
            </div>
            <div className="flex justify-between border-t border-indigo-200 pt-1">
              <span className="text-indigo-700 font-medium">Total:</span>
              <span className="text-indigo-900 font-bold">$2,502.50</span>
            </div>
          </div>
        </div>

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Confirm zkPayment</Button>
      </CardContent>
    </Card>
  )

  const renderManageInvoices = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Manage Invoices</CardTitle>
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

  const renderPaymentHistory = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-900">zkPayment History</CardTitle>
            <CardDescription className="text-slate-600">View all payments made to contractors</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Search by contractor or project..." className="w-64" />
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <h3 className="text-slate-900 font-medium">${payment.amount}</h3>
                <p className="text-slate-600 text-sm">to {payment.contractor}</p>
                <p className="text-slate-600 text-sm">Project: {payment.project}</p>
                <p className="text-slate-600 text-sm">{payment.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Completed
                </Badge>
                <Button size="sm" variant="outline" className="border-indigo-600 text-indigo-600 bg-transparent">
                  <Receipt className="h-4 w-4 mr-1" />
                  zkReceipt
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderContractorSearch = () => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Contractor Search</CardTitle>
        <CardDescription className="text-slate-600">Find and hire verified contractors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Search by skills..." className="bg-slate-50" />
            <Select>
              <SelectTrigger className="bg-slate-50">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                <SelectItem value="4.0+">4.0+ Stars</SelectItem>
                <SelectItem value="3.5+">3.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-slate-50">
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="verified">zkBadge Verified</SelectItem>
                <SelectItem value="all">All Contractors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contractor List */}
          <div className="space-y-4">
            {mockContractors.map((contractor) => (
              <div key={contractor.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-slate-900 font-medium">{contractor.name}</h3>
                    {contractor.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {contractor.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm mt-1">
                    ⭐ {contractor.rating} • {contractor.jobs} jobs completed
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-slate-300 bg-transparent">
                    View Profile
                  </Button>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Hire
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "pay-contractor":
        return renderPayContractor()
      case "manage-invoices":
        return renderManageInvoices()
      case "payment-history":
        return renderPaymentHistory()
      case "contractor-search":
        return renderContractorSearch()
      case "settings":
        return (
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Settings panel coming soon...</p>
            </CardContent>
          </Card>
        )
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-sm border-r border-slate-200 z-10">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-8">LeoPay</h1>

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
