import { NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const bodySchema = z.object({
  status: z.enum(["APPLIED", "REVIEWED", "SHORTLISTED", "REJECTED", "HIRED"]),
})

interface Params {
  params: {
    id: string
  }
}

export async function PUT(
  request: Request,
  { params }: Params,
): Promise<Response> {
  const session = await auth()

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const application = await prisma.jobApplication.findUnique({
    where: { id: params.id },
    include: {
      job: {
        include: { company: true },
      },
    },
  })

  if (
    !application ||
    !application.job.company ||
    application.job.company.userId !== session.user.id
  ) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  const json = await request.json()
  const data = bodySchema.parse(json)

  const updated = await prisma.jobApplication.update({
    where: { id: params.id },
    data: {
      status: data.status,
    },
  })

  return NextResponse.json(updated)
}

