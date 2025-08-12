"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Wallet,
  DollarSign,
  CheckCircle,
  Search,
  Star,
  Shield,
  Github,
  Download,
  Copy,
  Send,
  Clock,
  TrendingUp,
  FileText,
  User,
  Settings,
  Activity,
  Eye,
  Filter,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data
const mockTasks = [
  {
    id: "1",
    title: "Build React Dashboard",
    client: "TechCorp Inc.",
    clientVerified: true,
    payment: 2500,
    skillMatch: 95,
    skills: ["React", "TypeScript", "Tailwind CSS"],
    escrow: true,
    description: "Create a modern dashboard with charts and analytics for our SaaS platform.",
    deadline: "2024-02-15",
    applicants: 12,
  },
  {
    id: "2",
    title: "Mobile App Development",
    client: "StartupXYZ",
    clientVerified: false,
    payment: 5000,
    skillMatch: 88,
    skills: ["React Native", "Node.js", "MongoDB"],
    escrow: true,
    description: "iOS and Android app for e-commerce platform with payment integration.",
    deadline: "2024-03-01",
    applicants: 8,
  },
  {
    id: "3",
    title: "Smart Contract Audit",
    client: "DeFi Protocol",
    clientVerified: true,
    payment: 3500,
    skillMatch: 92,
    skills: ["Solidity", "Security", "Blockchain"],
    escrow: true,
    description: "Comprehensive security audit of DeFi lending protocol smart contracts.",
    deadline: "2024-02-28",
    applicants: 5,
  },
]

const mockTaskHistory = [
  {
    id: "1",
    title: "E-commerce Website",
    client: "ShopMaster",
    completedDate: "2024-01-15",
    payment: 3200,
    zkProof: "zk1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    githubLink: "https://github.com/user/ecommerce-project",
    showGithub: true,
    rating: 5,
  },
  {
    id: "2",
    title: "API Integration",
    client: "DataFlow Inc.",
    completedDate: "2024-01-08",
    payment: 1800,
    zkProof: "zk9i8h7g6f5e4d3c2b1a0z9y8x7w6v5u4t3s2r1q0p",
    githubLink: "https://github.com/user/api-integration",
    showGithub: false,
    rating: 4.8,
  },
  {
    id: "3",
    title: "Smart Contract Development",
    client: "BlockchainCorp",
    completedDate: "2023-12-20",
    payment: 4500,
    zkProof: "zkm4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g",
    githubLink: "https://github.com/user/smart-contracts",
    showGithub: true,
    rating: 5,
  },
]

const mockPaymentHistory = [
  {
    id: "1",
    date: "2024-01-15",
    task: "E-commerce Website",
    amount: 3200,
    zkReceipt: "zkr_1a2b3c4d5e6f7g8h9i0j",
    status: "completed" as const,
  },
  {
    id: "2",
    date: "2024-01-08",
    task: "API Integration",
    amount: 1800,
    zkReceipt: "zkr_9i8h7g6f5e4d3c2b1a0",
    status: "completed" as const,
  },
  {
    id: "3",
    date: "2023-12-20",
    task: "Smart Contract Development",
    amount: 4500,
    zkReceipt: "zkr_m4n5o6p7q8r9s0t1u2v",
    status: "completed" as const,
  },
]

