import { redirect } from "next/navigation"
import { 
  User, 
  Building2, 
  Shield, 
  Bell, 
  Lock, 
  Save,
  UserCircle,
  Settings,
  AlertCircle
} from "lucide-react"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  // Fetch user data with profile and company
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: true,
      company: true,
    },
  })

  if (!user) {
    redirect("/auth/signin")
  }

  const isSeeker = user.role === "SEEKER"
  const isEmployer = user.role === "EMPLOYER"
  const isAdmin = user.role === "ADMIN"

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-5xl py-4 md:py-6 px-4">
          <div className="flex items-center gap-4">
            <Avatar 
              src={user.image} 
              alt={user.name || "User"} 
              fallback={user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
              size="lg"
              className="shrink-0"
            />
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Settings
              </h1>
              <p className="text-sm text-slate-500">
                Manage your account and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl py-6 md:py-8 px-4">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar Navigation */}
          <div className="space-y-1">
            <nav className="lg:sticky lg:top-6 space-y-1">
              {/* Profile Section */}
              <div className="px-3 py-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {isEmployer ? "Company" : "Personal"}
                </p>
              </div>
              <a 
                href={isEmployer ? "/employer" : "/profile"}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-900 bg-slate-100"
              >
                {isEmployer ? (
                  <Building2 className="h-5 w-5 text-purple-600" />
                ) : (
                  <UserCircle className="h-5 w-5 text-teal-600" />
                )}
                {isEmployer ? "Company Profile" : "My Profile"}
              </a>

              {/* Account Section */}
              <div className="px-3 py-2 mt-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Account
                </p>
              </div>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                <Settings className="h-5 w-5" />
                Account Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                <Bell className="h-5 w-5" />
                Notifications
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                <Shield className="h-5 w-5" />
                Security
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4 border-b bg-slate-50/50">
                <CardTitle className="text-lg flex items-center gap-2">
                  {isEmployer ? (
                    <>
                      <Building2 className="h-5 w-5 text-purple-600" />
                      Company Profile
                    </>
                  ) : (
                    <>
                      <UserCircle className="h-5 w-5 text-teal-600" />
                      My Profile
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {isEmployer 
                    ? "Manage your company information and details" 
                    : "Tell employers about yourself to get better job matches"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isEmployer ? (
                  <CompanyProfileForm company={user.company} />
                ) : (
                  <SeekerProfileForm user={user} profile={user.profile} />
                )}
              </CardContent>
            </Card>

            {/* Account Info Card */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-slate-600" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
                      <User className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Account Type</p>
                      <p className="text-sm text-slate-500">{user.role}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${user.role === "SEEKER" ? "text-teal-600 border-teal-200 bg-teal-50" : ""}
                      ${user.role === "EMPLOYER" ? "text-purple-600 border-purple-200 bg-purple-50" : ""}
                      ${user.role === "ADMIN" ? "text-orange-600 border-orange-200 bg-orange-50" : ""}
                    `}
                  >
                    {user.role === "SEEKER" && "Job Seeker"}
                    {user.role === "EMPLOYER" && "Employer"}
                    {user.role === "ADMIN" && "Administrator"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <Input value={user.email} disabled className="bg-slate-50" />
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Contact email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Account Status</label>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <span className="mr-1">●</span>
                      Active
                    </Badge>
                    <span className="text-sm text-slate-500">
                      Joined {user.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-slate-600" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {[
                  { id: "email", label: "Email notifications", description: "Receive updates via email", enabled: true },
                  { id: "jobs", label: "New job alerts", description: "Get notified about new jobs matching your preferences", enabled: true },
                  { id: "applications", label: "Application updates", description: "Updates on your job applications", enabled: true },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                    <div>
                      <p className="font-medium text-slate-900">{item.label}</p>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                    <button
                      type="button"
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        item.enabled ? "bg-green-500" : "bg-slate-200"
                      }`}
                    >
                      <span 
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          item.enabled ? "translate-x-5" : "translate-x-0.5"
                        }`} 
                      />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-slate-600" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Current Password</label>
                  <Input type="password" placeholder="Enter current password" className="max-w-md" />
                </div>
                <div className="grid gap-3 md:grid-cols-2 max-w-md">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">New Password</label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <div className="flex justify-start pt-2">
                  <Button className="bg-slate-900 hover:bg-slate-800">
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Seeker Profile Form
function SeekerProfileForm({ 
  user, 
  profile 
}: { 
  user: { name: string | null; email: string }
  profile: { title: string | null; phone: string | null; bio: string | null; skills: string[] } | null 
}) {
  return (
    <form className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <Input defaultValue={user.name || ""} placeholder="Your full name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Professional Headline</label>
          <Input defaultValue={profile?.title || ""} placeholder="e.g. Senior React Engineer" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Phone</label>
        <Input defaultValue={profile?.phone || ""} placeholder="+880 1XXXXXXXXX" className="max-w-md" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">About You</label>
        <Textarea 
          defaultValue={profile?.bio || ""} 
          rows={4}
          placeholder="Tell employers about your background and strengths..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Skills</label>
        <Textarea 
          defaultValue={profile?.skills?.join(", ") || ""} 
          rows={2}
          placeholder="React, TypeScript, Node.js, PostgreSQL..."
        />
        <p className="text-xs text-slate-500">Comma-separated list of skills</p>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </form>
  )
}

// Company Profile Form
function CompanyProfileForm({ 
  company 
}: { 
  company: { 
    name: string
    slug: string
    description: string | null
    website: string | null
    location: string | null
  } | null 
}) {
  if (!company) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">No company profile found.</p>
        <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700">
          <a href="/employer">Create Company</a>
        </Button>
      </div>
    )
  }

  return (
    <form className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Company Name</label>
          <Input defaultValue={company.name} placeholder="Your company name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">URL Slug</label>
          <Input defaultValue={company.slug} placeholder="company-url-slug" className="font-mono text-sm" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Description</label>
        <Textarea 
          defaultValue={company.description || ""} 
          rows={4}
          placeholder="Tell candidates about your company..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Website</label>
          <Input defaultValue={company.website || ""} placeholder="https://your-website.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Location</label>
          <Input defaultValue={company.location || ""} placeholder="Dhaka, Bangladesh" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </form>
  )
}
