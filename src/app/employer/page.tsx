import { notFound } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CompanyForm } from "./company-form"
import Link from "next/link"
import { Plus, Briefcase, Users, TrendingUp } from "lucide-react"

export default async function EmployerDashboardPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    notFound()
  }

  const [company, stats] = await Promise.all([
    prisma.company.findUnique({
      where: { userId: session.user.id },
    }),
    prisma.job.groupBy({
      by: ["status"],
      where: { company: { userId: session.user.id } },
      _count: true,
    }),
  ])

  const totalJobs = stats.reduce((acc, s) => acc + s._count, 0)
  const activeJobs = stats.find((s) => s.status === "ACTIVE")?._count ?? 0

  const recentJobs = await prisma.job.findMany({
    where: { company: { userId: session.user.id } },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      _count: {
        select: { applications: true },
      },
    },
  })

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back{company ? `, ${company.name}` : ""}!
          </p>
        </div>
        {company && (
          <Button asChild>
            <Link href="/employer/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              Post a Job
            </Link>
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">Jobs posted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs}</div>
            <p className="text-xs text-muted-foreground">Live listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentJobs.reduce((acc, job) => acc + job._count.applications, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Received</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Company Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {company ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-2xl font-bold text-primary">
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
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {company.location || "No location set"}
                    </p>
                  </div>
                </div>
                {company.description && (
                  <p className="text-sm text-muted-foreground">
                    {company.description}
                  </p>
                )}
                <CompanyForm
                  company={company}
                  initialState={{}}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Create your company profile to start posting jobs.
                </p>
                <CompanyForm company={null} initialState={{}} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Jobs</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/employer/jobs">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentJobs.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No jobs posted yet. Post your first job to get started.
              </p>
            ) : (
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.location} • {job._count.applications} applications
                      </p>
                    </div>
                    <Badge
                      variant={
                        job.status === "ACTIVE"
                          ? "default"
                          : job.status === "PENDING"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
