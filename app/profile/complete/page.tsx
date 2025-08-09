"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, Loader2, User, ShieldCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useActionState } from "react"
import { completeFreelancerProfile, type CompleteProfileResult, completeKyc } from "./actions"
import { useSession } from "@/components/providers/session-provider"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

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
  const router = useRouter()
  const search = useSearchParams()
  const { toast } = useToast()
  const { user, profile, updateProfile, completeKycAndProfile, getDashboardPath } = useSession()
  const [currentStep, setCurrentStep] = useState(search.get("step") === "kyc" ? 2 : 1)
  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    skills: profile?.skills || ([] as string[]),
    hourly_rate: profile?.hourly_rate?.toString() || "",
    experience_level: profile?.experience_level || "",
    portfolio_url: profile?.portfolio_url || "",
    linkedin_url: profile?.linkedin_url || "",
    github_url: profile?.github_url || "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [state, action, pending] = useActionState<CompleteProfileResult, FormData>(completeFreelancerProfile, {
    ok: false,
  })

  useEffect(() => {
    if (!user) router.replace("/auth")
  }, [user, router])

  useEffect(() => {
    // Prefill from existing profile
    ;(async () => {
      try {
        const res = await fetch("/api/profile", { cache: "no-store" })
        if (!res.ok) {
          router.push("/auth?next=/profile/complete")
          return
        }
        const { profile } = await res.json()
        if (profile) {
          setProfileData({
            full_name: profile.full_name || "",
            bio: profile.bio || "",
            location: profile.location || "",
            skills: profile.skills || [],
            hourly_rate: profile.hourly_rate?.toString() || "",
            experience_level: profile.experience_level || "",
            portfolio_url: profile.portfolio_url || "",
            linkedin_url: profile.linkedin_url || "",
            github_url: profile.github_url || "",
          })
          if (profile.profile_completed && !profile.kyc_verified) setCurrentStep(2)
          if (profile.profile_completed && profile.kyc_verified) router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      }
    })()
  }, [router])

  useEffect(() => {
    if (state?.ok && state.next) {
      setCurrentStep(2)
    } else if (!state?.ok && state?.error === "MISSING_FIELDS") {
      toast({ title: "Missing information", description: "Please fill required fields", variant: "destructive" })
    } else if (!state?.ok && state?.error === "NOT_AUTHENTICATED") {
      router.push("/auth?next=/profile/complete")
    }
  }, [state, toast, router])

  const handleSkillToggle = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const saveProfile = () => {
    setError(null)
    updateProfile({
      full_name: profileData.full_name || profile?.full_name || null,
      location: profileData.location || profile?.location || null,
    })
  }

  const submitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set("skills", profileData.skills.join(","))
    await action(fd)
  }

  const submitKYC = async () => {
    setSubmitting(true)
    try {
      const res = await completeKyc({ ok: false, message: "" } as any, new FormData())
      setSubmitting(false)
      if (res.ok) {
        toast({ title: "KYC verification complete!", description: "Your account has been verified successfully" })
        router.push("/dashboard")
      } else {
        toast({ title: "Error", description: res.message || "Failed to verify", variant: "destructive" })
      }
    } catch (error) {
      setSubmitting(false)
      // completeKyc redirects on success, so we only get here on error
      toast({ title: "Error", description: "Failed to complete verification", variant: "destructive" })
    }
  }

  const completeAll = async () => {
    try {
      setSaving(true)
      if (!profileData.skills.length || !profileData.full_name || !profileData.bio) {
        setError("Please fill required fields.")
        return
      }
      saveProfile()
      const res = await completeKycAndProfile()
      if (res.ok) {
        router.push(res.next || getDashboardPath(profile?.role, profile?.subrole || null))
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : <User className="w-4 h-4" />}
              </div>
              <span className="font-medium">Profile</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"} rounded`} />
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
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
              <form onSubmit={submitProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={profileData.full_name}
                      onChange={(e) => setProfileData((p) => ({ ...p, full_name: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData((p) => ({ ...p, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData((p) => ({ ...p, bio: e.target.value }))}
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
                      name="hourly_rate"
                      type="number"
                      value={profileData.hourly_rate}
                      onChange={(e) => setProfileData((p) => ({ ...p, hourly_rate: e.target.value }))}
                      placeholder="50"
                      min={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience_level">Experience Level</Label>
                    <Select
                      value={profileData.experience_level}
                      onValueChange={(value) => setProfileData((p) => ({ ...p, experience_level: value }))}
                      name="experience_level"
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
                      name="portfolio_url"
                      value={profileData.portfolio_url}
                      onChange={(e) => setProfileData((p) => ({ ...p, portfolio_url: e.target.value }))}
                      placeholder="Portfolio URL"
                      type="url"
                    />
                    <Input
                      name="linkedin_url"
                      value={profileData.linkedin_url}
                      onChange={(e) => setProfileData((p) => ({ ...p, linkedin_url: e.target.value }))}
                      placeholder="LinkedIn URL"
                      type="url"
                    />
                    <Input
                      name="github_url"
                      value={profileData.github_url}
                      onChange={(e) => setProfileData((p) => ({ ...p, github_url: e.target.value }))}
                      placeholder="GitHub URL"
                      type="url"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={pending || !profileData.full_name || !profileData.bio || profileData.skills.length < 1}
                  className="w-full"
                >
                  {pending ? (
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
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>{"Action Required"}</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-start space-x-3 text-sm text-gray-700">
                <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                <p>
                  For compliance, we need to verify your identity. Submit your details to enable receiving payments.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kyc"
                  checked={profileData.skills.length >= 3}
                  onCheckedChange={(v) =>
                    setProfileData((p) => ({ ...p, skills: v ? [...p.skills, ""] : p.skills.slice(0, -1) }))
                  }
                />
                <Label htmlFor="kyc">I have completed KYC verification.</Label>
              </div>

              <div className="flex justify-end">
                <Button onClick={completeAll} disabled={saving}>
                  {saving ? "Finishing..." : "Finish"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
