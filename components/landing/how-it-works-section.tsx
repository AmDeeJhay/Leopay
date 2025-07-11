"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Briefcase, CreditCard, Shield } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up with email or connect your wallet. Choose your role: Freelancer, Employer, or DAO member.",
    color: "text-primary-500",
    bgColor: "bg-primary-50",
  },
  {
    step: "02",
    icon: Briefcase,
    title: "Set Up Your Profile",
    description: "Complete your profile, verify your identity with zkProofs, and set your payment preferences.",
    color: "text-secondary-500",
    bgColor: "bg-secondary-50",
  },
  {
    step: "03",
    icon: CreditCard,
    title: "Start Transacting",
    description: "Send or receive payments with milestone-based escrow protection and automatic zkReceipt generation.",
    color: "text-accent-500",
    bgColor: "bg-accent-50",
  },
  {
    step: "04",
    icon: Shield,
    title: "Maintain Privacy",
    description:
      "Generate zkProofs for income verification, tax compliance, or loan applications without revealing amounts.",
    color: "text-primary-500",
    bgColor: "bg-primary-50",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in">
          <Badge className="bg-secondary-50 text-secondary-700 border-secondary-200 px-4 py-2 text-sm font-medium rounded-full mb-4">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How <span className="gradient-text">LeoPay</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes with our streamlined onboarding process designed for both Web2 and Web3 users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={index}
                className={`group card-hover border-0 shadow-lg animate-fade-in animate-delay-${index * 100} relative overflow-hidden`}
              >
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="text-xs font-bold text-gray-400 border-gray-200">
                      {step.step}
                    </Badge>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-20 h-20 ${step.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-10 h-10 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Connection Lines for Desktop */}
        <div className="hidden lg:block relative -mt-32 mb-16">
          <div className="absolute top-1/2 left-1/4 w-1/4 h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200"></div>
          <div className="absolute top-1/2 left-2/4 w-1/4 h-0.5 bg-gradient-to-r from-secondary-200 to-accent-200"></div>
          <div className="absolute top-1/2 left-3/4 w-1/4 h-0.5 bg-gradient-to-r from-accent-200 to-primary-200"></div>
        </div>
      </div>
    </section>
  )
}
