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
import { FileText, CheckCircle, Loader2, User, ShieldCheck, ArrowRight, Sparkles, Star } from "lucide-react"
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
    try {
      await updateProfile({
        full_name: form.full_name,
        bio: form.bio,
        location: form.location || null,
        skills: form.skills,
        hourly_rate: form.hourly_rate ? Number(form.hourly_rate) : null,
        experience_level: (form.experience_level || null) as any,
        portfolio_url: form.portfolio_url || null,
        linkedin_url: form.linkedin_url || null,
        github_url: form.github_url || null,
      })
      setCurrentStep(2)
    } catch (err) {
      setError("Failed to save profile. Please try again.")
      console.error("Profile save error:", err)
    } finally {
      setSaving(false)
    }
  }

  async function submitKYC() {
    setVerifying(true)
    setError(null)
    try {
      const res = await completeKycAndProfile()
      if (res.ok) {
        router.push(res.next || getDashboardPath(profile?.role, profile?.subrole))
      } else {
        setError("Failed to complete verification. Please try again.")
      }
    } catch (err) {
      setError("Failed to complete verification. Please try again.")
      console.error("KYC error:", err)
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-sm font-medium text-white">Let's get you set up</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Complete Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Profile</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Just a few steps to unlock your freelance potential
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-8">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className={`relative mb-4 transition-all duration-500 ${
                    currentStep >= 1 
                      ? "transform scale-110" 
                      : ""
                  }`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentStep >= 1 
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25" 
                        : "bg-white/10 border-2 border-white/30"
                    }`}>
                      {currentStep > 1 ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <User className="w-7 h-7 text-white" />
                      )}
                    </div>
                    {currentStep >= 1 && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-50 animate-pulse"></div>
                    )}
                  </div>
                  <span className={`font-semibold transition-colors duration-300 ${
                    currentStep >= 1 ? "text-white" : "text-slate-400"
                  }`}>
                    Profile Details
                  </span>
                </div>

                {/* Connector */}
                <div className={`w-24 h-1 rounded-full transition-all duration-1000 ${
                  currentStep >= 2 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500" 
                    : "bg-white/20"
                }`}></div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className={`relative mb-4 transition-all duration-500 delay-300 ${
                    currentStep >= 2 
                      ? "transform scale-110" 
                      : ""
                  }`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentStep >= 2 
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25" 
                        : "bg-white/10 border-2 border-white/30"
                    }`}>
                      <ShieldCheck className="w-7 h-7 text-white" />
                    </div>
                    {currentStep >= 2 && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-50 animate-pulse"></div>
                    )}
                  </div>
                  <span className={`font-semibold transition-colors duration-300 ${
                    currentStep >= 2 ? "text-white" : "text-slate-400"
                  }`}>
                    Verification
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-8 animate-in slide-in-from-top duration-500">
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 backdrop-blur-sm">
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Step 1: Profile Form */}
          {currentStep === 1 && (
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 animate-in slide-in-from-bottom">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-white mb-2">Tell us about yourself</CardTitle>
                <CardDescription className="text-slate-300 text-lg">
                  Help clients understand what makes you unique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <form onSubmit={saveProfileAndContinue} className="space-y-8">
                  {/* Basic Info Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Basic Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="full_name" className="text-white font-medium">Full Name *</Label>
                        <Input
                          id="full_name"
                          value={form.full_name}
                          onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
                          placeholder="Your full name"
                          className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 h-12"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="location" className="text-white font-medium">Location</Label>
                        <Input
                          id="location"
                          value={form.location}
                          onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                          placeholder="City, Country"
                          className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="bio" className="text-white font-medium">Bio *</Label>
                      <Textarea
                        id="bio"
                        value={form.bio}
                        onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                        placeholder="Tell us about your experience and what you do..."
                        rows={4}
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Skills * (Select at least 1)</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {skillOptions.map((skill) => (
                        <Badge
                          key={skill}
                          variant={form.skills.includes(skill) ? "default" : "outline"}
                          className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                            form.skills.includes(skill)
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-purple-500/25"
                              : "bg-white/5 border-white/30 text-slate-300 hover:bg-white/10 hover:border-white/50"
                          }`}
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-slate-400 text-sm">
                      Selected: <span className="text-purple-300 font-medium">{form.skills.length}</span> skills
                    </p>
                  </div>

                  {/* Experience & Rate Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="hourly_rate" className="text-white font-medium">Hourly Rate (USD)</Label>
                      <Input
                        id="hourly_rate"
                        type="number"
                        value={form.hourly_rate}
                        onChange={(e) => setForm((p) => ({ ...p, hourly_rate: e.target.value }))}
                        placeholder="50"
                        min={1}
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 h-12"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="experience_level" className="text-white font-medium">Experience Level</Label>
                      <Select
                        value={form.experience_level}
                        onValueChange={(value) => setForm((p) => ({ ...p, experience_level: value }))}
                      >
                        <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 h-12">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {experienceLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value} className="text-white focus:bg-purple-500/20">
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Social Links Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Portfolio & Links</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <Input
                        value={form.portfolio_url}
                        onChange={(e) => setForm((p) => ({ ...p, portfolio_url: e.target.value }))}
                        placeholder="Portfolio URL"
                        type="url"
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 h-12"
                      />
                      <Input
                        value={form.linkedin_url}
                        onChange={(e) => setForm((p) => ({ ...p, linkedin_url: e.target.value }))}
                        placeholder="LinkedIn URL"
                        type="url"
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 h-12"
                      />
                      <Input
                        value={form.github_url}
                        onChange={(e) => setForm((p) => ({ ...p, github_url: e.target.value }))}
                        placeholder="GitHub URL"
                        type="url"
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 h-12"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={saving}
                    className="w-full h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Saving Profile...
                      </>
                    ) : (
                      <>
                        Continue to Verification
                        <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: KYC Verification */}
          {currentStep === 2 && (
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 animate-in slide-in-from-right">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-white mb-2">Verify Your Identity</CardTitle>
                <CardDescription className="text-slate-300 text-lg">
                  Complete your verification to start receiving payments securely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Secure & Compliant</h4>
                      <p className="text-slate-300 leading-relaxed">
                        We use bank-level encryption to protect your data. This verification ensures compliance 
                        with financial regulations and enables secure payment processing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-slate-300">
                  <p className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    Identity verification typically takes 2-5 minutes
                  </p>
                  <p className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    Your information is encrypted and secure
                  </p>
                  <p className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    Required for payment processing compliance
                  </p>
                </div>

                <Button 
                  onClick={submitKYC} 
                  className="w-full h-14 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold text-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={verifying}
                >
                  {verifying ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" /> 
                      Verifying Identity...
                    </>
                  ) : (
                    <>
                      Complete Verification
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
