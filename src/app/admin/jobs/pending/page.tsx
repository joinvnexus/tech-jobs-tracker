import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { JobApprovalActions } from "./job-approval-actions"
import { format } from "date-fns"
import Link from "next/link"

export default async function AdminPendingJobsPage() {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/")
  }

  const jobs = await prisma.job.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      company: {
        select: {
          name: true,
          logoUrl: true,
        },
      },
      _count: {
        select: {
          applications: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pending Job Approvals</h1>
          <p className="text-muted-foreground">Review and approve job postings</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin">Back to Dashboard</Link>
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No pending jobs to review</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {job.company.name} • {job.location}
                    </p>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm font-medium">Job Type</p>
                    <p className="text-sm text-muted-foreground">{job.jobType.replace("_", " ")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm text-muted-foreground">{job.experienceLevel || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Salary</p>
                    <p className="text-sm text-muted-foreground">{job.salaryRange || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Applications</p>
                    <p className="text-sm text-muted-foreground">{job._count.applications}</p>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-medium">Description</p>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
                    {job.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Posted on {format(new Date(job.createdAt), "MMMM d, yyyy")}
                  </p>
                  <JobApprovalActions jobId={job.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
