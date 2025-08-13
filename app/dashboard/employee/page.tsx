"use client"

import { useState } from "react"
import { EmployeeDashboard } from "@/components/dashboard/employee-dashboard"

export default function EmployeePage() {
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
      balance: 2500,
    })
  }

  return <EmployeeDashboard walletState={walletState} onConnectWallet={handleConnectWallet} />
}
