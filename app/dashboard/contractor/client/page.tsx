"use client"

import { useState } from "react"
import { ContractorClientDashboard } from "@/components/dashboard/contractor-client-dashboard"

export default function ContractorClientPage() {
  const [walletConnected, setWalletConnected] = useState(false)

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setWalletConnected(true)
  }

  return <ContractorClientDashboard walletConnected={walletConnected} onConnectWallet={handleConnectWallet} />
}
