import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(): Promise<Response> {
  const session = await auth()

  if (!session?.user || session.user.role !== "EMPLOYER") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const jobs = await prisma.job.findMany({
    where: {
      company: {
        userId: session.user.id,
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(jobs)
}

