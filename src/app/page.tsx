import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const mockFeaturedJobs = [
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
] as const

const mockCategories = [
  "Software Engineering",
  "Design & Creative",
  "Product Management",
  "Marketing",
  "Data & Analytics",
  "Customer Success",
] as const

const mockCompanies = [
  { name: "Pathao", jobs: 24 },
  { name: "Bkash", jobs: 18 },
  { name: "ShopUp", jobs: 12 },
  { name: "Chaldal", jobs: 9 },
] as const

const mockArticles = [
  {
    slug: "optimize-your-dev-resume",
    title: "How to optimize your tech resume for ATS",
    readingTime: "6 min read",
  },
  {
    slug: "ace-remote-interview",
    title: "Ace your next remote interview",
    readingTime: "4 min read",
  },
  {
    slug: "switch-career-into-tech",
    title: "Switching into tech from a non-CS background",
    readingTime: "8 min read",
  },
] as const

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero with search */}
      <section className="border-b bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
        <div className="container flex flex-col gap-10 py-16 md:flex-row md:items-center md:py-20">
          <div className="flex-1 space-y-6">
            <Badge variant="secondary">New</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Find your next{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                dream job
              </span>{" "}
              with HireHub.
            </h1>
            <p className="max-w-xl text-base text-slate-600 md:text-lg">
              Search thousands of curated opportunities from top companies in
              Bangladesh and beyond. One profile, endless possibilities.
            </p>

            <form
              action="/jobs"
              className="mt-4 flex flex-col gap-3 rounded-xl bg-white/80 p-3 shadow-lg shadow-indigo-100 backdrop-blur md:flex-row md:items-center"
              aria-label="Job search"
            >
              <Input
                name="q"
                placeholder="Search by job title, skill, or company"
                className="bg-transparent"
              />
              <Input
                name="location"
                placeholder="Location (e.g. Dhaka, Remote)"
                className="bg-transparent md:max-w-xs"
              />
              <Button type="submit" size="lg" className="w-full md:w-auto">
                Search jobs
              </Button>
            </form>

            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span>Trending searches:</span>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "Product Manager", "UI/UX"].map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mx-auto max-w-md space-y-4 rounded-2xl bg-white/90 p-4 shadow-xl shadow-indigo-100">
              <h2 className="text-sm font-medium text-slate-500">
                Featured roles waiting for you
              </h2>
              <div className="space-y-3">
                {mockFeaturedJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border-slate-100 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                  >
                    <CardHeader className="space-y-1 pb-2">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span>{job.title}</span>
                        {job.featured ? (
                          <Badge className="text-[10px] uppercase">
                            Featured
                          </Badge>
                        ) : null}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between gap-2 text-xs text-slate-600">
                      <div className="space-y-1">
                        <p className="font-medium text-slate-800">
                          {job.company}
                        </p>
                        <p>{job.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-emerald-600">
                          {job.salary}
                        </p>
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                          {job.type.replace("_", " ")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/jobs">View all jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="border-b bg-background py-14">
        <div className="container space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Explore by category
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Browse roles by what you love doing. More categories are added
                every week.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/jobs">View all jobs</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {mockCategories.map((category) => (
              <Link
                key={category}
                href={{ pathname: "/jobs", query: { category } }}
                className="group rounded-xl border bg-card px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top companies section */}
      <section className="border-b bg-slate-50 py-14">
        <div className="container space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Top companies hiring on HireHub
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Discover leading startups and enterprises actively building their
                teams.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {mockCompanies.map((company) => (
              <Card
                key={company.name}
                className="flex flex-col justify-between border-slate-100 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
              >
                <CardHeader className="space-y-1 pb-2">
                  <CardTitle className="text-base">
                    <span>{company.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-sm text-slate-600">
                  <span>{company.jobs} open roles</span>
                  <Button asChild size="sm" variant="outline">
                    <Link href={{ pathname: "/jobs", query: { company: company.name } }}>
                      View jobs
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career tips / blog section */}
      <section className="border-b bg-background py-14">
        <div className="container space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Career tips curated for you
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Learn how to stand out to recruiters, negotiate offers, and grow
                faster in your career.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/blog">Visit blog</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {mockArticles.map((article) => (
              <Card
                key={article.slug}
                className="border-slate-100 bg-card/80 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
              >
                <CardHeader className="space-y-2">
                  <Badge variant="outline" className="w-fit text-[11px] uppercase">
                    Career tips
                  </Badge>
                  <CardTitle className="text-base font-semibold text-slate-900">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-xs text-slate-600">
                  <span>{article.readingTime}</span>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/blog/${article.slug}`}>Read</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Employer CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-sky-600 py-14 text-white">
        <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Hire top talent faster with HireHub.
            </h2>
            <p className="max-w-xl text-sm md:text-base md:leading-relaxed text-indigo-100">
              Post jobs, manage candidates, and collaborate with your team from a
              single, powerful dashboard. Perfect for startups and growing teams in
              Bangladesh.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-indigo-700 hover:bg-indigo-50"
            >
              <Link href="/employer">Post a job</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white">
              <Link href="/contact">Talk to our team</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
