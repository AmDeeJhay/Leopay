"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Task, WalletStatus } from "@/lib/types"
import {
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  Wallet,
  ExternalLink,
  Calendar,
  Star,
} from "lucide-react"

interface FreelancerDashboardProps {
  walletStatus: WalletStatus
  setWalletStatus: (status: WalletStatus) => void
}

export function FreelancerDashboard({ walletStatus, setWalletStatus }: FreelancerDashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for development
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Build React Dashboard",
      description: "Create a responsive dashboard with charts and analytics for a fintech startup.",
      required_skills: ["Developer", "Designer"],
      client_wallet: "0x1234...abcd",
      amount: 2500,
      status: "open",
      is_escrowed: true,
      deadline: "2024-02-15",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Design Mobile App UI",
      description: "Design modern UI/UX for a fintech mobile application.",
      required_skills: ["Designer"],
      client_wallet: "0x5678...efgh",
      amount: 1800,
      status: "open",
      is_escrowed: true,
      deadline: "2024-02-20",
      created_at: "2024-01-16T10:00:00Z",
      updated_at: "2024-01-16T10:00:00Z",
    },
    {
      id: "3",
      title: "Smart Contract Audit",
      description: "Security audit for DeFi protocol smart contracts.",
      required_skills: ["Blockchain Engineer"],
      client_wallet: "0x9abc...ijkl",
      amount: 5000,
      status: "in_progress",
      is_escrowed: true,
      deadline: "2024-02-25",
      created_at: "2024-01-17T10:00:00Z",
      updated_at: "2024-01-17T10:00:00Z",
    },
  ]

  const mockPayments = [
    { id: "1", amount: 2200, date: "2024-01-10", description: "Website Development", zkReceipt: "0xabc123..." },
    { id: "2", amount: 1500, date: "2024-01-05", description: "Logo Design", zkReceipt: "0xdef456..." },
    { id: "3", amount: 3000, date: "2023-12-28", description: "Mobile App Development", zkReceipt: "0xghi789..." },
  ]

  useEffect(() => {
    setTasks(mockTasks)
    setIsLoading(false)
  }, [])

  const handleAcceptTask = async (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "in_progress" as const } : task)))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock className="h-4 w-4" />
      case "in_progress":
        return <Briefcase className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "in_progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 rounded-3xl p-8 text-white animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Alex! 👋</h1>
            <p className="text-white/90 text-lg">Ready to tackle some exciting projects today?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-5 w-5" />
              <span className="font-medium">
                {walletStatus === "connected_active" ? "Wallet Connected" : "Connect Wallet"}
              </span>
            </div>
            {walletStatus !== "connected_active" && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setWalletStatus("connected_active")}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Connect Now
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover animate-slide-up animate-delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Available Tasks</CardTitle>
            <Briefcase className="h-4 w-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{tasks.filter((t) => t.status === "open").length}</div>
            <p className="text-xs text-green-600 font-medium mt-1">+2 new today</p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-up animate-delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-accent-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {tasks.filter((t) => t.status === "in_progress").length}
            </div>
            <p className="text-xs text-gray-600 mt-1">1 due tomorrow</p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-up animate-delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-secondary-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$6,700</div>
            <p className="text-xs text-green-600 font-medium mt-1">+23% from last month</p>
          </CardContent>
        </Card>

        <Card className="card-hover animate-slide-up animate-delay-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">98%</div>
            <p className="text-xs text-gray-600 mt-1">
              <Star className="inline h-3 w-3 text-yellow-500 mr-1" />
              4.9 rating
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Tasks */}
        <div className="lg:col-span-2">
          <Card className="animate-slide-up animate-delay-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Available Tasks</CardTitle>
                  <CardDescription>Browse and accept tasks that match your skills</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="rounded-2xl bg-transparent">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Loading tasks...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.slice(0, 3).map((task, index) => (
                    <Card
                      key={task.id}
                      className={`p-4 border hover:shadow-lg transition-all duration-300 animate-fade-in animate-delay-${index * 100}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-gray-900">{task.title}</h3>
                            <Badge className={`flex items-center gap-1 ${getStatusColor(task.status)}`}>
                              {getStatusIcon(task.status)}
                              {task.status.replace("_", " ")}
                            </Badge>
                            {task.is_escrowed && (
                              <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                                Escrowed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Due {task.deadline}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Wallet className="h-4 w-4" />
                              <span>{task.client_wallet}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {task.required_skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          {task.amount && (
                            <div className="text-2xl font-bold gradient-text">${task.amount.toLocaleString()}</div>
                          )}
                        </div>
                        <div className="ml-4">
                          {task.status === "open" && (
                            <Button
                              onClick={() => handleAcceptTask(task.id)}
                              className="bg-aleo-gradient hover:opacity-90 text-white rounded-2xl"
                            >
                              Accept Task
                            </Button>
                          )}
                          {task.status === "in_progress" && (
                            <Button variant="outline" className="rounded-2xl bg-transparent" disabled>
                              In Progress
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Wallet Status */}
          <Card className="animate-slide-up animate-delay-500">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge
                  className={
                    walletStatus === "connected_active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }
                >
                  {walletStatus === "connected_active" ? "Connected" : "Not Connected"}
                </Badge>
              </div>
              {walletStatus === "connected_active" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Address</span>
                    <span className="text-sm font-mono">0xabc...123</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">zkVerified</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </>
              )}
              {walletStatus !== "connected_active" && (
                <Button
                  onClick={() => setWalletStatus("connected_active")}
                  className="w-full bg-aleo-gradient hover:opacity-90 text-white rounded-2xl"
                >
                  Connect Wallet
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card className="animate-slide-up animate-delay-500">
            <CardHeader>
              <CardTitle className="text-lg">Recent Payments</CardTitle>
              <CardDescription>Your latest zkPayments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPayments.slice(0, 3).map((payment, index) => (
                  <div
                    key={payment.id}
                    className={`flex items-center justify-between p-3 rounded-2xl bg-gray-50 animate-fade-in animate-delay-${index * 100}`}
                  >
                    <div>
                      <p className="font-medium text-gray-900">${payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{payment.description}</p>
                      <p className="text-xs text-gray-500">{payment.date}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-xl">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 rounded-2xl bg-transparent">
                View All Payments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