export function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [paymentForm, setPaymentForm] = useState({
    taskTitle: "",
    amount: "",
    clientWallet: "",
    notes: "",
  })
  const [taskHistory, setTaskHistory] = useState(mockTaskHistory)
  const [zkPayLink, setZkPayLink] = useState("")

  // Filter tasks based on search
  const filteredTasks = useMemo(() => {
    return mockTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesSkill =
        !skillFilter || task.skills.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase()))

      return matchesSearch && matchesSkill
    })
  }, [searchQuery, skillFilter])

  const toggleGithubLink = (taskId: string) => {
    setTaskHistory((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, showGithub: !task.showGithub } : task)),
    )
  }

  const generateZkPayLink = () => {
    const link = `https://leopay.app/pay/${Math.random().toString(36).substr(2, 9)}`
    setZkPayLink(link)
    toast({
      title: "zkPayLink Generated",
      description: "Your payment link has been created successfully.",
    })
  }

  const copyZkPayLink = () => {
    navigator.clipboard.writeText(zkPayLink)
    toast({
      title: "Link Copied",
      description: "zkPayLink has been copied to clipboard.",
    })
  }

  const downloadReceipt = (receiptId: string) => {
    toast({
      title: "Receipt Downloaded",
      description: `zkReceipt ${receiptId} has been downloaded.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-slate-900/80 backdrop-blur-sm border-r border-indigo-800/30 min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-6">
              LeoPay Freelancer
            </h2>
            <nav className="space-y-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: Activity },
                { id: "explore-tasks", label: "Explore Tasks", icon: Search },
                { id: "task-history", label: "Task History", icon: FileText },
                { id: "request-payment", label: "Request Payment", icon: Send },
                { id: "payment-history", label: "Payment History", icon: DollarSign },
                { id: "profile", label: "Profile", icon: User },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-indigo-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="bg-gradient-to-r from-slate-800/80 to-indigo-800/80 backdrop-blur-sm border-b border-indigo-700/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {activeTab === "dashboard" && "Dashboard"}
                  {activeTab === "explore-tasks" && "Explore Tasks"}
                  {activeTab === "task-history" && "Task History"}
                  {activeTab === "request-payment" && "Request Payment"}
                  {activeTab === "payment-history" && "Payment History"}
                  {activeTab === "profile" && "Profile"}
                  {activeTab === "settings" && "Settings"}
                </h1>
                <p className="text-slate-300">
                  {activeTab === "dashboard" && "Your freelancing overview"}
                  {activeTab === "explore-tasks" && "Find new opportunities"}
                  {activeTab === "task-history" && "Your completed work"}
                  {activeTab === "request-payment" && "Generate payment links"}
                  {activeTab === "payment-history" && "Track your earnings"}
                  {activeTab === "profile" && "Manage your profile"}
                  {activeTab === "settings" && "Account settings"}
                </p>
              </div>

              {/* Top Summary Cards */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">$12,450</div>
                  <div className="text-sm text-slate-300">Wallet Balance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    $28,750
                  </div>
                  <div className="text-sm text-slate-300">Total Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-400">47</div>
                  <div className="text-sm text-slate-300">Completed Tasks</div>
                </div>
                <Button className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {activeTab === "dashboard" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        This Month
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-400">$4,250</div>
                      <p className="text-slate-300 text-sm">+23% from last month</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock className="w-5 h-5 text-indigo-400" />
                        Active Tasks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-indigo-400">3</div>
                      <p className="text-slate-300 text-sm">In progress</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Star className="w-5 h-5 text-yellow-400" />
                        Rating
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-400">4.9</div>
                      <p className="text-slate-300 text-sm">Based on 47 reviews</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-slate-300">Your latest task updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTaskHistory.slice(0, 3).map((task, index) => (
                        <div
                          key={task.id}
                          className={`flex items-center justify-between p-4 bg-slate-700/30 rounded-lg animate-in slide-in-from-left duration-300`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div>
                            <h4 className="font-medium text-white">{task.title}</h4>
                            <p className="text-sm text-slate-300">Completed for {task.client}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-medium">${task.payment}</div>
                            <div className="text-xs text-slate-400">{task.completedDate}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "explore-tasks" && (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                {/* Search and Filters */}
                <Card className="bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Filter className="w-5 h-5" />
                      Search & Filter
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="search" className="text-slate-300">
                          Search Tasks
                        </Label>
                        <Input
                          id="search"
                          placeholder="Search tasks, clients, or skills..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="skill-filter" className="text-slate-300">
                          Filter by Skill
                        </Label>
                        <Input
                          id="skill-filter"
                          placeholder="e.g., React, Node.js, Design..."
                          value={skillFilter}
                          onChange={(e) => setSkillFilter(e.target.value)}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Task Feed */}
                <div className="space-y-6">
                  {filteredTasks.map((task, index) => (
                    <Card
                      key={task.id}
                      className={`bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30 hover:border-indigo-500/50 transition-all duration-200 animate-in slide-in-from-bottom`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-xl text-white">{task.title}</CardTitle>
                              <Badge
                                className={`text-xs ${task.skillMatch >= 90 ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/20 text-yellow-400"}`}
                              >
                                {task.skillMatch}% match
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-slate-300">{task.client}</span>
                              {task.clientVerified && (
                                <Badge variant="outline" className="text-xs border-indigo-400 text-indigo-400">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-slate-300">{task.description}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-400">${task.payment}</div>
                            <div className="text-sm text-slate-400">Fixed price</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {task.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>Deadline: {task.deadline}</span>
                            <span>{task.applicants} applicants</span>
                            {task.escrow && (
                              <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                                <Shield className="w-3 h-3 mr-1" />
                                Escrow
                              </Badge>
                            )}
                          </div>

                          <div className="flex gap-3">
                            <Button className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600">
                              Apply Now
                            </Button>
                            <Button
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "task-history" && (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <Card className="bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30">
                  <CardHeader>
                    <CardTitle className="text-white">Completed Tasks</CardTitle>
                    <CardDescription className="text-slate-300">
                      All your finished projects with zkProofs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700">
                          <TableHead className="text-slate-300">Task</TableHead>
                          <TableHead className="text-slate-300">Client</TableHead>
                          <TableHead className="text-slate-300">Completed</TableHead>
                          <TableHead className="text-slate-300">Payment</TableHead>
                          <TableHead className="text-slate-300">Rating</TableHead>
                          <TableHead className="text-slate-300">zkProof</TableHead>
                          <TableHead className="text-slate-300">GitHub</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {taskHistory.map((task) => (
                          <TableRow key={task.id} className="border-slate-700">
                            <TableCell className="text-white font-medium">{task.title}</TableCell>
                            <TableCell className="text-slate-300">{task.client}</TableCell>
                            <TableCell className="text-slate-300">{task.completedDate}</TableCell>
                            <TableCell className="text-green-400 font-medium">${task.payment}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-white">{task.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <code className="text-xs bg-slate-700 text-indigo-300 px-2 py-1 rounded font-mono">
                                {task.zkProof.slice(0, 20)}...
                              </code>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={task.showGithub}
                                  onCheckedChange={() => toggleGithubLink(task.id)}
                                  className="data-[state=checked]:bg-indigo-500"
                                />
                                {task.showGithub && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                                    onClick={() => window.open(task.githubLink, "_blank")}
                                  >
                                    <Github className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "request-payment" && (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <Card className="bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30">
                  <CardHeader>
                    <CardTitle className="text-white">Generate zkPayLink</CardTitle>
                    <CardDescription className="text-slate-300">
                      Create a secure payment link to share with clients
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="task-title" className="text-slate-300">
                          Task Title
                        </Label>
                        <Input
                          id="task-title"
                          placeholder="Enter task title..."
                          value={paymentForm.taskTitle}
                          onChange={(e) => setPaymentForm({ ...paymentForm, taskTitle: e.target.value })}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-slate-300">
                          Amount (USD)
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount..."
                          value={paymentForm.amount}
                          onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="client-wallet" className="text-slate-300">
                        Client Wallet (Optional)
                      </Label>
                      <Input
                        id="client-wallet"
                        placeholder="Client wallet address..."
                        value={paymentForm.clientWallet}
                        onChange={(e) => setPaymentForm({ ...paymentForm, clientWallet: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-slate-300">
                        Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Additional notes for the client..."
                        rows={3}
                        value={paymentForm.notes}
                        onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={generateZkPayLink}
                          className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Generate zkPayLink
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700">
                        <DialogHeader>
                          <DialogTitle className="text-white">zkPayLink Generated</DialogTitle>
                          <DialogDescription className="text-slate-300">
                            Share this secure payment link with your client
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-700/50 rounded-lg space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Task:</span>
                              <span className="text-white">{paymentForm.taskTitle}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Amount:</span>
                              <span className="text-green-400 font-medium">${paymentForm.amount}</span>
                            </div>
                            <Separator className="bg-slate-600" />
                            <div className="space-y-2">
                              <span className="text-slate-400 text-sm">zkPayLink:</span>
                              <div className="flex items-center gap-2 p-2 bg-slate-900/50 rounded border">
                                <code className="flex-1 text-indigo-300 text-sm font-mono">{zkPayLink}</code>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={copyZkPayLink}
                                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          >
                            Close
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "payment-history" && (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <Card className="bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30">
                  <CardHeader>
                    <CardTitle className="text-white">Payment History</CardTitle>
                    <CardDescription className="text-slate-300">
                      Track all your received payments with zkReceipts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700">
                          <TableHead className="text-slate-300">Date</TableHead>
                          <TableHead className="text-slate-300">Task</TableHead>
                          <TableHead className="text-slate-300">Amount</TableHead>
                          <TableHead className="text-slate-300">Status</TableHead>
                          <TableHead className="text-slate-300">zkReceipt</TableHead>
                          <TableHead className="text-slate-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPaymentHistory.map((payment) => (
                          <TableRow key={payment.id} className="border-slate-700">
                            <TableCell className="text-slate-300">{payment.date}</TableCell>
                            <TableCell className="text-white font-medium">{payment.task}</TableCell>
                            <TableCell className="text-green-400 font-medium">${payment.amount}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-400">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {payment.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <code className="text-xs bg-slate-700 text-indigo-300 px-2 py-1 rounded font-mono">
                                {payment.zkReceipt}
                              </code>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadReceipt(payment.zkReceipt)}
                                className="border-slate-600 text-slate-300 hover:bg-slate-700"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <Card className="bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Settings</CardTitle>
                    <CardDescription className="text-slate-300">Manage your freelancer profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-slate-400 py-12">Profile management coming soon...</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <Card className="bg-slate-800/50 backdrop-blur-sm border border-indigo-700/30">
                  <CardHeader>
                    <CardTitle className="text-white">Account Settings</CardTitle>
                    <CardDescription className="text-slate-300">Configure your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-slate-400 py-12">Settings panel coming soon...</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
