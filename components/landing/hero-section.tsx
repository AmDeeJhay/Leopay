"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <Badge className="bg-primary-50 text-primary-700 border-primary-200 px-4 py-2 text-sm font-medium rounded-full">
              <Shield className="w-4 h-4 mr-2" />
              Powered by Aleo Zero-Knowledge Technology
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 animate-fade-in animate-delay-200">
            The Future of <span className="gradient-text">Private Payments</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-400">
            Secure freelancer payments and enterprise payroll with zero-knowledge privacy. Get paid, pay others, and
            prove income without revealing sensitive data.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in animate-delay-600">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-aleo-gradient hover:opacity-90 text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-xl"
              >
                Start Earning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 py-4 text-lg font-semibold border-2 bg-white/80 backdrop-blur-sm"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in animate-delay-800">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-6 w-6 text-primary-500 mr-2" />
                <span className="text-3xl font-bold gradient-text">100%</span>
              </div>
              <p className="text-gray-600 font-medium">Privacy Protected</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-secondary-500 mr-2" />
                <span className="text-3xl font-bold gradient-text">Instant</span>
              </div>
              <p className="text-gray-600 font-medium">Settlements</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-accent-500 mr-2" />
                <span className="text-3xl font-bold gradient-text">10K+</span>
              </div>
              <p className="text-gray-600 font-medium">Active Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
