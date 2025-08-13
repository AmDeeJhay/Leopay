"use client"

import { useState } from "react"
import { ContractorReceiverDashboard } from "@/components/dashboard/contractor-receiver-dashboard"

export default function ContractorReceiverPage() {
  const [walletConnected, setWalletConnected] = useState(false)

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setWalletConnected(true)
  }

  return <ContractorReceiverDashboard walletConnected={walletConnected} onConnectWallet={handleConnectWallet} />
}
