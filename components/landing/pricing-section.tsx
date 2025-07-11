"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Building } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Freelancer",
    description: "Perfect for individual freelancers and contractors",
    price: "2.5%",
    period: "per transaction",
    icon: Star,
    color: "text-primary-500",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
    popular: false,
    features: [
      "Milestone-based payments",
      "zkProof generation",
      "Escrow protection",
      "Basic analytics",
      "Email support",
      "Wallet integration",
    ],
  },
  {
    name: "Business",
    description: "Ideal for small to medium businesses",
    price: "$49",
    period: "per month",
    icon: Building,
    color: "text-secondary-500",
    bgColor: "bg-secondary-50",
    borderColor: "border-secondary-200",
    popular: true,
    features: [
      "Unlimited employees",
      "Bulk payroll processing",
      "Advanced zkPayslips",
      "Compliance reporting",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations and DAOs",
    price: "Custom",
    period: "contact us",
    icon: Zap,
    color: "text-accent-500",
    bgColor: "bg-accent-50",
    borderColor: "border-accent-200",
    popular: false,
    features: [
      "Everything in Business",
      "Multi-signature wallets",
      "Advanced treasury management",
      "Custom compliance rules",
      "Dedicated account manager",
      "SLA guarantees",
      "White-label options",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in">
          <Badge className="bg-accent-50 text-accent-700 border-accent-200 px-4 py-2 text-sm font-medium rounded-full mb-4">
            Transparent Pricing
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, no setup costs, just transparent pricing that grows with
            your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card
                key={index}
                className={`relative card-hover border-0 shadow-lg animate-fade-in animate-delay-${index * 100} ${
                  plan.popular ? "ring-2 ring-secondary-200 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-secondary-500 text-white px-4 py-1 text-sm font-medium">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-16 h-16 ${plan.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/auth" className="block">
                    <Button
                      className={`w-full rounded-2xl py-3 font-semibold ${
                        plan.popular
                          ? "bg-aleo-gradient hover:opacity-90 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-16 animate-fade-in animate-delay-400">
          <p className="text-gray-600 mb-4">All plans include our core privacy features and zkProof technology</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-1" />
              No setup fees
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-1" />
              Cancel anytime
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-1" />
              24/7 support
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
