import { Suspense } from "react"
import { ModernAuthForm } from "@/components/auth/modern-auth-form"

function AuthFormWrapper() {
  return <ModernAuthForm />
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <AuthFormWrapper />
    </Suspense>
  )
}
