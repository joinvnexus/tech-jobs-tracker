import Link from "next/link"
import { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { prisma } from "@/lib/prisma"
import { type Prisma } from "@prisma/client"

const PAGE_SIZE = 10

interface JobsPageProps {
  searchParams: {
    q?: string
    location?: string
    type?: string
    page?: string
  }
}

export const metadata: Metadata = {
  title: "Browse Jobs",
  description: "Search and find your next career opportunity. Browse thousands of jobs from top companies in Bangladesh and abroad.",
}

async function getJobs(searchParams: JobsPageProps["searchParams"]) {
  const page = Number(searchParams.page ?? "1")
  const skip = (page - 1) * PAGE_SIZE

  const where: Prisma.JobWhereInput = {
    status: "ACTIVE",
  }

  if (searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q, mode: "insensitive" } },
      { description: { contains: searchParams.q, mode: "insensitive" } },
      { company: { name: { contains: searchParams.q, mode: "insensitive" } } },
    ]
  }

  if (searchParams.location) {
    where.location = {
      contains: searchParams.location,
      mode: "insensitive",
    }
  }

  if (searchParams.type) {
    where.jobType = searchParams.type as never
  }

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.job.count({ where }),
  ])

  return { jobs, total, page }
}

export default async function JobsPage({
  searchParams,
}: JobsPageProps) {
  const { jobs, total, page } = await getJobs(searchParams)
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Browse jobs
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Filter by keywords, location, and job type to discover your next role.
          </p>
        </div>
        <Link href="/employer" className="text-sm text-primary hover:underline">
          Are you hiring? Post a job
        </Link>
      </div>

      <form
        className="mt-6 grid gap-3 rounded-xl border bg-card p-4 shadow-sm md:grid-cols-4"
        aria-label="Filter jobs"
      >
        <Input
          name="q"
          defaultValue={searchParams.q}
          placeholder="Keyword (e.g. React, Product Manager)"
          className="md:col-span-2"
        />
        <Input
          name="location"
          defaultValue={searchParams.location}
          placeholder="Location"
        />
        <select
          name="type"
          defaultValue={searchParams.type}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">All types</option>
          <option value="FULL_TIME">Full time</option>
          <option value="PART_TIME">Part time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="REMOTE">Remote</option>
        </select>
        <div className="flex gap-2 md:col-span-4 md:justify-end">
          <Button type="submit" size="sm">
            Apply filters
          </Button>
        </div>
      </form>

      <section className="mt-8 space-y-4">
        {jobs.length === 0 ? (
          <p className="text-sm text-slate-600">
            No jobs found. Try adjusting your filters.
          </p>
        ) : (
          <ul className="space-y-3">
            {jobs.map((job) => (
              <li key={job.id}>
                <Card className="transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
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
                      <p className="text-sm text-slate-600">
                        {job.company?.name} • {job.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="text-[11px] uppercase">
                        {job.jobType.replace("_", " ")}
                      </Badge>
                      {job.salaryRange ? (
                        <p className="text-xs font-medium text-emerald-600">
                          {job.salaryRange}
                        </p>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
                    <p className="line-clamp-2 max-w-2xl">{job.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">
                        Posted {job.createdAt.toDateString()}
                      </span>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/jobs/${job.slug}`}>View details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      {totalPages > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-4 text-sm">
          <span className="text-slate-600">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              disabled={page <= 1}
            >
              <Link
                href={{
                  pathname: "/jobs",
                  query: { ...searchParams, page: String(page - 1) },
                }}
              >
                Previous
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              disabled={page >= totalPages}
            >
              <Link
                href={{
                  pathname: "/jobs",
                  query: { ...searchParams, page: String(page + 1) },
                }}
              >
                Next
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function LoadingJobsList() {
  return (
    <div className="container py-10 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
}
