"use client"

import { useState } from "react"
import { RoleGuard } from "@/components/auth/role-guard"
import { RoleBasedSidebar } from "@/components/dashboard/role-based-sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Plus, Search, Filter, Edit, Trash2, Mail, CheckCircle, Clock } from "lucide-react"

export default function EmployeesPage() {
  const [walletStatus, setWalletStatus] = useState<"not_connected" | "connected_unverified" | "connected_active">(
    "connected_active",
  )
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const mockEmployees = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      position: "Senior Developer",
      department: "Engineering",
      wallet: "0x1234...abcd",
      salary: 5000,
      status: "active",
      joinDate: "2023-01-15",
      lastPayment: "2024-01-15",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@techcorp.com",
      position: "UI/UX Designer",
      department: "Design",
      wallet: "0x5678...efgh",
      salary: 4500,
      status: "active",
      joinDate: "2023-03-20",
      lastPayment: "2024-01-15",
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily@techcorp.com",
      position: "Product Manager",
      department: "Product",
      wallet: "0x9abc...ijkl",
      salary: 5500,
      status: "active",
      joinDate: "2023-02-10",
      lastPayment: "2024-01-15",
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      email: "alex@techcorp.com",
      position: "DevOps Engineer",
      department: "Engineering",
      wallet: "0xdef0...mnop",
      salary: 4800,
      status: "pending",
      joinDate: "2024-01-01",
      lastPayment: null,
    },
  ]

  const filteredEmployees = mockEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "inactive":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleAddEmployee = () => {
    console.log("Adding new employee...")
    setShowAddModal(false)
  }

  return (
    <RoleGuard allowedRoles={["employee"]}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <RoleBasedSidebar userRole="employee" userType="employer" />
        <div className="md:ml-64">
          <TopNavbar walletStatus={walletStatus} userName="Company Admin" userEmail="admin@techcorp.com" />
          <main className="p-6">
            <div className="space-y-8 animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
                    <p className="text-gray-600">Manage your team members and their payment details</p>
                  </div>
                </div>
                <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white rounded-2xl shadow-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Employee
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Employee</DialogTitle>
                      <DialogDescription>Add a new team member to your payroll system</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" className="rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" className="rounded-2xl" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@company.com" className="rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" placeholder="Software Engineer" className="rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary">Monthly Salary</Label>
                        <Input id="salary" placeholder="5000" className="rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wallet">Wallet Address (Optional)</Label>
                        <Input id="wallet" placeholder="0x..." className="rounded-2xl" />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddEmployee}
                          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white rounded-2xl"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Employee
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowAddModal(false)}
                          className="rounded-2xl bg-transparent"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Employees</p>
                        <p className="text-3xl font-bold gradient-text">{mockEmployees.length}</p>
                      </div>
                      <Users className="h-8 w-8 text-indigo-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active</p>
                        <p className="text-3xl font-bold gradient-text">
                          {mockEmployees.filter((e) => e.status === "active").length}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-3xl font-bold gradient-text">
                          {mockEmployees.filter((e) => e.status === "pending").length}
                        </p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Payroll</p>
                        <p className="text-3xl font-bold gradient-text">
                          ${mockEmployees.reduce((sum, e) => sum + e.salary, 0).toLocaleString()}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Employees Table */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-gray-900">Team Members</CardTitle>
                      <CardDescription className="text-gray-600">
                        Manage employee information and payment details
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search employees..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 rounded-2xl bg-white/80"
                        />
                      </div>
                      <Button variant="outline" className="rounded-2xl bg-transparent">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Payment</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmployees.map((employee, index) => (
                        <TableRow key={employee.id} className={`animate-fade-in animate-delay-${index * 100}`}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-indigo-100 text-indigo-700">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900">{employee.name}</p>
                                <p className="text-sm text-gray-500">{employee.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700">{employee.position}</TableCell>
                          <TableCell className="text-gray-700">{employee.department}</TableCell>
                          <TableCell className="font-semibold text-gray-900">
                            ${employee.salary.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(employee.status)}`}>
                              {getStatusIcon(employee.status)}
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700">{employee.lastPayment || "Never"}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-indigo-50">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-indigo-50">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-xl hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
