import Link from "next/link"
import { Search, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

const trendingSearches = ["React", "Node.js", "Product Manager", "UI/UX"] as const

interface HeroSectionProps {
  featuredJobs?: {
    id: string
    title: string
    company: string
    location: string
    type: string
    salary: string
    featured: boolean
  }[]
}

export function HeroSection({
  featuredJobs = [
    {
      id: "1",
      title: "Senior Frontend Engineer",
      company: "PixelCraft Labs",
      location: "Dhaka, Bangladesh",
      type: "FULL_TIME",
      salary: "BDT 180k - 220k / month",
      featured: true,
    },
    {
      id: "2",
      title: "Backend Engineer (Node.js)",
      company: "CloudScale",
      location: "Remote",
      type: "REMOTE",
      salary: "$3k - $4k / month",
      featured: true,
    },
    {
      id: "3",
      title: "Product Designer",
      company: "DesignVerse",
      location: "Chattogram, Bangladesh",
      type: "FULL_TIME",
      salary: "BDT 130k - 160k / month",
      featured: false,
    },
  ],
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-accent/20">
      <div className="absolute inset-0">
        <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-success/20 blur-3xl" />
      </div>

      <div className="container-app relative py-12 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1 text-sm font-medium text-foreground shadow-sm ring-1 ring-border/60">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              New roles added daily
              <Sparkles className="h-4 w-4 text-warning" />
            </div>

            <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Find work that respects your craft, with
              <span className="ml-2 inline-flex items-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                HireHub
              </span>
              .
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-foreground/80 md:text-base lg:text-lg">
              Discover roles at growth companies across Bangladesh and remote-first teams. One profile,
              personal job alerts, and fast applications.
            </p>

            <form
              action="/jobs"
              className="mt-2 flex flex-col gap-2 rounded-2xl bg-card/90 p-2 shadow-lg shadow-brand-100 ring-1 ring-border/80 md:flex-row md:items-center"
              aria-label="Job search"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="q"
                  placeholder="Job title, skill, or company"
                  className="h-12 border-0 bg-secondary pl-10 text-sm focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
              <div className="hidden h-8 w-px bg-border md:block" />
              <div className="relative flex-1 md:flex-none md:w-52">
                <Input
                  name="location"
                  placeholder="Location"
                  className="h-12 border-0 bg-secondary text-sm focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 w-full md:w-40">
                Search Jobs
              </Button>
            </form>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <span className="font-medium">Trending:</span>
              {trendingSearches.map((tag) => (
                <Link
                  key={tag}
                  href={`/jobs?q=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm ring-1 ring-border transition hover:bg-accent/10 hover:text-foreground"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <Card className="hidden border-gradient-brand bg-card/85 p-4 shadow-lg lg:block">
            <FeaturedJobs jobs={featuredJobs} />
          </Card>

          <div className="lg:hidden">
            <MobileFeaturedJobs jobs={featuredJobs} />
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeaturedJobsProps {
  jobs: HeroSectionProps["featuredJobs"]
}

function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Featured roles</h2>
        <Badge variant="secondary" className="text-xs">
          {jobs?.length} new
        </Badge>
      </div>

      <div className="space-y-3">
        {jobs?.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="group block rounded-xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-medium text-foreground">{job.title}</h3>
                  {job.featured && (
                    <Badge className="shrink-0 bg-warning/15 text-warning hover:bg-warning/20">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {job.location}
                  </span>
                  <span className="text-muted-foreground/40">-</span>
                  <span className="uppercase tracking-wide">
                    {job.type.replace("_", " ")}
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-success">
                  {job.salary}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Button asChild variant="outline" size="sm" className="w-full">
        <Link href="/jobs">View all featured jobs</Link>
      </Button>
    </div>
  )
}

function MobileFeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Featured roles</h2>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {jobs?.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="min-w-[280px] shrink-0 rounded-xl border border-border/60 bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-foreground">{job.title}</h3>
              {job.featured && (
                <Badge className="bg-warning/15 text-warning hover:bg-warning/20">
                  Featured
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
            <p className="mt-2 text-sm font-medium text-success">{job.salary}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
