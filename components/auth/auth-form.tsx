"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Mail, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [preselectedRole, setPreselectedRole] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const role = searchParams.get("role")
    if (role) {
      setPreselectedRole(role)
    }
  }, [searchParams])

  const handleEmailAuth = async (type: "signin" | "signup") => {
    setIsLoading(true)
    try {
      const { data, error } =
        type === "signin"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password })

      if (error) throw error

      if (type === "signup") {
        router.push(`/onboarding/role-selection${preselectedRole ? `?role=${preselectedRole}` : ""}`)
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletConnect = async () => {
    setIsLoading(true)
    try {
      console.log("Connecting wallet...")
      router.push(`/onboarding/role-selection${preselectedRole ? `?role=${preselectedRole}` : ""}`)
    } catch (error) {
      console.error("Wallet connection error:", error)
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
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-2xl"
                    onClick={() => handleEmailAuth("signin")}
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 border-gray-200 hover:border-blue-300 font-semibold rounded-2xl bg-white/80"
                    onClick={() => handleEmailAuth("signup")}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
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
                    {isLoading ? "Connecting..." : "Connect Wallet"}
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
