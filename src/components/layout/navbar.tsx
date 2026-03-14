import Link from "next/link"
import { LogIn, BriefcaseBusiness } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BriefcaseBusiness className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">
            HireHub
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
            Jobs
          </Link>
          <Link href="/companies" className="text-muted-foreground hover:text-foreground">
            Companies
          </Link>
          <Link href="/blog" className="text-muted-foreground hover:text-foreground">
            Career tips
          </Link>
          <Link href="/employer" className="text-muted-foreground hover:text-foreground">
            For employers
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/auth/signin" className="flex items-center gap-1">
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>Sign in</span>
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/auth/register">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
