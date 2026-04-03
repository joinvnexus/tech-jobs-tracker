import { notFound } from "next/navigation"
import Link from "next/link"
import { 
  Plus, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Building2,
  MapPin,
  Eye,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CompanyForm } from "./company-form"

export default async function EmployerDashboardPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    notFound()
  }

  // Fetch company and stats in parallel
  const [company, stats, recentJobs] = await Promise.all([
    prisma.company.findUnique({
      where: { userId: session.user.id },
    }),
    prisma.job.groupBy({
      by: ["status"],
      where: { company: { userId: session.user.id } },
      _count: true,
    }),
    prisma.job.findMany({
      where: { company: { userId: session.user.id } },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        _count: {
          select: { applications: true },
        },
      },
    })
  ])

  const totalJobs = stats.reduce((acc, s) => acc + s._count, 0)
  const activeJobs = stats.find((s) => s.status === "ACTIVE")?._count ?? 0
  const pendingJobs = stats.find((s) => s.status === "PENDING")?._count ?? 0
  const totalApplications = recentJobs.reduce((acc, job) => acc + job._count.applications, 0)

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-employer-600 via-employer-700 to-employer-800 pb-16 pt-8">
        <div className="container max-w-7xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                Welcome back{company ? `, ${company.name}` : ""}! 👋
              </h1>
              <p className="mt-1 text-employer-100">
                Manage your job postings and candidates in one place.
              </p>
            </div>
            <div className="flex gap-3">
              {company && (
                <Button asChild variant="employer" className="shadow-lg shadow-employer-500/25">
                  <Link href="/employer/jobs/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Post a Job
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl px-4 -mt-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-employer-100 text-employer-600">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold text-foreground">{totalJobs}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <p className="text-2xl font-bold text-foreground">{activeJobs}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold text-foreground">{pendingJobs}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10 text-info">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold text-foreground">{totalApplications}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">Recent Job Postings</CardTitle>
                  <CardDescription className="text-muted-foreground">Track your latest job listings and applications</CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-employer-600 hover:text-employer-700">
                  <Link href="/employer/jobs">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {recentJobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">No jobs posted yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Post your first job to start receiving applications</p>
                    <Button asChild variant="employer" size="sm" className="mt-4">
                      <Link href="/employer/jobs/new">Post a Job</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {recentJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-employer-400 to-employer-600 text-white font-semibold text-sm">
                            {company?.name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <Link 
                              href={`/employer/jobs/${job.id}/applications`}
                              className="font-medium text-foreground hover:text-employer-600 transition-colors"
                            >
                              {job.title}
                            </Link>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-0.5">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5">
                                <Users className="h-3 w-3" />
                                {job._count.applications} applications
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {job.status === "ACTIVE" && (
                            <Badge variant="success" className="text-xs">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Active
                            </Badge>
                          )}
                          {job.status === "PENDING" && (
                            <Badge variant="warning" className="text-xs">
                              <AlertCircle className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                          {job.status === "EXPIRED" && (
                            <Badge variant="secondary" className="text-xs">
                              Expired
                            </Badge>
                          )}
                          <Button asChild size="sm" variant="outline" className="ml-2">
                            <Link href={`/employer/jobs/${job.id}/applications`}>
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-employer-100 text-employer-600">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Post New Job</h3>
                    <p className="text-sm text-muted-foreground">Create a new job listing</p>
                  </div>
                  <Button asChild variant="employer" size="sm">
                    <Link href="/employer/jobs/new">Create</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-employer-100 text-employer-600">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Edit Company</h3>
                    <p className="text-sm text-muted-foreground">Update your company profile</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="#company">Edit</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Profile */}
            <Card className="border-0 shadow-lg" id="company">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Company Profile</CardTitle>
              </CardHeader>
              <CardContent>
                {company ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-employer-400 to-employer-600 text-white text-xl font-bold">
                        {company.logoUrl ? (
                          <img
                            src={company.logoUrl}
                            alt={company.name}
                            className="h-full w-full rounded-lg object-cover"
                          />
                        ) : (
                          company.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{company.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {company.location || "No location set"}
                        </p>
                      </div>
                    </div>
                    {company.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {company.description}
                      </p>
                    )}
                    <CompanyForm company={company} initialState={{}} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-employer/5 border border-employer/10">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-employer/10 text-employer-600">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Set up your company</p>
                        <p className="text-xs text-muted-foreground">Create a company profile</p>
                      </div>
                    </div>
                    <CompanyForm company={null} initialState={{}} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-employer-600 to-employer-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Hiring Tip</p>
                    <p className="text-xs text-employer-200">Boost your visibility</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  Jobs with detailed descriptions and salary ranges get 2x more quality applications.
                </p>
                <Button asChild size="sm" className="w-full bg-white text-employer-600 hover:bg-white/90">
                  <Link href="/employer/jobs/new">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
