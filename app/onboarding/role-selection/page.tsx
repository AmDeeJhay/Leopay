import { Suspense } from "react"
import { ModernRoleSelection } from "@/components/onboarding/modern-role-selection"
import { Loader2 } from "lucide-react"

export default function RoleSelectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
        </div>
      }
    >
      <ModernRoleSelection />
    </Suspense>
  )
}
