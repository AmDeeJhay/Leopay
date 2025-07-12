import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
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
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
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

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/auth"]
    const isPublicRoute = publicRoutes.some(
      (route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route),
    )

    // If user is not authenticated and trying to access protected route
    if (!user && !isPublicRoute) {
      return NextResponse.redirect(new URL("/auth", request.url))
    }

    // If user is authenticated
    if (user) {
      // Check if user has completed onboarding
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

      // If user is on auth page and authenticated, redirect based on profile
      if (request.nextUrl.pathname === "/auth") {
        if (profile?.role) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        } else {
          return NextResponse.redirect(new URL("/onboarding/role-selection", request.url))
        }
      }

      // If user hasn't completed onboarding and not on onboarding page
      if (!profile?.role && !request.nextUrl.pathname.startsWith("/onboarding")) {
        return NextResponse.redirect(new URL("/onboarding/role-selection", request.url))
      }
    }
  } catch (error) {
    console.error("Middleware error:", error)
    // On error, allow the request to continue
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
