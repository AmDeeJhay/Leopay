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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  BarChart3,
  ClipboardList,
  Coins,
  CreditCard,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Search,
  Settings,
  UserSearch,
  Wallet,
  Check,
  X,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ClientTab =
  | "dashboard"
  | "post-task"
  | "manage-tasks"
  | "pay-freelancer"
  | "zk-history"
  | "find-freelancers"
  | "settings"

type TaskStatus = "Open" | "Pending" | "Completed"

type ClientTask = {
  id: string
  title: string
  description: string
  tags: string[]
  skills: string[]
  budget: number
  status: TaskStatus
  matchedFreelancers: string[]
}

type Payment = {
  id: string
  date: string
  taskId: string
  toWallet: string
  amount: number
  zkReceipt: string
}

type Freelancer = {
  id: string
  name: string
  skills: string[]
  zkBadge: boolean
  powCount: number // proof-of-work history count
  rating: number
}

const initialTasks: ClientTask[] = [
  {
    id: "t1",
    title: "Landing Page Revamp",
    description: "Modernize the marketing site with responsive sections and animations.",
    tags: ["UI/UX", "Frontend"],
    skills: ["React", "Tailwind", "Accessibility"],
    budget: 1800,
    status: "Open",
    matchedFreelancers: ["Alex Chen", "María Garcia"],
  },
  {
    id: "t2",
    title: "Smart Contract Audit",
    description: "Review and audit ERC-20 + staking contracts before mainnet deploy.",
    tags: ["Security", "Solidity"],
    skills: ["Solidity", "Auditing", "Foundry"],
    budget: 4200,
    status: "Pending",
    matchedFreelancers: ["Priya N.", "Satoshi Dev"],
  },
  {
    id: "t3",
    title: "Docs and Guides",
    description: "Write technical docs and examples for our payment SDK.",
    tags: ["Docs", "DX"],
    skills: ["Technical Writing", "TypeScript"],
    budget: 1200,
    status: "Completed",
    matchedFreelancers: ["John Doe"],
  },
]

const mockPayments: Payment[] = [
  { id: "p1", date: "2025-07-12", taskId: "t3", toWallet: "0x9acb...45af", amount: 1200, zkReceipt: "0xzk123abc" },
  { id: "p2", date: "2025-07-22", taskId: "t2", toWallet: "0x77fa...09bd", amount: 2000, zkReceipt: "0xzk987xyz" },
]

const allFreelancers: Freelancer[] = [
  { id: "f1", name: "Alex Chen", skills: ["React", "Tailwind", "Next.js"], zkBadge: true, powCount: 12, rating: 4.8 },
  { id: "f2", name: "María Garcia", skills: ["UX", "UI/UX", "Figma"], zkBadge: false, powCount: 7, rating: 4.5 },
  { id: "f3", name: "Priya N.", skills: ["Solidity", "Auditing", "Foundry"], zkBadge: true, powCount: 20, rating: 4.9 },
  {
    id: "f4",
    name: "Satoshi Dev",
    skills: ["Rust", "Solana", "Smart Contracts"],
    zkBadge: true,
    powCount: 9,
    rating: 4.6,
  },
  {
    id: "f5",
    name: "John Doe",
    skills: ["Docs", "Technical Writing", "TypeScript"],
    zkBadge: false,
    powCount: 5,
    rating: 4.3,
  },
]

