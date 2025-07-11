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
  Wallet,
  Users,
  TrendingUp,
  TrendingDown,
  Send,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  Building2,
} from "lucide-react"

export default function DAODashboard() {
  const [walletStatus, setWalletStatus] = useState<"not_connected" | "connected_unverified" | "connected_active">(
    "connected_active",
  )
  const [showBatchModal, setShowBatchModal] = useState(false)

  const mockContributors = [
    {
      id: "1",
      name: "Alice Developer",
      role: "Core Developer",
      wallet: "0x1234...abcd",
      amountDue: 2500,
      zkReceipt: "0xabc123...",
      status: "paid",
    },
    {
      id: "2",
      name: "Bob Designer",
      role: "UI/UX Designer",
      wallet: "0x5678...efgh",
      amountDue: 2000,
      zkReceipt: null,
      status: "pending",
    },
    {
      id: "3",
      name: "Carol Manager",
      role: "Community Manager",
      wallet: "0x9abc...ijkl",
      amountDue: 1800,
      zkReceipt: "0xdef456...",
      status: "paid",
    },
    {
      id: "4",
      name: "David Auditor",
      role: "Security Auditor",
      wallet: "0xdef0...mnop",
      amountDue: 3000,
      zkReceipt: null,
      status: "pending",
    },
  ]

  const totalBalance = 125000
  const monthlySpend = mockContributors.reduce((sum, c) => sum + c.amountDue, 0)
  const contributorsPaid = mockContributors.filter((c) => c.status === "paid").length

  const handleBatchPayment = () => {
    console.log("Sending batch payment...")
    setShowBatchModal(false)
  }

  return (
    <RoleGuard allowedRoles={["employee"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
        <RoleBasedSidebar userRole="employee" userType="dao" />
        <div className="md:ml-64">
          <TopNavbar walletStatus={walletStatus} userName="DAO Treasury" userEmail="treasury@dao.org" />
          <main className="p-6">
            <div className="space-y-8 animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">DAO Treasury Dashboard</h1>
                    <p className="text-slate-400">Manage contributor payments and treasury operations</p>
                  </div>
                </div>
              </div>

              {/* Treasury Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-slate-800/50 border-slate-700 card-hover animate-slide-up animate-delay-100 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-400">Wallet Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-violet-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">${totalBalance.toLocaleString()}</div>
                    <p className="text-xs text-green-400 font-medium mt-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% this month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 card-hover animate-slide-up animate-delay-200 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-400">Contributors Paid</CardTitle>
                    <Users className="h-4 w-4 text-indigo-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">{contributorsPaid}</div>
                    <p className="text-xs text-slate-400 mt-1">of {mockContributors.length} total</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 card-hover animate-slide-up animate-delay-300 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-400">Monthly Spend</CardTitle>
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">${monthlySpend.toLocaleString()}</div>
                    <p className="text-xs text-slate-400 mt-1">Budget allocation</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Contributors Table */}
                <div className="lg:col-span-3">
                  <Card className="bg-slate-800/50 border-slate-700 animate-slide-up animate-delay-300 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-white">Contributors</CardTitle>
                          <CardDescription className="text-slate-400">
                            Manage contributor payments and zkReceipts
                          </CardDescription>
                        </div>
                        <Dialog open={showBatchModal} onOpenChange={setShowBatchModal}>
                          <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 text-white rounded-2xl shadow-lg">
                              <Send className="h-4 w-4 mr-2" />
                              Batch Payment
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
                            <DialogHeader>
                              <DialogTitle className="text-white">Initiate Batch Payment</DialogTitle>
                              <DialogDescription className="text-slate-400">
                                Send payments to all pending contributors
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="total" className="text-slate-300">
                                  Total Amount
                                </Label>
                                <Input
                                  id="total"
                                  value={`$${mockContributors
                                    .filter((c) => c.status === "pending")
                                    .reduce((sum, c) => sum + c.amountDue, 0)
                                    .toLocaleString()}`}
                                  readOnly
                                  className="rounded-2xl bg-slate-700 border-slate-600 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-slate-300">Recipients</Label>
                                <div className="text-sm text-slate-400">
                                  {mockContributors.filter((c) => c.status === "pending").length} pending contributors
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleBatchPayment}
                                  className="flex-1 bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 text-white rounded-2xl"
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Batch Payment
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => setShowBatchModal(false)}
                                  className="rounded-2xl bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
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
                          <TableRow className="border-slate-700">
                            <TableHead className="text-slate-400">Name</TableHead>
                            <TableHead className="text-slate-400">Role</TableHead>
                            <TableHead className="text-slate-400">Wallet</TableHead>
                            <TableHead className="text-slate-400">Amount Due</TableHead>
                            <TableHead className="text-slate-400">zkReceipt Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockContributors.map((contributor, index) => (
                            <TableRow
                              key={contributor.id}
                              className={`border-slate-700 animate-fade-in animate-delay-${index * 100}`}
                            >
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-violet-600 text-white text-sm">
                                      {contributor.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-white">{contributor.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-slate-300">{contributor.role}</TableCell>
                              <TableCell className="font-mono text-sm text-slate-400">{contributor.wallet}</TableCell>
                              <TableCell className="font-semibold text-white">
                                ${contributor.amountDue.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    contributor.status === "paid"
                                      ? "bg-green-900 text-green-300 border-green-700"
                                      : "bg-yellow-900 text-yellow-300 border-yellow-700"
                                  }
                                >
                                  {contributor.status === "paid" ? (
                                    <>
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Paid
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="h-3 w-3 mr-1" />
                                      Pending
                                    </>
                                  )}
                                </Badge>
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
                  {/* Treasury Status */}
                  <Card className="bg-slate-800/50 border-slate-700 animate-slide-up animate-delay-500 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-violet-400" />
                        Treasury Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Status</span>
                        <Badge className="bg-green-900 text-green-300 border-green-700">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Multisig</span>
                        <span className="text-sm font-mono text-slate-300">3/5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">zkVerified</span>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Available</span>
                        <span className="text-sm font-semibold text-white">${totalBalance.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Treasury Trends */}
                  <Card className="bg-slate-800/50 border-slate-700 animate-slide-up animate-delay-500 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-indigo-400" />
                        Treasury Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Inflow</span>
                        <span className="text-sm font-semibold text-green-400">+$15,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Outflow</span>
                        <span className="text-sm font-semibold text-red-400">-$9,300</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Net</span>
                        <span className="text-sm font-semibold text-green-400">+$5,700</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="bg-slate-800/50 border-slate-700 animate-slide-up animate-delay-500 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-2xl bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                        onClick={() => setShowBatchModal(true)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Batch Payment
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-2xl bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Manage Contributors
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-2xl bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Treasury Report
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
