"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, Loader2, User, ShieldCheck } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSession } from "@/components/providers/session-provider"

const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
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
  const { ready, user, profile, updateProfile, completeKycAndProfile, getDashboardPath } = useSession()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [error, setError] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [verifying, setVerifying] = React.useState(false)

  const [form, setForm] = React.useState({
    full_name: "",
    bio: "",
    location: "",
    skills: [] as string[],
    hourly_rate: "",
    experience_level: "",
    portfolio_url: "",
    linkedin_url: "",
    github_url: "",
  })

  // Initialize from session after hydration
  React.useEffect(() => {
    if (!ready) return
    if (!user) {
      router.replace("/auth?next=/profile/complete")
      return
    }
    if (!profile) return

    setForm({
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

    // If already completed, go to dashboard
    if (profile.profile_completed && profile.kyc_verified) {
      router.replace(getDashboardPath(profile.role, profile.subrole))
    } else {
      setCurrentStep(profile.profile_completed ? 2 : 1)
    }
  }, [ready, user, profile, router, getDashboardPath])

  const handleSkillToggle = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  async function saveProfileAndContinue(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!form.full_name || !form.bio || form.skills.length < 1) {
      setError("Please fill required fields (name, bio, and at least one skill).")
      return
    }

    setSaving(true)
    updateProfile({
      full_name: form.full_name,
      bio: form.bio,
      location: form.location || null,
      skills: form.skills,
      hourly_rate: form.hourly_rate ? Number(form.hourly_rate) : null,
      experience_level: (form.experience_level || null) as any,
      portfolio_url: form.portfolio_url || null,
      linkedin_url: form.linkedin_url || null,
      github_url: form.github_url || null,
      // profile_completed remains false for freelancer receiver until KYC
    })
    setSaving(false)
    setCurrentStep(2)
  }

  async function submitKYC() {
    setVerifying(true)
    const res = completeKycAndProfile()
    setVerifying(false)
    if (res.ok) {
      router.push(res.next || getDashboardPath(profile?.role, profile?.subrole))
    } else {
      setError("Failed to complete verification. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
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

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {currentStep === 1 && (
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
              <CardDescription>Tell us about yourself to get started as a freelancer</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveProfileAndContinue} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={form.full_name}
                      onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={form.location}
                      onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    value={form.bio}
                    onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                    placeholder="Tell us about your experience and what you do..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Skills * (Select at least 1)</Label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <Badge
                        key={skill}
                        variant={form.skills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Selected: {form.skills.length} skills</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hourly_rate">Hourly Rate (USD)</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      value={form.hourly_rate}
                      onChange={(e) => setForm((p) => ({ ...p, hourly_rate: e.target.value }))}
                      placeholder="50"
                      min={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience_level">Experience Level</Label>
                    <Select
                      value={form.experience_level}
                      onValueChange={(value) => setForm((p) => ({ ...p, experience_level: value }))}
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
                      value={form.portfolio_url}
                      onChange={(e) => setForm((p) => ({ ...p, portfolio_url: e.target.value }))}
                      placeholder="Portfolio URL"
                      type="url"
                    />
                    <Input
                      value={form.linkedin_url}
                      onChange={(e) => setForm((p) => ({ ...p, linkedin_url: e.target.value }))}
                      placeholder="LinkedIn URL"
                      type="url"
                    />
                    <Input
                      value={form.github_url}
                      onChange={(e) => setForm((p) => ({ ...p, github_url: e.target.value }))}
                      placeholder="GitHub URL"
                      type="url"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={saving || !form.full_name || !form.bio || form.skills.length < 1}
                  className="w-full"
                >
                  {saving ? (
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
              <Button onClick={submitKYC} className="w-full h-12" disabled={verifying}>
                {verifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                  </>
                ) : (
                  "Submit and verify"
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
