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

export default async function SavedJobsPage() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sign in required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>You need to be signed in to view saved jobs.</p>
            <Button asChild size="sm">
              <Link href="/auth/signin">Go to sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const saved = await prisma.savedJob.findMany({
    where: { userId: session.user.id },
    include: {
      job: {
        include: { company: true },
      },
    },
    orderBy: { savedAt: "desc" },
  })

  return (
    <div className="container py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Saved jobs
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Jobs you&apos;ve saved to review or apply later.
        </p>
      </div>

      {saved.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-sm text-slate-600">
            You haven&apos;t saved any jobs yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {saved.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div>
                  <CardTitle className="text-base font-semibold">
                    <Link
                      href={`/jobs/${item.job.slug}`}
                      className="hover:underline"
                    >
                      {item.job.title}
                    </Link>
                  </CardTitle>
                  <p className="text-xs text-slate-500">
                    {item.job.company?.name} • {item.job.location}
                  </p>
                </div>
                <Badge variant="outline" className="text-[11px] uppercase">
                  {item.job.status}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm text-slate-700 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-slate-500">
                  Saved on {item.savedAt.toLocaleDateString()}
                </p>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/jobs/${item.job.slug}`}>View job</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

