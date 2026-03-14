import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  BriefcaseBusiness, 
  Bookmark, 
  FileText, 
  TrendingUp, 
  Clock,
  MapPin,
  ArrowRight,
  // Eye,
  CheckCircle,
  // XCircle,
  // Loader2
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { formatDistanceToNow } from "date-fns"

export default async function JobSeekerDashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  // Get user stats
  const [applications, savedJobs, profile] = await Promise.all([
    prisma.jobApplication.findMany({
      where: { userId: session.user.id },
      select: { status: true }
    }),
    prisma.savedJob.findMany({
      where: { userId: session.user.id },
      select: { id: true }
    }),
    prisma.userProfile.findUnique({
      where: { userId: session.user.id }
    })
  ])

  const stats = {
    totalApplications: applications.length,
    pending: applications.filter(a => a.status === "APPLIED").length,
    reviewed: applications.filter(a => a.status === "REVIEWED").length,
    shortlisted: applications.filter(a => a.status === "SHORTLISTED").length,
    rejected: applications.filter(a => a.status === "REJECTED").length,
    savedJobs: savedJobs.length,
    profileComplete: profile ? (profile.bio && profile.skills && profile.resumeUrl ? true : false) : false
  }

  // Get recent applications with job details
  const recentApplications = await prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    include: {
      job: {
        include: { company: true }
      }
    },
    orderBy: { appliedAt: "desc" },
    take: 5
  })

  // Get saved jobs
  const savedJobsList = await prisma.savedJob.findMany({
    where: { userId: session.user.id },
    include: {
      job: {
        include: { company: true }
      }
    },
    orderBy: { savedAt: "desc" },
    take: 5
  })

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get recommended jobs (active jobs from last 7 days)
  const recommendedJobs = await prisma.job.findMany({
    where: {
      status: "ACTIVE",
      createdAt: {
        gte: sevenDaysAgo
      }
    },
    include: { company: true },
    orderBy: { createdAt: "desc" },
    take: 5
  })

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
      <div className="bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 pb-16 pt-8">
        <div className="container max-w-7xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                Welcome back, {session.user.name?.split(' ')[0] || 'Job Seeker'}! 👋
              </h1>
              <p className="mt-1 text-brand-100">
                Find your dream job and track your applications in one place.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="seeker" className="shadow-lg shadow-brand-500/25">
                <Link href="/jobs">
                  <BriefcaseBusiness className="mr-2 h-4 w-4" />
                  Browse Jobs
                </Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-0">
                <Link href="/profile">
                  <FileText className="mr-2 h-4 w-4" />
                  Edit Profile
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Applications</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalApplications}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Applied</p>
                <p className="text-2xl font-bold text-slate-900">{stats.pending}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Shortlisted</p>
                <p className="text-2xl font-bold text-slate-900">{stats.shortlisted}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Bookmark className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Saved Jobs</p>
                <p className="text-2xl font-bold text-slate-900">{stats.savedJobs}</p>
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
                  <CardDescription className="text-slate-500">Track your latest job applications</CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-brand-600 hover:text-brand-700">
                  <Link href="/applications">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {recentApplications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                      <BriefcaseBusiness className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900">No applications yet</h3>
                    <p className="mt-1 text-sm text-slate-500">Start applying to jobs to see them here</p>
                    <Button asChild variant="seeker" size="sm" className="mt-4">
                      <Link href="/jobs">Browse Jobs</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {recentApplications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50/50">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-white font-semibold text-sm">
                            {app.job.company?.name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <Link 
                              href={`/jobs/${app.job.slug}`} 
                              className="font-medium text-slate-900 hover:text-brand-600 transition-colors"
                            >
                              {app.job.title}
                            </Link>
                            <p className="text-sm text-slate-500">{app.job.company?.name} • {app.job.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`text-xs ${getStatusBadge(app.status)}`}>
                            {app.status.toLowerCase()}
                          </Badge>
                          <span className="text-xs text-slate-400">
                            {formatDistanceToNow(app.appliedAt, { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommended Jobs */}
            <Card className="mt-6 border-0 shadow-lg shadow-slate-200/60">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900">Recommended Jobs</CardTitle>
                  <CardDescription className="text-slate-500">Fresh opportunities based on recent postings</CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-brand-600 hover:text-brand-700">
                  <Link href="/jobs">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {recommendedJobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-sm text-slate-500">No new job postings available</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {recommendedJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50/50">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-white font-semibold text-sm">
                            {job.company?.name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <Link 
                              href={`/jobs/${job.slug}`} 
                              className="font-medium text-slate-900 hover:text-brand-600 transition-colors"
                            >
                              {job.title}
                            </Link>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                              <span>{job.company?.name}</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {job.jobType}
                          </Badge>
                          <Button asChild size="sm" variant="seeker" className="ml-2">
                            <Link href={`/jobs/${job.slug}`}>Apply</Link>
                          </Button>
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
            {/* Profile Completion */}
            <Card className="border-0 shadow-lg shadow-slate-200/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Profile Strength</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Complete your profile</span>
                    <span className="font-medium text-slate-900">
                      {stats.profileComplete ? '100%' : '50%'}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all"
                      style={{ width: stats.profileComplete ? '100%' : '50%' }}
                    />
                  </div>
                  {!stats.profileComplete && (
                    <Button asChild variant="seeker" size="sm" className="w-full">
                      <Link href="/profile">Complete Profile</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Saved Jobs */}
            <Card className="border-0 shadow-lg shadow-slate-200/60">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base font-semibold">Saved Jobs</CardTitle>
                <Button asChild variant="ghost" size="sm" className="text-brand-600 h-auto p-0">
                  <Link href="/saved-jobs" className="text-xs">
                    View all
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {savedJobsList.length === 0 ? (
                  <p className="text-sm text-slate-500">No saved jobs yet</p>
                ) : (
                  <div className="space-y-3">
                    {savedJobsList.slice(0, 3).map((item) => (
                      <Link 
                        key={item.id}
                        href={`/jobs/${item.job.slug}`}
                        className="block rounded-lg border border-slate-100 p-3 transition-all hover:border-brand-200 hover:shadow-sm"
                      >
                        <p className="font-medium text-slate-900 text-sm line-clamp-1">{item.job.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.job.company?.name}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 shadow-lg shadow-slate-200/60 bg-gradient-to-br from-brand-500 to-brand-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Get Hired Faster</p>
                    <p className="text-xs text-brand-100">Complete your profile</p>
                  </div>
                </div>
                <p className="text-sm text-brand-50 mb-4">
                  Jobs with complete profiles get 3x more views from employers.
                </p>
                <Button asChild size="sm" className="w-full bg-white text-brand-600 hover:bg-brand-50">
                  <Link href="/profile">Update Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
