"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/components/providers/session-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RoleSelectionPage() {
  const router = useRouter()
  const { profile, selectRole, addRole, getUserRoles } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!profile) {
      router.push("/auth")
    }
  }, [profile, router])

  const handleRoleSelection = async (roleName: string, subrole: string, isExisting: boolean) => {
    setLoading(true)
    setError(null)

    try {
      const result = isExisting ? selectRole(roleName, subrole) : addRole(roleName, subrole)

      if (result.ok) {
        router.push(result.next)
      } else {
        setError(result.error || "Failed to select role")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!profile) return null

  const existingRoles = getUserRoles()
  const hasRole = (roleName: string, subrole: string) =>
    existingRoles.some((r) => r.role === roleName && r.subrole === subrole)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Select Your Role</h1>
          <p className="text-slate-600">Choose how you want to use LeoPay today</p>
          {existingRoles.length > 0 && (
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700 font-medium mb-2">Your existing roles:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {existingRoles.map((role, index) => (
                  <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-700">
                    {role.role} – {role.subrole}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Freelancer Roles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-center border-b border-slate-200 pb-2">Freelancer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <RoleButton
                title="Client/Project Poster"
                description="Post tasks and hire freelancers"
                icon="👔"
                badge="Sender"
                isExisting={hasRole("freelancer", "sender")}
                loading={loading}
                onClick={() => handleRoleSelection("freelancer", "sender", hasRole("freelancer", "sender"))}
              />
              <RoleButton
                title="Freelance Worker"
                description="Find work and complete tasks"
                icon="💼"
                badge="Receiver"
                isExisting={hasRole("freelancer", "receiver")}
                loading={loading}
                onClick={() => handleRoleSelection("freelancer", "receiver", hasRole("freelancer", "receiver"))}
              />
            </CardContent>
          </Card>

          {/* Contractor Roles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-center border-b border-slate-200 pb-2">Contractor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <RoleButton
                title="Contract Owner"
                description="Manage contracts and contractors"
                icon="🏢"
                badge="Client"
                isExisting={hasRole("contractor", "client")}
                loading={loading}
                onClick={() => handleRoleSelection("contractor", "client", hasRole("contractor", "client"))}
              />
              <RoleButton
                title="Contract Worker"
                description="Work on contracts and submit invoices"
                icon="⚡"
                badge="Receiver"
                isExisting={hasRole("contractor", "receiver")}
                loading={loading}
                onClick={() => handleRoleSelection("contractor", "receiver", hasRole("contractor", "receiver"))}
              />
            </CardContent>
          </Card>

          {/* DAO Roles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-center border-b border-slate-200 pb-2">DAO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <RoleButton
                title="DAO Admin"
                description="Manage treasury and proposals"
                icon="🏛️"
                badge="Admin"
                isExisting={hasRole("dao", "admin")}
                loading={loading}
                onClick={() => handleRoleSelection("dao", "admin", hasRole("dao", "admin"))}
              />
              <RoleButton
                title="DAO Contributor"
                description="Contribute and earn from DAO"
                icon="🤝"
                badge="Contributor"
                isExisting={hasRole("dao", "contributor")}
                loading={loading}
                onClick={() => handleRoleSelection("dao", "contributor", hasRole("dao", "contributor"))}
              />
            </CardContent>
          </Card>

          {/* Employment Roles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-center border-b border-slate-200 pb-2">Employment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <RoleButton
                title="Employer"
                description="Manage payroll and employees"
                icon="🏭"
                badge="Employer"
                isExisting={hasRole("employer", "sender")}
                loading={loading}
                onClick={() => handleRoleSelection("employer", "sender", hasRole("employer", "sender"))}
              />
              <RoleButton
                title="Employee"
                description="View payslips and earnings"
                icon="👨‍💼"
                badge="Employee"
                isExisting={hasRole("employee", "receiver")}
                loading={loading}
                onClick={() => handleRoleSelection("employee", "receiver", hasRole("employee", "receiver"))}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function RoleButton({
  title,
  description,
  icon,
  badge,
  isExisting,
  loading,
  onClick,
}: {
  title: string
  description: string
  icon: string
  badge: string
  isExisting: boolean
  loading: boolean
  onClick: () => void
}) {
  return (
    <Button
      variant="outline"
      className="w-full p-4 h-auto flex flex-col items-start space-y-2 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 relative bg-transparent"
      disabled={loading}
      onClick={onClick}
    >
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl">{icon}</div>
        <div className="flex flex-col items-end space-y-1">
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 text-xs">
            {badge}
          </Badge>
          {isExisting && (
            <Badge variant="default" className="bg-green-100 text-green-700 text-xs">
              Existing
            </Badge>
          )}
        </div>
      </div>
      <div className="text-left">
        <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-600 mt-1">{description}</p>
        <p className="text-xs text-indigo-600 mt-1">{isExisting ? "Continue to dashboard" : "Setup required"}</p>
      </div>
    </Button>
  )
}
