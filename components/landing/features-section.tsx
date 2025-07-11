"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Briefcase, FileText, Zap, Globe, Lock, TrendingUp, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Zero-Knowledge Privacy",
    description:
      "Your payment data stays private with Aleo's zkProofs. Verify transactions without revealing sensitive information.",
    color: "text-primary-500",
    bgColor: "bg-primary-50",
    category: "Privacy",
  },
  {
    icon: Briefcase,
    title: "Freelancer Marketplace",
    description:
      "Task-based milestone payments with escrow protection. Get paid securely for your work with verifiable proof-of-completion.",
    color: "text-secondary-500",
    bgColor: "bg-secondary-50",
    category: "Freelancing",
  },
  {
    icon: Users,
    title: "Enterprise Payroll",
    description:
      "Recurring salary payments for employees and DAO members. Generate zkPayslips and proof of income without revealing amounts.",
    color: "text-accent-500",
    bgColor: "bg-accent-50",
    category: "Payroll",
  },
  {
    icon: FileText,
    title: "Verifiable Receipts",
    description:
      "Every payment comes with a cryptographic proof. Verify income, payment history, and employment status privately.",
    color: "text-primary-500",
    bgColor: "bg-primary-50",
    category: "Verification",
  },
  {
    icon: Globe,
    title: "Web2 + Web3 Hybrid",
    description:
      "Start with email login, connect wallet only when needed. Best of both worlds with seamless user experience.",
    color: "text-secondary-500",
    bgColor: "bg-secondary-50",
    category: "Integration",
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    description:
      "Fast, low-cost payments powered by Aleo's efficient zero-knowledge infrastructure. No waiting, no high fees.",
    color: "text-accent-500",
    bgColor: "bg-accent-50",
    category: "Speed",
  },
  {
    icon: Lock,
    title: "Compliance Ready",
    description:
      "Built-in compliance features for businesses. Generate audit trails and reports while maintaining privacy.",
    color: "text-primary-500",
    bgColor: "bg-primary-50",
    category: "Compliance",
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description:
      "Track your earnings, payment history, and performance metrics with beautiful, privacy-preserving analytics.",
    color: "text-secondary-500",
    bgColor: "bg-secondary-50",
    category: "Analytics",
  },
  {
    icon: Award,
    title: "Skill Verification",
    description:
      "Prove your expertise with zkProof-of-work. Build reputation and get matched with better opportunities.",
    color: "text-accent-500",
    bgColor: "bg-accent-50",
    category: "Reputation",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Why Choose <span className="gradient-text">LeoPay</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for the future of work with privacy-first technology, enterprise-grade security, and user-friendly
            design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`group card-hover border-0 shadow-lg animate-fade-in animate-delay-${Math.min(index * 100, 500)}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                    >
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${feature.bgColor} ${feature.color} font-medium`}
                        >
                          {feature.category}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
