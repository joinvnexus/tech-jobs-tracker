import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(): Promise<Response> {
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const [jobStats, totalApplications] = await Promise.all([
    prisma.job.groupBy({
      by: ["status"],
      where: { company: { userId: session.user.id } },
      _count: true,
    }),
    prisma.jobApplication.count({
      where: {
        job: {
          company: { userId: session.user.id },
        },
      },
    }),
  ])

  const totalJobs = jobStats.reduce((sum, item) => sum + item._count, 0)
  const activeJobs =
    jobStats.find((item) => item.status === "ACTIVE")?._count ?? 0

  return NextResponse.json({
    totalJobs,
    activeJobs,
    totalApplications,
    byStatus: jobStats,
  })
}

