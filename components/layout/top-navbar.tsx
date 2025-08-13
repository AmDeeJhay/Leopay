"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, MessageCircle, HelpCircle, Search, ChevronDown, Wallet, LogOut } from "lucide-react"

interface TopNavbarProps {
  currentRole: string
  currentSubrole: string
  userRoles: Array<{ role: string; subrole: string; href: string }>
  walletConnected?: boolean
  walletAddress?: string
  onRoleSwitch?: (href: string) => void
  onLogout?: () => void
}

export function TopNavbar({
  currentRole,
  currentSubrole,
  userRoles,
  walletConnected = false,
  walletAddress,
  onRoleSwitch,
  onLogout,
}: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LP</span>
            </div>
            <span className="font-bold text-xl text-slate-900">LeoPay</span>
          </div>

          {/* Role/Workspace Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                  {currentRole} – {currentSubrole}
                </Badge>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <div className="px-3 py-2 text-sm font-medium text-slate-700">Switch Role</div>
              <DropdownMenuSeparator />
              {userRoles.map((roleData, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => onRoleSwitch?.(roleData.href)}
                  className="flex items-center justify-between"
                >
                  <span>
                    {roleData.role} – {roleData.subrole}
                  </span>
                  {roleData.role === currentRole && roleData.subrole === currentSubrole && (
                    <Badge variant="secondary" className="text-xs">
                      Current
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => (window.location.href = "/role-selection")}>
                <span>Add New Role</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search tasks, transactions, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Wallet Status */}
          <div className="flex items-center space-x-2">
            {walletConnected ? (
              <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                <Wallet className="h-4 w-4" />
                <span>
                  {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                </span>
              </div>
            ) : (
              <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </Button>
            )}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="sm" className="relative">
            <MessageCircle className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </Button>

          {/* Help */}
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* User Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-slate-500">john@example.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
