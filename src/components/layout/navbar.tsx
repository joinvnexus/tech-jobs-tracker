"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, LogOut, User, Briefcase, Users, Building2, Settings, LayoutDashboard } from "lucide-react";
import { Session } from "next-auth";
import { handleSignOut } from "@/components/layout/navbar-actions";

interface NavbarProps {
  session: Session | null;
}

const PUBLIC_LINKS = [
  { href: "/jobs", label: "Find Jobs", icon: Briefcase },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/blog", label: "Career Tips", icon: Users },
];

const ROLE_DROPDOWN = {
  SEEKER: [
    { href: "/profile", label: "Dashboard", icon: LayoutDashboard },
    { href: "/applications", label: "My Applications", icon: Briefcase },
    { href: "/saved-jobs", label: "Saved Jobs", icon: Briefcase },
  ],

  EMPLOYER: [
    { href: "/employer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/employer/jobs", label: "My Jobs", icon: Briefcase },
    { href: "/employer/jobs/new", label: "Post a Job", icon: Briefcase },
  ],

  ADMIN: [
    { href: "/admin", label: "Admin Panel", icon: LayoutDashboard },
    { href: "/admin/users", label: "Manage Users", icon: Users },
  ],
};

export default function NavbarClient({ session }: NavbarProps) {
  const userRole = session?.user?.role as
    | "ADMIN"
    | "EMPLOYER"
    | "SEEKER"
    | undefined;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLink =
    "px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-all duration-200";

  const dropdownItem =
    "flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-gradient-to-r hover:from-brand-50 hover:to-white hover:text-brand-600 transition-all duration-150";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
      <div className="mx-auto flex h-16 md:h-18 max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Hire<span className="text-brand-600 bg-clip-text text-transparent">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">

          {PUBLIC_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className={navLink}>
                <Icon className="w-4 h-4 mr-1.5 inline" />
                {link.label}
              </Link>
            );
          })}

          {!session && (
            <Link href="/employer" className={navLink}>
              <Building2 className="w-4 h-4 mr-1.5 inline" />
              For Employers
            </Link>
          )}

        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Guest buttons */}
          {!session && (
            <>
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all duration-200"
              >
                Sign in
              </Link>

              <Link
                href="/auth/register"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl hover:from-brand-600 hover:to-brand-700 shadow-md hover:shadow-lg hover:shadow-brand-500/25 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Profile dropdown */}
          {session && (
            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white text-sm font-semibold shadow-md">
                  {session.user?.name?.[0]?.toUpperCase() || "U"}
                </div>

                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-xl shadow-slate-200/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                  {/* User Info */}
                  <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800 truncate">{session.user?.name || "User"}</p>
                    <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                    {userRole && (
                      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-700">
                        {userRole === 'SEEKER' ? 'Job Seeker' : userRole === 'EMPLOYER' ? 'Employer' : 'Admin'}
                      </span>
                    )}
                  </div>

                  {/* Role Links */}
                  <div className="py-2">
                    {userRole &&
                      ROLE_DROPDOWN[userRole]?.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setProfileOpen(false)}
                            className={dropdownItem}
                          >
                            <Icon className="w-4 h-4 text-slate-400" />
                            {item.label}
                          </Link>
                        );
                      })}
                  </div>

                  <div className="border-t border-slate-100 my-1"></div>

                  <div className="py-2">
                    <Link
                      href="/profile"
                      className={dropdownItem}
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile
                    </Link>

                    <Link
                      href="/settings"
                      className={dropdownItem}
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 bg-slate-50/50">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            {mobileOpen ? (
              <X size={20} className="text-slate-600" />
            ) : (
              <Menu size={20} className="text-slate-600" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-white/95 backdrop-blur-xl md:hidden shadow-lg animate-in slide-in-from-top duration-300">

          <div className="px-4 py-4 space-y-1">

            {PUBLIC_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-all duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            {!session && (
              <Link
                href="/employer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-all duration-200"
                onClick={() => setMobileOpen(false)}
              >
                <Building2 className="w-5 h-5" />
                <span className="font-medium">For Employers</span>
              </Link>
            )}

            {/* Mobile Auth Buttons */}
            {!session && (
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                <Link
                  href="/auth/signin"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-all duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 transition-all duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile User Section */}
            {session && userRole && (
              <div className="pt-4 mt-4 border-t border-slate-100">
                <div className="px-4 py-3 mb-2 rounded-xl bg-gradient-to-r from-brand-50 to-slate-50">
                  <p className="font-semibold text-slate-800">{session.user?.name}</p>
                  <p className="text-sm text-slate-500">{session.user?.email}</p>
                </div>
                <div className="space-y-1">
                  {ROLE_DROPDOWN[userRole]?.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-all duration-200"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 mt-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            )}

          </div>

        </div>
      )}
    </header>
  );
}
