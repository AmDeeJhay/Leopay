"use client"

import { useState, useEffect } from "react"
import { ModernNavbar } from "@/components/layout/modern-navbar"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WalletStatusComponent } from "@/components/wallet/wallet-status"
import {
  User,
  Mail,
  Calendar,
  Award,
  Settings,
  Shield,
  MapPin,
  Globe,
  Github,
  Linkedin,
  DollarSign,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency, generateInitials } from "@/lib/utils"
import type { UserProfile, WalletStatus } from "@/lib/types"
import Link from "next/link"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [walletStatus, setWalletStatus] = useState<WalletStatus>("connected_active")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: profileData, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (error) throw error

      setProfile(profileData)
    } catch (error: any) {
      console.error("Error loading profile:", error)
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-aleo-light-gray flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-aleo-light-gray pb-20 md:pb-0">
        <ModernNavbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
            <p className="text-gray-600 mb-6">Unable to load your profile information.</p>
            <Button onClick={loadProfile}>Try Again</Button>
          </div>
        </main>
        <BottomNavigation />
      </div>
    )
  }

  const achievements = [
    { title: "Profile Completed", date: "Recently", icon: User, completed: profile.profile_completed },
    { title: "KYC Verified", date: "Recently", icon: Shield, completed: profile.kyc_verified },
    {
      title: "First Task Ready",
      date: "Pending",
      icon: Award,
      completed: profile.kyc_verified && profile.profile_completed,
    },
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
                    {profile.avatar_url ? (
                      <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.full_name || "User"} />
                    ) : (
                      <AvatarFallback className="bg-aleo-gradient text-white text-xl font-bold">
                        {generateInitials(profile.full_name || profile.email || "U")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      {profile.full_name || "User"}
                      {profile.kyc_verified && <CheckCircle className="h-5 w-5 text-green-500" title="Verified" />}
                    </h2>
                    <p className="text-gray-600 capitalize">{profile.role || "User"}</p>
                    {!profile.profile_completed && (
                      <Badge variant="outline" className="mt-1 text-orange-600 border-orange-200">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Profile Incomplete
                      </Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>
                  {profile.phone && (
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{profile.phone}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Member since</p>
                      <p className="font-medium">{new Date(profile.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {profile.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{profile.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                {profile.bio && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-700">{profile.bio}</p>
                  </div>
                )}

                {profile.skills && profile.skills.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
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
                )}

                {profile.role === "freelancer" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {profile.experience_level && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Experience Level</h4>
                        <Badge variant="secondary" className="capitalize">
                          <Star className="h-3 w-3 mr-1" />
                          {profile.experience_level}
                        </Badge>
                      </div>
                    )}
                    {profile.hourly_rate && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Hourly Rate</h4>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-bold text-green-600">{formatCurrency(profile.hourly_rate)}/hour</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {(profile.website || profile.linkedin || profile.github || profile.portfolio_url) && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Links</h3>
                    <div className="flex flex-wrap gap-3">
                      {profile.website && (
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <Globe className="h-4 w-4" />
                          Website
                        </a>
                      )}
                      {profile.linkedin && (
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                      {profile.github && (
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      )}
                      {profile.portfolio_url && (
                        <a
                          href={profile.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <Globe className="h-4 w-4" />
                          Portfolio
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  {profile.role === "freelancer" && (!profile.profile_completed || !profile.kyc_verified) ? (
                    <Link href="/profile/complete">
                      <Button className="bg-aleo-gradient hover:opacity-90 text-white rounded-xl">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Complete Profile
                      </Button>
                    </Link>
                  ) : (
                    <Button className="bg-aleo-gradient hover:opacity-90 text-white rounded-xl">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
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
                        className={`flex items-center gap-4 p-4 rounded-xl border ${
                          achievement.completed
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                            : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            achievement.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.date}</p>
                        </div>
                        {achievement.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
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
                  <span className="text-gray-600">Profile Status</span>
                  <span className={`font-bold ${profile.profile_completed ? "text-green-600" : "text-orange-600"}`}>
                    {profile.profile_completed ? "Complete" : "Incomplete"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verification</span>
                  <span className={`font-bold ${profile.kyc_verified ? "text-green-600" : "text-orange-600"}`}>
                    {profile.kyc_verified ? "Verified" : "Pending"}
                  </span>
                </div>
                {profile.role === "freelancer" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tasks Completed</span>
                      <span className="font-bold gradient-text">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Earned</span>
                      <span className="font-bold gradient-text">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-bold text-gray-500">N/A</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
