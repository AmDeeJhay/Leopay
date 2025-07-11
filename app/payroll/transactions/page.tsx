"use client"

import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import { RoleBasedSidebar } from "@/components/dashboard/role-based-sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Search, DollarSign, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react"

export default function TransactionsPage() {
  const [walletStatus, setWalletStatus] = useState<"not_connected" | "connected_unverified" | "connected_active">(
    "connected_active",
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const mockTransactions = [
    {
      id: "tx_001",
      type: "payroll",
      recipient: "Sarah Johnson",
      amount: 5000,
      status: "completed",
      date: "2024-01-15",
      txHash: "0xabc123...def456",
      zkPayslip: "0xzkp789...abc012",
      fee: 2.5,
    },
    {
      id: "tx_002",
      type: "payroll",
      recipient: "Mike Chen",
      amount: 4500,
      status: "completed",
      date: "2024-01-15",
      txHash: "0xdef456...ghi789",
      zkPayslip: "0xzkp012...def345",
      fee: 2.25,
    },
    {
      id: "tx_003",
      type: "payroll",
      recipient: "Emily Davis",
      amount: 5500,
      status: "pending",
      date: "2024-01-16",
      txHash: null,
      zkPayslip: null,
      fee: 2.75,
    },
    {
      id: "tx_004",
      type: "bulk_payroll",
      recipient: "All Employees",
      amount: 19800,
      status: "processing",
      date: "2024-01-16",
      txHash: "0xghi789...jkl012",
      zkPayslip: null,
      fee: 9.9,
    },
    {
      id: "tx_005",
      type: "payroll",
      recipient: "Alex Rodriguez",
      amount: 4800,
      status: "failed",
      date: "2024-01-14",
      txHash: null,
      zkPayslip: null,
      fee: 2.4,
    },
  ]

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && transaction.date === "2024-01-16") ||
      (dateFilter === "week" && new Date(transaction.date) >= new Date("2024-01-10"))

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "failed":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "failed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payroll":
        return "bg-indigo-50 text-indigo-700 border-indigo-200"
      case "bulk_payroll":
        return "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0)
  const completedTransactions = filteredTransactions.filter((tx) => tx.status === "completed").length
  const totalFees = filteredTransactions.reduce((sum, tx) => sum + tx.fee, 0)

  return (
    <RoleGuard allowedRoles={["employee"]}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <RoleBasedSidebar userRole="employee" userType="employer" />
        <div className="md:ml-64">
          <TopNavbar walletStatus={walletStatus} userName="Company Admin" userEmail="admin@techcorp.com" />
          <main className="p-6">
            <div className="space-y-8 animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
                    <p className="text-gray-600">View and manage all payroll transactions</p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white rounded-2xl shadow-lg">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Amount</p>
                        <p className="text-3xl font-bold gradient-text">${totalAmount.toLocaleString()}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-3xl font-bold gradient-text">{completedTransactions}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-indigo-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                        <p className="text-3xl font-bold gradient-text">{filteredTransactions.length}</p>
                      </div>
                      <FileText className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Fees</p>
                        <p className="text-3xl font-bold gradient-text">${totalFees.toFixed(2)}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transactions Table */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-gray-900">All Transactions</CardTitle>
                      <CardDescription className="text-gray-600">
                        Complete history of payroll transactions and zkPayslips
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search transactions..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 rounded-2xl bg-white/80"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-32 rounded-2xl bg-white/80">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-32 rounded-2xl bg-white/80">
                          <SelectValue placeholder="Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction, index) => (
                        <TableRow key={transaction.id} className={`animate-fade-in animate-delay-${index * 100}`}>
                          <TableCell>
                            <div>
                              <p className="font-mono text-sm text-gray-900">{transaction.id}</p>
                              {transaction.txHash && (
                                <p className="font-mono text-xs text-gray-500">{transaction.txHash}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getTypeColor(transaction.type)}`}>
                              {transaction.type.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{transaction.recipient}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold text-gray-900">${transaction.amount.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">Fee: ${transaction.fee}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(transaction.status)}`}>
                              {getStatusIcon(transaction.status)}
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700">{transaction.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-indigo-50">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {transaction.zkPayslip && (
                                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-indigo-50">
                                  <Download className="h-4 w-4" />
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
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
