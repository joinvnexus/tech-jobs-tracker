"use server"

import { z } from "zod"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const createJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  salaryRange: z.string().optional(),
  location: z.string().min(2),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"]),
  experienceLevel: z.string().optional(),
})

export async function createJobAction(
  _prevState: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const session = await auth()

  if (!session?.user) {
    return { error: "You must be signed in to post a job." }
  }

  if (session.user.role !== "EMPLOYER") {
    return { error: "Only employers can post jobs." }
  }

  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    responsibilities: formData.get("responsibilities"),
    requirements: formData.get("requirements"),
    benefits: formData.get("benefits"),
    salaryRange: formData.get("salaryRange"),
    location: formData.get("location"),
    jobType: formData.get("jobType"),
    experienceLevel: formData.get("experienceLevel"),
  }

  let parsed

  try {
    parsed = createJobSchema.parse(raw)
  } catch (error) {
    return { error: "Please check the form fields and try again." }
  }

  const company = await prisma.company.findUnique({
    where: { userId: session.user.id },
  })

  if (!company) {
    return { error: "Please complete your company profile before posting jobs." }
  }

  const benefitsArray =
    parsed.benefits
      ?.split(",")
      .map((b) => b.trim())
      .filter(Boolean) ?? []

  const slugBase = parsed.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  const slug = `${slugBase}-${Math.random().toString(36).slice(2, 8)}`

  const job = await prisma.job.create({
    data: {
      title: parsed.title,
      slug,
      description: parsed.description,
      responsibilities: parsed.responsibilities,
      requirements: parsed.requirements,
      benefits: JSON.stringify(benefitsArray),
      salaryRange: parsed.salaryRange,
      location: parsed.location,
      jobType: parsed.jobType,
      experienceLevel: parsed.experienceLevel,
      status: "PENDING",
      companyId: company.id,
    },
  })

  redirect(`/jobs/${job.slug}`)
}

