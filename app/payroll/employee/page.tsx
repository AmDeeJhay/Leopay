"use client"

import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import { RoleBasedSidebar } from "@/components/dashboard/role-based-sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  DollarSign,
  Download,
  FileText,
  CheckCircle,
  Calendar,
  TrendingUp,
  Wallet,
  Shield,
  Eye,
  User,
} from "lucide-react"

export default function EmployeeDashboard() {
  const [walletStatus, setWalletStatus] = useState<"not_connected" | "connected_unverified" | "connected_active">(
    "connected_active",
  )
  const [showProofModal, setShowProofModal] = useState(false)

  const mockPayments = [
    {
      id: "1",
      date: "2024-01-15",
      amount: 5000,
      zkPayslip: "0xabc123...",
      status: "completed",
    },
    {
      id: "2",
      date: "2023-12-15",
      amount: 5000,
      zkPayslip: "0xdef456...",
      status: "completed",
    },
    {
      id: "3",
      date: "2023-11-15",
      amount: 5000,
      zkPayslip: "0xghi789...",
      status: "completed",
    },
    {
      id: "4",
      date: "2023-10-15",
      amount: 4800,
      zkPayslip: "0xjkl012...",
      status: "completed",
    },
  ]

  const totalReceived = mockPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const currentEmployer = "TechCorp Inc"

  const handleGenerateProof = () => {
    console.log("Generating zkProof of income...")
    setShowProofModal(false)
  }

  return (
    <RoleGuard allowedRoles={["employee"]}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <RoleBasedSidebar userRole="employee" userType="employee" />
        <div className="md:ml-64">
          <TopNavbar walletStatus={walletStatus} userName="Sarah Johnson" userEmail="sarah@techcorp.com" />
          <main className="p-6">
            <div className="space-y-8 animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
                    <p className="text-gray-600">Track your salary payments and generate zkProofs</p>
                  </div>
                </div>
              </div>

              {/* Summary Header */}
              <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-3xl p-8 text-white animate-slide-up shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-purple-100 mb-2">Current Employer</h3>
                    <p className="text-2xl font-bold">{currentEmployer}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-100 mb-2">Wallet Status</h3>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-xl font-semibold">Connected & Verified</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-100 mb-2">Total Received</h3>
                    <p className="text-2xl font-bold">${totalReceived.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="card-hover animate-slide-up animate-delay-100 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Latest Payment</CardTitle>
                    <DollarSign className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">$5,000</div>
                    <p className="text-xs text-gray-600 mt-1">January 15, 2024</p>
                  </CardContent>
                </Card>

                <Card className="card-hover animate-slide-up animate-delay-200 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">zkPayslips</CardTitle>
                    <FileText className="h-4 w-4 text-indigo-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">{mockPayments.length}</div>
                    <p className="text-xs text-gray-600 mt-1">Available for download</p>
                  </CardContent>
                </Card>

                <Card className="card-hover animate-slide-up animate-delay-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Next Payment</CardTitle>
                    <Calendar className="h-4 w-4 text-violet-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">Feb 15</div>
                    <p className="text-xs text-gray-600 mt-1">In 12 days</p>
                  </CardContent>
                </Card>

                <Card className="card-hover animate-slide-up animate-delay-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">On-time Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">100%</div>
                    <p className="text-xs text-green-600 font-medium mt-1">Perfect record</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment History Table */}
                <div className="lg:col-span-2">
                  <Card className="animate-slide-up animate-delay-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-gray-900">Salary Payments</CardTitle>
                          <CardDescription className="text-gray-600">
                            Your payment history with zkPayslip downloads
                          </CardDescription>
                        </div>
                        <Dialog open={showProofModal} onOpenChange={setShowProofModal}>
                          <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white rounded-2xl shadow-lg">
                              <Shield className="h-4 w-4 mr-2" />
                              Generate zkProof
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Generate zkProof of Income</DialogTitle>
                              <DialogDescription>
                                Create a privacy-preserving proof of your income without revealing exact amounts
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                  Generate proof that you earn more than a specified threshold without revealing your
                                  actual salary.
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleGenerateProof}
                                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white rounded-2xl"
                                >
                                  <Shield className="h-4 w-4 mr-2" />
                                  Generate Proof
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => setShowProofModal(false)}
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
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>zkPayslip</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockPayments.map((payment, index) => (
                            <TableRow key={payment.id} className={`animate-fade-in animate-delay-${index * 100}`}>
                              <TableCell className="font-medium text-gray-900">{payment.date}</TableCell>
                              <TableCell className="font-semibold text-gray-900">
                                ${payment.amount.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-green-50 text-green-700 border-green-200">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Completed
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" className="rounded-xl hover:bg-purple-50">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="rounded-xl hover:bg-purple-50">
                                    <Eye className="h-4 w-4" />
                                  </Button>
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
                  {/* Latest Payment Details */}
                  <Card className="animate-slide-up animate-delay-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">Latest Payment</CardTitle>
                      <CardDescription className="text-gray-600">Your most recent salary payment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Amount</span>
                        <span className="text-lg font-bold text-gray-900">$5,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Date</span>
                        <span className="text-sm font-medium text-gray-700">Jan 15, 2024</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">zkPayslip</span>
                        <Button variant="ghost" size="sm" className="rounded-xl hover:bg-purple-50">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wallet Status */}
                  <Card className="animate-slide-up animate-delay-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                        <Wallet className="h-5 w-5 text-purple-500" />
                        Wallet Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge className="bg-green-50 text-green-700 border-green-200">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Address</span>
                        <span className="text-sm font-mono text-gray-700">0xabc...123</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">zkVerified</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Balance</span>
                        <span className="text-sm font-semibold text-gray-900">$12,500</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* zkProof Generator */}
                  <Card className="animate-slide-up animate-delay-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">zkProof Generator</CardTitle>
                      <CardDescription className="text-gray-600">Generate privacy-preserving proofs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-2xl bg-transparent border-purple-200 text-purple-700 hover:bg-purple-50"
                        onClick={() => setShowProofModal(true)}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Income Proof
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-2xl bg-transparent border-purple-200 text-purple-700 hover:bg-purple-50"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Employment Proof
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-2xl bg-transparent border-purple-200 text-purple-700 hover:bg-purple-50"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Payment History Proof
                      </Button>
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
