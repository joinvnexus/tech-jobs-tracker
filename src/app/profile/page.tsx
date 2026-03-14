import { redirect } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import { ProfileForm } from "./profile-form"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: true,
    },
  })

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <div className="container max-w-3xl py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Your profile
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Tell employers about your background, skills, and experience to get
          better matches.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile details</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm user={user} profile={user.profile} />
        </CardContent>
      </Card>
    </div>
  )
}
