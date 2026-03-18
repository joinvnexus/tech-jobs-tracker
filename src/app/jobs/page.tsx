import Link from "next/link"
import { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { prisma } from "@/lib/prisma"
import { type Prisma } from "@prisma/client"
import { Search, MapPin, Briefcase, Clock, TrendingUp, Sparkles } from "lucide-react"

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
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 pb-16 pt-10">
        <div className="container max-w-5xl px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Find Your Dream Job Today
            </h1>
            <p className="text-brand-100 text-lg max-w-2xl mx-auto">
              Discover thousands of opportunities from top companies. Your next career move starts here.
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl px-4 -mt-8">
        {/* Search & Filter Card */}
        <Card className="border-0 shadow-xl shadow-slate-200/60 mb-8">
          <CardContent className="p-6">
            <form
              className="space-y-4"
              aria-label="Filter jobs"
            >
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  name="q"
                  defaultValue={searchParams.q}
                  placeholder="Job title, keywords, or company name..."
                  className="pl-10 h-12 text-base border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>

              {/* Filters Row */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    name="location"
                    defaultValue={searchParams.location}
                    placeholder="City or region"
                    className="pl-9 h-11"
                  />
                </div>
                <select
                  name="type"
                  defaultValue={searchParams.type}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">All Job Types</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="REMOTE">Remote</option>
                </select>
                <Button type="submit" size="lg" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search Jobs
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {searchParams.q || searchParams.location || searchParams.type ? 'Search Results' : 'Latest Jobs'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {total} {total === 1 ? 'job' : 'jobs'} available
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <TrendingUp className="w-4 h-4 text-brand-500" />
            <span>New jobs posted daily</span>
          </div>
        </div>

        {/* Jobs List */}
        <section className="space-y-4">
          {jobs.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <Briefcase className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No jobs found</h3>
                <p className="mt-1 text-sm text-slate-500 max-w-sm">
                  Try adjusting your search filters or check back later for new opportunities.
                </p>
                <Button asChild variant="seeker" className="mt-6">
                  <Link href="/jobs">Clear Filters</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <ul className="space-y-3">
              {jobs.map((job) => (
                <li key={job.id}>
                  <Card className="transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50 group">
                    <CardContent className="p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white font-bold text-lg flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                            {job.company?.name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <CardTitle className="text-base font-semibold">
                              <Link
                                href={`/jobs/${job.slug}`}
                                className="hover:text-brand-600 transition-colors"
                              >
                                {job.title}
                              </Link>
                            </CardTitle>
                            <p className="text-sm text-slate-600 mt-0.5">
                              {job.company?.name} • {job.location}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              <Badge variant="outline" className="text-[10px] uppercase font-medium">
                                {job.jobType.replace("_", " ")}
                              </Badge>
                              {job.salaryRange && (
                                <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                  {job.salaryRange}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end gap-3 ml-14 md:ml-0">
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Clock className="h-3 w-3" />
                            {job.createdAt.toLocaleDateString()}
                          </div>
                          <div className="flex gap-2">
                            <Button asChild size="sm" variant="outline" className="hover:border-brand-300 hover:text-brand-600">
                              <Link href={`/jobs/${job.slug}`}>View</Link>
                            </Button>
                            <Button asChild size="sm" variant="seeker">
                              <Link href={`/jobs/${job.slug}/apply`}>Apply</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
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
                ← Previous
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 text-sm">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    asChild
                    size="sm"
                    variant={pageNum === page ? "seeker" : "ghost"}
                    className="w-9"
                  >
                    <Link
                      href={{
                        pathname: "/jobs",
                        query: { ...searchParams, page: String(pageNum) },
                      }}
                    >
                      {pageNum}
                    </Link>
                  </Button>
                )
              })}
            </div>

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
                Next →
              </Link>
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-7 w-7" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Get Hired Faster</h3>
            <p className="text-brand-100 mb-6 max-w-md mx-auto">
              Complete your profile and upload your resume to stand out to employers and get more interview requests.
            </p>
            <Button asChild size="lg" className="bg-white text-brand-600 hover:bg-brand-50">
<Link href="/profile/seeker">
                Complete Your Profile
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
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
