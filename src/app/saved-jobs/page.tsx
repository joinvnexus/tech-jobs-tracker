import Link from "next/link"
import { redirect } from "next/navigation"
import { 
  Bookmark, 
  MapPin, 
  BriefcaseBusiness,
  Clock,
} from "lucide-react"

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
import { formatDistanceToNow } from "date-fns"

export default async function SavedJobsPage() {
  const session = await auth()

  // Enforce SEEKER role - only job seekers can view saved jobs
  if (!session?.user || session.user.role !== "SEEKER") {
    redirect("/")
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
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 pb-12 pt-8">
        <div className="container max-w-4xl px-4">
          <h1 className="text-2xl font-bold text-white md:text-3xl">
            Saved Jobs
          </h1>
          <p className="mt-1 text-brand-100">
            Jobs you&apos;ve saved to review or apply later.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl px-4 -mt-6">
        {saved.length === 0 ? (
          <Card className="border-0 shadow-lg shadow-slate-200/60">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Bookmark className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No saved jobs yet</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-sm">
                Save jobs that interest you and they will appear here for easy access.
              </p>
              <Button asChild variant="seeker" size="sm" className="mt-6">
                <Link href="/jobs">
                  Browse Jobs
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {saved.map((item) => (
              <Card 
                key={item.id} 
                className="border-0 shadow-lg shadow-slate-200/60 transition-all hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-white font-bold text-lg flex-shrink-0">
                        {item.job.company?.name?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <Link 
                          href={`/jobs/${item.job.slug}`}
                          className="text-lg font-semibold text-slate-900 hover:text-brand-600 transition-colors"
                        >
                          {item.job.title}
                        </Link>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {item.job.company?.name}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {item.job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <BriefcaseBusiness className="h-4 w-4" />
                            {item.job.jobType}
                          </span>
                          {item.job.salaryRange && (
                            <span className="text-green-600 font-medium">
                              {item.job.salaryRange}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 md:items-end">
                      <div className="flex items-center gap-2">
                        {item.job.status === "ACTIVE" && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            Active
                          </Badge>
                        )}
                        {item.job.status === "PENDING" && (
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                            Pending
                          </Badge>
                        )}
                        {item.job.status === "EXPIRED" && (
                          <Badge className="bg-slate-100 text-slate-700 border-slate-200">
                            Expired
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Saved {formatDistanceToNow(item.savedAt, { addSuffix: true })}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 mt-2">
                        <Button asChild size="sm" variant="seeker">
                          <Link href={`/jobs/${item.job.slug}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/jobs/${item.job.slug}/apply`}>
                            Apply Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
