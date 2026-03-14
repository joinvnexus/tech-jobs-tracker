import { NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const bodySchema = z.object({
  coverLetter: z.string().optional(),
})

interface Params {
  params: {
    id: string
  }
}

export async function POST(
  request: Request,
  { params }: Params,
): Promise<Response> {
  const session = await auth()

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const job = await prisma.job.findUnique({
    where: { id: params.id },
  })

  if (!job || job.status !== "ACTIVE") {
    return new NextResponse("Job not available", { status: 400 })
  }

  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
  })

  if (!profile?.resumeUrl) {
    return new NextResponse("Resume required", { status: 400 })
  }

  const json = await request.json()
  const data = bodySchema.parse(json)

  try {
    const application = await prisma.jobApplication.create({
      data: {
        jobId: params.id,
        userId: session.user.id,
        coverLetter: data.coverLetter ?? null,
        resumeUrl: profile.resumeUrl,
      },
    })

    return NextResponse.json(application, { status: 201 })
  } catch {
    return new NextResponse("Already applied", { status: 409 })
  }
}

