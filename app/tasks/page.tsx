"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Task } from "@/lib/types"
import { Search, Filter, Clock, Briefcase, CheckCircle, Home } from "lucide-react"
import Link from "next/link"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [walletStatus, setWalletStatus] = useState<"not_connected" | "connected_unverified" | "connected_active">(
    "not_connected",
  )

  // Mock data for development
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Build React Dashboard",
      description:
        "Create a responsive dashboard with charts and analytics for a fintech startup. Must include real-time data updates and mobile optimization.",
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
      description:
        "Design modern UI/UX for a fintech mobile application with focus on user experience and accessibility.",
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
      description:
        "Security audit for DeFi protocol smart contracts. Comprehensive review and vulnerability assessment required.",
      required_skills: ["Blockchain Engineer"],
      client_wallet: "0x9abc...ijkl",
      amount: 5000,
      status: "in_progress",
      is_escrowed: true,
      deadline: "2024-02-25",
      created_at: "2024-01-17T10:00:00Z",
      updated_at: "2024-01-17T10:00:00Z",
    },
    {
      id: "4",
      title: "Technical Documentation",
      description: "Write comprehensive API documentation for blockchain payment platform.",
      required_skills: ["Technical Writer"],
      client_wallet: "0xdef0...mnop",
      amount: 1200,
      status: "completed",
      is_escrowed: false,
      deadline: "2024-02-10",
      created_at: "2024-01-18T10:00:00Z",
      updated_at: "2024-01-18T10:00:00Z",
    },
  ]

  useEffect(() => {
    setTasks(mockTasks)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    filterTasks()
  }, [tasks, searchTerm, statusFilter])

  const filterTasks = () => {
    let filtered = tasks

    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter)
    }

    setFilteredTasks(filtered)
  }

  const handleAcceptTask = async (taskId: string) => {
    try {
      setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "in_progress" as const } : task)))
    } catch (error) {
      console.error("Error accepting task:", error)
    }
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
    <div className="min-h-screen bg-gray-50">
      <Sidebar userRole="freelancer" />
      <div className="md:ml-64">
        <TopNavbar walletStatus={walletStatus} userName="Alex Johnson" />
        <main className="p-6">
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
                <p className="text-gray-600 mt-2">Browse and manage available tasks</p>
              </div>
              <Link href="/">
                <Button variant="outline" className="rounded-2xl bg-transparent">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 rounded-2xl border-gray-200 focus:border-primary-300"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] h-12 rounded-2xl border-gray-200">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading tasks...</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.map((task, index) => (
                  <Card
                    key={task.id}
                    className={`flex flex-col glass-effect border-0 shadow-lg card-hover animate-fade-in animate-delay-${index * 100}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-gray-900">{task.title}</CardTitle>
                        <Badge className={`flex items-center gap-1 ${getStatusColor(task.status)}`}>
                          {getStatusIcon(task.status)}
                          {task.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-3 text-gray-600">{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Required Skills:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {task.required_skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-xs border-primary-200 text-primary-700"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {task.amount && (
                          <div className="text-2xl font-bold gradient-text">${task.amount.toLocaleString()}</div>
                        )}
                        {task.is_escrowed && (
                          <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                            Escrowed
                          </Badge>
                        )}
                        {task.deadline && (
                          <div className="text-sm text-gray-500">
                            <strong>Deadline:</strong> {task.deadline}
                          </div>
                        )}
                      </div>
                      <div className="mt-6">
                        {task.status === "open" && (
                          <Button
                            onClick={() => handleAcceptTask(task.id)}
                            className="w-full bg-aleo-gradient hover:opacity-90 text-white rounded-2xl"
                          >
                            Accept Task
                          </Button>
                        )}
                        {task.status === "in_progress" && (
                          <Button
                            variant="outline"
                            className="w-full rounded-2xl border-2 border-gray-200 bg-transparent"
                            disabled
                          >
                            In Progress
                          </Button>
                        )}
                        {task.status === "completed" && (
                          <Button
                            variant="outline"
                            className="w-full rounded-2xl border-2 border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                          >
                            View Details
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredTasks.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or check back later for new opportunities.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
