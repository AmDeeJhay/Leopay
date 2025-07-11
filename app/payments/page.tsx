"use client"

import { ModernNavbar } from "@/components/layout/modern-navbar"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Download, Eye, FileText, TrendingUp } from "lucide-react"

export default function PaymentsPage() {
  // Mock payment data
  const payments = [
    {
      id: "1",
      amount: 2500,
      type: "freelance",
      status: "completed",
      date: "2024-01-15",
      description: "React Dashboard Development",
      proof_hash: "0xabc123...",
    },
    {
      id: "2",
      amount: 5000,
      type: "payroll",
      status: "completed",
      date: "2024-01-01",
      description: "Monthly Salary - January",
      proof_hash: "0xdef456...",
    },
    {
      id: "3",
      amount: 1800,
      type: "freelance",
      status: "pending",
      date: "2024-01-20",
      description: "Mobile App UI Design",
      proof_hash: null,
    },
  ]

  return (
    <div className="min-h-screen bg-aleo-light-gray pb-20 md:pb-0">
      <ModernNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-2">View your payment history and zkProof receipts</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="glass-effect border-0 aleo-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Received</CardTitle>
              <DollarSign className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">$7,500</div>
              <p className="text-xs text-green-600 font-medium mt-1">+$2,500 from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 aleo-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary-600">$1,800</div>
              <p className="text-xs text-gray-600 mt-1">1 payment pending</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 aleo-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">zkReceipts</CardTitle>
              <FileText className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">2</div>
              <p className="text-xs text-gray-600 mt-1">Available for download</p>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-effect border-0 aleo-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Payment History</CardTitle>
            <CardDescription>All your payments with zkProof verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <Card
                  key={payment.id}
                  className="p-6 border border-gray-200 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold gradient-text">${payment.amount.toLocaleString()}</span>
                        <Badge
                          variant={payment.status === "completed" ? "default" : "secondary"}
                          className="capitalize"
                        >
                          {payment.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize border-primary-200 text-primary-700">
                          {payment.type}
                        </Badge>
                      </div>
                      <p className="text-gray-700 font-medium">{payment.description}</p>
                      <p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                      {payment.proof_hash && (
                        <p className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded">
                          zkProof: {payment.proof_hash}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      {payment.status === "completed" && payment.proof_hash && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-2 border-primary-200 text-primary-700 hover:bg-primary-50 bg-transparent"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Proof
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-2 border-secondary-200 text-secondary-700 hover:bg-secondary-50 bg-transparent"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Receipt
                          </Button>
                        </>
                      )}
                      {payment.status === "pending" && (
                        <Button variant="outline" size="sm" disabled className="rounded-xl bg-transparent">
                          Processing...
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <BottomNavigation />
    </div>
  )
}
