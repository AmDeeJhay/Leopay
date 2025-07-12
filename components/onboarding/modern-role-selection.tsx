"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users, Briefcase, Building, Coins, ArrowRight, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

const roles = [
  {
    id: "freelancer",
    title: "Freelancer",
    description: "Independent contractor working on projects",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "contractor",
    title: "Contractor",
    description: "Professional service provider",
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "employer",
    title: "Employer",
    description: "Business hiring talent and managing payroll",
    icon: Building,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "dao",
    title: "DAO",
    description: "Decentralized organization managing payments",
    icon: Coins,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "employee",
    title: "Employee",
    description: "Team member receiving regular payments",
    icon: Users,
    color: "from-indigo-500 to-blue-500",
  },
]

export function ModernRoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const preselectedRole = searchParams.get("role")
    if (preselectedRole && roles.find((role) => role.id === preselectedRole)) {
      setSelectedRole(preselectedRole)
    }
  }, [searchParams])

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select a role to continue",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to select a role",
          variant: "destructive",
        })
        router.push("/auth")
        return
      }

      // Update user profile with selected role
      const { error } = await supabase
        .from("profiles")
        .update({
          role: selectedRole,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Success!",
        description: "Your role has been set successfully.",
      })

      // Redirect based on role
      switch (selectedRole) {
        case "freelancer":
          router.push("/profile/complete")
          break
        case "contractor":
          router.push("/payroll/contractor")
          break
        case "employer":
          router.push("/payroll/employer")
          break
        case "dao":
          router.push("/payroll/dao")
          break
        case "employee":
          router.push("/payroll/employee")
          break
        default:
          router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Role selection error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to set role",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold">Choose Your Role</CardTitle>
            <CardDescription className="text-lg">
              Select how you'll be using LeoPay to get started with the right features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="space-y-4">
              {roles.map((role) => {
                const Icon = role.icon
                return (
                  <div key={role.id} className="relative">
                    <RadioGroupItem value={role.id} id={role.id} className="peer sr-only" />
                    <Label
                      htmlFor={role.id}
                      className="flex items-center space-x-4 p-6 rounded-2xl border-2 border-gray-200 cursor-pointer transition-all hover:border-blue-300 hover:shadow-md peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:shadow-lg"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{role.title}</h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center">
                        {selectedRole === role.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>

            <Button
              onClick={handleRoleSelection}
              disabled={!selectedRole || isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-2xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up your account...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
