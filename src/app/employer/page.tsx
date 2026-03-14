import { notFound } from "next/navigation"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import { type CompanyFormState, upsertCompanyAction } from "./actions"

export default async function EmployerDashboardPage(): Promise<ReactNode> {
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    notFound()
  }

  const [company, stats] = await Promise.all([
    prisma.company.findUnique({
      where: { userId: session.user.id },
    }),
    prisma.job.groupBy({
      by: ["status"],
      where: { company: { userId: session.user.id } },
      _count: true,
    }),
  ])

  const totalJobs = stats.reduce((sum, item) => sum + item._count, 0)
  const activeJobs =
    stats.find((item) => item.status === "ACTIVE")?._count ?? 0

  const totalApplications = await prisma.jobApplication.count({
    where: {
      job: {
        company: { userId: session.user.id },
      },
    },
  })

  const companyState: CompanyFormState = {}

  return (
    <div className="container py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Employer dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage your company profile, jobs, and applicants from one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total jobs
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {totalJobs}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Active jobs
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {activeJobs}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total applications
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {totalApplications}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Company profile</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyForm company={company} initialState={companyState} />
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useActionState } from "react"

interface CompanyFormProps {
  company:
    | {
        name: string
        slug: string
        description: string | null
        website: string | null
        location: string | null
      }
    | null
  initialState: CompanyFormState
}

function CompanyForm({
  company,
  initialState,
}: CompanyFormProps): React.ReactElement {
  const [state, formAction] = useActionState(upsertCompanyAction, initialState)

  const defaultSlug =
    company?.slug ??
    (company?.name
      ? company.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : "")

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Company name
          </label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={company?.name ?? ""}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium">
            Company slug
          </label>
          <Input
            id="slug"
            name="slug"
            required
            defaultValue={defaultSlug}
            placeholder="e.g. hirehub-labs"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="website" className="text-sm font-medium">
            Website
          </label>
          <Input
            id="website"
            name="website"
            defaultValue={company?.website ?? ""}
            placeholder="https://"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <Input
            id="location"
            name="location"
            defaultValue={company?.location ?? ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={company?.description ?? ""}
          placeholder="Briefly describe what your company does and your team culture."
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save company profile</Button>
      </div>
    </form>
  )
}

