"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, MapPin, DollarSign, Star, CheckCircle, Edit, Briefcase, Globe, Github, Linkedin, Phone, Mail, Calendar, Award, TrendingUp } from 'lucide-react'
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  id: string
  full_name: string
  bio: string
  location: string
  skills: string[]
  hourly_rate: number
  experience_level: string
  portfolio_url: string
  linkedin_url: string
  github_url: string
  role: string
  profile_completed: boolean
  kyc_verified: boolean
  avatar_url: string
  created_at: string
  phone_number: string
  total_earnings: number
  projects_completed: number
  client_rating: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        router.push("/auth")
        return
      }

      setUser(user)

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileError) {
        console.error("Profile fetch error:", profileError)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
        return
      }

      setProfile(profileData)
    } catch (error) {
      console.error("Error loading profile:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getExperienceLabel = (level: string) => {
    const levels = {
      entry: "Entry Level (0-2 years)",
      intermediate: "Intermediate (2-5 years)",
      senior: "Senior (5-10 years)",
      expert: "Expert (10+ years)"
    }
    return levels[level as keyof typeof levels] || level
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
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
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
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
                <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.full_name} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{profile.full_name}</h1>
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

                <p className="text-gray-700 mb-4">{profile.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills?.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button onClick={() => router.push("/profile/edit")} className="flex items-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </Button>
                  {profile.role === "freelancer" && !profile.profile_completed && (
                    <Button 
                      variant="outline" 
                      onClick={() => router.push("/profile/complete")}
                      className="flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Complete Profile</span>
                    </Button>
                  )}
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
                    <p className="text-lg capitalize">{profile.role}</p>
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
                  <span>{user?.email}</span>
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
                <CardDescription>
                  Your verification status and completed steps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${profile.profile_completed ? 'text-green-500' : 'text-gray-400'}`} />
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
                    <CheckCircle className={`w-5 h-5 ${profile.kyc_verified ? 'text-green-500' : 'text-gray-400'}`} />
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
                    <Button 
                      onClick={() => router.push("/profile/complete")}
                      className="w-full"
                    >
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
