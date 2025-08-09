"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  DollarSign,
  Star,
  CheckCircle,
  Edit,
  Briefcase,
  Globe,
  Github,
  Linkedin,
  Phone,
  Mail,
  Calendar,
  Award,
  TrendingUp,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  id: string
  full_name: string | null
  bio: string | null
  location: string | null
  skills: string[] | null
  hourly_rate: number | null
  experience_level: string | null
  portfolio_url: string | null
  linkedin_url: string | null
  github_url: string | null
  role: string | null
  profile_completed: boolean
  kyc_verified: boolean
  avatar_url: string | null
  created_at: string
  phone_number: string | null
  total_earnings: number
  projects_completed: number
  client_rating: number
  email: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const me = await fetch("/api/auth/me", { cache: "no-store" }).then((r) => r.json())
      if (!me?.user) {
        router.push("/auth")
        return
      }
      setUserEmail(me.user.email)

      const res = await fetch("/api/profile", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load profile")

      const { profile } = await res.json()
      setProfile(profile)
    } catch (error) {
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

  const getExperienceLabel = (level: string | null) => {
    if (!level) return "Not specified"
    const levels: Record<string, string> = {
      entry: "Entry Level (0-2 years)",
      intermediate: "Intermediate (2-5 years)",
      senior: "Senior (5-10 years)",
      expert: "Expert (10+ years)",
    }
    return levels[level] || level
  }

  const getInitials = (name: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-4">Unable to load your profile information.</p>
            <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8 backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.full_name || "User"} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{profile.full_name || "Your Name"}</h1>
                  {profile.kyc_verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  {profile.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.hourly_rate && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${profile.hourly_rate}/hour</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{profile.bio || "No bio provided yet."}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills?.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button onClick={() => router.push("/profile/complete")} className="flex items-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>{profile.profile_completed ? "Edit Profile" : "Complete Profile"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5" />
                    <span>Professional Info</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Role</label>
                    <p className="text-lg capitalize">{profile.role || "Not selected"}</p>
                  </div>
                  {profile.experience_level && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Experience Level</label>
                      <p className="text-lg">{getExperienceLabel(profile.experience_level)}</p>
                    </div>
                  )}
                  {profile.hourly_rate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Hourly Rate</label>
                      <p className="text-lg font-semibold text-green-600">${profile.hourly_rate}/hour</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Links</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {profile.portfolio_url && (
                    <a
                      href={profile.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Portfolio</span>
                    </a>
                  )}
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {profile.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {!profile.portfolio_url && !profile.linkedin_url && !profile.github_url && (
                    <p className="text-gray-500 text-sm">No links added yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">${profile.total_earnings || 0}</h3>
                  <p className="text-gray-600">Total Earnings</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{profile.projects_completed || 0}</h3>
                  <p className="text-gray-600">Projects Completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{profile.client_rating || 0}/5</h3>
                  <p className="text-gray-600">Client Rating</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span>{userEmail}</span>
                </div>
                {profile.phone_number && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{profile.phone_number}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Verification</CardTitle>
                <p className="text-gray-600">Your verification status and completed steps</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle
                      className={`w-5 h-5 ${profile.profile_completed ? "text-green-500" : "text-gray-400"}`}
                    />
                    <div>
                      <p className="font-medium">Profile Completed</p>
                      <p className="text-sm text-gray-600">Basic profile information filled</p>
                    </div>
                  </div>
                  <Badge variant={profile.profile_completed ? "default" : "secondary"}>
                    {profile.profile_completed ? "Complete" : "Pending"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${profile.kyc_verified ? "text-green-500" : "text-gray-400"}`} />
                    <div>
                      <p className="font-medium">KYC Verification</p>
                      <p className="text-sm text-gray-600">Identity verification completed</p>
                    </div>
                  </div>
                  <Badge variant={profile.kyc_verified ? "default" : "secondary"}>
                    {profile.kyc_verified ? "Verified" : "Pending"}
                  </Badge>
                </div>

                {profile.role === "freelancer" && (!profile.profile_completed || !profile.kyc_verified) && (
                  <div className="mt-4">
                    <Button onClick={() => router.push("/profile/complete")} className="w-full">
                      Complete Verification Process
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
