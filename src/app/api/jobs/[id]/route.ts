import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const jobUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  salaryRange: z.string().optional(),
  location: z.string().min(2).optional(),
  jobType: z
    .enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"])
    .optional(),
  experienceLevel: z.string().optional(),
  status: z.enum(["PENDING", "ACTIVE", "EXPIRED"]).optional(),
  expiresAt: z.string().datetime().optional().nullable(),
})

interface Params {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  _request: NextRequest,
  { params }: Params,
): Promise<Response> {
  const { id } = await params
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      company: true,
    },
  })

  if (!job) {
    return new NextResponse("Not found", { status: 404 })
  }

  return NextResponse.json(job)
}

export async function PUT(
  request: NextRequest,
  { params }: Params,
): Promise<Response> {
  const session = await auth()
  const { id } = await params

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const existing = await prisma.job.findUnique({
    where: { id },
    include: {
      company: true,
    },
  })

  if (!existing) {
    return new NextResponse("Not found", { status: 404 })
  }

  if (
    session.user.role !== "EMPLOYER" ||
    !existing.company ||
    existing.company.userId !== session.user.id
  ) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  const json = await request.json()
  const data = jobUpdateSchema.parse(json)

  const job = await prisma.job.update({
    where: { id },
    data: {
      ...data,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    },
  })

  return NextResponse.json(job)
}

export async function DELETE(
  _request: NextRequest,
  { params }: Params,
): Promise<Response> {
  const session = await auth()
  const { id } = await params

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const existing = await prisma.job.findUnique({
    where: { id },
    include: {
      company: true,
    },
  })

  if (!existing) {
    return new NextResponse("Not found", { status: 404 })
  }

  if (
    session.user.role !== "EMPLOYER" ||
    !existing.company ||
    existing.company.userId !== session.user.id
  ) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  await prisma.job.delete({
    where: { id },
  })

  return new NextResponse(null, { status: 204 })
}
