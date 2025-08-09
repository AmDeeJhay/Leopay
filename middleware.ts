import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

function mapDashboardPath(role?: string | null, subrole?: string | null) {
  switch (role) {
    case "freelancer":
      return subrole === "sender" ? "/dashboard/freelancer/sender" : "/dashboard/freelancer/receiver"
    case "contractor":
      return subrole === "sender" ? "/dashboard/contractor/sender" : "/dashboard/contractor/receiver"
    case "employee":
      return "/dashboard/employee/receiver"
    case "employer":
      return "/dashboard/employer/sender"
    case "dao":
      return subrole === "sender" ? "/dashboard/dao/admin" : "/dashboard/dao/contributor"
    default:
      return "/dashboard"
  }
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: "", ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: "", ...options })
        },
      },
    },
  )

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname
    const isOnboarding = pathname.startsWith("/onboarding")
    const isAuth = pathname === "/auth"
    const isPublic = isOnboarding || isAuth || pathname === "/"

    // Unauthenticated access to protected routes → /auth (preserve next)
    if (!user && !isPublic) {
      const redirectUrl = new URL("/auth", request.url)
      redirectUrl.searchParams.set("next", pathname + request.nextUrl.search)
      return NextResponse.redirect(redirectUrl)
    }

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, subrole, profile_completed, kyc_verified")
        .eq("id", user.id)
        .maybeSingle()

      // If authenticated user visits /auth, route them away
      if (isAuth) {
        if (!profile?.role) {
          return NextResponse.redirect(new URL("/onboarding/role-selection", request.url))
        }
        if (
          profile.role === "freelancer" &&
          profile.subrole === "receiver" &&
          (!profile.profile_completed || !profile.kyc_verified)
        ) {
          return NextResponse.redirect(new URL("/profile/complete", request.url))
        }
        return NextResponse.redirect(new URL(mapDashboardPath(profile.role, profile.subrole), request.url))
      }

      // If no role and not on onboarding, force onboarding
      if (!profile?.role && !isOnboarding) {
        return NextResponse.redirect(new URL("/onboarding/role-selection", request.url))
      }

      // Enforce KYC only for freelancer receiver
      if (
        profile?.role === "freelancer" &&
        profile?.subrole === "receiver" &&
        (!profile.profile_completed || !profile.kyc_verified) &&
        !pathname.startsWith("/profile/complete") &&
        !isOnboarding
      ) {
        return NextResponse.redirect(new URL("/profile/complete", request.url))
      }
    }
  } catch (e) {
    // Allow request to continue on error
    console.error("Middleware error:", e)
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
