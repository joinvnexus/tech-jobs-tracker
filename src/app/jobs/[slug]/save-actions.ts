"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const toggleSchema = z.object({
  jobId: z.string().cuid(),
  action: z.enum(["save", "unsave"]),
})

export async function toggleSaveJobAction(formData: FormData): Promise<void> {
  const session = await auth()

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  const raw = {
    jobId: formData.get("jobId"),
    action: formData.get("action"),
  }

  const parsed = toggleSchema.parse(raw)

  if (parsed.action === "save") {
    try {
      await prisma.savedJob.create({
        data: {
          jobId: parsed.jobId,
          userId: session.user.id,
        },
      })
    } catch {
      // ignore duplicate
    }
  } else {
    await prisma.savedJob.deleteMany({
      where: {
        jobId: parsed.jobId,
        userId: session.user.id,
      },
    })
  }

  revalidatePath("/saved-jobs")
}

