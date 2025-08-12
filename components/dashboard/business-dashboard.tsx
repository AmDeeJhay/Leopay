"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Wallet,
  DollarSign,
  FileText,
  Activity,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Star,
  Shield,
  Download,
  Send,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data
const mockTasks = [
  {
    id: "1",
    title: "Build React Dashboard",
    description: "Create a modern dashboard with charts and analytics",
    status: "open" as const,
    budget: 2500,
    skills: ["React", "TypeScript", "Tailwind CSS"],
    escrow: true,
    applicants: 12,
    matchedFreelancers: [
      { id: "1", name: "Alice Johnson", avatar: "/placeholder-user.jpg", skillMatch: 95, rating: 4.9 },
      { id: "2", name: "Bob Smith", avatar: "/placeholder-user.jpg", skillMatch: 88, rating: 4.7 },
    ],
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "iOS and Android app for e-commerce platform",
    status: "pending" as const,
    budget: 5000,
    skills: ["React Native", "Node.js", "MongoDB"],
    escrow: true,
    applicants: 8,
    matchedFreelancers: [
      { id: "3", name: "Carol Davis", avatar: "/placeholder-user.jpg", skillMatch: 92, rating: 4.8 },
    ],
  },
  {
    id: "3",
    title: "Logo Design",
    description: "Modern logo for tech startup",
    status: "completed" as const,
    budget: 800,
    skills: ["Graphic Design", "Adobe Illustrator"],
    escrow: false,
    applicants: 25,
    matchedFreelancers: [],
  },
]

const mockFreelancers = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/placeholder-user.jpg",
    skills: ["React", "TypeScript", "Node.js", "Python"],
    rating: 4.9,
    completedTasks: 47,
    zkBadge: true,
    proofOfWork: 15,
    hourlyRate: 85,
    location: "San Francisco, CA",
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/placeholder-user.jpg",
    skills: ["Vue.js", "Laravel", "MySQL", "AWS"],
    rating: 4.7,
    completedTasks: 32,
    zkBadge: true,
    proofOfWork: 22,
    hourlyRate: 75,
    location: "New York, NY",
  },
  {
    id: "3",
    name: "Carol Davis",
    avatar: "/placeholder-user.jpg",
    skills: ["React Native", "Flutter", "Firebase"],
    rating: 4.8,
    completedTasks: 28,
    zkBadge: false,
    proofOfWork: 8,
    hourlyRate: 90,
    location: "Austin, TX",
  },
]

const mockPaymentHistory = [
  {
    id: "1",
    date: "2024-01-15",
    freelancer: "Alice Johnson",
    task: "Build React Dashboard",
    amount: 2500,
    status: "completed" as const,
    zkProof: "zk1a2b3c4d5e6f7g8h9i0j",
  },
  {
    id: "2",
    date: "2024-01-10",
    freelancer: "Bob Smith",
    task: "API Integration",
    amount: 1200,
    status: "completed" as const,
    zkProof: "zk9i8h7g6f5e4d3c2b1a0",
  },
]

