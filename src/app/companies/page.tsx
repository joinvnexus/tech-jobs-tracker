import Link from "next/link"
import { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Companies",
  description: "Browse top companies hiring on HireHub. Find your next opportunity at leading companies in Bangladesh and abroad.",
}

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({
    include: {
      _count: {
        select: {
          jobs: {
            where: { status: "ACTIVE" },
          },
        },
      },
    },
    orderBy: {
      jobs: {
        _count: "desc",
      },
    },
    take: 50,
  })

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Top Companies</h1>
        <p className="mt-2 text-muted-foreground">
          Discover leading companies actively hiring on HireHub
        </p>
      </div>

      {companies.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No companies found yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Companies will appear here once employers post jobs.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Card key={company.id} className="transition hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary">
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    company.name.charAt(0)
                  )}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{company.location}</p>
                </div>
              </CardHeader>
              <CardContent>
                {company.description && (
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {company.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {company._count.jobs} open position{company._count.jobs !== 1 ? "s" : ""}
                  </Badge>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/jobs?company=${company.slug}`}>View Jobs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
