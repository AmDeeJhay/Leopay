"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { type UserRole, FREELANCER_SKILLS, EMPLOYEE_TYPES } from "@/lib/types"
import { Briefcase, Users, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedEmployeeType, setSelectedEmployeeType] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const role = searchParams.get("role")
    if (role === "freelancer" || role === "employee") {
      setSelectedRole(role as UserRole)
    }
  }, [searchParams])

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleContinue = async () => {
    if (!selectedRole) return

    console.log("Saving user role:", {
      role: selectedRole,
      skills: selectedSkills,
      employeeType: selectedEmployeeType,
    })

    router.push("/dashboard")
  }

  const isFormValid = selectedRole && (selectedRole === "freelancer" ? selectedSkills.length > 0 : selectedEmployeeType)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
      </div>

      <div className="relative z-10 w-full max-w-4xl animate-scale-in">
        {/* Back button */}
        <Link
          href="/auth"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </Link>

        <Card className="glass-effect border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold">Choose Your Path</CardTitle>
            <CardDescription className="text-lg">
              Select how you'll be using LeoPay to get personalized features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Role Selection */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center">What describes you best?</h3>
              <RadioGroup
                value={selectedRole || ""}
                onValueChange={(value) => setSelectedRole(value as UserRole)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <RadioGroupItem value="freelancer" id="freelancer" className="peer sr-only" />
                  <Label
                    htmlFor="freelancer"
                    className="flex flex-col items-center justify-between rounded-2xl border-2 border-gray-200 bg-white/80 p-8 hover:bg-white hover:border-primary-300 peer-data-[state=checked]:border-primary-500 peer-data-[state=checked]:bg-primary-50 cursor-pointer transition-all duration-300 group card-hover"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Briefcase className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 mb-2">Freelancer</div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        Task-based payments, skill verification, zkProof-of-work, and project matching
                      </div>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="employee" id="employee" className="peer sr-only" />
                  <Label
                    htmlFor="employee"
                    className="flex flex-col items-center justify-between rounded-2xl border-2 border-gray-200 bg-white/80 p-8 hover:bg-white hover:border-accent-300 peer-data-[state=checked]:border-accent-500 peer-data-[state=checked]:bg-accent-50 cursor-pointer transition-all duration-300 group card-hover"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Users className="h-8 w-8 text-accent-600" />
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 mb-2">Business/Payroll</div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        Recurring payments, zkPayslips, proof of income, and payroll management
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Freelancer Skills Selection */}
            {selectedRole === "freelancer" && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">What are your skills?</h3>
                  <p className="text-gray-600">Select all that apply to showcase your expertise</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {FREELANCER_SKILLS.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center space-x-3 p-4 rounded-2xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-200 card-hover"
                    >
                      <Checkbox
                        id={skill}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                        className="data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500"
                      />
                      <Label htmlFor={skill} className="text-sm font-medium cursor-pointer flex-1">
                        {skill}
                      </Label>
                      {selectedSkills.includes(skill) && <CheckCircle className="w-4 h-4 text-primary-500" />}
                    </div>
                  ))}
                </div>
                {selectedSkills.length > 0 && (
                  <div className="text-center text-sm text-primary-600 font-medium">
                    {selectedSkills.length} skill{selectedSkills.length !== 1 ? "s" : ""} selected
                  </div>
                )}
              </div>
            )}

            {/* Employee Type Selection */}
            {selectedRole === "employee" && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">What type of business are you?</h3>
                  <p className="text-gray-600">This helps us customize your payroll experience</p>
                </div>
                <RadioGroup value={selectedEmployeeType} onValueChange={setSelectedEmployeeType}>
                  <div className="grid gap-4">
                    {EMPLOYEE_TYPES.map((type) => (
                      <div
                        key={type}
                        className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-200 hover:border-accent-300 hover:bg-accent-50/50 transition-all duration-200 card-hover"
                      >
                        <RadioGroupItem
                          value={type}
                          id={type}
                          className="data-[state=checked]:bg-accent-500 data-[state=checked]:border-accent-500"
                        />
                        <Label htmlFor={type} className="text-base font-medium cursor-pointer flex-1">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Continue Button */}
            <div className="pt-8">
              <Button
                className="w-full h-14 bg-aleo-gradient hover:opacity-90 text-white text-lg font-semibold rounded-2xl disabled:opacity-50"
                onClick={handleContinue}
                disabled={!isFormValid}
              >
                {selectedRole === "freelancer"
                  ? `Continue with ${selectedSkills.length} skill${selectedSkills.length !== 1 ? "s" : ""}`
                  : selectedRole === "employee"
                    ? `Continue as ${selectedEmployeeType}`
                    : "Select a role to continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
