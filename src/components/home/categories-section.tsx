"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

interface CategoriesSectionProps {
  categories?: string[]
}

export function CategoriesSection({
  categories = [
    "Software Engineering",
    "Design & Creative",
    "Product Management",
    "Marketing",
    "Data & Analytics",
    "Customer Success",
  ],
}: CategoriesSectionProps) {
  return (
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
          {categories.map((category) => (
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
  )
}
