"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Briefcase,
  CheckCircle,
  Coins,
  CreditCard,
  FileText,
  History,
  LayoutDashboard,
  Search,
  Settings,
  User,
  Wallet,
  LinkIcon,
  Download,
} from "lucide-react"

type FTab = "dashboard" | "explore" | "task-history" | "request-payment" | "payment-history" | "profile" | "settings"

type FTask = {
  id: string
  title: string
  client: string
  amount: number
  skills: string[]
  match: number // 0-100 %
  status: "open" | "completed"
  zkProof?: string
  github?: string
}

type FPayment = {
  id: string
  date: string
  taskId: string
  amount: number
  zkReceipt: string
}

const mySkills = ["React", "Tailwind", "TypeScript", "Docs"]
const exploreTasks: FTask[] = [
  {
    id: "e1",
    title: "Design Dashboard UI",
    client: "Acme Labs",
    amount: 1600,
    skills: ["React", "Tailwind"],
    match: 92,
    status: "open",
  },
  {
    id: "e2",
    title: "Payment SDK Docs",
    client: "LeoPay",
    amount: 1200,
    skills: ["Docs", "TypeScript"],
    match: 88,
    status: "open",
  },
  {
    id: "e3",
    title: "Build Pricing Page",
    client: "Startly",
    amount: 900,
    skills: ["React"],
    match: 74,
    status: "open",
  },
]
const historyTasks: FTask[] = [
  {
    id: "h1",
    title: "Landing Revamp",
    client: "Startly",
    amount: 1500,
    skills: ["React"],
    match: 85,
    status: "completed",
    zkProof: "0xzk111abc",
    github: "https://github.com/example/landing",
  },
  {
    id: "h2",
    title: "SDK Examples",
    client: "LeoPay",
    amount: 1300,
    skills: ["TypeScript", "Docs"],
    match: 90,
    status: "completed",
    zkProof: "0xzk222def",
  },
]
const fPayments: FPayment[] = [
  { id: "fp1", date: "2025-07-15", taskId: "h1", amount: 1500, zkReceipt: "0xzk999aaa" },
  { id: "fp2", date: "2025-07-22", taskId: "h2", amount: 1300, zkReceipt: "0xzk555bbb" },
]

