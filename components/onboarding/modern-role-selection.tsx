"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSession } from "@/components/providers/session-provider"
import { Briefcase, Users, Building2, Landmark, UserCog, ArrowRight } from "lucide-react"

type RoleKey = "freelancer" | "contractor" | "employee" | "employer" | "dao"
type Subrole = "sender" | "receiver" | null

const roles: { key: RoleKey; title: string; desc: string; icon: any; subroles?: Subrole[] }[] = [
  {
    key: "freelancer",
    title: "Freelancer",
    desc: "Send or receive payments as an independent worker.",
    icon: Briefcase,
    subroles: ["sender", "receiver"],
  },
  {
    key: "contractor",
    title: "Contractor",
    desc: "Operate as a contractor for businesses.",
    icon: UserCog,
    subroles: ["sender", "receiver"],
  },
  {
    key: "employee",
    title: "Employee",
    desc: "Receive salaries and reimbursements.",
    icon: Users,
    subroles: ["receiver"],
  },
  {
    key: "employer",
    title: "Employer",
    desc: "Send salaries, bonuses, and reimbursements.",
    icon: Building2,
    subroles: ["sender"],
  },
  {
    key: "dao",
    title: "DAO",
    desc: "Manage treasury and payouts as a DAO.",
    icon: Landmark,
    subroles: ["sender", "receiver"],
  },
]

export function ModernRoleSelection() {
  const router = useRouter()
  const { setRoleAndSubrole } = useSession()
  const [selectedRole, setSelectedRole] = React.useState<RoleKey | null>(null)
  const [selectedSubrole, setSelectedSubrole] = React.useState<Subrole>(null)
  const roleDef = roles.find((r) => r.key === selectedRole)

  async function continueNext() {
    if (!selectedRole) return
    const sub = roleDef?.subroles?.length === 1 ? roleDef.subroles[0]! : selectedSubrole
    const res = setRoleAndSubrole(selectedRole as any, (sub as any) ?? null)
    if (res.ok) router.push(res.next)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Choose your role</h1>
        <p className="text-muted-foreground">Select how you plan to use LeoPay. You can change this later.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((r) => {
          const Icon = r.icon
          const active = selectedRole === r.key
          return (
            <Card
              key={r.key}
              className={`cursor-pointer transition ${active ? "ring-2 ring-blue-600" : ""}`}
              onClick={() => {
                setSelectedRole(r.key)
                // auto pick only subrole if there's just one
                if (r.subroles && r.subroles.length === 1) {
                  setSelectedSubrole(r.subroles[0])
                } else {
                  setSelectedSubrole(null)
                }
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                  <CardTitle>{r.title}</CardTitle>
                </div>
                <CardDescription>{r.desc}</CardDescription>
              </CardHeader>
              {active && r.subroles && r.subroles.length > 1 && (
                <CardContent className="flex gap-2">
                  {r.subroles.map((sub) => (
                    <Badge
                      key={sub}
                      variant={selectedSubrole === sub ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedSubrole(sub)
                      }}
                    >
                      {sub}
                    </Badge>
                  ))}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      <div className="flex justify-end">
        <Button disabled={!selectedRole || (roleDef?.subroles?.length! > 1 && !selectedSubrole)} onClick={continueNext}>
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