export default function ClientDashboardPage() {
  const [active, setActive] = React.useState<ClientTab>("dashboard")
  const [tasks, setTasks] = React.useState<ClientTask[]>(initialTasks)
  const [payments, setPayments] = React.useState<Payment[]>(mockPayments)

  // Summary
  const walletBalance = 32500
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0)
  const tasksCreated = tasks.length
  const activeCount = tasks.filter((t) => t.status === "Open" || t.status === "Pending").length

  return (
    <SidebarProvider>
      <ClientSidebar active={active} onChange={setActive} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Wallet className="h-4 w-4 text-indigo-600" />
            <span className="font-medium">Wallet:</span>
            <span className="font-mono">0xabc...123</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-gray-50">
          <div className="mx-auto max-w-[1200px] space-y-6">
            <LightSummary
              wallet={walletBalance}
              totalPaid={totalPaid}
              tasksCreated={tasksCreated}
              activeCount={activeCount}
            />

            <div
              className={cn(
                "rounded-2xl bg-white p-4 md:p-6 border shadow-sm transition-all",
                "animate-in fade-in slide-in-from-bottom-1 duration-300",
              )}
            >
              {active === "dashboard" && <ClientHome tasks={tasks} payments={payments} />}
              {active === "post-task" && <PostTask onCreate={(t) => setTasks((prev) => [t, ...prev])} />}
              {active === "manage-tasks" && (
                <ManageTasks
                  tasks={tasks}
                  onApprove={(id) =>
                    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Completed" } : t)))
                  }
                  onReject={(id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Open" } : t)))}
                />
              )}
              {active === "pay-freelancer" && (
                <PayFreelancer tasks={tasks} onPaid={(payment) => setPayments((prev) => [payment, ...prev])} />
              )}
              {active === "zk-history" && <ZkPaymentHistory payments={payments} />}
              {active === "find-freelancers" && <FindFreelancers freelancers={allFreelancers} />}
              {active === "settings" && <ClientSettings />}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function ClientSidebar({
  active,
  onChange,
}: {
  active: ClientTab
  onChange: (t: ClientTab) => void
}) {
  const items: { key: ClientTab; label: string; icon: React.ElementType }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "post-task", label: "Post Task", icon: PlusCircle },
    { key: "manage-tasks", label: "Manage Tasks", icon: ClipboardList },
    { key: "pay-freelancer", label: "Pay Freelancer", icon: CreditCard },
    { key: "zk-history", label: "zkPayment History", icon: BarChart3 },
    { key: "find-freelancers", label: "Find Freelancers", icon: UserSearch },
    { key: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="px-2 pt-4 pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-600/90 flex items-center justify-center text-white font-semibold">
                LP
              </div>
              <div>
                <div className="font-bold text-gray-900 leading-none">LeoPay</div>
                <div className="text-xs text-gray-500">Client Portal</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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

function LightSummary({
  wallet,
  totalPaid,
  tasksCreated,
  activeCount,
}: {
  wallet: number
  totalPaid: number
  tasksCreated: number
  activeCount: number
}) {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-3xl font-bold text-gray-900">${wallet.toLocaleString()}</div>
          <Wallet className="h-5 w-5 text-indigo-600" />
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Total Paid</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-3xl font-bold text-gray-900">${totalPaid.toLocaleString()}</div>
          <Coins className="h-5 w-5 text-indigo-600" />
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Tasks Created</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-3xl font-bold text-gray-900">{tasksCreated}</div>
          <FileText className="h-5 w-5 text-indigo-600" />
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Active Tasks</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-3xl font-bold text-gray-900">{activeCount}</div>
          <BarChart3 className="h-5 w-5 text-indigo-600" />
        </CardContent>
      </Card>
    </div>
  )
}

function ClientHome({ tasks, payments }: { tasks: ClientTask[]; payments: Payment[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
        <p className="text-sm text-gray-600">Recently posted tasks and latest zkPayments</p>
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Recent Tasks</CardTitle>
            <CardDescription>Latest posted and managed items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.slice(0, 4).map((t) => (
              <div key={t.id} className="rounded-xl border p-3 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">{t.title}</div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-gray-200",
                      t.status === "Open" && "bg-indigo-50 text-indigo-700 border-indigo-200",
                      t.status === "Pending" && "bg-amber-50 text-amber-700 border-amber-200",
                      t.status === "Completed" && "bg-emerald-50 text-emerald-700 border-emerald-200",
                    )}
                  >
                    {t.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{t.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Latest zkPayments</CardTitle>
            <CardDescription>Recent confirmations with zkReceipts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {payments.slice(0, 5).map((p) => (
              <div key={p.id} className="rounded-xl border p-3 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm text-gray-900">
                    Sent <span className="font-semibold">${p.amount.toLocaleString()}</span> to{" "}
                    <span className="font-mono">{p.toWallet}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Task: {p.taskId} • {new Date(p.date).toLocaleDateString()}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs border-indigo-200 text-indigo-700">
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

function PostTask({ onCreate }: { onCreate: (t: ClientTask) => void }) {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [tags, setTags] = React.useState<string>("UI/UX, Frontend")
  const [skills, setSkills] = React.useState<string>("React, Tailwind")
  const [budget, setBudget] = React.useState<string>("1500")
  const [escrow, setEscrow] = React.useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleCreate = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      const task: ClientTask = {
        id: "t" + Math.random().toString(36).slice(2, 7),
        title: title || "Untitled Task",
        description: description || "No description provided.",
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        skills: skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        budget: Number(budget) || 0,
        status: escrow ? "Pending" : "Open",
        matchedFreelancers: [],
      }
      onCreate(task)
      setIsSubmitting(false)
      setTitle("")
      setDescription("")
      setTags("")
      setSkills("")
      setBudget("")
      setEscrow(true)
    }, 600)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Post a Task</h2>
        <p className="text-sm text-gray-600">Share details; optionally escrow the budget for instant trust.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build a pricing page"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Comma separated, e.g. UI/UX, Frontend"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="skills">Skill Requirements</Label>
            <Input
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Comma separated, e.g. React, Tailwind"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="budget">Budget (USD)</Label>
            <Input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="1500"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task scope, deliverables, and timeline."
              rows={6}
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border p-3">
            <div>
              <div className="font-medium text-gray-900">Escrow</div>
              <div className="text-xs text-gray-600">Secure funds for this task using zkEscrow.</div>
            </div>
            <Switch checked={escrow} onCheckedChange={setEscrow} />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleCreate}
          disabled={isSubmitting}
          className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {isSubmitting ? "Posting..." : "Post Task"}
        </Button>
      </div>
    </div>
  )
}

function ManageTasks({
  tasks,
  onApprove,
  onReject,
}: {
  tasks: ClientTask[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Manage Tasks</h2>
        <p className="text-sm text-gray-600">Review progress, matched freelancers, and take actions.</p>
      </div>
      <div className="space-y-4">
        {tasks.map((t) => (
          <Card key={t.id} className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">{t.title}</CardTitle>
                  <CardDescription>{t.description}</CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-lg border-gray-200",
                    t.status === "Open" && "bg-indigo-50 text-indigo-700 border-indigo-200",
                    t.status === "Pending" && "bg-amber-50 text-amber-700 border-amber-200",
                    t.status === "Completed" && "bg-emerald-50 text-emerald-700 border-emerald-200",
                  )}
                >
                  {t.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-lg border-gray-200 text-gray-700">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                Skills: <span className="text-gray-800 font-medium">{t.skills.join(", ")}</span>
              </div>
              <div className="text-sm text-gray-600">
                Matched Freelancers:{" "}
                <span className="text-gray-800 font-medium">
                  {t.matchedFreelancers.length ? t.matchedFreelancers.join(", ") : "None yet"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onApprove(t.id)}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => onReject(t.id)}
                  variant="outline"
                  className="rounded-xl border-2 border-gray-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function PayFreelancer({
  tasks,
  onPaid,
}: {
  tasks: ClientTask[]
  onPaid: (payment: Payment) => void
}) {
  const [wallet, setWallet] = React.useState("")
  const [taskId, setTaskId] = React.useState<string>(tasks[0]?.id ?? "")
  const [amount, setAmount] = React.useState<string>("")
  const [open, setOpen] = React.useState(false)
  const [isPaying, setIsPaying] = React.useState(false)

  const canPay = wallet.trim().length > 6 && taskId && Number(amount) > 0

  const confirmPay = () => {
    setIsPaying(true)
    setTimeout(() => {
      const zkReceipt = "0xzk" + Math.random().toString(16).slice(2, 8)
      onPaid({
        id: "p" + Math.random().toString(36).slice(2, 7),
        date: new Date().toISOString(),
        taskId,
        toWallet: wallet,
        amount: Number(amount),
        zkReceipt,
      })
      setIsPaying(false)
      setOpen(false)
      setWallet("")
      setAmount("")
    }, 900)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Pay a Freelancer</h2>
        <p className="text-sm text-gray-600">Send a zkPayment tied to a task.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="fwallet">Freelancer Wallet</Label>
            <Input
              id="fwallet"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0x1234...abcd"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Task</Label>
            <Select value={taskId} onValueChange={setTaskId}>
              <SelectTrigger>
                <SelectValue placeholder="Select task" />
              </SelectTrigger>
              <SelectContent>
                {tasks.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500"
            />
          </div>
        </div>
        <div className="rounded-xl border p-4 bg-gray-50">
          <div className="flex items-center gap-2 text-gray-800 font-medium">
            <CreditCard className="h-4 w-4 text-indigo-600" /> Payment Summary
          </div>
          <div className="mt-3 text-sm text-gray-600 space-y-2">
            <div>
              To: <span className="font-mono text-gray-900">{wallet || "—"}</span>
            </div>
            <div>
              Task: <span className="text-gray-900">{tasks.find((t) => t.id === taskId)?.title || "—"}</span>
            </div>
            <div>
              Amount: <span className="text-gray-900">${Number(amount || 0).toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button disabled={!canPay} className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                  Confirm zkPayment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm zkPayment</DialogTitle>
                  <DialogDescription>Review the payment details before sending.</DialogDescription>
                </DialogHeader>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>
                    To: <span className="font-mono">{wallet}</span>
                  </div>
                  <div>Task: {tasks.find((t) => t.id === taskId)?.title}</div>
                  <div>Amount: ${Number(amount || 0).toLocaleString()}</div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmPay}
                    disabled={isPaying}
                    className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {isPaying ? "Processing..." : "Send Payment"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

function ZkPaymentHistory({ payments }: { payments: Payment[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">zkPayment History</h2>
        <p className="text-sm text-gray-600">All historical payments with zkReceipts.</p>
      </div>
      <div className="space-y-3">
        {payments.map((p) => (
          <div key={p.id} className="rounded-xl border p-3 bg-white flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm text-gray-900">
                <span className="font-medium">${p.amount.toLocaleString()}</span> to{" "}
                <span className="font-mono">{p.toWallet}</span>
              </div>
              <div className="text-xs text-gray-600">
                {new Date(p.date).toLocaleString()} • Task: {p.taskId}
              </div>
            </div>
            <Button variant="outline" className="rounded-xl border-2 border-gray-200 bg-transparent">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        ))}
        {payments.length === 0 && <div className="text-sm text-gray-600">No payments found.</div>}
      </div>
    </div>
  )
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  )
}

function FindFreelancers({ freelancers }: { freelancers: Freelancer[] }) {
  const [q, setQ] = React.useState("")
  const [skill, setSkill] = React.useState<string>("all")
  const [zkOnly, setZkOnly] = React.useState(false)
  const [minPow, setMinPow] = React.useState<number>(0)

  const skills = Array.from(new Set(freelancers.flatMap((f) => f.skills))).sort()

  const filtered = freelancers.filter((f) => {
    if (zkOnly && !f.zkBadge) return false
    if (skill !== "all" && !f.skills.includes(skill)) return false
    if (q && !f.name.toLowerCase().includes(q.toLowerCase())) return false
    if (f.powCount < minPow) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Find Freelancers</h2>
          <p className="text-sm text-gray-600">Filter by skill, zkBadge, and proof-of-work history.</p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name..."
            className="pl-9 rounded-xl"
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Skill</Label>
          <Select value={skill} onValueChange={setSkill}>
            <SelectTrigger className="rounded-xl">
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
        <div className="space-y-1.5">
          <Label>zkBadge Only</Label>
          <div className="rounded-xl border p-2.5 flex items-center justify-between">
            <span className="text-sm text-gray-700">Require zkBadge</span>
            <Switch checked={zkOnly} onCheckedChange={setZkOnly} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Min Proof-of-Work</Label>
          <Input
            type="number"
            min={0}
            value={minPow}
            onChange={(e) => setMinPow(Number(e.target.value || 0))}
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((f) => (
          <Card key={f.id} className="border-0 shadow-sm hover:shadow-md transition">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{f.name}</CardTitle>
                {f.zkBadge ? (
                  <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200">zkBadge</Badge>
                ) : (
                  <Badge variant="outline" className="border-gray-200 text-gray-700">
                    No zkBadge
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm text-gray-600">
                Rating {f.rating.toFixed(1)} • PoW {f.powCount}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {f.skills.map((s) => (
                  <Badge key={s} variant="outline" className="rounded-lg border-gray-200">
                    {s}
                  </Badge>
                ))}
              </div>
              <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white w-full">View Profile</Button>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-sm text-gray-600">No freelancers match your filters.</div>
        )}
      </div>
    </div>
  )
}

function ClientSettings() {
  return (
    <div className="space-y-2 text-sm text-gray-600">
      <div className="font-semibold text-gray-900">Settings</div>
      <div>Coming soon...</div>
    </div>
  )
}
