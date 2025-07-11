"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { WalletStatus } from "@/lib/types"
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
} from "lucide-react"

interface BusinessDashboardProps {
  walletStatus: WalletStatus
  setWalletStatus: (status: WalletStatus) => void
}

export function BusinessDashboard({ walletStatus, setWalletStatus }: BusinessDashboardProps) {
  const [showPayrollModal, setShowPayrollModal] = useState(false)

  const mockEmployees = [
    {
      id: "1",
      name: "Sarah Johnson",
      wallet: "0x1234...abcd",
      amount: 5000,
      date: "2024-01-15",
      zkPayslip: "0xabc123...",
    },
    { id: "2", name: "Mike Chen", wallet: "0x5678...efgh", amount: 4500, date: "2024-01-15", zkPayslip: "0xdef456..." },
    {
      id: "3",
      name: "Emily Davis",
      wallet: "0x9abc...ijkl",
      amount: 5500,
      date: "2024-01-15",
      zkPayslip: "0xghi789...",
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      wallet: "0xdef0...mnop",
      amount: 4800,
      date: "2024-01-15",
      zkPayslip: "0xjkl012...",
    },
  ]

  const totalPayroll = mockEmployees.reduce((sum, emp) => sum + emp.amount, 0)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 text-white animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Payroll Dashboard 💼</h1>
            <p className="text-white/90 text-lg">Manage your team's payments with privacy and compliance</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-5 w-5" />
              <span className="font-medium">
                {walletStatus === "connected_active" ? "Wallet Connected" : "Connect Wallet"}
              </span>
            </div>
            {walletStatus !== "connected_active" && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setWalletStatus("connected_active")}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Connect Now
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover animate-slide-up animate-delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Payroll Sent</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-green-600 font-medium mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-up animate-delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{mockEmployees.length}</div>
            <p className="text-xs text-gray-600 mt-1">Active employees</p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-up animate-delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Last Payment</CardTitle>
            <Calendar className="h-4 w-4 text-accent-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">Jan 15</div>
            <p className="text-xs text-gray-600 mt-1">Next: Feb 15</p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-up animate-delay-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">100%</div>
            <p className="text-xs text-green-600 font-medium mt-1">On-time payments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Recent Payments Table */}
        <div className="lg:col-span-3">
          <Card className="animate-slide-up animate-delay-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Recent Payments</CardTitle>
                  <CardDescription>Employee salary payments with zkPayslips</CardDescription>
                </div>
                <Button
                  onClick={() => setShowPayrollModal(true)}
                  className="bg-aleo-gradient hover:opacity-90 text-white rounded-2xl"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Send Payroll
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Wallet Address</TableHead>
                    <TableHead>Amount</TableHead>
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
                            <AvatarFallback className="bg-primary-100 text-primary-700 text-sm">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{employee.wallet}</TableCell>
                      <TableCell className="font-semibold">${employee.amount.toLocaleString()}</TableCell>
                      <TableCell>{employee.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Available
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            <Download className="h-4 w-4" />
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
          <Card className="animate-slide-up animate-delay-500">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge
                  className={
                    walletStatus === "connected_active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }
                >
                  {walletStatus === "connected_active" ? "Connected" : "Not Connected"}
                </Badge>
              </div>
              {walletStatus === "connected_active" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Address</span>
                    <span className="text-sm font-mono">0xabc...123</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">zkVerified</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Balance</span>
                    <span className="text-sm font-semibold">$50,000</span>
                  </div>
                </>
              )}
              {walletStatus !== "connected_active" && (
                <Button
                  onClick={() => setWalletStatus("connected_active")}
                  className="w-full bg-aleo-gradient hover:opacity-90 text-white rounded-2xl"
                >
                  Connect Wallet
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="animate-slide-up animate-delay-500">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start rounded-2xl bg-transparent"
                onClick={() => setShowPayrollModal(true)}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Bulk Payroll
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-2xl bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Manage Employees
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-2xl bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Generate Reports
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-2xl bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export zkPayslips
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Send Payroll Modal Placeholder */}
      {showPayrollModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md animate-scale-in">
            <CardHeader>
              <CardTitle>Send Payroll</CardTitle>
              <CardDescription>Send payments to all employees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Send className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <p className="text-gray-600">Payroll sending feature coming soon!</p>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-2xl bg-transparent"
                onClick={() => setShowPayrollModal(false)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
