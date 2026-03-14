import { NextResponse, type NextRequest } from "next/server"

const SESSION_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
]

export default function middleware(req: NextRequest) {
  const { nextUrl } = req
  const hasSessionCookie = SESSION_COOKIE_NAMES.some((name) =>
    req.cookies.has(name)
  )

  // Redirect to login if accessing protected routes
  if (!hasSessionCookie && nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

