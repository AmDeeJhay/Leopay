"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, Loader2, User, ShieldCheck } from "lucide-react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { completeFreelancerProfile, type CompleteProfileResult } from "./actions"
import { useActionState } from "react"
import { completeFreelancerKyc, completeKyc } from "./actions"

interface ProfileData {
  full_name: string
  bio: string
  location: string
  skills: string[]
  hourly_rate: string
  experience_level: string
  portfolio_url: string
  linkedin_url: string
  github_url: string
}

interface KYCData {
  document_type: string
  document_number: string
  phone_number: string
  address: string
  city: string
  country: string
  postal_code: string
}

const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "UI/UX Design",
  "Graphic Design",
  "Content Writing",
  "Digital Marketing",
  "SEO",
  "Data Analysis",
  "Machine Learning",
  "DevOps",
  "Mobile Development",
  "Blockchain",
]

const experienceLevels = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "intermediate", label: "Intermediate (2-5 years)" },
  { value: "senior", label: "Senior (5-10 years)" },
  { value: "expert", label: "Expert (10+ years)" },
]

export default function ProfileCompletePage() {
  const supabase = getSupabaseBrowser()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: "",
    bio: "",
    location: "",
    skills: [],
    hourly_rate: "",
    experience_level: "",
    portfolio_url: "",
    linkedin_url: "",
    github_url: "",
  })

  const [kycData, setKycData] = useState<KYCData>({
    document_type: "",
    document_number: "",
    phone_number: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
  })

  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [profileState, profileFormAction, profilePending] = useActionState<CompleteProfileResult, FormData>(
    completeFreelancerProfile,
    { ok: false },
  )
  const [kycState, kycFormAction, kycPending] = useActionState(completeFreelancerKyc, null)
  const [state, formAction, pending] = useActionState(completeKyc, { ok: false, message: "" })

  useEffect(() => {
    ;(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth?next=/profile/complete")
        return
      }
      setUser(user)
      setLoading(false)
    })()
  }, [router, supabase])

  useEffect(() => {
    if (profileState?.ok && profileState.next) {
      setCurrentStep(2)
    } else if (!profileState?.ok && profileState?.error === "NOT_AUTHENTICATED") {
      router.push("/auth?next=/profile/complete")
    }
  }, [profileState, router])

  const checkUserAndLoadProfile = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to complete your profile",
          variant: "destructive",
        })
        router.push("/auth")
        return
      }

      setUser(user)

      // Load existing profile data if any
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profile) {
        setProfileData({
          full_name: profile.full_name || user.user_metadata?.full_name || "",
          bio: profile.bio || "",
          location: profile.location || "",
          skills: profile.skills || [],
          hourly_rate: profile.hourly_rate?.toString() || "",
          experience_level: profile.experience_level || "",
          portfolio_url: profile.portfolio_url || "",
          linkedin_url: profile.linkedin_url || "",
          github_url: profile.github_url || "",
        })

        if (profile.profile_completed) {
          setCurrentStep(2)
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error)
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      })
    }
  }

  const handleSkillToggle = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!profileData.full_name || !profileData.bio || profileData.skills.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          ...profileData,
          hourly_rate: profileData.hourly_rate ? Number.parseFloat(profileData.hourly_rate) : null,
          profile_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Profile updated!",
        description: "Your profile has been saved successfully",
      })

      setCurrentStep(2)
    } catch (error: any) {
      console.error("Profile update error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!kycData.document_type || !kycData.document_number || !kycData.phone_number || !agreedToTerms) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and agree to terms",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          ...kycData,
          kyc_verified: true,
          kyc_submitted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "KYC verification complete!",
        description: "Your account has been verified successfully",
      })

      // Redirect to dashboard after successful completion
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error: any) {
      console.error("KYC update error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to complete KYC verification",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/auth?next=/profile/complete")
      return
    }
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName || null,
        phone_number: phone || null,
        profile_completed: true,
        kyc_verified: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
      setSubmitting(false)
      return
    }
    toast({ title: "Verified!", description: "Your profile is now verified." })
    router.push("/dashboard/freelancer/receiver")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : <User className="w-4 h-4" />}
              </div>
              <span className="font-medium">Profile</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"} rounded`} />
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-medium">KYC</span>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
              <CardDescription>Tell us about yourself to get started as a freelancer</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={profileData.full_name}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, full_name: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about your experience and what you do..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Skills * (Select at least 3)</Label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <Badge
                        key={skill}
                        variant={profileData.skills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Selected: {profileData.skills.length} skills</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hourly_rate">Hourly Rate (USD)</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      value={profileData.hourly_rate}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, hourly_rate: e.target.value }))}
                      placeholder="50"
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience_level">Experience Level</Label>
                    <Select
                      value={profileData.experience_level}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, experience_level: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Portfolio & Social Links</Label>
                  <div className="space-y-3">
                    <Input
                      value={profileData.portfolio_url}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, portfolio_url: e.target.value }))}
                      placeholder="Portfolio URL"
                      type="url"
                    />
                    <Input
                      value={profileData.linkedin_url}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, linkedin_url: e.target.value }))}
                      placeholder="LinkedIn URL"
                      type="url"
                    />
                    <Input
                      value={profileData.github_url}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, github_url: e.target.value }))}
                      placeholder="GitHub URL"
                      type="url"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !profileData.full_name || !profileData.bio || profileData.skills.length === 0}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Profile...
                    </>
                  ) : (
                    "Continue to KYC Verification"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">KYC Verification</CardTitle>
              <CardDescription>Complete your identity verification to start receiving payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-gray-700">
                <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                <p>
                  For compliance, we need to verify your identity. Submit your details to enable receiving payments.
                </p>
              </div>

              {/* Minimal placeholder form; extend with actual fields later */}
              <form action={formAction} className="space-y-4">
                <Button type="submit" className="w-full h-12" disabled={pending}>
                  {pending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                    </>
                  ) : (
                    "Submit and verify"
                  )}
                </Button>
                {state?.message && <p className="text-sm text-red-600">{state.message}</p>}
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
