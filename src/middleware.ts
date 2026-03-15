import { NextResponse, type NextRequest } from "next/server"

// Define session cookie names used by NextAuth
const SESSION_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
]

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/blog",
  "/companies",
  "/contact",
  "/jobs",
  "/auth",
]

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req
  const path = nextUrl.pathname

  // Check for session cookie
  const hasSessionCookie = SESSION_COOKIE_NAMES.some((name) =>
    req.cookies.has(name)
  )

  // Check if it's a public route
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    path === route || path.startsWith(route + "/")
  )

  // Check if accessing a protected route without session
  const isProtectedRoute =
    !isPublicRoute &&
    (path.startsWith("/admin") ||
      path.startsWith("/employer") ||
      path.startsWith("/applications") ||
      path.startsWith("/saved-jobs") ||
      path.startsWith("/profile"))

  // Redirect unauthenticated users to signin
  if (isProtectedRoute && !hasSessionCookie) {
    const signInUrl = new URL("/auth/signin", nextUrl)
    signInUrl.searchParams.set("callbackUrl", nextUrl.href)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
