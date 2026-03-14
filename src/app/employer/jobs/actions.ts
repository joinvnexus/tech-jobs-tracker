"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const statusSchema = z.object({
  jobId: z.string().cuid(),
  status: z.enum(["PENDING", "ACTIVE", "EXPIRED"]),
})

const deleteSchema = z.object({
  jobId: z.string().cuid(),
})

async function assertEmployerOwnsJob(jobId: string): Promise<void> {
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    throw new Error("Unauthorized")
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { company: true },
  })

  if (!job || !job.company || job.company.userId !== session.user.id) {
    throw new Error("Forbidden")
  }
}

export async function updateJobStatusAction(formData: FormData): Promise<void> {
  const raw = {
    jobId: formData.get("jobId"),
    status: formData.get("status"),
  }

  const parsed = statusSchema.parse(raw)

  await assertEmployerOwnsJob(parsed.jobId)

  await prisma.job.update({
    where: { id: parsed.jobId },
    data: { status: parsed.status },
  })

  revalidatePath("/employer/jobs")
  revalidatePath("/jobs")
}

export async function deleteJobAction(formData: FormData): Promise<void> {
  const raw = {
    jobId: formData.get("jobId"),
  }

  const parsed = deleteSchema.parse(raw)

  await assertEmployerOwnsJob(parsed.jobId)

  await prisma.job.delete({
    where: { id: parsed.jobId },
  })

  revalidatePath("/employer/jobs")
  revalidatePath("/jobs")
}