export function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    tags: "",
    skill: "",
    budget: "",
    escrow: true,
  })
  const [paymentForm, setPaymentForm] = useState({
    freelancerWallet: "",
    taskId: "",
    amount: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [zkBadgeFilter, setZkBadgeFilter] = useState("all")
  const [proofOfWorkFilter, setProofOfWorkFilter] = useState("all")

  // Filter freelancers based on search and filters
  const filteredFreelancers = useMemo(() => {
    return mockFreelancers.filter((freelancer) => {
      const matchesSearch =
        freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        freelancer.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesSkill =
        !skillFilter || freelancer.skills.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase()))

      const matchesZkBadge =
        zkBadgeFilter === "all" ||
        (zkBadgeFilter === "verified" && freelancer.zkBadge) ||
        (zkBadgeFilter === "unverified" && !freelancer.zkBadge)

      const matchesProofOfWork =
        proofOfWorkFilter === "all" ||
        (proofOfWorkFilter === "10+" && freelancer.proofOfWork >= 10) ||
        (proofOfWorkFilter === "20+" && freelancer.proofOfWork >= 20)

      return matchesSearch && matchesSkill && matchesZkBadge && matchesProofOfWork
    })
  }, [searchQuery, skillFilter, zkBadgeFilter, proofOfWorkFilter])

  const handlePostTask = () => {
    toast({
      title: "Task Posted Successfully",
      description: "Your task has been posted and is now visible to freelancers.",
    })
    setNewTask({
      title: "",
      description: "",
      tags: "",
      skill: "",
      budget: "",
      escrow: true,
    })
  }

  const handlePayment = () => {
    toast({
      title: "zkPayment Sent",
      description: `Payment of $${paymentForm.amount} has been sent successfully.`,
    })
    setPaymentForm({
      freelancerWallet: "",
      taskId: "",
      amount: "",
    })
  }

  const handleApproveFreelancer = (taskId: string, freelancerId: string) => {
    toast({
      title: "Freelancer Approved",
      description: "The freelancer has been approved for this task.",
    })
  }

  const handleRejectFreelancer = (taskId: string, freelancerId: string) => {
    toast({
      title: "Freelancer Rejected",
      description: "The freelancer application has been rejected.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-indigo-100 min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-indigo-900 mb-6">LeoPay Client</h2>
            <nav className="space-y-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: Activity },
                { id: "post-task", label: "Post Task", icon: Plus },
                { id: "manage-tasks", label: "Manage Tasks", icon: FileText },
                { id: "pay-freelancer", label: "Pay Freelancer", icon: Send },
                { id: "payment-history", label: "zkPayment History", icon: DollarSign },
                { id: "find-freelancers", label: "Find Freelancers", icon: Search },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg"
                        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
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
        <div className="flex-1 p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Client Dashboard</h1>
                <p className="text-slate-600">Manage your tasks and payments with zkTechnology</p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Wallet className="w-5 h-5" />
                      Wallet Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,450.00</div>
                    <p className="text-indigo-100 text-sm">Available for payments</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-slate-700">
                      <DollarSign className="w-5 h-5" />
                      Total Paid
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-900">$8,750.00</div>
                    <p className="text-slate-500 text-sm">Lifetime payments</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-slate-700">
                      <FileText className="w-5 h-5" />
                      Tasks Created
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-900">23</div>
                    <p className="text-slate-500 text-sm">Total tasks posted</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-slate-700">
                      <Activity className="w-5 h-5" />
                      Active Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-900">5</div>
                    <p className="text-slate-500 text-sm">Currently active</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest task and payment activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-slate-900">{task.title}</h4>
                          <p className="text-sm text-slate-500">{task.applicants} applications received</p>
                        </div>
                        <Badge
                          variant={
                            task.status === "completed"
                              ? "default"
                              : task.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "post-task" && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Post New Task</h1>
                <p className="text-slate-600">Create a new task for freelancers to apply</p>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle>Task Details</CardTitle>
                  <CardDescription>Provide comprehensive information about your task</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter task title..."
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your task in detail..."
                      rows={4}
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        placeholder="e.g., urgent, remote, full-time"
                        value={newTask.tags}
                        onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skill">Required Skill</Label>
                      <Select value={newTask.skill} onValueChange={(value) => setNewTask({ ...newTask, skill: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary skill" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="react">React</SelectItem>
                          <SelectItem value="vue">Vue.js</SelectItem>
                          <SelectItem value="angular">Angular</SelectItem>
                          <SelectItem value="node">Node.js</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="design">UI/UX Design</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (USD)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="Enter budget amount"
                      value={newTask.budget}
                      onChange={(e) => setNewTask({ ...newTask, budget: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="escrow"
                      checked={newTask.escrow}
                      onCheckedChange={(checked) => setNewTask({ ...newTask, escrow: checked })}
                    />
                    <Label htmlFor="escrow">Enable Escrow Protection</Label>
                  </div>

                  <Button
                    onClick={handlePostTask}
                    className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post Task
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "manage-tasks" && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Tasks</h1>
                <p className="text-slate-600">Review and manage your posted tasks</p>
              </div>

              <div className="space-y-6">
                {mockTasks.map((task) => (
                  <Card key={task.id} className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{task.title}</CardTitle>
                          <CardDescription className="mt-2">{task.description}</CardDescription>
                        </div>
                        <Badge
                          variant={
                            task.status === "completed"
                              ? "default"
                              : task.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />${task.budget}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {task.applicants} applications
                          </span>
                          {task.escrow && (
                            <Badge variant="outline" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Escrow
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {task.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {task.matchedFreelancers.length > 0 && (
                          <div>
                            <h4 className="font-medium text-slate-900 mb-3">Matched Freelancers</h4>
                            <div className="space-y-3">
                              {task.matchedFreelancers.map((freelancer) => (
                                <div
                                  key={freelancer.id}
                                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarImage src={freelancer.avatar || "/placeholder.svg"} />
                                      <AvatarFallback>
                                        {freelancer.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h5 className="font-medium text-slate-900">{freelancer.name}</h5>
                                      <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <span className="flex items-center gap-1">
                                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                          {freelancer.rating}
                                        </span>
                                        <span>•</span>
                                        <span>{freelancer.skillMatch}% match</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => handleApproveFreelancer(task.id, freelancer.id)}
                                      className="bg-green-500 hover:bg-green-600"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleRejectFreelancer(task.id, freelancer.id)}
                                      className="border-red-200 text-red-600 hover:bg-red-50"
                                    >
                                      <XCircle className="w-4 h-4 mr-1" />
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "pay-freelancer" && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Pay Freelancer</h1>
                <p className="text-slate-600">Send zkPayments to freelancers securely</p>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Enter payment information for the freelancer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="freelancer-wallet">Freelancer Wallet Address</Label>
                    <Input
                      id="freelancer-wallet"
                      placeholder="Enter wallet address..."
                      value={paymentForm.freelancerWallet}
                      onChange={(e) => setPaymentForm({ ...paymentForm, freelancerWallet: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-select">Select Task</Label>
                    <Select
                      value={paymentForm.taskId}
                      onValueChange={(value) => setPaymentForm({ ...paymentForm, taskId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a task" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTasks.map((task) => (
                          <SelectItem key={task.id} value={task.id}>
                            {task.title} - ${task.budget}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Payment Amount (USD)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount..."
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                    />
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
                        <Send className="w-4 h-4 mr-2" />
                        Send zkPayment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm zkPayment</DialogTitle>
                        <DialogDescription>Please review the payment details before confirming.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Amount:</span>
                            <span className="font-medium">${paymentForm.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">To:</span>
                            <span className="font-mono text-sm">{paymentForm.freelancerWallet}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">zkProof:</span>
                            <span className="font-mono text-sm">Generated on confirmation</span>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handlePayment} className="bg-gradient-to-r from-indigo-500 to-indigo-600">
                          Confirm Payment
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
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">zkPayment History</h1>
                <p className="text-slate-600">Track all your payments with zero-knowledge proofs</p>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle>Payment Records</CardTitle>
                  <CardDescription>All payments made through the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Freelancer</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>zkProof</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPaymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.freelancer}</TableCell>
                          <TableCell>{payment.task}</TableCell>
                          <TableCell>${payment.amount}</TableCell>
                          <TableCell>
                            <Badge variant="default">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-slate-100 px-2 py-1 rounded">{payment.zkProof}</code>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Receipt
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

          {activeTab === "find-freelancers" && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Freelancers</h1>
                <p className="text-slate-600">Discover talented freelancers for your projects</p>
              </div>

              {/* Filters */}
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="search">Search</Label>
                      <Input
                        id="search"
                        placeholder="Name or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skill-filter">Skill</Label>
                      <Input
                        id="skill-filter"
                        placeholder="Filter by skill..."
                        value={skillFilter}
                        onChange={(e) => setSkillFilter(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zkbadge-filter">zkBadge</Label>
                      <Select value={zkBadgeFilter} onValueChange={setZkBadgeFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="verified">Verified</SelectItem>
                          <SelectItem value="unverified">Unverified</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proof-filter">Proof of Work</Label>
                      <Select value={proofOfWorkFilter} onValueChange={setProofOfWorkFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="10+">10+ Projects</SelectItem>
                          <SelectItem value="20+">20+ Projects</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Freelancer Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreelancers.map((freelancer) => (
                  <Card
                    key={freelancer.id}
                    className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-200"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={freelancer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {freelancer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{freelancer.name}</CardTitle>
                            {freelancer.zkBadge && (
                              <Badge variant="default" className="text-xs bg-indigo-500">
                                <Shield className="w-3 h-3 mr-1" />
                                zkVerified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">{freelancer.location}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {freelancer.rating}
                        </span>
                        <span className="text-slate-600">{freelancer.completedTasks} tasks</span>
                        <span className="font-medium">${freelancer.hourlyRate}/hr</span>
                      </div>

                      <div>
                        <p className="text-sm text-slate-600 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {freelancer.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {freelancer.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{freelancer.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-slate-600">
                        <span className="font-medium">Proof of Work:</span> {freelancer.proofOfWork} projects
                      </div>

                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
