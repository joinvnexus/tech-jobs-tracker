"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Briefcase,
  Users,
  Building2,
  Settings,
  LayoutDashboard,
  Bookmark,
} from "lucide-react";
import { Session } from "next-auth";
import { handleSignOut } from "@/components/layout/navbar-actions";

interface HeaderClientProps {
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
    { href: "/saved-jobs", label: "Saved Jobs", icon: Bookmark },
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

export default function HeaderClient({ session }: HeaderClientProps) {
  const userRole = session?.user?.role as
    | "ADMIN"
    | "EMPLOYER"
    | "SEEKER"
    | undefined;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLink =
    "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200";

  const dropdownItem =
    "flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-gradient-to-r hover:from-primary/5 hover:to-background hover:text-primary transition-all duration-150";

  // Quick action links for logged in users
  const getQuickLinks = () => {
    if (!userRole) return [];
    
    switch (userRole) {
      case 'SEEKER':
        return [
          { href: "/jobs", label: "Browse Jobs", icon: Briefcase },
          { href: "/applications", label: "Applications", icon: Briefcase },
          { href: "/saved-jobs", label: "Saved", icon: Bookmark },
        ];
      case 'EMPLOYER':
        return [
          { href: "/employer/jobs/new", label: "Post Job", icon: Briefcase },
          { href: "/employer/jobs", label: "My Jobs", icon: Briefcase },
        ];
      case 'ADMIN':
        return [
          { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
          { href: "/admin/users", label: "Users", icon: Users },
        ];
      default:
        return [];
    }
  };

  const quickLinks = getQuickLinks();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-sm">
      <div className="mx-auto flex h-16 md:h-18 max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          </div>
          <span className="text-xl font-bold text-foreground">
            Hire<span className="text-brand-600">Hub</span>
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

          {/* Quick Links for logged in users */}
          {session && quickLinks.length > 0 && (
            <div className="hidden lg:flex items-center gap-1 mr-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5 inline mr-1" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Guest buttons */}
          {!session && (
            <>
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
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
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white text-sm font-semibold shadow-md">
                  {session.user?.name?.[0]?.toUpperCase() || "U"}
                </div>

                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 hidden md:block ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                  {/* User Info */}
                  <div className="px-4 py-3 bg-gradient-to-r from-muted/30 to-background border-b border-border">
                    <p className="text-sm font-semibold text-foreground truncate">{session.user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                    {userRole && (
                      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
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
                            <Icon className="w-4 h-4 text-muted-foreground" />
                            {item.label}
                          </Link>
                        );
                      })}
                  </div>

                  <div className="border-t border-border my-1"></div>

                  <div className="py-2">
  <Link
                      href={`/profile/${userRole?.toLowerCase()}`}
                      className={dropdownItem}
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      My Profile
                    </Link>

                    <Link
                      href="/settings"
                      className={dropdownItem}
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-border bg-muted/30">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
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
            className="md:hidden p-2.5 rounded-xl hover:bg-secondary/50 transition-colors"
          >
            {mobileOpen ? (
              <X size={20} className="text-foreground" />
            ) : (
              <Menu size={20} className="text-foreground" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-background/95 backdrop-blur-xl md:hidden shadow-lg animate-in slide-in-from-top duration-300">

          <div className="px-4 py-4 space-y-1">

            {PUBLIC_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            {/* Mobile Quick Links */}
            {session && quickLinks.length > 0 && (
              <div className="pt-2 mt-2 border-t border-border">
                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Access</p>
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {!session && (
              <Link
                href="/employer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                onClick={() => setMobileOpen(false)}
              >
                <Building2 className="w-5 h-5" />
                <span className="font-medium">For Employers</span>
              </Link>
            )}

            {/* Mobile Auth Buttons */}
            {!session && (
              <div className="pt-4 mt-4 border-t border-border space-y-2">
                <Link
                  href="/auth/signin"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary/50 transition-all duration-200"
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
              <div className="pt-4 mt-4 border-t border-border">
                <div className="px-4 py-3 mb-2 rounded-xl bg-gradient-to-r from-primary/5 to-muted/30">
                  <p className="font-semibold text-foreground">{session.user?.name}</p>
                  <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                </div>
                <div className="space-y-1">
                  {ROLE_DROPDOWN[userRole]?.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
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
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-destructive hover:bg-destructive/5 transition-all duration-200 mt-2"
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
