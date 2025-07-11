"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WalletStatusComponent } from "@/components/wallet/wallet-status"
import type { WalletStatus } from "@/lib/types"
import { DollarSign, FileText, Calendar, TrendingUp } from "lucide-react"

export function EmployeeDashboard() {
  const [walletStatus, setWalletStatus] = useState<WalletStatus>("not_connected")
  const [hasPayments, setHasPayments] = useState(false)

  // Mock data for demonstration
  const mockPayments = [
    { id: "1", amount: 5000, date: "2024-01-15", status: "completed" },
    { id: "2", amount: 5000, date: "2024-02-15", status: "completed" },
    { id: "3", amount: 5000, date: "2024-03-15", status: "pending" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,000</div>
            <p className="text-xs text-muted-foreground">Next payment in 12 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,000</div>
            <p className="text-xs text-muted-foreground">+20% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">zkPayslips</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Available for download</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-time Payments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">3/3 payments on time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your salary payments and zkPayslips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPayments.map((payment) => (
                  <Card key={payment.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${payment.amount.toLocaleString()}</span>
                          <Badge variant={payment.status === "completed" ? "default" : "secondary"}>
                            {payment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Payment date: {payment.date}</p>
                      </div>
                      <div className="space-x-2">
                        {payment.status === "completed" && (
                          <>
                            <Button variant="outline" size="sm">
                              Download zkPayslip
                            </Button>
                            {walletStatus === "not_connected" && <Button size="sm">Connect Wallet to Withdraw</Button>}
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>zkProof Options</CardTitle>
              <CardDescription>Generate privacy-preserving proofs of your employment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Income Proof</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Prove you earn more than X/month without revealing actual income
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Generate Proof
                  </Button>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Payment Reliability</h3>
                  <p className="text-sm text-muted-foreground mb-3">Prove you've been paid on time consistently</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Generate Proof
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <WalletStatusComponent
            status={walletStatus}
            onConnect={() => setWalletStatus("connected_unverified")}
            onVerify={() => setWalletStatus("connected_active")}
          />
        </div>
      </div>
    </div>
  )
}
