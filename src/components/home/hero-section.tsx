"use client"

import Link from "next/link"
import { Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
      salary: "৳180k – ৳220k / month",
      featured: true,
    },
    {
      id: "2",
      title: "Backend Engineer (Node.js)",
      company: "CloudScale",
      location: "Remote",
      type: "REMOTE",
      salary: "$3k – $4k / month",
      featured: true,
    },
    {
      id: "3",
      title: "Product Designer",
      company: "DesignVerse",
      location: "Chattogram, Bangladesh",
      type: "FULL_TIME",
      salary: "৳130k – ৳160k / month",
      featured: false,
    },
  ],
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-200 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-sky-200 blur-3xl" />
      </div>

      <div className="container relative px-4 py-10 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left side - Content */}
          <div className="space-y-5 md:space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
              </span>
              New opportunities added daily
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl xl:text-6xl">
              Find your next{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                dream job
              </span>{" "}
              with HireHub.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-base lg:text-lg">
              Search thousands of curated opportunities from top companies in
              Bangladesh and beyond. One profile, endless possibilities.
            </p>

            {/* Search Form */}
            <form
              action="/jobs"
              className="mt-2 flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-indigo-100 ring-1 ring-slate-100 md:mt-4 md:flex-row md:items-center md:gap-3"
              aria-label="Job search"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  name="q"
                  placeholder="Job title, skill, or company"
                  className="border-0 bg-slate-50 pl-10 focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
              </div>
              <div className="hidden h-8 w-px bg-slate-200 md:block" />
              <div className="relative flex-1 md:flex-none md:w-48">
                <Input
                  name="location"
                  placeholder="Location"
                  className="border-0 bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full shrink-0 md:w-40"
              >
                Search Jobs
              </Button>
            </form>

            {/* Trending Searches */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-sm text-slate-600 md:pt-0">
              <span className="font-medium">Trending:</span>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((tag) => (
                  <Link
                    key={tag}
                    href={`/jobs?q=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-indigo-50 hover:text-indigo-600 hover:ring-indigo-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Featured Jobs */}
          <div className="hidden lg:block">
            <FeaturedJobs jobs={featuredJobs} />
          </div>

          {/* Mobile Featured Jobs - Show below on small screens */}
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
    <div className="animate-fade-in-up mx-auto w-full max-w-lg space-y-3 rounded-2xl bg-white/80 p-4 shadow-xl shadow-indigo-100 backdrop-blur-sm ring-1 ring-slate-100 md:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">
          Featured roles
        </h2>
        <Badge variant="secondary" className="text-xs">
          {jobs?.length} new
        </Badge>
      </div>

      <div className="space-y-3">
        {jobs?.map((job, index) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="group block rounded-xl border border-slate-100 bg-card p-4 transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-medium text-slate-900">
                    {job.title}
                  </h3>
                  {job.featured && (
                    <Badge className="shrink-0 bg-amber-100 text-amber-700 hover:bg-amber-100">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-600">{job.company}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
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
                  <span className="text-slate-300">•</span>
                  <span className="uppercase tracking-wide">
                    {job.type.replace("_", " ")}
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-emerald-600">
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
      <h2 className="text-lg font-semibold text-slate-800">Featured roles</h2>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {jobs?.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="min-w-[280px] shrink-0 rounded-xl border border-slate-100 bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-slate-900">{job.title}</h3>
              {job.featured && (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                  Featured
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-600">{job.company}</p>
            <p className="mt-2 text-sm font-medium text-emerald-600">{job.salary}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
