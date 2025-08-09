"use client"

import { useEffect, useMemo, useState } from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Download, Send, Loader2 } from 'lucide-react'
import { setUserSubrole, type SetSubroleResult } from "./actions"
import { supabase } from "@/lib/supabase/client"

export default function SubroleSelectionPage() {
  const [role, setRole] = useState<string | null>(null)
  const [preselectDone, setPreselectDone] = useState(false)
  const [selected, setSelected] = useState<"receiver" | "sender" | "">("")
  const [state, formAction, isPending] = useActionState<SetSubroleResult, FormData>(setUserSubrole, { ok: false })
  const router = useRouter()

  // Load current role from profile
  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        router.push("/auth?next=/onboarding/subrole")
        return
      }
      const { data: prof } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()
      if (!prof?.role) {
        router.push("/onboarding/role-selection")
        return
      }
      setRole(prof.role)
      // Auto-preselect when only one option is valid
      if (prof.role === "employee" || prof.role === "employer") {
        const only = prof.role === "employee" ? "receiver" : "sender"
        setSelected(only as any)
        setPreselectDone(true)
        // Auto-advance after a short delay
        setTimeout(() => {
          const fd = new FormData()
          fd.set("subrole", only)
          formAction(fd)
        }, 350)
      } else {
        setPreselectDone(true)
      }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (state?.ok && state.next) {
      router.push(state.next)
    } else if (!state?.ok && state?.error === "NOT_AUTHENTICATED") {
      router.push("/auth?next=/onboarding/subrole")
    }
  }, [state, router])

  const choices = useMemo(() => {
    // DAO has "Contributor" (receiver) and "Admin" (sender) labels
    if (role === "dao") {
      return [
        { id: "receiver" as const, label: "Contributor", desc: "Track contributions, receive DAO payments", Icon: Download },
        { id: "sender" as const, label: "Admin", desc: "Manage treasury, send payments, analytics", Icon: Send },
      ]
    }
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
    return []
  }, [role])

  if (!preselectDone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold">Choose Your Subrole</CardTitle>
            <CardDescription className="text-lg">Role: {role}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {choices.map(({ id, label, desc, Icon }) => {
                const isSelected = selected === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(id)}
                    className={`w-full text-left flex items-center space-x-4 p-6 rounded-2xl border-2 transition-all duration-200 ${
                      isSelected ? "border-blue-500 bg-blue-50 shadow-lg" : "border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-gray-50"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                    <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </button>
                )
              })}
            </div>

            {choices.length > 1 && (
              <form action={formAction} onSubmit={(e) => {
                if (!selected) {
                  e.preventDefault()
                }
              }}>
                <input type="hidden" name="subrole" value={selected} />
                <Button type="submit" disabled={!selected || isPending} className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-2xl">
                  {isPending ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>) : (<>Continue<ArrowRight className="ml-2 h-4 w-4" /></>)}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
