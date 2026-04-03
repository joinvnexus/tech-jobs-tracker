"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ProfileForm } from "../profile-form"
import { Briefcase, GraduationCap } from "lucide-react"

interface SeekerProfileClientProps {
  user: {
    name: string | null
    email: string
  }
  profile: {
    title: string | null
    phone: string | null
    bio: string | null
    skills: string | null
    experience: string | null
    education: string | null
    resumeUrl: string | null
  } | null
}

export function SeekerProfileClient({ user, profile }: SeekerProfileClientProps) {
  return (
    <>
      <div className="space-y-6">
        {/* Completion Tips */}
        <Card className="border-seeker-200 bg-gradient-to-br from-seeker-50 to-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="h-5 w-5 text-seeker-600" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a5 5 0 11-.546-9.716 5 5 0 11-10 0 5 5 0 0111-2.284V9.657" />
              </svg>
              Profile Completion Tips
            </CardTitle>
            <CardDescription>Complete your profile to get 3x more job matches</CardDescription>  
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid gap-4 p-6 md:grid-cols-2">
              <div className="flex items-start gap-3 p-4 bg-seeker-50/50 rounded-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-seeker-100 text-seeker-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-seeker-800">Add Headline & Skills</h4>
                  <p className="text-sm text-seeker-700">90% of employers filter by skills</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-seeker-50/50 rounded-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-seeker-100 text-seeker-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-seeker-800">Upload Resume</h4>
                  <p className="text-sm text-seeker-700">Apply 5x faster with 1-click apply</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border-seeker-200 rounded-xl p-1">
            <TabsTrigger value="details" className="data-[state=active]:bg-seeker-500 data-[state=active]:text-white rounded-lg">
              Profile Details
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-seeker-500 data-[state=active]:text-white rounded-lg">
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card className="border-seeker-200 shadow-sm">
              <CardHeader>
                <CardTitle>Job Seeker Profile</CardTitle>
                <CardDescription>Complete all sections to maximize your visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm user={user} profile={profile} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Preview</CardTitle>
                <CardDescription>How your profile appears to employers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-dashed border-seeker-200 text-center">
                  <div className="mx-auto w-24 h-24 bg-seeker-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-seeker-500" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{profile?.title || "[Your Headline]"}</h3>
                  <p className="text-seeker-700 text-lg mb-6">{user.name || "[Your Name]"}</p>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-8 line-clamp-4">
                    {profile?.bio || "[Your bio will appear here to showcase your experience and skills...]"}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {profile?.skills && profile.skills !== "[]" ? (
                      (JSON.parse(profile.skills) as string[]).map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-seeker-100 text-seeker-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="px-3 py-1 bg-seeker-100 text-seeker-700 rounded-full text-sm">React</span>
                        <span className="px-3 py-1 bg-seeker-100 text-seeker-700 rounded-full text-sm">TypeScript</span>
                        <span className="px-3 py-1 bg-seeker-100 text-seeker-700 rounded-full text-sm">Node.js</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {profile?.experience && profile.experience !== "[]" && (JSON.parse(profile.experience) as string[]).length > 0 
                        ? `${(JSON.parse(profile.experience) as string[]).length}+ years exp.` 
                        : "Add experience"}
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {Array.isArray(profile?.education) && profile.education.length > 0 
                        ? (profile.education[0] as string) 
                        : "Add education"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
