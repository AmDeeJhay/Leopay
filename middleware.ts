import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove: (name, options) => {
          res.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Protect dashboard and other authenticated routes
    const protectedRoutes = [
      "/dashboard",
      "/profile",
      "/settings",
      "/payroll",
      "/employees",
      "/tasks",
      "/transactions",
      "/payments",
      "/wallet",
    ]
    const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL("/auth", req.url))
    }

    // Redirect authenticated users away from auth page
    if (req.nextUrl.pathname.startsWith("/auth") && user) {
      // Check if user has completed onboarding by checking if they have a role
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

      if (profile?.role) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      } else {
        return NextResponse.redirect(new URL("/onboarding/role-selection", req.url))
      }
    }

    // Redirect users who haven't completed onboarding
    if (user && !req.nextUrl.pathname.startsWith("/onboarding") && !req.nextUrl.pathname.startsWith("/auth")) {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

      if (!profile?.role && !req.nextUrl.pathname.startsWith("/onboarding")) {
        return NextResponse.redirect(new URL("/onboarding/role-selection", req.url))
      }
    }
  } catch (error) {
    console.error("Middleware error:", error)
    // On error, allow the request to continue
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
