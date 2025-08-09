"use client"

import type { ComponentType } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, Building, Coins, ArrowRight, Loader2, Send, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { setRoleAndSubrole } from "@/app/onboarding/role-selection/actions"

type Subrole = "receiver" | "sender"

type RoleDef = {
  id: "freelancer" | "contractor" | "employee" | "employer" | "dao"
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  color: string
}

const baseRoles: RoleDef[] = [
  {
    id: "freelancer",
    title: "Freelancer",
    description: "Independent contractor",
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
    id: "employee",
    title: "Employee",
    description: "Receives salary, views zkPayslips",
    icon: Users,
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "employer",
    title: "Employer",
    description: "Sends payroll, manages employees",
    icon: Building,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "dao",
    title: "DAO",
    description: "Decentralized org payments",
    icon: Coins,
    color: "from-orange-500 to-red-500",
  },
]

function SubrolePicker({
  role,
  selected,
  onSelect,
}: {
  role: RoleDef["id"] | ""
  selected: Subrole | ""
  onSelect: (v: Subrole) => void
}) {
  const choices = useMemo(() => {
    if (role === "freelancer") {
      return [
        { id: "receiver" as const, label: "Receiver", desc: "Receive payments, explore tasks", Icon: Download },
        { id: "sender" as const, label: "Client", desc: "Post tasks, hire freelancers, send payments", Icon: Send },
      ]
    }
    if (role === "contractor") {
      return [
        { id: "receiver" as const, label: "Receiver", desc: "Submit invoices, receive payments", Icon: Download },
        { id: "sender" as const, label: "Client", desc: "Pay contractors, manage invoices", Icon: Send },
      ]
    }
    if (role === "employee") {
      return [{ id: "receiver" as const, label: "Receiver", desc: "Receive salary, view zkPayslips", Icon: Download }]
    }
    if (role === "employer") {
      return [{ id: "sender" as const, label: "Sender", desc: "Send payroll, manage employees, analytics", Icon: Send }]
    }
    if (role === "dao") {
      return [
        {
          id: "receiver" as const,
          label: "Contributor",
          desc: "Track contributions, receive DAO payments",
          Icon: Download,
        },
        { id: "sender" as const, label: "Admin", desc: "Manage treasury, send payments, analytics", Icon: Send },
      ]
    }
    return []
  }, [role])

  useEffect(() => {
    if (choices.length === 1 && selected !== choices[0].id) {
      onSelect(choices[0].id)
    }
  }, [choices, selected, onSelect])

  if (!role) return null

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700">Choose your subrole</div>
      <div className="space-y-3">
        {choices.map(({ id, label, desc, Icon }) => {
          const isSelected = selected === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={`w-full text-left flex items-center space-x-4 p-5 rounded-xl border-2 transition ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
              aria-pressed={isSelected}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">{label}</div>
                <div className="text-xs text-gray-600">{desc}</div>
              </div>
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
              >
                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ModernRoleSelection() {
  const [role, setRole] = useState<RoleDef["id"] | "">("")
  const [subrole, setSubrole] = useState<Subrole | "">("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  // Restore preselected values from query (e.g., after redirect from /auth)
  useEffect(() => {
    const r = searchParams.get("role")
    const s = searchParams.get("subrole") as Subrole | null
    const err = searchParams.get("error")
    if (err) toast({ title: "Error", description: err, variant: "destructive" })
    if (r && baseRoles.find((x) => x.id === r)) setRole(r as RoleDef["id"])
    if (s === "receiver" || s === "sender") setSubrole(s)
  }, [searchParams, toast])

  // Normalize single-subrole roles
  useEffect(() => {
    if (role === "employee") setSubrole("receiver")
    if (role === "employer") setSubrole("sender")
  }, [role])

  const canSubmit = !!role && (role === "employee" || role === "employer" ? true : !!subrole)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold">Choose Your Role</CardTitle>
            <CardDescription className="text-lg">Role selection → Subrole choice (Receiver / Sender)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {baseRoles.map(({ id, title, description, icon: Icon, color }) => {
                const isSelected = role === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setRole(id)
                      setSubrole("") // reset subrole on role change
                    }}
                    className={`w-full text-left flex items-center space-x-4 p-6 rounded-2xl border-2 transition ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-gray-50"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
                    >
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </button>
                )
              })}
            </div>

            {role && <SubrolePicker role={role} selected={subrole} onSelect={(v) => setSubrole(v)} />}

            <form
              ref={formRef}
              action={setRoleAndSubrole}
              onSubmit={(e) => {
                if (!canSubmit) {
                  e.preventDefault()
                  toast({
                    title: "Missing selection",
                    description: !role ? "Please select a role." : "Please choose a subrole.",
                    variant: "destructive",
                  })
                  return
                }
                setIsSubmitting(true)
              }}
              className="space-y-2"
            >
              <input type="hidden" name="role" value={role} />
              <input type="hidden" name="subrole" value={subrole} />
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-2xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
