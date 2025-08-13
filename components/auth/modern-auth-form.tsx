"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { useSession } from "@/components/providers/session-provider"

export function ModernAuthForm() {
  const router = useRouter()
  const sp = useSearchParams()
  const next = sp.get("next") || undefined
  const { login, signup } = useSession()

  const [tab, setTab] = React.useState<"login" | "signup">("login")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleAuth(mode: "login" | "signup") {
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const fn = mode === "login" ? login : signup
      const res = await fn(email, password)
      if (!res.ok) {
        setError(res.error || "Authentication failed")
      } else {
        router.push(res.next || "/role-selection")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Welcome to LeoPay</CardTitle>
        <CardDescription className="text-lg">Secure payments with privacy-preserving zkTechnology</CardDescription>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 font-medium">Demo Accounts (Multi-Role Support):</p>
          <p className="text-xs text-blue-600">demo@leopay.app / password (Freelancer + Contractor)</p>
          <p className="text-xs text-blue-600">business@leopay.app / password (Employer + Freelancer)</p>
          <p className="text-xs text-blue-600">contractor@leopay.app / password (Contractor + DAO)</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-login">Email</Label>
              <Input
                id="email-login"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-login">Password</Label>
              <Input
                id="password-login"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                onKeyDown={(e) => e.key === "Enter" && handleAuth("login")}
              />
            </div>
            <Button className="w-full" disabled={loading} onClick={() => handleAuth("login")}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </TabsContent>
          <TabsContent value="signup" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-signup">Email</Label>
              <Input
                id="email-signup"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-signup">Password</Label>
              <Input
                id="password-signup"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                autoComplete="new-password"
                required
                onKeyDown={(e) => e.key === "Enter" && handleAuth("signup")}
              />
            </div>
            <Button className="w-full" disabled={loading} onClick={() => handleAuth("signup")}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
