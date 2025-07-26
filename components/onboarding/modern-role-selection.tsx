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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const preselectedRole = searchParams.get("role")
    if (preselectedRole && roles.find((role) => role.id === preselectedRole)) {
      setSelectedRole(preselectedRole)
    }
  }, [searchParams])

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        console.log("Session check:", { 
          session: session?.user?.id, 
          error,
          expires_at: session?.expires_at 
        })

        if (error || !session) {
          console.error("No valid session found:", error)
          toast({
            title: "Authentication Required",
            description: "Please sign in to continue",
            variant: "destructive",
          })
          router.push("/auth")
          return
        }

        // Session is valid, continue with role selection
        setIsCheckingAuth(false)
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/auth")
      }
    }

    checkAuth()
  }, [router, toast])

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
      // Use getSession instead of getUser for better session handling
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      console.log("Session check for role update:", { 
        session: session?.user?.id, 
        sessionError,
        expires_at: session?.expires_at 
      })

      if (sessionError || !session || !session.user) {
        console.error("Session error:", sessionError)
        toast({
          title: "Session Expired",
          description: "Please sign in again to continue",
          variant: "destructive",
        })
        router.push("/auth")
        return
      }

      const user = session.user

      // First, check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      console.log("Existing profile:", { existingProfile, fetchError })

      let profileError = null;

      if (fetchError && fetchError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log("Creating new profile...")
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            full_name: user.user_metadata?.full_name || null,
            avatar_url: user.user_metadata?.avatar_url || null,
            role: selectedRole,
            user_type: selectedRole,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
        
        profileError = insertError;
      } else if (!fetchError) {
        // Profile exists, update it
        console.log("Updating existing profile...")
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            role: selectedRole,
            user_type: selectedRole,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)
        
        profileError = updateError;
      } else {
        // Other fetch error
        profileError = fetchError;
      }

      console.log("Profile operation result:", { profileError })

      if (profileError) {
        console.error("Profile operation error:", profileError)
        throw profileError
      }

      // Show success toast
      toast({
        title: "Success!",
        description: "Your role has been set successfully.",
      })

      // Wait a bit longer to ensure database operation is complete
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Redirect based on role with window.location for more reliable navigation
      console.log("Redirecting to role:", selectedRole)
      
      let redirectPath = "/dashboard"
      
      switch (selectedRole) {
        case "freelancer":
          redirectPath = "/profile/complete"
          break
        case "contractor":
          redirectPath = "/payroll/contractor"
          break
        case "employer":
          redirectPath = "/payroll/employer"
          break
        case "dao":
          redirectPath = "/payroll/dao"
          break
        case "employee":
          redirectPath = "/payroll/employee"
          break
        default:
          redirectPath = "/dashboard"
      }

      // Use window.location.href for more reliable navigation
      // This ensures the page actually navigates instead of potentially being blocked
      console.log("Navigating to:", redirectPath)
      window.location.href = redirectPath

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
        {/* Show loading spinner while checking auth */}
        {isCheckingAuth ? (
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
            <CardContent className="flex items-center justify-center p-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600">Checking authentication...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
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
        )}
      </div>
    </div>
  )
}
