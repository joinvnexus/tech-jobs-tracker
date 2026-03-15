import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(): Promise<Response> {
  const session = await auth()

  // Enforce SEEKER role - only job seekers can access their applications
  if (!session?.user || session.user.role !== "SEEKER") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const applications = await prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
    orderBy: { appliedAt: "desc" },
  })

  return NextResponse.json(applications)
}

