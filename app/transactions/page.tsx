"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userRole="employee" />
      <div className="md:ml-64">
        <TopNavbar walletStatus="connected_active" userName="Company Admin" />
        <main className="p-6">
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                <p className="text-gray-600 mt-2">View all payment transactions</p>
              </div>
              <Link href="/">
                <Button variant="outline" className="rounded-2xl bg-transparent">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View detailed transaction records and zkProofs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Transaction history will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
