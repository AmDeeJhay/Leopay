"use client"

import { useState } from "react"
import { DAOAdminDashboard } from "@/components/dashboard/dao-admin-dashboard"

export default function DaoAdminPage() {
  const [walletState, setWalletState] = useState({
    isConnected: false,
    address: "",
    balance: 0,
  })

  const handleConnectWallet = () => {
    setWalletState({
      isConnected: true,
      address: "aleo1treasury1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc",
      balance: 485000,
    })
  }

  return <DAOAdminDashboard walletState={walletState} onConnectWallet={handleConnectWallet} />
}
