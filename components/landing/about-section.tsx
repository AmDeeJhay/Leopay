"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Users, Globe, Award, ArrowRight, Zap, Lock } from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Built on Aleo's zero-knowledge technology to ensure your financial data remains completely private.",
    color: "text-primary-500",
    bgColor: "bg-primary-50",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Designed by freelancers and businesses, for freelancers and businesses. Your feedback shapes our roadmap.",
    color: "text-secondary-500",
    bgColor: "bg-secondary-50",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Borderless payments that work anywhere in the world, with support for multiple currencies and regions.",
    color: "text-accent-500",
    bgColor: "bg-accent-50",
  },
]

const stats = [
  { number: "10,000+", label: "Active Users", icon: Users },
  { number: "$50M+", label: "Processed", icon: Zap },
  { number: "99.9%", label: "Uptime", icon: Award },
  { number: "256-bit", label: "Encryption", icon: Lock },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in">
          <Badge className="bg-primary-50 text-primary-700 border-primary-200 px-4 py-2 text-sm font-medium rounded-full mb-4">
            About LeoPay
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolutionizing <span className="gradient-text">Digital Payments</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            LeoPay is the world's first privacy-preserving payment platform built on zero-knowledge technology. We're
            bridging the gap between traditional finance and Web3, making private payments accessible to everyone.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-20 animate-fade-in animate-delay-200">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                To democratize financial privacy and create a world where individuals and businesses can transact freely
                without compromising their sensitive financial information. We believe privacy is a fundamental right,
                not a luxury.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button className="bg-aleo-gradient hover:opacity-90 text-white rounded-2xl px-6 py-3">
                    Join Our Mission
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button variant="outline" className="rounded-2xl px-6 py-3 bg-white/80">
                    Read Our Whitepaper
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12 animate-fade-in animate-delay-300">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className={`border-0 shadow-lg card-hover animate-fade-in animate-delay-${(index + 4) * 100}`}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                    >
                      <Icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className={`text-center animate-fade-in animate-delay-${(index + 7) * 100}`}>
                <div className="flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-primary-500 mr-2" />
                  <span className="text-3xl md:text-4xl font-bold gradient-text">{stat.number}</span>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Team Section */}
        <div className="text-center animate-fade-in animate-delay-800">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Built by Experts</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Our team combines decades of experience in cryptography, blockchain technology, and financial services.
            We're backed by leading investors and advisors who share our vision for a more private financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/team">
              <Button variant="outline" className="rounded-2xl px-6 py-3 bg-white/80">
                Meet the Team
              </Button>
            </Link>
            <Link href="/careers">
              <Button variant="outline" className="rounded-2xl px-6 py-3 bg-white/80">
                Join Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
