import Link from "next/link"

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

import { deleteJobAction, updateJobStatusAction } from "./actions"

export default async function EmployerJobsPage(){
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Employer access required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>
              You need an employer account to manage jobs. Sign in with an
              employer profile or contact support to upgrade your account.
            </p>
            <Button asChild size="sm">
              <Link href="/auth/signin">Go to sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const company = await prisma.company.findUnique({
    where: { userId: session.user.id },
    include: {
      jobs: {
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!company) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Complete your company profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>
              Before posting and managing jobs, please set up your company
              profile.
            </p>
            <Button asChild size="sm">
              <Link href="/employer">Go to employer setup</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10 space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Your jobs
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage the roles you&apos;ve posted on HireHub.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/employer/jobs/new">Post new job</Link>
        </Button>
      </div>

      {company.jobs.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-sm text-slate-600">
            You haven&apos;t posted any jobs yet. Use the &quot;Post new job&quot;
            button to create your first listing.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {company.jobs.map((job) => (
            <Card
              key={job.id}
              className="transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div>
                  <CardTitle className="text-base font-semibold">
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="hover:underline"
                    >
                      {job.title}
                    </Link>
                  </CardTitle>
                  <p className="text-xs text-slate-500">
                    Posted {job.createdAt.toLocaleDateString()} •{" "}
                    {job.location}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant="outline"
                    className="text-[11px] uppercase tracking-wide"
                  >
                    {job.status}
                  </Badge>
                  <Badge variant="secondary" className="text-[11px] uppercase">
                    {job.jobType.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm text-slate-700 md:flex-row md:items-center md:justify-between">
                <p className="line-clamp-2 max-w-2xl">{job.description}</p>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/employer/jobs/${job.id}/edit`}>Edit</Link>
                  </Button>
                  <form action={updateJobStatusAction}>
                    <input type="hidden" name="jobId" value={job.id} />
                    <select
                      name="status"
                      defaultValue={job.status}
                      className="w-32 rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="ACTIVE">Active</option>
                      <option value="EXPIRED">Expired</option>
                    </select>
                  </form>
                  <form action={deleteJobAction}>
                    <input type="hidden" name="jobId" value={job.id} />
                    <Button
                      type="submit"
                      size="sm"
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

