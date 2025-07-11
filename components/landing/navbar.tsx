"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wallet, Menu, X } from "lucide-react"

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-aleo-gradient rounded-lg flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">LeoPay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-primary-600 hover:bg-primary-50"
              onClick={() => scrollToSection("features")}
            >
              Features
            </Button>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-primary-600 hover:bg-primary-50"
              onClick={() => scrollToSection("how-it-works")}
            >
              How It Works
            </Button>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-primary-600 hover:bg-primary-50"
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </Button>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-primary-600 hover:bg-primary-50"
              onClick={() => scrollToSection("about")}
            >
              About
            </Button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth">
              <Button variant="ghost" className="text-gray-600 hover:text-primary-600 hover:bg-primary-50">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-aleo-gradient hover:opacity-90 text-white rounded-2xl shadow-lg">
                Get Started
              </Button>
            </Link>
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
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                onClick={() => scrollToSection("features")}
              >
                Features
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                onClick={() => scrollToSection("how-it-works")}
              >
                How It Works
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                onClick={() => scrollToSection("pricing")}
              >
                Pricing
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                onClick={() => scrollToSection("about")}
              >
                About
              </Button>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link href="/auth">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="w-full bg-aleo-gradient hover:opacity-90 text-white rounded-2xl">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
