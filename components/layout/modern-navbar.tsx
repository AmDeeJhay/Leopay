"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Wallet, User, Settings, LogOut, Menu, X, Bell } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function ModernNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-aleo-gradient rounded-lg flex items-center justify-center">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">LeoPay</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-gray-600 hover:text-primary-600 hover:bg-primary-50">
                  Dashboard
                </Button>
              </Link>
              <Link href="/tasks">
                <Button variant="ghost" className="text-gray-600 hover:text-primary-600 hover:bg-primary-50">
                  Tasks
                </Button>
              </Link>
              <Link href="/payments">
                <Button variant="ghost" className="text-gray-600 hover:text-primary-600 hover:bg-primary-50">
                  Payments
                </Button>
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary-200">
                      <AvatarFallback className="bg-aleo-gradient text-white font-semibold">U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">User</p>
                      <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
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
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 animate-slide-in">
              <div className="flex flex-col space-y-2">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link href="/tasks">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  >
                    Tasks
                  </Button>
                </Link>
                <Link href="/payments">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  >
                    Payments
                  </Button>
                </Link>
                <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 mt-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 border-2 border-primary-200">
                      <AvatarFallback className="bg-aleo-gradient text-white text-sm font-semibold">U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">User</p>
                      <p className="text-xs text-gray-500">user@example.com</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  )
}
