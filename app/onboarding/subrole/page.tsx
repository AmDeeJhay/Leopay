"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "@/components/providers/session-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SubrolePage() {
  const router = useRouter()
  const { user, profile, setRoleAndSubrole } = useSession()
  const [selection, setSelection] = useState<"receiver" | "sender" | null>(null)

  useEffect(() => {
    if (!user) router.replace("/auth")
    if (!profile?.role) router.replace("/onboarding/role-selection")
  }, [user, profile, router])

  function submit() {
    if (!profile?.role || !selection) return
    const res = setRoleAndSubrole(profile.role, selection)
    router.push(res.next)
  }

  return (
    <main className="min-h-[calc(100svh-0px)] p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Choose your subrole</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`flex items-center gap-2 rounded-md border p-3 hover:bg-muted cursor-pointer ${selection === "receiver" ? "ring-2 ring-primary" : ""}`}
            >
              <input
                type="radio"
                name="subrole"
                value="receiver"
                checked={selection === "receiver"}
                onChange={() => setSelection("receiver")}
              />
              <span>Receiver</span>
            </label>
            <label
              className={`flex items-center gap-2 rounded-md border p-3 hover:bg-muted cursor-pointer ${selection === "sender" ? "ring-2 ring-primary" : ""}`}
            >
              <input
                type="radio"
                name="subrole"
                value="sender"
                checked={selection === "sender"}
                onChange={() => setSelection("sender")}
              />
              <span>Sender</span>
            </label>
          </div>
          <div className="flex justify-end">
            <Button disabled={!selection} onClick={submit}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
