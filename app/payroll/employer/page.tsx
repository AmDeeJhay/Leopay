"use client"

import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import { RoleBasedSidebar } from "@/components/dashboard/role-based-sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Wallet,
  Plus,
  Download,
  FileText,
  CheckCircle,
  Send,
  Eye,
  Building,
} from "lucide-react"
import Link from "next/link"

export default function EmployerPayrollDashboard() {
  const [walletStatus, setWalletStatus] = useState<"not_connected" | "connected_unverified" | "connected_active">(
    "connected_active",
  )
  const [showPayrollModal, setShowPayrollModal] = useState(false)

  const mockEmployees = [
    {
      id: "1",
      name: "Sarah Johnson",
      position: "Senior Developer",
      wallet: "0x1234...abcd",
      amount: 5000,
      date: "2024-01-15",
      zkPayslip: "0xabc123...",
      status: "completed",
    },
    {
      id: "2",
      name: "Mike Chen",
      position: "UI/UX Designer",
      wallet: "0x5678...efgh",
      amount: 4500,
      date: "2024-01-15",
      zkPayslip: "0xdef456...",
      status: "completed",
    },
    {
      id: "3",
      name: "Emily Davis",
      position: "Product Manager",
      wallet: "0x9abc...ijkl",
      amount: 5500,
      date: "2024-01-15",
      zkPayslip: "0xghi789...",
      status: "completed",
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      position: "DevOps Engineer",
      wallet: "0xdef0...mnop",
      amount: 4800,
      date: "2024-01-15",
      zkPayslip: "0xjkl012...",
      status: "completed",
    },
  ]

  const totalPayroll = mockEmployees.reduce((sum, emp) => sum + emp.amount, 0)

  const handleSendPayroll = () => {
    console.log("Sending payroll to all employees...")
    setShowPayrollModal(false)
  }

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
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
                    <p className="text-gray-600">Manage your team's payroll with privacy and compliance</p>
                  </div>
                </div>
              </div>

              {/* KPI Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="card-hover animate-slide-up animate-delay-100 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Payroll Sent</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">${totalPayroll.toLocaleString()}</div>
                    <p className="text-xs text-green-600 font-medium mt-1">This month</p>
                  </CardContent>
                </Card>

                <Card className="card-hover animate-slide-up animate-delay-200 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Number of Employees</CardTitle>
                    <Users className="h-4 w-4 text-indigo-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">{mockEmployees.length}</div>
                    <p className="text-xs text-gray-600 mt-1">Active employees</p>
                  </CardContent>
                </Card>

                <Card className="card-hover animate-slide-up animate-delay-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Last Payment Date</CardTitle>
                    <Calendar className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">Jan 15</div>
                    <p className="text-xs text-gray-600 mt-1">Next: Feb 15</p>
                  </CardContent>
                </Card>

                <Card className="card-hover animate-slide-up animate-delay-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">100%</div>
                    <p className="text-xs text-green-600 font-medium mt-1">On-time payments</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Recent Payments Table */}
                <div className="lg:col-span-3">
                  <Card className="animate-slide-up animate-delay-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-gray-900">Recent Payments</CardTitle>
                          <CardDescription className="text-gray-600">
                            Employee salary payments with zkPayslips
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Link href="/payroll/employees">
                            <Button
                              variant="outline"
                              className="rounded-2xl bg-transparent border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                            >
                              <Users className="h-4 w-4 mr-2" />
                              View All Employees
                            </Button>
                          </Link>
                          <Dialog open={showPayrollModal} onOpenChange={setShowPayrollModal}>
                            <DialogTrigger asChild>
                              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white rounded-2xl shadow-lg">
                                <Plus className="h-4 w-4 mr-2" />
                                Send Payroll
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Send Payroll</DialogTitle>
                                <DialogDescription>
                                  Send payments to selected employees with zkProof generation
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="amount">Total Amount</Label>
                                  <Input
                                    id="amount"
                                    placeholder="Enter total amount"
                                    className="rounded-2xl"
                                    defaultValue={`$${totalPayroll.toLocaleString()}`}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="employees">Select Employees</Label>
                                  <div className="text-sm text-gray-600">{mockEmployees.length} employees selected</div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={handleSendPayroll}
                                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white rounded-2xl"
                                  >
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Payroll
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => setShowPayrollModal(false)}
                                    className="rounded-2xl bg-transparent"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Employee Name</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Amount Paid</TableHead>
                            <TableHead>Wallet Address</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>zkPayslip</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockEmployees.map((employee, index) => (
                            <TableRow key={employee.id} className={`animate-fade-in animate-delay-${index * 100}`}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm">
                                      {employee.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <span className="font-medium text-gray-900">{employee.name}</span>
                                    <p className="text-xs text-gray-500">{employee.position}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-600">{employee.position}</TableCell>
                              <TableCell className="font-semibold text-gray-900">
                                ${employee.amount.toLocaleString()}
                              </TableCell>
                              <TableCell className="font-mono text-sm text-gray-600">{employee.wallet}</TableCell>
                              <TableCell className="text-gray-600">{employee.date}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Available
                                  </Badge>
                                  <Button variant="ghost" size="sm" className="rounded-xl hover:bg-indigo-50">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="rounded-xl hover:bg-indigo-50">
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
                  {/* Wallet Status */}
                  <Card className="animate-slide-up animate-delay-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                        <Wallet className="h-5 w-5 text-indigo-500" />
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
                        <span className="text-sm font-semibold text-gray-900">$50,000</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="animate-slide-up animate-delay-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-2xl bg-transparent border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                        onClick={() => setShowPayrollModal(true)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Bulk Payroll
                      </Button>
                      <Link href="/payroll/employees">
                        <Button
                          variant="outline"
                          className="w-full justify-start rounded-2xl bg-transparent border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Manage Employees
                        </Button>
                      </Link>
                      <Link href="/payroll/transactions">
                        <Button
                          variant="outline"
                          className="w-full justify-start rounded-2xl bg-transparent border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Transactions
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-2xl bg-transparent border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export zkPayslips
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
