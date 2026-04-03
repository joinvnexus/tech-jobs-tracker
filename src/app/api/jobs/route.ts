import { NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { type Prisma } from "@prisma/client"

const jobFilterSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
})

const jobCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(), // Stored as JSON string for SQLite
  salaryRange: z.string().optional(),
  location: z.string().min(2),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"]),
  experienceLevel: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
})

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const query = Object.fromEntries(url.searchParams.entries())

  const filters = jobFilterSchema.parse(query)

  const where: Prisma.JobWhereInput = {
    status: "ACTIVE",
  }

  if (filters.q) {
    where.OR = [
      { title: { contains: filters.q } },
      { description: { contains: filters.q } },
      { company: { name: { contains: filters.q } } },
    ]
  }

  if (filters.location) {
    where.location = { contains: filters.location }
  }

  if (filters.type) {
    where.jobType = filters.type as never
  }

  if (filters.status) {
    where.status = filters.status as never
  }

  const skip = (filters.page - 1) * filters.pageSize
  const take = filters.pageSize

  const [items, total] = await Promise.all([
    prisma.job.findMany({
      where,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
    }),
    prisma.job.count({ where }),
  ])

  return NextResponse.json({
    items,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  })
}

export async function POST(request: Request): Promise<Response> {
  const session = await auth()

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  if (session.user.role !== "EMPLOYER") {
    return new NextResponse("Forbidden", { status: 403 })
  }

  const json = await request.json()

  const data = jobCreateSchema.parse(json)

  const company = await prisma.company.findUnique({
    where: {
      userId: session.user.id,
    },
  })

  if (!company) {
    return new NextResponse("Employer company profile not found", { status: 400 })
  }

  const slugBase = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  const slug = `${slugBase}-${Math.random().toString(36).slice(2, 8)}`

  const job = await prisma.job.create({
    data: {
      title: data.title,
      slug,
      description: data.description,
      responsibilities: data.responsibilities,
      requirements: data.requirements,
      benefits: data.benefits ? JSON.stringify(data.benefits) : "[]",
      salaryRange: data.salaryRange,
      location: data.location,
      jobType: data.jobType,
      experienceLevel: data.experienceLevel,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      status: "PENDING",
      companyId: company.id,
    },
  })

  return NextResponse.json(job, { status: 201 })
}
