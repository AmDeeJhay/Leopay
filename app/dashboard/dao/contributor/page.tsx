"use client"

import { useState } from "react"
import { DAOContributorDashboard } from "@/components/dashboard/dao-contributor-dashboard"

export default function DaoContributorPage() {
  const [walletState, setWalletState] = useState({
    isConnected: false,
    address: "",
    balance: 0,
  })

  const handleConnectWallet = () => {
    setWalletState({
      isConnected: true,
      address: "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc",
      balance: 12750,
    })
  }

  return <DAOContributorDashboard walletState={walletState} onConnectWallet={handleConnectWallet} />
}
