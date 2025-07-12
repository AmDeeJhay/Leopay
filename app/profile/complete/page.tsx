"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, FileText, Upload, CheckCircle, AlertCircle, Loader2, X } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { FREELANCER_SKILLS, EXPERIENCE_LEVELS } from "@/lib/types"

export default function CompleteProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    bio: "",
    skills: [] as string[],
    experience_level: "",
    hourly_rate: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    portfolio_url: "",
  })
  const [kycDocument, setKycDocument] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth")
        return
      }

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profileData) {
        setProfile({
          full_name: profileData.full_name || "",
          phone: profileData.phone || "",
          bio: profileData.bio || "",
          skills: profileData.skills || [],
          experience_level: profileData.experience_level || "",
          hourly_rate: profileData.hourly_rate?.toString() || "",
          location: profileData.location || "",
          website: profileData.website || "",
          linkedin: profileData.linkedin || "",
          github: profileData.github || "",
          portfolio_url: profileData.portfolio_url || "",
        })

        // Check if profile is already completed
        if (profileData.profile_completed && profileData.kyc_verified) {
          router.push("/dashboard")
        } else if (profileData.profile_completed) {
          setCurrentStep(2)
        }
      }
    } catch (error: any) {
      console.error("Error loading profile:", error)
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      })
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!profile.full_name.trim()) newErrors.full_name = "Full name is required"
    if (!profile.phone.trim()) newErrors.phone = "Phone number is required"
    if (!profile.bio.trim()) newErrors.bio = "Bio is required"
    if (profile.skills.length === 0) newErrors.skills = "At least one skill is required"
    if (!profile.experience_level) newErrors.experience_level = "Experience level is required"
    if (!profile.hourly_rate || Number.parseFloat(profile.hourly_rate) <= 0) {
      newErrors.hourly_rate = "Valid hourly rate is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStep1Submit = async () => {
    if (!validateStep1()) return

    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          bio: profile.bio,
          skills: profile.skills,
          experience_level: profile.experience_level,
          hourly_rate: Number.parseFloat(profile.hourly_rate),
          location: profile.location,
          website: profile.website,
          linkedin: profile.linkedin,
          github: profile.github,
          portfolio_url: profile.portfolio_url,
          profile_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Profile Updated",
        description: "Your profile has been completed successfully!",
      })

      setCurrentStep(2)
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKYCSubmit = async () => {
    if (!kycDocument || !documentType) {
      toast({
        title: "Error",
        description: "Please select a document type and upload a file",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      // Upload document to Supabase Storage
      const fileExt = kycDocument.name.split(".").pop()
      const fileName = `${user.id}/${documentType}_${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("kyc-documents")
        .upload(fileName, kycDocument)

      if (uploadError) throw uploadError

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("kyc-documents").getPublicUrl(fileName)

      // Save KYC document record
      const { error: kycError } = await supabase.from("kyc_documents").insert({
        user_id: user.id,
        document_type: documentType,
        document_url: publicUrl,
        status: "pending",
      })

      if (kycError) throw kycError

      // Update profile as KYC verified (in real app, this would be done by admin review)
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          kyc_verified: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (profileError) throw profileError

      toast({
        title: "KYC Submitted",
        description: "Your documents have been submitted for verification!",
      })

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error submitting KYC:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit KYC documents",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addSkill = (skill: string) => {
    if (!profile.skills.includes(skill)) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const removeSkill = (skill: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const progressPercentage = currentStep === 1 ? 50 : 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">Complete Your Freelancer Profile</h1>
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-center text-sm text-gray-600 mt-2">
            Step {currentStep} of 2: {currentStep === 1 ? "Profile Information" : "KYC Verification"}
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
          <Tabs value={currentStep.toString()} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="1" disabled={currentStep < 1}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="2" disabled={currentStep < 2}>
                <FileText className="w-4 h-4 mr-2" />
                KYC Verification
              </TabsTrigger>
            </TabsList>

            <TabsContent value="1">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Tell us about yourself and your skills to attract the right clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, full_name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                    {errors.full_name && <p className="text-sm text-red-600">{errors.full_name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself and your experience"
                    rows={4}
                  />
                  {errors.bio && <p className="text-sm text-red-600">{errors.bio}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Skills *</Label>
                  <Select onValueChange={addSkill}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your skills" />
                    </SelectTrigger>
                    <SelectContent>
                      {FREELANCER_SKILLS.filter((skill) => !profile.skills.includes(skill)).map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                      </Badge>
                    ))}
                  </div>
                  {errors.skills && <p className="text-sm text-red-600">{errors.skills}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience_level">Experience Level *</Label>
                    <Select
                      value={profile.experience_level}
                      onValueChange={(value) => setProfile((prev) => ({ ...prev, experience_level: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.experience_level && <p className="text-sm text-red-600">{errors.experience_level}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourly_rate">Hourly Rate (USD) *</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      value={profile.hourly_rate}
                      onChange={(e) => setProfile((prev) => ({ ...prev, hourly_rate: e.target.value }))}
                      placeholder="50"
                      min="1"
                      step="0.01"
                    />
                    {errors.hourly_rate && <p className="text-sm text-red-600">{errors.hourly_rate}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="City, Country"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile((prev) => ({ ...prev, website: e.target.value }))}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio_url">Portfolio URL</Label>
                    <Input
                      id="portfolio_url"
                      value={profile.portfolio_url}
                      onChange={(e) => setProfile((prev) => ({ ...prev, portfolio_url: e.target.value }))}
                      placeholder="https://portfolio.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profile.linkedin}
                      onChange={(e) => setProfile((prev) => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={profile.github}
                      onChange={(e) => setProfile((prev) => ({ ...prev, github: e.target.value }))}
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                <Button onClick={handleStep1Submit} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Profile...
                    </>
                  ) : (
                    "Continue to KYC Verification"
                  )}
                </Button>
              </CardContent>
            </TabsContent>

            <TabsContent value="2">
              <CardHeader>
                <CardTitle>KYC Verification</CardTitle>
                <CardDescription>
                  Upload a government-issued ID to verify your identity and become a verified freelancer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your document will be reviewed within 24-48 hours. Make sure the image is clear and all information
                    is visible.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="document_type">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="drivers_license">Driver's License</SelectItem>
                      <SelectItem value="national_id">National ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document">Upload Document</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="document" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          {kycDocument ? kycDocument.name : "Click to upload or drag and drop"}
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">PNG, JPG, PDF up to 10MB</span>
                      </label>
                      <input
                        id="document"
                        type="file"
                        className="sr-only"
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) setKycDocument(file)
                        }}
                      />
                    </div>
                  </div>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}

                <Button
                  onClick={handleKYCSubmit}
                  disabled={isLoading || !kycDocument || !documentType}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Documents...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Submit for Verification
                    </>
                  )}
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
