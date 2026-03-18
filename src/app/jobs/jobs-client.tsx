"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { JobFilterSidebar } from "@/components/ui/job-filter-sidebar"
import { JobCard, type JobCardProps } from "@/components/ui/job-card"
import { SearchInput } from "@/components/ui/search-input"
import { NoJobsFound } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ApiJob {
  id: string
  slug: string
  title: string
  location: string
  salaryRange?: string | null
  jobType: string
  createdAt: string
  status?: "ACTIVE" | "PENDING" | "CLOSED"
  views?: number
  company?: {
    name: string
    logo?: string | null
  }
}

interface ApiResponse {
  items: ApiJob[]
  total: number
  page: number
  pageSize: number
}

const JOB_TYPE_OPTIONS = [
  { id: "full-time", label: "Full Time", value: "type:FULL_TIME" },
  { id: "part-time", label: "Part Time", value: "type:PART_TIME" },
  { id: "contract", label: "Contract", value: "type:CONTRACT" },
  { id: "internship", label: "Internship", value: "type:INTERNSHIP" },
  { id: "remote", label: "Remote", value: "type:REMOTE" },
]

const LOCATION_OPTIONS = [
  { id: "dhaka", label: "Dhaka", value: "location:Dhaka" },
  { id: "chittagong", label: "Chittagong", value: "location:Chittagong" },
  { id: "khulna", label: "Khulna", value: "location:Khulna" },
  { id: "rajshahi", label: "Rajshahi", value: "location:Rajshahi" },
  { id: "sylhet", label: "Sylhet", value: "location:Sylhet" },
]

const SALARY_OPTIONS = [
  { id: "under-50k", label: "Under 50k", value: "salary:0-50000" },
  { id: "50k-100k", label: "50k - 100k", value: "salary:50000-100000" },
  { id: "100k-200k", label: "100k - 200k", value: "salary:100000-200000" },
  { id: "200k+", label: "200k+", value: "salary:200000+" },
]

const EXPERIENCE_OPTIONS = [
  { id: "entry", label: "Entry Level", value: "exp:entry" },
  { id: "mid", label: "Mid Level", value: "exp:mid" },
  { id: "senior", label: "Senior", value: "exp:senior" },
  { id: "lead", label: "Lead", value: "exp:lead" },
]

export function JobsClient() {
  const [jobs, setJobs] = React.useState<JobCardProps[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [query, setQuery] = React.useState("")
  const [activeFilters, setActiveFilters] = React.useState<string[]>([])
  const [locationSearch, setLocationSearch] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [total, setTotal] = React.useState(0)
  const pageSize = 10

  const selectedType = React.useMemo(() => {
    const typeFilter = activeFilters.find((filter) => filter.startsWith("type:"))
    return typeFilter ? typeFilter.replace("type:", "") : undefined
  }, [activeFilters])

  const selectedLocation = React.useMemo(() => {
    const locationFilter = activeFilters.find((filter) => filter.startsWith("location:"))
    return locationFilter ? locationFilter.replace("location:", "") : undefined
  }, [activeFilters])

  const filteredLocations = React.useMemo(() => {
    if (!locationSearch.trim()) {
      return LOCATION_OPTIONS
    }
    const needle = locationSearch.trim().toLowerCase()
    return LOCATION_OPTIONS.filter((option) => option.label.toLowerCase().includes(needle))
  }, [locationSearch])

  const filters = React.useMemo(() => {
    return {
      location: filteredLocations,
      jobType: JOB_TYPE_OPTIONS,
      salary: SALARY_OPTIONS,
      experience: EXPERIENCE_OPTIONS,
      remote: ["true", "false"],
    }
  }, [filteredLocations])

  const fetchJobs = React.useCallback(
    async ({ nextPage, append }: { nextPage: number; append: boolean }) => {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (query.trim()) params.set("q", query.trim())
      if (selectedLocation) params.set("location", selectedLocation)
      if (selectedType) params.set("type", selectedType)
      params.set("page", String(nextPage))
      params.set("pageSize", String(pageSize))

      try {
        const response = await fetch(`/api/jobs?${params.toString()}`)
        if (!response.ok) {
          throw new Error("Failed to fetch jobs")
        }

        const data: ApiResponse = await response.json()
        const mapped = data.items.map((job) => ({
          id: job.id,
          slug: job.slug,
          title: job.title,
          company: {
            name: job.company?.name ?? "Company",
            logo: job.company?.logo ?? null,
          },
          location: job.location,
          salaryRange: job.salaryRange,
          jobType: job.jobType,
          createdAt: new Date(job.createdAt),
          status: job.status,
          views: job.views,
        }))

        setJobs((prev) => (append ? [...prev, ...mapped] : mapped))
        setTotal(data.total)
        setPage(data.page)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      } finally {
        setIsLoading(false)
      }
    },
    [pageSize, query, selectedLocation, selectedType]
  )

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      void fetchJobs({ nextPage: 1, append: false })
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [fetchJobs])

  const hasMore = jobs.length < total

  const handleFilterChange = (nextFilters: string[]) => {
    setActiveFilters(nextFilters)
  }

  const handleClearFilters = () => {
    setActiveFilters([])
  }

  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="flex">
        <JobFilterSidebar
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onLocationSearch={setLocationSearch}
          className="hidden lg:block"
        />

        <div className="flex-1">
          {/* Header */}
          <div className="border-b bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Browse Jobs</h1>
                <p className="mt-1 text-sm text-slate-500">
                  {total > 0 ? `${total.toLocaleString()} opportunities available` : "Find the right role for you"}
                </p>
              </div>
              <SearchInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onClear={() => setQuery("")}
                placeholder="Search jobs, companies..."
              />
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-6xl px-4 py-8">
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {isLoading && jobs.length === 0 ? (
              <div className="flex min-h-[240px] items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : jobs.length === 0 ? (
              <NoJobsFound onClearFilters={handleClearFilters} />
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  className={cn("min-w-[160px]", isLoading && "opacity-70")}
                  onClick={() => void fetchJobs({ nextPage: page + 1, append: true })}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
