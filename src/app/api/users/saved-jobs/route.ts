import { NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const bodySchema = z.object({
  jobId: z.string().cuid(),
})

export async function GET(): Promise<Response> {
  const session = await auth()

  // Enforce SEEKER role - only job seekers can access saved jobs
  if (!session?.user || session.user.role !== "SEEKER") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const saved = await prisma.savedJob.findMany({
    where: { userId: session.user.id },
    include: {
      job: true,
    },
    orderBy: { savedAt: "desc" },
  })

  return NextResponse.json(saved)
}

export async function POST(request: Request): Promise<Response> {
  const session = await auth()

  // Enforce SEEKER role - only job seekers can save jobs
  if (!session?.user || session.user.role !== "SEEKER") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const json = await request.json()
  const data = bodySchema.parse(json)

  try {
    const saved = await prisma.savedJob.create({
      data: {
        jobId: data.jobId,
        userId: session.user.id,
      },
    })

    return NextResponse.json(saved, { status: 201 })
  } catch {
    return new NextResponse("Already saved", { status: 409 })
  }
}

export async function DELETE(request: Request): Promise<Response> {
  const session = await auth()

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const json = await request.json()
  const data = bodySchema.parse(json)

  await prisma.savedJob.deleteMany({
    where: {
      jobId: data.jobId,
      userId: session.user.id,
    },
  })

  return new NextResponse(null, { status: 204 })
}

