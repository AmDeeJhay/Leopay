"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Mail, ArrowLeft, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [preselectedRole, setPreselectedRole] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const role = searchParams.get("role")
    if (role) {
      setPreselectedRole(role)
    }
  }, [searchParams])

  const handleEmailAuth = async (type: "signin" | "signup") => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      if (type === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) throw error

        if (data.user) {
          toast({
            title: "Success!",
            description: "Please check your email to confirm your account.",
          })
          // Redirect to role selection after signup
          router.push(`/onboarding/role-selection${preselectedRole ? `?role=${preselectedRole}` : ""}`)
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        if (data.user) {
          // Check if user has completed onboarding
          const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()

          toast({
            title: "Success!",
            description: "Signed in successfully.",
          })

          // Redirect based on profile completion
          if (profile?.role) {
            router.push("/dashboard")
          } else {
            router.push("/onboarding/role-selection")
          }
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error)
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletConnect = async () => {
    setIsLoading(true)
    try {
      // Simulate wallet connection - in real app, integrate with Aleo wallet
      console.log("Connecting wallet...")
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to wallet.",
      })
      router.push(`/onboarding/role-selection${preselectedRole ? `?role=${preselectedRole}` : ""}`)
    } catch (error) {
      console.error("Wallet connection error:", error)
      toast({
        title: "Error",
        description: "Failed to connect wallet",
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

      <div className="relative z-10 w-full max-w-md">
        {/* Back to home */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {preselectedRole
                ? `Join as ${preselectedRole === "freelancer" ? "Freelancer" : "Business"}`
                : "Welcome to LeoPay"}
            </CardTitle>
            <CardDescription className="text-base">
              {preselectedRole
                ? `Get started with your ${preselectedRole} account`
                : "Private, compliant payments powered by Aleo"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="email" className="flex items-center gap-2 py-3">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="wallet" className="flex items-center gap-2 py-3">
                  <Wallet className="h-4 w-4" />
                  Wallet
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-2xl border-gray-200 focus:border-blue-300"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-2xl border-gray-200 focus:border-blue-300"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {!isSignUp ? (
                  <div className="space-y-3">
                    <Button
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-2xl"
                      onClick={() => handleEmailAuth("signin")}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                    <div className="text-center text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button
                        onClick={() => setIsSignUp(true)}
                        className="text-blue-600 hover:underline font-medium"
                        disabled={isLoading}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-2xl"
                      onClick={() => handleEmailAuth("signup")}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                    <div className="text-center text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        onClick={() => setIsSignUp(false)}
                        className="text-blue-600 hover:underline font-medium"
                        disabled={isLoading}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="wallet" className="space-y-6">
                <div className="text-center space-y-6">
                  <div className="p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Wallet className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Connect Your Aleo Wallet</h3>
                    <p className="text-sm text-gray-600">
                      Securely connect your Aleo wallet to get started with zero-knowledge payments
                    </p>
                  </div>
                  <Button
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-2xl"
                    onClick={handleWalletConnect}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Connect Wallet"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
