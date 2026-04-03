import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const f = createUploadthing()

export const fileRouter = {
  resumeUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await auth()
      if (!session?.user) {
        throw new UploadThingError("Unauthorized")
      }

      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.userProfile.upsert({
        where: { userId: metadata.userId },
        create: {
          userId: metadata.userId,
          resumeUrl: file.url,
          skills: "[]",
          experience: "[]",
          education: "[]",
        },
        update: {
          resumeUrl: file.url,
        },
      })
    }),
} satisfies FileRouter

export type AppFileRouter = typeof fileRouter

