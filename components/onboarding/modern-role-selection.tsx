"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import type { UserRole } from "@/lib/types"
import { useSession } from "@/components/providers/session-provider"

const ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: "freelancer", label: "Freelancer", description: "Get paid for your work easily." },
  { value: "contractor", label: "Contractor", description: "Send invoices and manage payouts." },
  { value: "employee", label: "Employee", description: "Receive your salaries on time." },
  { value: "employer", label: "Employer", description: "Pay your employees quickly." },
  { value: "dao", label: "DAO", description: "Manage contributors and payouts." },
]

export default function ModernRoleSelection() {
  const router = useRouter()
  const { setRoleAndSubrole } = useSession()
  const [role, setRole] = React.useState<UserRole>("freelancer")
  const [subrole, setSubrole] = React.useState<"receiver" | "sender" | null>(null)
  const [loading, setLoading] = React.useState(false)

  const showSubrole = role === "freelancer" || role === "contractor" || role === "dao"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const result = setRoleAndSubrole(role, subrole)
    setLoading(false)
    if (result.ok) {
      router.push(result.next)
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Choose your role</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <RadioGroup value={role} onValueChange={(v) => setRole(v as UserRole)} className="grid gap-3">
              {ROLES.map((r) => (
                <label
                  key={r.value}
                  className="flex cursor-pointer items-start gap-3 rounded-md border p-4 hover:bg-muted"
                  htmlFor={`role-${r.value}`}
                >
                  <RadioGroupItem id={`role-${r.value}`} value={r.value} className="mt-1" />
                  <div>
                    <div className="font-medium">{r.label}</div>
                    <div className="text-sm text-muted-foreground">{r.description}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>

            {showSubrole && (
              <>
                <Separator />
                <div className="space-y-3">
                  <div className="font-medium">Choose subrole</div>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex cursor-pointer items-center gap-2 rounded-md border p-3 hover:bg-muted">
                      <input
                        type="radio"
                        name="subrole"
                        value="receiver"
                        checked={subrole === "receiver"}
                        onChange={() => setSubrole("receiver")}
                      />
                      <span>Receiver</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 rounded-md border p-3 hover:bg-muted">
                      <input
                        type="radio"
                        name="subrole"
                        value="sender"
                        checked={subrole === "sender"}
                        onChange={() => setSubrole("sender")}
                      />
                      <span>Sender</span>
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Employees default to Receiver; Employers default to Sender.
                  </p>
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">You can update your profile anytime in Settings.</div>
              <Button type="submit" disabled={loading || (showSubrole && !subrole)}>
                {loading ? "Saving..." : "Continue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
