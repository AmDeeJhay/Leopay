"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Briefcase } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-aleo-gradient relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of freelancers and companies already using LeoPay for private, secure payments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Freelancer CTA */}
          <div className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">For Freelancers</h3>
            <p className="text-white/80 mb-6">
              Get paid securely for your work with milestone-based payments and zkProof verification
            </p>
            <Link href="/auth?role=freelancer">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/90 font-semibold px-8 py-3 rounded-xl group"
              >
                Start Freelancing
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Employee CTA */}
          <div className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">For Employees</h3>
            <p className="text-white/80 mb-6">
              Receive salary payments with privacy and generate zkPayslips for verification
            </p>
            <Link href="/auth?role=employee">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/90 font-semibold px-8 py-3 rounded-xl group"
              >
                Join as Employee
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
