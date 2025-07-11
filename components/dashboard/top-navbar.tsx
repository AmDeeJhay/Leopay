"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, User, Settings, LogOut, Wallet, CheckCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { WalletStatus } from "@/lib/types"

interface TopNavbarProps {
  walletStatus: WalletStatus
  userName?: string
  userEmail?: string
}

export function TopNavbar({ walletStatus, userName = "User", userEmail = "user@example.com" }: TopNavbarProps) {
  const getWalletStatusConfig = () => {
    switch (walletStatus) {
      case "connected_active":
        return { icon: CheckCircle, color: "text-green-500", label: "Connected", bgColor: "bg-green-50" }
      case "connected_unverified":
        return { icon: AlertCircle, color: "text-yellow-500", label: "Unverified", bgColor: "bg-yellow-50" }
      default:
        return { icon: Wallet, color: "text-gray-500", label: "Not Connected", bgColor: "bg-gray-50" }
    }
  }

  const walletConfig = getWalletStatusConfig()
  const WalletIcon = walletConfig.icon

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 ml-0 md:ml-64 shadow-sm">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 rounded-2xl border-gray-200 focus:border-primary-300 bg-gray-50/50"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Wallet Status */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl ${walletConfig.bgColor}`}>
          <WalletIcon className={`h-4 w-4 ${walletConfig.color}`} />
          <span className="text-sm font-medium text-gray-700">{walletConfig.label}</span>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative rounded-2xl">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-primary-200">
                <AvatarFallback className="bg-aleo-gradient text-white font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
