"use client"

import { useState } from "react"
import { EmployerDashboard } from "@/components/dashboard/employer-dashboard"

export default function EmployerPage() {
  const [walletState, setWalletState] = useState({
    isConnected: false,
    address: undefined,
    balance: undefined,
  })

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setWalletState({
      isConnected: true,
      address: "0x1234567890abcdef1234567890abcdef12345678",
      balance: 50000,
    })
  }

  return <EmployerDashboard walletState={walletState} onConnectWallet={handleConnectWallet} />
}
