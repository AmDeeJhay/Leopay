"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  DollarSign,
  Calendar,
  FileText,
  Plus,
  Download,
  Upload,
  CheckCircle,
  Settings,
  Shield,
  TrendingUp,
  Receipt,
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
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "submit-invoice", label: "Submit Invoice", icon: Plus },
    { id: "my-invoices", label: "My Invoices", icon: FileText },
    { id: "payment-history", label: "Payment History", icon: Receipt },
    { id: "proof-contract", label: "Proof of Contract", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const mockInvoices = [
    {
      id: 1,
      client: "0x1234...5678",
      project: "Website Development",
      amount: 2500,
      status: "Paid",
      date: "2024-01-15",
    },
    { id: 2, client: "0x8765...4321", project: "Mobile App UI", amount: 1800, status: "Pending", date: "2024-01-10" },
    { id: 3, client: "0x9876...1234", project: "Logo Design", amount: 500, status: "Rejected", date: "2024-01-05" },
  ]

  const mockPayments = [
    { id: 1, client: "TechCorp Inc.", amount: 2500, date: "2024-01-15", zkReceipt: "zk_receipt_001" },
    { id: 2, client: "StartupXYZ", amount: 1200, date: "2024-01-08", zkReceipt: "zk_receipt_002" },
    { id: 3, client: "DesignStudio", amount: 800, date: "2024-01-03", zkReceipt: "zk_receipt_003" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500"
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
        <Card className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 border-violet-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-violet-100">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$12,450.00</div>
            <p className="text-xs text-violet-300">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-100">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$45,230.00</div>
            <p className="text-xs text-emerald-300">+12% this quarter</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Last Payment</CardTitle>
            <Calendar className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Jan 15</div>
            <p className="text-xs text-blue-300">$2,500 from TechCorp</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Completed Contracts</CardTitle>
            <CheckCircle className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">23</div>
            <p className="text-xs text-orange-300">+3 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPayments.slice(0, 3).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">${payment.amount} received</p>
                  <p className="text-gray-400 text-sm">from {payment.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">{payment.date}</p>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Completed
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSubmitInvoice = () => (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Submit New Invoice</CardTitle>
        <CardDescription className="text-gray-400">Create and submit an invoice to your client</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client-wallet" className="text-gray-300">
              Client Wallet Address
            </Label>
            <Input
              id="client-wallet"
              placeholder="0x1234567890abcdef..."
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-title" className="text-gray-300">
              Project Title
            </Label>
            <Input
              id="project-title"
              placeholder="Website Development"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">
              Amount (USD)
            </Label>
            <Input id="amount" type="number" placeholder="2500.00" className="bg-gray-800 border-gray-600 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="due-date" className="text-gray-300">
              Due Date
            </Label>
            <Input id="due-date" type="date" className="bg-gray-800 border-gray-600 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-300">
            Project Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe the work completed..."
            className="bg-gray-800 border-gray-600 text-white"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Upload Invoice/PDF</Label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-400">Drag and drop your invoice or click to browse</p>
            <Button variant="outline" className="mt-2 border-gray-600 text-gray-300 bg-transparent">
              Choose File
            </Button>
          </div>
        </div>

        <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">Submit Invoice</Button>
      </CardContent>
    </Card>
  )

  const renderMyInvoices = () => (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">My Invoices</CardTitle>
        <CardDescription className="text-gray-400">Track your submitted invoices and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex-1">
                <h3 className="text-white font-medium">{invoice.project}</h3>
                <p className="text-gray-400 text-sm">Client: {invoice.client}</p>
                <p className="text-gray-400 text-sm">Date: {invoice.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-white font-bold">${invoice.amount}</p>
                  <Badge className={`${getStatusColor(invoice.status)} text-white`}>{invoice.status}</Badge>
                </div>
                {invoice.status === "Rejected" && (
                  <Button size="sm" variant="outline" className="border-violet-600 text-violet-400 bg-transparent">
                    Resubmit
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
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Payment History</CardTitle>
        <CardDescription className="text-gray-400">
          View all your received payments and download receipts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div>
                <h3 className="text-white font-medium">${payment.amount}</h3>
                <p className="text-gray-400 text-sm">from {payment.client}</p>
                <p className="text-gray-400 text-sm">{payment.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-400 border-green-400">
                  Completed
                </Badge>
                <Button size="sm" variant="outline" className="border-violet-600 text-violet-400 bg-transparent">
                  <Download className="h-4 w-4 mr-1" />
                  zkReceipt
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderProofOfContract = () => (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Proof of Contract</CardTitle>
        <CardDescription className="text-gray-400">
          Upload contract hashes and delivery proofs for transparency
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Contract Hash</Label>
            <Input placeholder="0xabcdef1234567890..." className="bg-gray-800 border-gray-600 text-white" />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Upload Delivery Proof</Label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Shield className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Upload zkProof of delivery</p>
              <Button variant="outline" className="mt-2 border-gray-600 text-gray-300 bg-transparent">
                Choose File
              </Button>
            </div>
          </div>

          <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">Submit Proof</Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-medium">Submitted Proofs</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div>
                <p className="text-white text-sm">Website Development Contract</p>
                <p className="text-gray-400 text-xs">Hash: 0xabc...def</p>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400">
                Verified
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "submit-invoice":
        return renderSubmitInvoice()
      case "my-invoices":
        return renderMyInvoices()
      case "payment-history":
        return renderPaymentHistory()
      case "proof-contract":
        return renderProofOfContract()
      case "settings":
        return (
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Settings panel coming soon...</p>
            </CardContent>
          </Card>
        )
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-violet-900">
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-gray-900/80 backdrop-blur-sm border-r border-gray-700 z-10">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-8">LeoPay</h1>

            {/* Wallet Connection */}
            <div className="mb-8">
              {walletConnected ? (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Wallet Connected</span>
                </div>
              ) : (
                <Button onClick={onConnectWallet} className="w-full bg-violet-600 hover:bg-violet-700 text-white">
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
                        ? "bg-violet-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
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
