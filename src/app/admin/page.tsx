import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  Users, 
  Briefcase, 
  FileText, 
  Clock, 
  CheckCircle, 
  // XCircle,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Building2,
  UserCheck,
  UserPlus
} from "lucide-react"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/")
  }

  const [
    totalUsers,
    totalJobs,
    totalApplications,
    pendingJobs,
    activeJobs,
    seekerCount,
    employerCount,
    recentApplications,
    recentJobs,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.job.count(),
    prisma.jobApplication.count(),
    prisma.job.count({ where: { status: "PENDING" } }),
    prisma.job.count({ where: { status: "ACTIVE" } }),
    prisma.user.count({ where: { role: "SEEKER" } }),
    prisma.user.count({ where: { role: "EMPLOYER" } }),
    prisma.jobApplication.findMany({
      take: 5,
      orderBy: { appliedAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        job: {
          select: {
            title: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.job.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        company: true,
      },
    }),
  ])

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      APPLIED: "bg-blue-100 text-blue-700 border-blue-200",
      REVIEWED: "bg-purple-100 text-purple-700 border-purple-200",
      SHORTLISTED: "bg-green-100 text-green-700 border-green-200",
      REJECTED: "bg-red-100 text-red-700 border-red-200",
      HIRED: "bg-brand-100 text-brand-700 border-brand-200",
    }
    return variants[status] || "bg-slate-100 text-slate-700 border-slate-200"
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 pb-16 pt-8">
        <div className="container max-w-7xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                Admin Dashboard 👋
              </h1>
              <p className="mt-1 text-orange-100">
                Manage your HireHub platform and monitor activity.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="admin" className="shadow-lg shadow-orange-500/25">
                <Link href="/admin/users">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl px-4 -mt-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Jobs</p>
                <p className="text-2xl font-bold text-slate-900">{totalJobs}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Applications</p>
                <p className="text-2xl font-bold text-slate-900">{totalApplications}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Jobs</p>
                <p className="text-2xl font-bold text-slate-900">{pendingJobs}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Row */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                <UserCheck className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500">Job Seekers</p>
                <p className="text-lg font-semibold text-slate-900">{seekerCount}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500">Employers</p>
                <p className="text-lg font-semibold text-slate-900">{employerCount}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500">Active Jobs</p>
                <p className="text-lg font-semibold text-slate-900">{activeJobs}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg shadow-slate-200/60">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900">Recent Applications</CardTitle>
                  <CardDescription className="text-slate-500">Latest job applications across the platform</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {recentApplications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                      <FileText className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900">No applications yet</h3>
                    <p className="mt-1 text-sm text-slate-500">Applications will appear here</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {recentApplications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50/50">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white font-semibold text-sm">
                            {app.user.name?.charAt(0) || app.user.email?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {app.user.name || app.user.email}
                            </p>
                            <p className="text-sm text-slate-500">
                              Applied for {app.job.title} at {app.job.company.name}
                            </p>
                          </div>
                        </div>
                        <Badge className={`text-xs ${getStatusBadge(app.status)}`}>
                          {app.status.toLowerCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Jobs */}
            <Card className="mt-6 border-0 shadow-lg shadow-slate-200/60">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900">Recent Job Postings</CardTitle>
                  <CardDescription className="text-slate-500">Newest jobs added to the platform</CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                  <Link href="/admin/jobs/pending">
                    View pending <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {recentJobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-sm text-slate-500">No jobs posted yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {recentJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50/50">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold text-sm">
                            {job.company?.name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{job.title}</p>
                            <p className="text-sm text-slate-500">{job.company?.name} • {job.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {job.status === "ACTIVE" && (
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Active
                            </Badge>
                          )}
                          {job.status === "PENDING" && (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                              <AlertCircle className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                          {job.status === "EXPIRED" && (
                            <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-xs">
                              Expired
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg shadow-slate-200/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingJobs > 0 ? (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 border border-amber-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{pendingJobs} Pending Jobs</p>
                      <p className="text-xs text-slate-500">Awaiting approval</p>
                    </div>
                    <Button asChild variant="admin" size="sm">
                      <Link href="/admin/jobs/pending">Review</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">All caught up!</p>
                      <p className="text-xs text-slate-500">No pending approvals</p>
                    </div>
                  </div>
                )}

                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/users">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/jobs/pending">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Job Approvals
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Platform Stats */}
            <Card className="border-0 shadow-lg shadow-slate-200/60 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Platform Stats</p>
                    <p className="text-xs text-orange-200">Overview</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-100">User Growth</span>
                    <span className="font-medium">+12%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-100">Active Jobs</span>
                    <span className="font-medium">{activeJobs}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-100">Applications</span>
                    <span className="font-medium">{totalApplications}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
