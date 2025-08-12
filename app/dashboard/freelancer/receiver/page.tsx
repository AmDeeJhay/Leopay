"use client"

import { useState } from "react"
import type { WalletStatus } from "@/lib/types"
import { ReceiverDashboard } from "@/components/dashboard/receiver-dashboard"

export default function FreelancerReceiverDashboard() {
  const [walletStatus, setWalletStatus] = useState<WalletStatus>("disconnected")

  return (
    <main className="min-h-screen">
      <ReceiverDashboard walletStatus={walletStatus} setWalletStatus={setWalletStatus} />
    </main>
  )
}
