"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const updateJobSchema = z.object({
  jobId: z.string().cuid(),
  title: z.string().min(3),
  description: z.string().min(10),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  salaryRange: z.string().optional(),
  location: z.string().min(2),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"]),
  experienceLevel: z.string().optional(),
  status: z.enum(["PENDING", "ACTIVE", "EXPIRED"]),
})

export interface EditJobState {
  error?: string
}

export async function updateJobAction(
  _prevState: EditJobState | undefined,
  formData: FormData,
): Promise<EditJobState> {
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    return { error: "Unauthorized" }
  }

  const raw = {
    jobId: formData.get("jobId"),
    title: formData.get("title"),
    description: formData.get("description"),
    responsibilities: formData.get("responsibilities"),
    requirements: formData.get("requirements"),
    benefits: formData.get("benefits"),
    salaryRange: formData.get("salaryRange"),
    location: formData.get("location"),
    jobType: formData.get("jobType"),
    experienceLevel: formData.get("experienceLevel"),
    status: formData.get("status"),
  }

  let parsed

  try {
    parsed = updateJobSchema.parse(raw)
  } catch (_error) {
    return { error: "Please check the form fields and try again." }
  }

  const job = await prisma.job.findUnique({
    where: { id: parsed.jobId },
    include: { company: true },
  })

  if (!job || !job.company || job.company.userId !== session.user.id) {
    return { error: "You are not allowed to edit this job." }
  }

  const benefitsArray =
    parsed.benefits
      ?.split(",")
      .map((b) => b.trim())
      .filter(Boolean) ?? []

  await prisma.job.update({
    where: { id: parsed.jobId },
    data: {
      title: parsed.title,
      description: parsed.description,
      responsibilities: parsed.responsibilities,
      requirements: parsed.requirements,
      benefits: benefitsArray,
      salaryRange: parsed.salaryRange,
      location: parsed.location,
      jobType: parsed.jobType,
      experienceLevel: parsed.experienceLevel,
      status: parsed.status,
    },
  })

  revalidatePath("/employer/jobs")
  revalidatePath("/jobs")

  redirect(`/employer/jobs`)
}

