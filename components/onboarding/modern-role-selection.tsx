"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Building2, ArrowLeft, Check, Users, ChevronRight } from "lucide-react"
import Link from "next/link"

const roles = [
  {
    id: "freelancer",
    title: "Freelancer",
    description: "Individual contractor working on projects",
    icon: User,
    color: "from-blue-500 to-cyan-500",
    features: ["Project-based work", "Invoice clients", "Track payments", "Portfolio management"],
  },
  {
    id: "business",
    title: "Business",
    description: "Company managing employees and contractors",
    icon: Building2,
    color: "from-purple-500 to-pink-500",
    features: ["Payroll management", "Employee onboarding", "Compliance tracking", "Team analytics"],
    subRoles: [
      { id: "employer", title: "Employer", description: "Traditional business with employees" },
      { id: "dao", title: "DAO", description: "Decentralized autonomous organization" },
      { id: "contractor", title: "Contractor", description: "Business working as contractor" },
    ],
  },
]

export function ModernRoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedSubRole, setSelectedSubRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [preselectedRole, setPreselectedRole] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const role = searchParams.get("role")
    if (role) {
      setPreselectedRole(role)
      setSelectedRole(role)
    }
  }, [searchParams])

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    setSelectedSubRole(null)
  }

  const handleSubRoleSelect = (subRoleId: string) => {
    setSelectedSubRole(subRoleId)
  }

  const handleContinue = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    try {
      // Store user role in localStorage for demo purposes
      const userRole = selectedRole === "business" ? selectedSubRole || "employer" : selectedRole
      const userType = selectedRole === "business" ? selectedSubRole || "employer" : "freelancer"

      localStorage.setItem("userRole", userRole)
      localStorage.setItem("userType", userType)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect based on role
      if (selectedRole === "business") {
        const subRole = selectedSubRole || "employer"
        if (subRole === "employer") {
          router.push("/payroll/employer")
        } else if (subRole === "dao") {
          router.push("/payroll/dao")
        } else if (subRole === "contractor") {
          router.push("/payroll/contractor")
        }
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Role selection error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const canContinue = selectedRole && (selectedRole !== "business" || selectedSubRole)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/auth"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>

          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {preselectedRole
              ? `Complete Your ${preselectedRole === "freelancer" ? "Freelancer" : "Business"} Setup`
              : "Choose Your Role"}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {preselectedRole
              ? "Let's set up your account with the right features for your needs"
              : "Tell us how you'll be using LeoPay so we can customize your experience"}
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {roles.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id
            const isDisabled = preselectedRole && preselectedRole !== role.id

            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  isSelected ? "ring-2 ring-blue-500 shadow-xl scale-105" : "hover:scale-102"
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => !isDisabled && handleRoleSelect(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                    {role.title}
                    {isSelected && <Check className="h-5 w-5 text-green-500" />}
                  </CardTitle>
                  <CardDescription className="text-base">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Sub-role Selection for Business */}
        {selectedRole === "business" && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Business Type</h2>
              <p className="text-gray-600">Choose the option that best describes your organization</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {roles
                .find((r) => r.id === "business")
                ?.subRoles?.map((subRole) => (
                  <Card
                    key={subRole.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedSubRole === subRole.id ? "ring-2 ring-purple-500 shadow-lg" : ""
                    }`}
                    onClick={() => handleSubRoleSelect(subRole.id)}
                  >
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg flex items-center justify-center gap-2">
                        {subRole.title}
                        {selectedSubRole === subRole.id && <Check className="h-4 w-4 text-green-500" />}
                      </CardTitle>
                      <CardDescription className="text-sm">{subRole.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!canContinue || isLoading}
            className="h-14 px-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-2xl text-lg disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Setting up your account...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Continue to Dashboard
                <ChevronRight className="h-5 w-5" />
              </div>
            )}
          </Button>

          {preselectedRole && (
            <p className="text-sm text-gray-500 mt-4">
              Role pre-selected: {preselectedRole === "freelancer" ? "Freelancer" : "Business"}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
