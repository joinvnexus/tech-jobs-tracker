import { notFound } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import { EditJobForm } from "./edit-job-form"

interface EditJobPageProps {
  params: {
    id: string
  }
}

export default async function EditJobPage({
  params,
}: EditJobPageProps) {
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    notFound()
  }

  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: { company: true },
  })

  if (!job || !job.company || job.company.userId !== session.user.id) {
    notFound()
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Edit job – {job.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditJobForm
            job={{
              id: job.id,
              title: job.title,
              description: job.description,
              responsibilities: job.responsibilities,
              requirements: job.requirements,
              benefits: job.benefits,
              salaryRange: job.salaryRange,
              location: job.location,
              jobType: job.jobType,
              experienceLevel: job.experienceLevel,
              status: job.status,
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
