"use server"

import { z } from "zod"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const applySchema = z.object({
  coverLetter: z.string().optional().or(z.literal("")),
})

export interface ApplyFormState {
  error?: string
}

export async function applyToJobAction(
  _prevState: ApplyFormState | undefined,
  formData: FormData,
): Promise<ApplyFormState> {
  const session = await auth()

  if (!session?.user) {
    return { error: "You must be signed in to apply." }
  }

  const jobId = formData.get("jobId")

  if (typeof jobId !== "string") {
    return { error: "Invalid job." }
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { company: true },
  })

  if (!job || job.status !== "ACTIVE") {
    return { error: "This job is no longer accepting applications." }
  }

  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
  })

  if (!profile?.resumeUrl) {
    return { error: "Please upload a resume on your profile before applying." }
  }

  const raw = {
    coverLetter: formData.get("coverLetter"),
  }

  let data

  try {
    data = applySchema.parse(raw)
  } catch {
    return { error: "Please check your application and try again." }
  }

  try {
    await prisma.jobApplication.create({
      data: {
        jobId,
        userId: session.user.id,
        coverLetter: data.coverLetter || null,
        resumeUrl: profile.resumeUrl,
      },
    })
  } catch {
    return { error: "You have already applied to this job." }
  }

  redirect("/applications")
}

