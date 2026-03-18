import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import { SaveJobButton } from "./save-button"
import { MapPin, DollarSign, Clock, Calendar, Users, Award, Share2 } from "lucide-react"

interface JobDetailsPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: JobDetailsPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const job = await prisma.job.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      company: true,
    },
  })

  if (!job) {
    return {
      title: "Job Not Found",
    }
  }

  return {
    title: job.title,
    description: `${job.title} at ${job.company.name} in ${job.location}. ${job.description.slice(0, 150)}...`,
    openGraph: {
      title: `${job.title} at ${job.company.name}`,
      description: job.description.slice(0, 160),
      type: "website",
    },
  }
}

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const resolvedParams = await params
  const session = await auth()
  const job = await prisma.job.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      company: true,
      savedJobs: session?.user
        ? {
            where: { userId: session.user.id },
            select: { id: true },
          }
        : false,
    },
  })

  if (!job || job.status !== "ACTIVE") {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-3 text-[11px] uppercase">
              {job.jobType.replace("_", " ")}
            </Badge>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {job.title}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {job.company?.name} • {job.location}
            </p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-base">Job overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              {job.salaryRange ? (
                <div>
                  <p className="text-xs text-slate-500">Salary range</p>
                  <p className="font-medium text-emerald-600">
                    {job.salaryRange}
                  </p>
                </div>
              ) : null}
              {job.experienceLevel ? (
                <div>
                  <p className="text-xs text-slate-500">Experience level</p>
                  <p className="font-medium">{job.experienceLevel}</p>
                </div>
              ) : null}
              <div>
                <p className="text-xs text-slate-500">Posted on</p>
                <p className="font-medium">
                  {job.createdAt.toLocaleDateString()}
                </p>
              </div>
              {job.expiresAt ? (
                <div>
                  <p className="text-xs text-slate-500">Expires on</p>
                  <p className="font-medium">
                    {job.expiresAt.toLocaleDateString()}
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Job description</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-slate-800">
              <p className="whitespace-pre-line">{job.description}</p>
            </CardContent>
          </Card>

          {job.responsibilities ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-sm text-slate-700">
                  {job.responsibilities}
                </p>
              </CardContent>
            </Card>
          ) : null}

          {job.requirements ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-sm text-slate-700">
                  {job.requirements}
                </p>
              </CardContent>
            </Card>
          ) : null}

          {job.benefits && job.benefits.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Benefits</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {job.benefits.map((benefit) => (
                  <Badge key={benefit} variant="secondary">
                    {benefit}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Apply for this job</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>
                You&apos;ll be able to attach your resume and add a tailored
                cover letter in the next step.
              </p>
              <Button asChild className="w-full">
                <Link href={`/jobs/${resolvedParams.slug}/apply`}>Apply now</Link>
              </Button>
              {session?.user ? (
                <SaveJobButton
                  jobId={job.id}
                  initialSaved={
                    Array.isArray(job.savedJobs) && job.savedJobs.length > 0
                  }
                />
              ) : null}
            </CardContent>
          </Card>

          {job.company ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  About {job.company.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-700">
                {job.company.location ? (
                  <p>
                    <span className="text-xs text-slate-500">Location</span>
                    <br />
                    <span className="font-medium">
                      {job.company.location}
                    </span>
                  </p>
                ) : null}
                {job.company.website ? (
                  <p>
                    <span className="text-xs text-slate-500">Website</span>
                    <br />
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      {job.company.website}
                    </a>
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
