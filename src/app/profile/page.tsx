import { redirect } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-4xl py-4 md:py-6 px-4">
          <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Your Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your job seeker profile and increase your chances of getting hired
          </p>
        </div>
      </div>

      <div className="container max-w-4xl py-6 md:py-8 px-4">
        <div className="space-y-6">
          {/* Profile Tips */}
          <Card className="border-seeker-200 bg-seeker-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-seeker-100 text-seeker-600 shrink-0">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-seeker-800">Profile Completion Tips</h3>
                  <ul className="mt-1 text-xs text-seeker-700 space-y-1">
                    <li>• Add a professional headline to stand out</li>
                    <li>• List your relevant skills for better matches</li>
                    <li>• Upload your resume for easy applications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-lg">Profile Details</CardTitle>
              <CardDescription>
                Fill in your information to create a complete profile
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ProfileForm user={user} profile={user.profile} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
