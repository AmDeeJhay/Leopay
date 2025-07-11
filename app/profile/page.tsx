"use client"

import { ModernNavbar } from "@/components/layout/modern-navbar"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { WalletStatusComponent } from "@/components/wallet/wallet-status"
import { User, Mail, Calendar, Award, Settings, Shield } from "lucide-react"
import { useState } from "react"
import type { WalletStatus } from "@/lib/types"

export default function ProfilePage() {
  const [walletStatus, setWalletStatus] = useState<WalletStatus>("connected_active")

  const userSkills = ["Developer", "Designer", "Technical Writer"]
  const achievements = [
    { title: "First Task Completed", date: "Jan 2024", icon: Award },
    { title: "5 Tasks Completed", date: "Jan 2024", icon: Award },
    { title: "zkProof Verified", date: "Jan 2024", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-aleo-light-gray pb-20 md:pb-0">
      <ModernNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Info */}
          <div className="md:col-span-2 space-y-6">
            <Card className="glass-effect border-0 aleo-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Avatar className="h-16 w-16 border-4 border-primary-200">
                    <AvatarFallback className="bg-aleo-gradient text-white text-xl font-bold">U</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">User Name</h2>
                    <p className="text-gray-600">Freelancer</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">user@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Member since</p>
                      <p className="font-medium">January 2024</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {userSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="border-primary-200 text-primary-700 bg-primary-50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-aleo-gradient hover:opacity-90 text-white rounded-xl">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="rounded-xl border-2 border-gray-200 bg-transparent">
                    <User className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="glass-effect border-0 aleo-shadow">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100"
                      >
                        <div className="w-12 h-12 bg-aleo-gradient rounded-xl flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.date}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WalletStatusComponent
              status={walletStatus}
              onConnect={() => setWalletStatus("connected_unverified")}
              onVerify={() => setWalletStatus("connected_active")}
            />

            <Card className="glass-effect border-0 aleo-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-bold gradient-text">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Earned</span>
                  <span className="font-bold gradient-text">$7,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-bold text-green-600">100%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
