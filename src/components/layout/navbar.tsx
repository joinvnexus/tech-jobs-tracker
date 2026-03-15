"use client";

import Link from "next/link";
import { 
  LogIn, 
  BriefcaseBusiness, 
  LogOut, 
  LayoutDashboard,
  ChevronDown,
  Users,
  Briefcase,
  Bookmark,
  Settings,
  Plus,
  User,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/components/layout/navbar-actions";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";

interface NavbarClientProps {
  session: Session | null;
}

// Role-based menu configurations
const roleMenus = {
  ADMIN: {
    title: "Admin Panel",
    description: "Manage platform",
    items: [
      { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/admin/jobs/pending", icon: Briefcase, label: "Pending Jobs" },
      { href: "/admin/users", icon: Users, label: "Manage Users" },
    ]
  },
  EMPLOYER: {
    title: "Employer Portal",
    description: "Manage your jobs",
    items: [
      { href: "/employer", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/employer/jobs", icon: Briefcase, label: "My Jobs" },
      { href: "/employer/jobs/new", icon: Plus, label: "Post New Job" },
    ]
  },
  JOBSEEKER: {
    title: "Job Seeker Dashboard",
    description: "Manage your job search",
    items: [
      { href: "/profile", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/applications", icon: Briefcase, label: "My Applications" },
      { href: "/saved-jobs", icon: Bookmark, label: "Saved Jobs" },
      { href: "/jobs", icon: BriefcaseBusiness, label: "Browse Jobs" },
    ]
  }
};

export function NavbarClient({ session }: NavbarClientProps) {
  const userRole = session?.user?.role || null;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  const getInitials = () => {
    if (session?.user?.name) {
      return session.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return session?.user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const getRoleBadgeColor = () => {
    switch(userRole) {
      case 'ADMIN': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'EMPLOYER': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'JOBSEEKER': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

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

          {/* My Account Dropdown - shows when logged in */}
          {session?.user && userRole && roleMenus[userRole as keyof typeof roleMenus] && (
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle("myAccount")}
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-slate-600 transition-all hover:bg-slate-100 hover:text-brand-600"
              >
                <span>My Account</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  openDropdown === "myAccount" && "rotate-180"
                )} />
              </button>

              {/* Role-based dropdown menu */}
              {openDropdown === "myAccount" && (
                <div className="absolute left-0 mt-2 w-64 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-800">
                      {roleMenus[userRole as keyof typeof roleMenus].title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {roleMenus[userRole as keyof typeof roleMenus].description}
                    </p>
                  </div>
                  {roleMenus[userRole as keyof typeof roleMenus].items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeDropdowns}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-brand-600"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {!session?.user && (
            <Link 
              href="/employer" 
              className="rounded-lg px-4 py-2 text-slate-600 transition-all hover:bg-slate-100 hover:text-brand-600"
            >
              For Employers
            </Link>
          )}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              {/* Role indicator */}
              {userRole && (
                <div className={cn(
                  "hidden items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium lg:flex",
                  getRoleBadgeColor()
                )}>
                  <span>{userRole === 'JOBSEEKER' ? 'seeker' : userRole.toLowerCase()}</span>
                </div>
              )}

              {/* Dashboard button for Job Seeker */}
              {userRole === "JOBSEEKER" && (
                <Button asChild className="gap-1.5 bg-green-600 hover:bg-green-700">
                  <Link href="/profile">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              )}

              {/* User profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("profile")}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-all hover:bg-slate-100"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white text-sm font-medium">
                    {getInitials()}
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-slate-400 transition-transform hidden sm:block",
                    openDropdown === "profile" && "rotate-180"
                  )} />
                </button>

                {openDropdown === "profile" && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
                    <Link 
                      href="/profile" 
                      onClick={closeDropdowns}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link 
                      href="/profile" 
                      onClick={closeDropdowns}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <button 
                      onClick={async () => {
                        await handleSignOut();
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
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

      {/* Click outside to close dropdowns */}
      {openDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeDropdowns}
        />
      )}
    </header>
  );
}
