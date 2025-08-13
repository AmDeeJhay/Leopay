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
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Home,
  Briefcase,
  UserPlus,
  CreditCard,
  Settings,
  LogOut,
  Search,
  Filter,
  Star,
  MapPin,
  Download,
} from "lucide-react"
import type { WalletStatus } from "@/lib/types"

interface SenderDashboardProps {
  walletStatus: WalletStatus
  setWalletStatus: (status: WalletStatus) => void
}

export function SenderDashboard({ walletStatus, setWalletStatus }: SenderDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  const dashboardStats = {
    totalSpent: 45250,
    activeProjects: 8,
    completedProjects: 24,
    avgProjectCost: 1885,
    monthlySpend: 12500,
    pendingPayments: 3,
    topFreelancers: 12,
  }

  const recentActivity = [
    { type: "payment", amount: 2500, freelancer: "Sarah Chen", project: "E-commerce Site", time: "2 hours ago" },
    {
      type: "milestone",
      freelancer: "Alex Rodriguez",
      project: "Mobile App Design",
      progress: 75,
      time: "5 hours ago",
    },
    { type: "completion", amount: 3200, freelancer: "David Kim", project: "Smart Contract Audit", time: "1 day ago" },
  ]

  const topProjects = [
    { name: "E-commerce Website", freelancer: "Sarah Chen", progress: 75, budget: 5000, spent: 3750 },
    { name: "Mobile App Design", freelancer: "Alex Rodriguez", progress: 45, budget: 3500, spent: 1575 },
    { name: "Smart Contract Audit", freelancer: "David Kim", progress: 90, budget: 8000, spent: 7200 },
  ]

  const managedTasks = [
    {
      id: 1,
      title: "E-commerce Website",
      freelancer: "Sarah Chen",
      status: "In Progress",
      budget: 5000,
      applications: 12,
      deadline: "Jan 15, 2024",
    },
    {
      id: 2,
      title: "Mobile App Design",
      freelancer: "Alex Rodriguez",
      status: "Review",
      budget: 3500,
      applications: 8,
      deadline: "Jan 20, 2024",
    },
    {
      id: 3,
      title: "Smart Contract Audit",
      freelancer: "David Kim",
      status: "Completed",
      budget: 8000,
      applications: 15,
      deadline: "Jan 10, 2024",
    },
  ]

  const freelancers = [
    {
      name: "Sarah Chen",
      skills: ["React", "Node.js", "TypeScript"],
      rating: 4.9,
      location: "San Francisco",
      hourlyRate: 85,
      projects: 24,
    },
    {
      name: "Alex Rodriguez",
      skills: ["UI/UX", "Figma", "Prototyping"],
      rating: 4.8,
      location: "New York",
      hourlyRate: 75,
      projects: 18,
    },
    {
      name: "David Kim",
      skills: ["Solidity", "Web3", "Security"],
      rating: 5.0,
      location: "Austin",
      hourlyRate: 120,
      projects: 31,
    },
    {
      name: "Maria Garcia",
      skills: ["Python", "Django", "PostgreSQL"],
      rating: 4.7,
      location: "Barcelona",
      hourlyRate: 65,
      projects: 22,
    },
  ]

  const paymentHistory = [
    {
      id: "zkp_001",
      freelancer: "Sarah Chen",
      amount: 2500,
      project: "E-commerce Site",
      date: "Jan 8, 2024",
      status: "Completed",
      zkProof: "0x1a2b3c...",
    },
    {
      id: "zkp_002",
      freelancer: "Alex Rodriguez",
      amount: 1750,
      project: "Mobile App Design",
      date: "Jan 5, 2024",
      status: "Completed",
      zkProof: "0x4d5e6f...",
    },
    {
      id: "zkp_003",
      freelancer: "David Kim",
      amount: 3200,
      project: "Smart Contract Audit",
      date: "Jan 3, 2024",
      status: "Completed",
      zkProof: "0x7g8h9i...",
    },
  ]

  const handleConnectWallet = () => {
    setWalletStatus("connecting")
    setTimeout(() => setWalletStatus("connected"), 2000)
  }

  const sidebarItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "post-task", icon: Plus, label: "Post Task" },
    { id: "manage-tasks", icon: Briefcase, label: "Manage Tasks" },
    { id: "find-freelancers", icon: UserPlus, label: "Find Freelancers" },
    { id: "payment-history", icon: CreditCard, label: "Payment History" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "post-task":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Post New Task</h2>
              <p className="text-slate-600">Create a new project and find the perfect freelancer</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Provide comprehensive information about your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Title</label>
                    <Input placeholder="e.g., E-commerce Website Development" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Budget Range</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000-3000">$1,000 - $3,000</SelectItem>
                        <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                        <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10000+">$10,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Description</label>
                  <Textarea placeholder="Describe your project requirements, goals, and expectations..." rows={4} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Required Skills</label>
                    <Input placeholder="React, Node.js, TypeScript..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Duration</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Expected timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                        <SelectItem value="1month">1 month</SelectItem>
                        <SelectItem value="2-3months">2-3 months</SelectItem>
                        <SelectItem value="6months+">6+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Post Task</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "manage-tasks":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Manage Tasks</h2>
              <p className="text-slate-600">Track and manage your active projects</p>
            </div>
            <div className="space-y-4">
              {managedTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                        <p className="text-sm text-slate-600">Assigned to: {task.freelancer}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>Budget: ${task.budget.toLocaleString()}</span>
                          <span>Applications: {task.applications}</span>
                          <span>Deadline: {task.deadline}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            task.status === "Completed"
                              ? "default"
                              : task.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {task.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {task.status === "Completed" && (
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "find-freelancers":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Find Freelancers</h2>
              <p className="text-slate-600">Discover talented professionals for your projects</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <Input placeholder="Search by skills, name, or expertise..." className="w-full" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {freelancers.map((freelancer, index) => (
                    <Card key={index} className="border border-slate-200">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/generic-placeholder-graphic.png" />
                            <AvatarFallback>
                              {freelancer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-slate-900">{freelancer.name}</h3>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{freelancer.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{freelancer.location}</span>
                              </div>
                              <span>${freelancer.hourlyRate}/hr</span>
                              <span>{freelancer.projects} projects</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {freelancer.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex space-x-2 pt-2">
                              <Button size="sm" variant="outline">
                                View Profile
                              </Button>
                              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                                Invite to Project
                              </Button>
                            </div>
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
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    >
                      <div className="space-y-1">
                        <h3 className="font-semibold text-slate-900">{payment.project}</h3>
                        <p className="text-sm text-slate-600">Paid to: {payment.freelancer}</p>
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
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input defaultValue="TechCorp Inc." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input defaultValue="admin@techcorp.com" />
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure your payment preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Payment Method</label>
                    <Select defaultValue="zkpayment">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zkpayment">zkPayment</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Update Settings</Button>
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
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardStats.totalSpent.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.activeProjects}</div>
                  <div className="flex items-center text-xs text-blue-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2 this week
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Project Cost</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardStats.avgProjectCost}</div>
                  <div className="flex items-center text-xs text-red-600">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -5% from last month
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
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Requires attention
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Progress Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Active Projects Overview</CardTitle>
                  <CardDescription>Track progress and spending across your current projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {topProjects.map((project, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{project.name}</h4>
                          <p className="text-sm text-muted-foreground">with {project.freelancer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">{project.progress}% complete</p>
                        </div>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Budget utilization: {Math.round((project.spent / project.budget) * 100)}%</span>
                        <span>Remaining: ${(project.budget - project.spent).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {activity.type === "payment" && (
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                        {activity.type === "milestone" && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        {activity.type === "completion" && (
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-purple-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm">
                          {activity.type === "payment" && (
                            <>
                              <span className="font-semibold">${activity.amount?.toLocaleString()}</span> paid to{" "}
                              <span className="font-medium">{activity.freelancer}</span>
                            </>
                          )}
                          {activity.type === "milestone" && (
                            <>
                              <span className="font-medium">{activity.freelancer}</span> updated progress to{" "}
                              <span className="font-semibold">{activity.progress}%</span>
                            </>
                          )}
                          {activity.type === "completion" && (
                            <>
                              <span className="font-medium">{activity.freelancer}</span> completed project for{" "}
                              <span className="font-semibold">${activity.amount?.toLocaleString()}</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{activity.project}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
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
          <h2 className="text-xl font-bold text-slate-900">LeoPay Client</h2>
          <p className="text-sm text-slate-600">Project Management</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            ))}
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
              <h1 className="text-3xl font-bold text-slate-900">Client Dashboard</h1>
              <p className="text-slate-600">Project spending and freelancer management overview</p>
            </div>
            <div className="flex items-center gap-4">
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
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  )
}
