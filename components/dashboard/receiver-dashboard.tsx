"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Briefcase,
  Clock,
  Star,
  Send,
  Home,
  Search,
  History,
  CreditCard,
  User,
  Settings,
  LogOut,
  Filter,
  Download,
  ExternalLink,
} from "lucide-react"
import type { WalletStatus } from "@/lib/types"

interface ReceiverDashboardProps {
  walletStatus: WalletStatus
  setWalletStatus: (status: WalletStatus) => void
}

export function ReceiverDashboard({ walletStatus, setWalletStatus }: ReceiverDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  const dashboardStats = {
    totalEarnings: 28750,
    monthlyEarnings: 8500,
    activeTasks: 5,
    completedTasks: 32,
    avgTaskValue: 1200,
    pendingPayments: 2,
    clientRating: 4.8,
    responseRate: 95,
  }

  const earningsData = [
    { month: "Jan", amount: 6200 },
    { month: "Feb", amount: 7800 },
    { month: "Mar", amount: 5400 },
    { month: "Apr", amount: 9100 },
    { month: "May", amount: 8500 },
  ]

  const activeWork = [
    { client: "TechCorp Inc.", project: "E-commerce Platform", progress: 75, value: 4500, deadline: "Jan 15" },
    { client: "StartupXYZ", project: "Mobile App Design", progress: 45, value: 3200, deadline: "Jan 20" },
    { client: "Digital Agency", project: "Brand Identity", progress: 90, value: 2800, deadline: "Jan 12" },
  ]

  const availableTasks = [
    {
      id: 1,
      title: "React Dashboard Development",
      client: "TechCorp",
      budget: "$3,000 - $5,000",
      skills: ["React", "TypeScript", "Tailwind"],
      posted: "2 hours ago",
      proposals: 8,
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      client: "StartupXYZ",
      budget: "$2,500 - $4,000",
      skills: ["Figma", "UI/UX", "Prototyping"],
      posted: "5 hours ago",
      proposals: 12,
    },
    {
      id: 3,
      title: "Smart Contract Audit",
      client: "CryptoDAO",
      budget: "$8,000 - $12,000",
      skills: ["Solidity", "Security", "Web3"],
      posted: "1 day ago",
      proposals: 5,
    },
  ]

  const taskHistory = [
    {
      id: 1,
      title: "E-commerce Website",
      client: "TechCorp Inc.",
      status: "Completed",
      amount: 4500,
      completedDate: "Dec 28, 2023",
      rating: 5,
    },
    {
      id: 2,
      title: "Mobile App Design",
      client: "StartupXYZ",
      status: "In Progress",
      amount: 3200,
      startDate: "Jan 5, 2024",
      progress: 75,
    },
    {
      id: 3,
      title: "Brand Identity",
      client: "Digital Agency",
      status: "Completed",
      amount: 2800,
      completedDate: "Dec 15, 2023",
      rating: 4.8,
    },
  ]

  const recentPayments = [
    {
      client: "TechCorp Inc.",
      amount: 2250,
      project: "Frontend Development",
      date: "2 days ago",
      status: "completed",
      zkProof: "0x1a2b3c...",
    },
    {
      client: "StartupXYZ",
      amount: 1600,
      project: "UI Design Phase 1",
      date: "5 days ago",
      status: "completed",
      zkProof: "0x4d5e6f...",
    },
    {
      client: "E-commerce Co.",
      amount: 3200,
      project: "Full Stack Development",
      date: "1 week ago",
      status: "completed",
      zkProof: "0x7g8h9i...",
    },
  ]

  const handleConnectWallet = () => {
    setWalletStatus("connecting")
    setTimeout(() => setWalletStatus("connected"), 2000)
  }

  const sidebarItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "explore-tasks", icon: Search, label: "Explore Tasks" },
    { id: "task-history", icon: History, label: "Task History" },
    { id: "request-payment", icon: Send, label: "Request Payment" },
    { id: "payment-history", icon: CreditCard, label: "Payment History" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "explore-tasks":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Explore Tasks</h2>
              <p className="text-slate-600">Find new projects that match your skills</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <Input placeholder="Search tasks by keywords, skills, or client..." className="w-full" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {availableTasks.map((task) => (
                    <Card key={task.id} className="border border-slate-200">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                              <p className="text-sm text-slate-600">by {task.client}</p>
                              <p className="text-lg font-semibold text-indigo-600">{task.budget}</p>
                            </div>
                            <div className="text-right text-sm text-slate-500">
                              <p>Posted {task.posted}</p>
                              <p>{task.proposals} proposals</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {task.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-indigo-50 text-indigo-700">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex space-x-3">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                              Submit Proposal
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "task-history":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Task History</h2>
              <p className="text-slate-600">Track your completed and ongoing projects</p>
            </div>
            <div className="space-y-4">
              {taskHistory.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                        <p className="text-sm text-slate-600">Client: {task.client}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>${task.amount.toLocaleString()}</span>
                          {task.status === "Completed" ? (
                            <span>Completed: {task.completedDate}</span>
                          ) : (
                            <span>Started: {task.startDate}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={task.status === "Completed" ? "default" : "secondary"}>{task.status}</Badge>
                        {task.status === "Completed" && task.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{task.rating}</span>
                          </div>
                        )}
                        {task.status === "In Progress" && task.progress && (
                          <div className="text-sm text-slate-600">{task.progress}% complete</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "request-payment":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Payment</h2>
              <p className="text-slate-600">Submit payment requests for completed work</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Request Form</CardTitle>
                <CardDescription>Provide details about the work completed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Client</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="techcorp">TechCorp Inc.</SelectItem>
                        <SelectItem value="startupxyz">StartupXYZ</SelectItem>
                        <SelectItem value="digital">Digital Agency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                        <SelectItem value="mobile">Mobile App Design</SelectItem>
                        <SelectItem value="brand">Brand Identity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount Requested</label>
                    <Input placeholder="$0.00" type="number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Payment Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="milestone">Milestone Payment</SelectItem>
                        <SelectItem value="final">Final Payment</SelectItem>
                        <SelectItem value="partial">Partial Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Description</label>
                  <Textarea placeholder="Describe the work completed for this payment request..." rows={4} />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Submit Request</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "payment-history":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment History</h2>
              <p className="text-slate-600">Track all your zkPayment transactions</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentPayments.map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    >
                      <div className="space-y-1">
                        <h3 className="font-semibold text-slate-900">{payment.project}</h3>
                        <p className="text-sm text-slate-600">From: {payment.client}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>{payment.date}</span>
                          <span>zkProof: {payment.zkProof}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">${payment.amount.toLocaleString()}</p>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {payment.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile</h2>
              <p className="text-slate-600">Manage your professional profile and portfolio</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your basic details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/generic-placeholder-graphic.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Professional Title</label>
                    <Input defaultValue="Full Stack Developer" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input defaultValue="San Francisco, CA" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Portfolio</CardTitle>
                  <CardDescription>Showcase your expertise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Node.js", "Python", "AWS"].map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-indigo-50 text-indigo-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Skills
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Portfolio Links</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">github.com/johndoe</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">johndoe.dev</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Settings</h2>
              <p className="text-slate-600">Manage your account preferences and security</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Update your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input defaultValue="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hourly Rate</label>
                    <Input defaultValue="$85" />
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New task notifications</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment notifications</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Message notifications</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardStats.monthlyEarnings.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.activeTasks}</div>
                  <div className="flex items-center text-xs text-blue-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +1 this week
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Client Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.clientRating}</div>
                  <div className="flex items-center text-xs text-yellow-600">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Excellent rating
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.pendingPayments}</div>
                  <div className="flex items-center text-xs text-orange-600">
                    <Clock className="h-3 w-3 mr-1" />
                    Awaiting approval
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Active Work Progress */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Active Work Progress</CardTitle>
                  <CardDescription>Track your current projects and deadlines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {activeWork.map((work, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{work.project}</h4>
                          <p className="text-sm text-muted-foreground">for {work.client}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${work.value.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Due {work.deadline}</p>
                        </div>
                      </div>
                      <Progress value={work.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{work.progress}% complete</span>
                        <span>
                          Estimated: ${Math.round((work.value * work.progress) / 100).toLocaleString()} earned
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Earnings Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Earnings</CardTitle>
                  <CardDescription>Your income over the last 5 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">
                        ${dashboardStats.monthlyEarnings.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                    <div className="space-y-3">
                      {earningsData.map((data, index) => (
                        <div key={data.month} className="flex items-center justify-between">
                          <span className="text-sm">{data.month}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${(data.amount / 10000) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">${data.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Fixed Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">LeoPay Freelancer</h2>
          <p className="text-sm text-slate-600">Earnings Dashboard</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Freelancer Dashboard</h1>
              <p className="text-slate-600">Earnings overview and work progress tracking</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Total Earnings</p>
                <p className="text-2xl font-bold text-slate-900">${dashboardStats.totalEarnings.toLocaleString()}</p>
              </div>
              <Button
                onClick={handleConnectWallet}
                variant={walletStatus === "connected" ? "outline" : "default"}
                className="flex items-center gap-2"
                disabled={walletStatus === "connecting"}
              >
                <Wallet className="h-4 w-4" />
                {walletStatus === "connecting"
                  ? "Connecting..."
                  : walletStatus === "connected"
                    ? "Connected"
                    : "Connect Wallet"}
              </Button>
              <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Send className="h-4 w-4" />
                Request Payment
              </Button>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  )
}
