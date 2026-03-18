"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { JobFilterSidebar } from "@/components/ui/job-filter-sidebar"
import { JobCard, type JobCardProps } from "@/components/ui/job-card"
import { SearchInput } from "@/components/ui/search-input"
import { NoJobsFound } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { FilterChip } from "@/components/ui/filter-chip"
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
  const [filtersOpen, setFiltersOpen] = React.useState(false)
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
    <div className="min-h-screen bg-background">
      <div className="flex">
        <JobFilterSidebar
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onLocationSearch={setLocationSearch}
          className="hidden lg:block"
        />

        <div className="flex-1">
          <section className="border-b bg-gradient-to-r from-brand-50/70 via-background to-accent/10">
            <div className="container-app flex flex-col gap-6 py-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                    HireHub Jobs
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold text-foreground">
                    Browse jobs built for you
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {total > 0
                      ? `${total.toLocaleString()} opportunities available`
                      : "Find the right role for your next move"}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <SearchInput
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onClear={() => setQuery("")}
                    placeholder="Search jobs, companies..."
                    variant="compact"
                  />
                  <Button
                    variant="outline"
                    className="lg:hidden"
                    onClick={() => setFiltersOpen(true)}
                  >
                    Filters
                  </Button>
                </div>
              </div>

              {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Active filters
                  </span>
                  {activeFilters.map((filter) => (
                    <FilterChip
                      key={filter}
                      label={filter.replace(":", ": ").replace(/_/g, " ")}
                      removable
                      onRemove={() =>
                        handleFilterChange(activeFilters.filter((item) => item !== filter))
                      }
                    />
                  ))}
                  <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                    Clear
                  </Button>
                </div>
              )}
            </div>
          </section>

          <div className="container-app py-8">
            {error && (
              <div className="mb-6 rounded-lg border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
                {error}
              </div>
            )}

            {isLoading && jobs.length === 0 ? (
              <div className="flex min-h-[240px] items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
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

      {filtersOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setFiltersOpen(false)}
        >
          <div
            className="absolute inset-y-0 left-0 w-full max-w-sm bg-background shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <JobFilterSidebar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onLocationSearch={setLocationSearch}
              mode="panel"
              onClose={() => setFiltersOpen(false)}
              className="h-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}
