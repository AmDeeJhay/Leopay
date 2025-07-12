"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

  // Handle role selection directly
  const handleRoleClick = (roleId: string) => {
    setSelectedRole(roleId)
    console.log("Role selected:", roleId) // Debug log
  }

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
      // Check authentication status
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser()

      console.log("Auth check:", { user: user?.id, authError }) // Debug log

      if (authError || !user) {
        console.error("Authentication error:", authError)
        toast({
          title: "Authentication Error",
          description: "Please sign in again to continue",
          variant: "destructive",
        })
        router.push("/auth")
        return
      }

      // Try to update user profile with selected role
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          role: selectedRole,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      console.log("Profile update:", { updateError }) // Debug log

      if (updateError) {
        console.error("Profile update error:", updateError)
        
        // If profile doesn't exist, try to create it
        if (updateError.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              role: selectedRole,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
          
          if (insertError) {
            throw insertError
          }
        } else {
          throw updateError
        }
      }

      toast({
        title: "Success!",
        description: "Your role has been set successfully.",
      })

      // Add delay to ensure toast shows before navigation
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Redirect based on role
      console.log("Redirecting to role:", selectedRole) // Debug log
      
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
        description: error.message || "Failed to set role. Please try again.",
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
            {/* Role Selection - Simplified approach */}
            <div className="space-y-4">
              {roles.map((role) => {
                const Icon = role.icon
                const isSelected = selectedRole === role.id
                
                return (
                  <div
                    key={role.id}
                    onClick={() => handleRoleClick(role.id)}
                    className={`
                      flex items-center space-x-4 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? 'border-blue-500 bg-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-gray-50'
                      }
                    `}
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
                    <div className={`
                      w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all
                      ${isSelected 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                      }
                    `}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Debug info - remove in production */}
            {selectedRole && (
              <div className="text-sm text-gray-500 text-center">
                Selected: {selectedRole}
              </div>
            )}

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
