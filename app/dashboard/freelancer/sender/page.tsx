"use client"

import { useState } from "react"
import type { WalletStatus } from "@/lib/types"
import { SenderDashboard } from "@/components/dashboard/sender-dashboard"

export default function FreelancerSenderDashboard() {
  const [walletStatus, setWalletStatus] = useState<WalletStatus>("disconnected")

  return (
    <main className="min-h-screen">
      <SenderDashboard walletStatus={walletStatus} setWalletStatus={setWalletStatus} />
    </main>
  )
}
