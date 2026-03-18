import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Company {
  name: string
  jobs: number
}

interface TopCompaniesSectionProps {
  companies?: Company[]
}

export function TopCompaniesSection({
  companies = [
    { name: "Pathao", jobs: 24 },
    { name: "Bkash", jobs: 18 },
    { name: "ShopUp", jobs: 12 },
    { name: "Chaldal", jobs: 9 },
  ],
}: TopCompaniesSectionProps) {
  return (
    <section className="border-b bg-slate-50 py-14">
      <div className="container-app space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Top companies hiring on HireHub
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Discover leading startups and enterprises actively building their
              teams.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {companies.map((company) => (
            <Card
              key={company.name}
              className="flex flex-col justify-between border-slate-100 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <CardHeader className="space-y-1 pb-2">
                <CardTitle className="text-base">
                  <span>{company.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{company.jobs} open roles</span>
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={{ pathname: "/jobs", query: { company: company.name } }}
                  >
                    View jobs
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