export default function FreelancerDashboardV2() {
  const [active, setActive] = React.useState<FTab>("dashboard")
  const [walletConnected] = React.useState(true)
  const walletBalance = 8450
  const totalEarnings = fPayments.reduce((s, p) => s + p.amount, 0)
  const completedCount = historyTasks.length

  return (
    <SidebarProvider>
      <FreelancerSidebar active={active} onChange={setActive} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-zinc-950/95 px-4">
          <SidebarTrigger className="-ml-1 text-zinc-100" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-zinc-800" />
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <Wallet className="h-4 w-4 text-indigo-400" />
            <span className="font-medium text-zinc-200">Wallet:</span>
            <span className="font-mono">0xabc...123</span>
            {walletConnected && (
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-600/40">Connected</Badge>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-zinc-950">
          <div className="mx-auto max-w-[1200px] space-y-6">
            <DarkSummary wallet={walletBalance} earnings={totalEarnings} completed={completedCount} />

            <div
              className={cn(
                "rounded-2xl p-4 md:p-6 border border-zinc-800 bg-zinc-900/60 shadow-sm",
                "animate-in fade-in slide-in-from-bottom-1 duration-300",
              )}
            >
              {active === "dashboard" && <FHome tasks={exploreTasks} payments={fPayments} />}
              {active === "explore" && <ExploreTasks tasks={exploreTasks} mySkills={mySkills} />}
              {active === "task-history" && <TaskHistory tasks={historyTasks} />}
              {active === "payment-history" && <FPaymentHistory payments={fPayments} />}
              {active === "request-payment" && <RequestPayment />}
              {active === "profile" && <FProfile mySkills={mySkills} />}
              {active === "settings" && <FSettings />}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function FreelancerSidebar({ active, onChange }: { active: FTab; onChange: (t: FTab) => void }) {
  const items: { key: FTab; label: string; icon: React.ElementType }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "explore", label: "Explore Tasks", icon: Briefcase },
    { key: "task-history", label: "Task History", icon: History },
    { key: "request-payment", label: "Request Payment", icon: CreditCard },
    { key: "payment-history", label: "Payment History", icon: FileText },
    { key: "profile", label: "Profile", icon: User },
    { key: "settings", label: "Settings", icon: Settings },
  ]
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-semibold">
            LP
          </div>
          <div>
            <div className="font-bold text-zinc-100 leading-none">LeoPay</div>
            <div className="text-xs text-zinc-400">Freelancer</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((it) => {
                const Icon = it.icon
                const isActive = active === it.key
                return (
                  <SidebarMenuItem key={it.key}>
                    <SidebarMenuButton isActive={isActive} onClick={() => onChange(it.key)} tooltip={it.label}>
                      <Icon />
                      <span>{it.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

function DarkSummary({ wallet, earnings, completed }: { wallet: number; earnings: number; completed: number }) {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-zinc-900/70 border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-zinc-300">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-3xl font-bold text-zinc-100">${wallet.toLocaleString()}</div>
          <Wallet className="h-5 w-5 text-indigo-400" />
        </CardContent>
      </Card>
      <Card className="bg-zinc-900/70 border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-zinc-300">Total Earnings</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-3xl font-bold text-zinc-100">${earnings.toLocaleString()}</div>
          <Coins className="h-5 w-5 text-indigo-400" />
        </CardContent>
      </Card>
      <Card className="bg-zinc-900/70 border-zinc-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-zinc-300">Completed Tasks</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-3xl font-bold text-zinc-100">{completed}</div>
          <CheckCircle className="h-5 w-5 text-indigo-400" />
        </CardContent>
      </Card>
    </div>
  )
}

function FHome({ tasks, payments }: { tasks: FTask[]; payments: FPayment[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">Overview</h2>
        <p className="text-sm text-zinc-400">Explore new tasks and track your latest payments</p>
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-zinc-900/70 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg text-zinc-100">New Tasks</CardTitle>
            <CardDescription className="text-zinc-400">Recommended based on your skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.slice(0, 4).map((t) => (
              <div key={t.id} className="rounded-xl border border-zinc-800 p-3 hover:bg-zinc-900 transition">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-zinc-100">{t.title}</div>
                  <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-700">{t.match}% match</Badge>
                </div>
                <div className="text-xs text-zinc-400 mt-1">{t.client}</div>
                <div className="text-sm text-zinc-300 mt-2">Payment: ${t.amount.toLocaleString()}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/70 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg text-zinc-100">Recent Payments</CardTitle>
            <CardDescription className="text-zinc-400">Your latest zkReceipts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {payments.slice(0, 5).map((p) => (
              <div key={p.id} className="rounded-xl border border-zinc-800 p-3 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm text-zinc-200">
                    <span className="font-medium">${p.amount.toLocaleString()}</span> • Task {p.taskId}
                  </div>
                  <div className="text-xs text-zinc-400">{new Date(p.date).toLocaleString()}</div>
                </div>
                <Badge variant="outline" className="border-indigo-700 text-indigo-300">
                  {p.zkReceipt}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ExploreTasks({ tasks, mySkills }: { tasks: FTask[]; mySkills: string[] }) {
  const [q, setQ] = React.useState("")
  const [skill, setSkill] = React.useState<string>("all")
  const skills = Array.from(new Set(tasks.flatMap((t) => t.skills))).sort()
  const filtered = tasks.filter((t) => {
    if (q && !t.title.toLowerCase().includes(q.toLowerCase())) return false
    if (skill !== "all" && !t.skills.includes(skill)) return false
    return true
  })

  const computedMatch = (t: FTask) => {
    const overlap = t.skills.filter((s) => mySkills.includes(s)).length
    return Math.min(100, Math.round((overlap / Math.max(1, t.skills.length)) * 100))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Explore Tasks</h2>
          <p className="text-sm text-zinc-400">Find work that matches your profile</p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tasks..."
            className="pl-9 rounded-xl bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
          />
        </div>
      </div>

      <div className="max-w-xs">
        <Label className="text-zinc-300">Filter by Skill</Label>
        <Select value={skill} onValueChange={setSkill}>
          <SelectTrigger className="rounded-xl bg-zinc-900 border-zinc-800 text-zinc-100">
            <SelectValue placeholder="All skills" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All skills</SelectItem>
            {skills.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Card key={t.id} className="bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 transition">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-zinc-100 text-lg">{t.title}</CardTitle>
                <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-700">{computedMatch(t)}% match</Badge>
              </div>
              <CardDescription className="text-zinc-400">{t.client}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-zinc-300">Payment: ${t.amount.toLocaleString()}</div>
              <div className="flex flex-wrap gap-2">
                {t.skills.map((s) => (
                  <Badge key={s} variant="outline" className="border-zinc-700 text-zinc-300">
                    {s}
                  </Badge>
                ))}
              </div>
              <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white w-full">Apply</Button>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <div className="col-span-full text-sm text-zinc-400">No tasks found.</div>}
      </div>
    </div>
  )
}

function TaskHistory({ tasks }: { tasks: FTask[] }) {
  const [showGitHubFor, setShowGitHubFor] = React.useState<Record<string, boolean>>({})
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">Task History</h2>
        <p className="text-sm text-zinc-400">Completed tasks with zkProofs</p>
      </div>
      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.id} className="rounded-xl border border-zinc-800 p-3 bg-zinc-900/60">
            <div className="flex items-center justify-between">
              <div className="text-zinc-100 font-medium">{t.title}</div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-700">Completed</Badge>
            </div>
            <div className="text-xs text-zinc-400 mt-1">{t.client}</div>
            <div className="text-sm text-zinc-300 mt-2">
              zkProof: <span className="font-mono">{t.zkProof}</span>
            </div>
            <div className="mt-2">
              <Button
                variant="outline"
                className="rounded-xl border-zinc-700 text-zinc-200 bg-transparent"
                onClick={() => setShowGitHubFor((prev) => ({ ...prev, [t.id]: !prev[t.id] }))}
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                {showGitHubFor[t.id] ? "Hide GitHub" : "Show GitHub"}
              </Button>
              {showGitHubFor[t.id] && t.github && (
                <div className="mt-2 text-sm">
                  <a href={t.github} target="_blank" rel="noreferrer" className="text-indigo-300 hover:underline">
                    {t.github}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FPaymentHistory({ payments }: { payments: FPayment[] }) {
  const download = (id: string) => {
    // Simulate download
    alert("Downloading zkReceipt for " + id)
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">Payment History</h2>
        <p className="text-sm text-zinc-400">All received payments and zkReceipts</p>
      </div>
      <div className="space-y-3">
        {payments.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-zinc-800 p-3 bg-zinc-900/60 flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="text-sm text-zinc-200">
                <span className="font-medium">${p.amount.toLocaleString()}</span> • Task {p.taskId}
              </div>
              <div className="text-xs text-zinc-400">{new Date(p.date).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-indigo-700 text-indigo-300">
                {p.zkReceipt}
              </Badge>
              <Button
                variant="outline"
                className="rounded-xl border-zinc-700 text-zinc-200 bg-transparent"
                onClick={() => download(p.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        ))}
        {payments.length === 0 && <div className="text-sm text-zinc-400">No payments found.</div>}
      </div>
    </div>
  )
}

function RequestPayment() {
  const [task, setTask] = React.useState<string>("")
  const [amount, setAmount] = React.useState<string>("")
  const [link, setLink] = React.useState<string>("")

  const generate = () => {
    const id = Math.random().toString(36).slice(2, 10)
    setLink(`https://leopay.example/zkpay/${id}?task=${encodeURIComponent(task)}&amount=${amount}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">Request Payment</h2>
        <p className="text-sm text-zinc-400">Generate a zkPayLink to send to clients</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-zinc-300" htmlFor="task">
              Task
            </Label>
            <Input
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. SDK Examples"
              className="bg-zinc-900 border-zinc-800 text-zinc-100"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-zinc-300" htmlFor="amt">
              Amount (USD)
            </Label>
            <Input
              id="amt"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500"
              className="bg-zinc-900 border-zinc-800 text-zinc-100"
            />
          </div>
          <Button onClick={generate} className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
            Generate zkPayLink
          </Button>
        </div>
        <div className="rounded-xl border border-zinc-800 p-4 bg-zinc-900/60">
          <div className="text-sm text-zinc-300">Generated Link</div>
          <div className="mt-2 text-xs break-all text-indigo-300">{link || "—"}</div>
          {link && (
            <div className="mt-3">
              <Button
                variant="outline"
                className="rounded-xl border-zinc-700 text-zinc-200 bg-transparent"
                onClick={() => navigator.clipboard.writeText(link)}
              >
                Copy Link
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FProfile({ mySkills }: { mySkills: string[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">Profile</h2>
        <p className="text-sm text-zinc-400">Your public information</p>
      </div>
      <Card className="bg-zinc-900/70 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">Alex Johnson</CardTitle>
          <CardDescription className="text-zinc-400">Freelancer • {mySkills.join(", ")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs text-zinc-400">Email</div>
              <div className="text-sm text-zinc-200">alex@example.com</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400">Wallet</div>
              <div className="text-sm text-zinc-200 font-mono">0xabc...123</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FSettings() {
  return (
    <div className="space-y-2 text-sm text-zinc-300">
      <div className="font-semibold text-zinc-100">Settings</div>
      <div>Coming soon...</div>
    </div>
  )
}
