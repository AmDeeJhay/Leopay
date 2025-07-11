"use client"

import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import { RoleBasedSidebar } from "@/components/dashboard/role-based-sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  Upload,
  Send,
  Eye,
  Wallet,
  TrendingUp,
  Briefcase,
} from "lucide-react"

export default function ContractorDashboard() {
  const [walletStatus, setWalletStatus] = useState<"not_connected" | "connected_unverified" | "connected_active">(
    "connected_active",
  )
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)

  const mockContracts = [
    {
      id: "1",
      name: "Website Development",
      client: "TechCorp Inc",
      amount: 5000,
      status: "completed",
      date: "2024-01-15",
      zkReceipt: "0xabc123...",
    },
    {
      id: "2",
      name: "Mobile App Design",
      client: "StartupXYZ",
      amount: 3500,
      status: "in_progress",
      date: "2024-01-20",
      zkReceipt: null,
    },
    {
      id: "3",
      name: "API Integration",
      client: "Enterprise Ltd",
      amount: 2800,
      status: "pending",
      date: "2024-01-25",
      zkReceipt: null,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "in_progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleUploadInvoice = () => {
    console.log("Uploading invoice...")
    setShowInvoiceModal(false)
  }

  return (
    <RoleGuard allowedRoles={["freelancer"]}>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
        <RoleBasedSidebar userRole="freelancer" userType="contractor" />
        <div className="md:ml-64">
          <TopNavbar walletStatus={walletStatus} userName="John Contractor" userEmail="john@contractor.com" />
          <main className="p-6">
            <div className="space-y-8 animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Contractor Dashboard</h1>
                    <p className="text-gray-600">Manage your contracts and receive payments</p>
                  </div>
                </div>
              </div>

              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-3xl p-8 text-white animate-slide-up shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Welcome back, John! 🚀</h2>
                    <p className="text-white/90">You have 2 active contracts and 1 pending payment</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="h-5 w-5" />
                      <span className="font-medium">Wallet Connected</span>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">zkVerified</Badge>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="card-hover animate-slide-up animate-delay-100 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Active Contracts</CardTitle>
                    <FileText className="h-4 w-4 text-violet-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">
                      {mockContracts.filter((c) => c.status === "in_progress").length}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">In progress</p>
                  </CardContent>
                </Card>

                <Card className="card-hover animate-slide-up animate-delay-200 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pending Payments</CardTitle>
                    <Clock className="h-4 w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">
                      {mockContracts.filter((c) => c.status === "pending").length}
                    </div>
                    <p className="text-xs text-yellow-600 mt-1">Awaiting payment</p>
                  </CardContent>
                </Card>

                <Card className="card-hover animate-slide-up animate-delay-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">$5,000</div>
                    <p className="text-xs text-green-600 font-medium mt-1">+25% from last month</p>
                  </CardContent>
                </Card>

                <Card className="card-hover animate-slide-up animate-delay-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-indigo-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">95%</div>
                    <p className="text-xs text-gray-600 mt-1">Contract completion</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contracts Table */}
                <div className="lg:col-span-2">
                  <Card className="animate-slide-up animate-delay-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-gray-900">Contract Status</CardTitle>
                          <CardDescription className="text-gray-600">
                            Track your contracts and payment statuses
                          </CardDescription>
                        </div>
                        <Dialog open={showInvoiceModal} onOpenChange={setShowInvoiceModal}>
                          <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 text-white rounded-2xl shadow-lg">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Invoice
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Upload New Invoice</DialogTitle>
                              <DialogDescription>Create a new invoice for your contract work</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="contract">Contract Name</Label>
                                <Input id="contract" placeholder="Enter contract name" className="rounded-2xl" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input id="amount" placeholder="Enter amount" className="rounded-2xl" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="wallet">Client Wallet Address</Label>
                                <Input id="wallet" placeholder="0x..." className="rounded-2xl" />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleUploadInvoice}
                                  className="flex-1 bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 text-white rounded-2xl"
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Invoice
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => setShowInvoiceModal(false)}
                                  className="rounded-2xl bg-transparent"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Contract</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockContracts.map((contract, index) => (
                            <TableRow key={contract.id} className={`animate-fade-in animate-delay-${index * 100}`}>
                              <TableCell className="font-medium text-gray-900">{contract.name}</TableCell>
                              <TableCell className="text-gray-600">{contract.client}</TableCell>
                              <TableCell className="font-semibold text-gray-900">
                                ${contract.amount.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(contract.status)}`}>
                                  {getStatusIcon(contract.status)}
                                  {contract.status.replace("_", " ")}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {contract.status === "pending" && (
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 text-white rounded-xl"
                                    >
                                      <Send className="h-4 w-4 mr-1" />
                                      Request Payment
                                    </Button>
                                  )}
                                  {contract.zkReceipt && (
                                    <Button variant="ghost" size="sm" className="rounded-xl hover:bg-violet-50">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Upload Invoice Card */}
                  <Card className="animate-slide-up animate-delay-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">Quick Upload</CardTitle>
                      <CardDescription className="text-gray-600">Upload a new invoice quickly</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-2 border-dashed border-violet-300 rounded-2xl p-6 text-center bg-violet-50/50">
                        <Upload className="h-8 w-8 text-violet-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                      </div>
                      <Button
                        onClick={() => setShowInvoiceModal(true)}
                        className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 text-white rounded-2xl"
                      >
                        Create Invoice
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Payment History */}
                  <Card className="animate-slide-up animate-delay-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">Recent Payments</CardTitle>
                      <CardDescription className="text-gray-600">Your latest zkReceipts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockContracts
                          .filter((c) => c.zkReceipt)
                          .map((contract, index) => (
                            <div
                              key={contract.id}
                              className={`flex items-center justify-between p-3 rounded-2xl bg-violet-50/50 animate-fade-in animate-delay-${index * 100}`}
                            >
                              <div>
                                <p className="font-medium text-gray-900">${contract.amount.toLocaleString()}</p>
                                <p className="text-sm text-gray-600">{contract.name}</p>
                                <p className="text-xs text-gray-500">{contract.date}</p>
                              </div>
                              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-violet-100">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
