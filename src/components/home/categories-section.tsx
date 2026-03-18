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
      <div className="container-app space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Explore by category
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
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
              className="group rounded-xl border border-slate-100 bg-card px-4 py-3 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
