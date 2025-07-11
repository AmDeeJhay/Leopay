"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { WalletStatus } from "@/lib/types"
import { Wallet, CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface WalletStatusProps {
  status: WalletStatus
  onConnect?: () => void
  onVerify?: () => void
}

export function WalletStatusComponent({ status, onConnect, onVerify }: WalletStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "not_connected":
        return {
          icon: XCircle,
          color: "destructive" as const,
          title: "Wallet Not Connected",
          description: "Connect your wallet to enable payments",
          action: "Connect Wallet",
          onAction: onConnect,
        }
      case "connected_unverified":
        return {
          icon: AlertCircle,
          color: "secondary" as const,
          title: "Connected, Not Verified",
          description: "Wallet connected but no zkProofs generated yet",
          action: "Verify Wallet",
          onAction: onVerify,
        }
      case "connected_active":
        return {
          icon: CheckCircle,
          color: "default" as const,
          title: "Connected and Active",
          description: "zkPayments ready, receipts available",
          action: null,
          onAction: null,
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wallet Status</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-3">
          <Icon className="h-5 w-5" />
          <Badge variant={config.color}>{config.title}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{config.description}</p>
        {config.action && config.onAction && (
          <Button onClick={config.onAction} size="sm" className="w-full">
            {config.action}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
