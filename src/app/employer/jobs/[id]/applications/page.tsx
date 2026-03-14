import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

interface JobApplicationsPageProps {
  params: {
    id: string
  }
}

export default async function JobApplicationsPage({
  params,
}: JobApplicationsPageProps) {
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    notFound()
  }

  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      company: true,
      applications: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: { appliedAt: "desc" },
      },
    },
  })

  if (!job || !job.company || job.company.userId !== session.user.id) {
    notFound()
  }

  return (
    <div className="container py-10 space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Applicants – {job.title}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Review and track candidates who applied to this job.
          </p>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href="/employer/jobs">Back to jobs</Link>
        </Button>
      </div>

      {job.applications.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-sm text-slate-600">
            No applications yet for this job.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {job.applications.map((app) => (
            <Card key={app.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div>
                  <CardTitle className="text-base font-semibold">
                    {app.user.name ?? app.user.email}
                  </CardTitle>
                  <p className="text-xs text-slate-500">
                    Applied on {app.appliedAt.toLocaleDateString()}
                  </p>
                  {app.user.profile?.title ? (
                    <p className="mt-1 text-xs text-slate-600">
                      {app.user.profile.title}
                    </p>
                  ) : null}
                </div>
                <Badge variant="outline" className="text-[11px] uppercase">
                  {app.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                {app.coverLetter ? (
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Cover letter
                    </p>
                    <p className="mt-1 whitespace-pre-line">
                      {app.coverLetter}
                    </p>
                  </div>
                ) : null}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View resume
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

