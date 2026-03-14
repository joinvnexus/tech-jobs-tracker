import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [
      totalUsers,
      totalJobs,
      totalApplications,
      pendingJobs,
      activeJobs,
      seekerCount,
      employerCount,
      recentApplications,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.job.count(),
      prisma.jobApplication.count(),
      prisma.job.count({ where: { status: "PENDING" } }),
      prisma.job.count({ where: { status: "ACTIVE" } }),
      prisma.user.count({ where: { role: "SEEKER" } }),
      prisma.user.count({ where: { role: "EMPLOYER" } }),
      prisma.jobApplication.findMany({
        take: 5,
        orderBy: { appliedAt: "desc" },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          job: {
            select: {
              title: true,
              company: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
    ])

    return NextResponse.json({
      totalUsers,
      totalJobs,
      totalApplications,
      pendingJobs,
      activeJobs,
      seekerCount,
      employerCount,
      recentApplications,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
