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

export default async function ApplicationsPage() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sign in required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>You need to be signed in to view your applications.</p>
            <Button asChild size="sm">
              <Link href="/auth/signin">Go to sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const applications = await prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
    orderBy: { appliedAt: "desc" },
  })

  return (
    <div className="container py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          My applications
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Track the status of jobs you&apos;ve applied to via HireHub.
        </p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-sm text-slate-600">
            You haven&apos;t applied to any jobs yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div>
                  <CardTitle className="text-base font-semibold">
                    <Link
                      href={`/jobs/${app.job.slug}`}
                      className="hover:underline"
                    >
                      {app.job.title}
                    </Link>
                  </CardTitle>
                  <p className="text-xs text-slate-500">
                    {app.job.company?.name} • {app.job.location}
                  </p>
                </div>
                <Badge variant="outline" className="text-[11px] uppercase">
                  {app.status}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm text-slate-700 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-slate-500">
                  Applied on {app.appliedAt.toLocaleDateString()}
                </p>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/jobs/${app.job.slug}`}>View job</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

