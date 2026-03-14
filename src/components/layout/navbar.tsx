import Link from "next/link";
import { 
  LogIn, 
  BriefcaseBusiness, 
  User, 
  LogOut, 
  LayoutDashboard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { auth, signOut } from "@/lib/auth";

export async function Navbar() {
  const session = await auth();
  const userRole = session?.user?.role || null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-md shadow-brand-500/25 transition-transform group-hover:scale-105">
            <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-brand-600">Hire</span>
            <span className="text-slate-800">Hub</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          <Link 
            href="/jobs" 
            className="rounded-lg px-4 py-2 text-slate-600 transition-all hover:bg-slate-100 hover:text-brand-600"
          >
            Jobs
          </Link>
          <Link 
            href="/companies" 
            className="rounded-lg px-4 py-2 text-slate-600 transition-all hover:bg-slate-100 hover:text-brand-600"
          >
            Companies
          </Link>
          <Link 
            href="/blog" 
            className="rounded-lg px-4 py-2 text-slate-600 transition-all hover:bg-slate-100 hover:text-brand-600"
          >
            Career Tips
          </Link>
          <Link 
            href="/employer" 
            className="rounded-lg px-4 py-2 text-slate-600 transition-all hover:bg-slate-100 hover:text-brand-600"
          >
            For Employers
          </Link>
        </nav>

        {/* Auth Section - Server rendered */}
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              {/* Role-based dashboard button */}
              {userRole === "ADMIN" && (
                <Button asChild variant="admin" size="sm" className="gap-1.5">
                  <Link href="/admin">
                    <LayoutDashboard className="h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              )}
              {userRole === "EMPLOYER" && (
                <Button asChild variant="employer" size="sm" className="gap-1.5">
                  <Link href="/employer">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              )}
              {userRole === "JOBSEEKER" && (
                <Button asChild variant="seeker" size="sm" className="gap-1.5">
                  <Link href="/applications">
                    <BriefcaseBusiness className="h-4 w-4" />
                    My Applications
                  </Link>
                </Button>
              )}

              {/* Simple profile link */}
              <Link 
                href="/profile" 
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white text-sm font-medium">
                  {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
                </div>
                <span className="hidden lg:inline">{session.user.name || session.user.email?.split('@')[0]}</span>
              </Link>

              {/* Sign out */}
              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/" })
                }}
              >
                <Button type="submit" variant="ghost" size="sm" className="gap-1.5 text-slate-600 hover:text-red-600">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="text-slate-600">
                <Link href="/auth/signin" className="flex items-center gap-1.5">
                  <LogIn className="h-4 w-4" />
                  Sign in
                </Link>
              </Button>
              <Button asChild size="sm" className="shadow-md shadow-brand-500/20">
                <Link href="/auth/register">
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
