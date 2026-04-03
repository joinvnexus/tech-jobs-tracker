"use client"

import { useActionState } from "react"
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Upload,
  Save,
  Sparkles,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadButton } from "@/lib/uploadthing"

import { type ProfileFormState, updateProfileAction } from "./seeker/actions"

const initialState: ProfileFormState = {}

interface ProfileFormProps {
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

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateProfileAction, initialState)

  const parseJsonArray = (str: string | null): string[] => {
    if (!str) return []
    try {
      return JSON.parse(str) as string[]
    } catch {
      return []
    }
  }

  const skillsArray = parseJsonArray(profile?.skills ?? null)
  const experienceArray = parseJsonArray(profile?.experience ?? null)
  const educationArray = parseJsonArray(profile?.education ?? null)

  const skillsString = skillsArray.join(", ")
  const experienceString = experienceArray.join("\n")
  const educationString = educationArray.join("\n")

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-600">{state.error}</p>
        </div>
      ) : null}

      {/* Personal Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="name"
              name="name"
              required
              defaultValue={user.name ?? ""}
              className="pl-10 border-slate-200 focus:border-seeker-500 focus:ring-seeker-500"
              placeholder="Your full name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-slate-700">
            Professional Headline
          </label>
          <div className="relative">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="title"
              name="title"
              defaultValue={profile?.title ?? ""}
              className="pl-10 border-slate-200 focus:border-seeker-500 focus:ring-seeker-500"
              placeholder="e.g. Senior React Engineer"
            />
          </div>
          <p className="text-xs text-slate-500">A short summary that appears on your profile</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="email"
              value={user.email}
              disabled
              className="pl-10 bg-slate-50 border-slate-200 text-slate-500"
            />
          </div>
          <p className="text-xs text-slate-500">Contact email cannot be changed</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-slate-700">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="phone"
              name="phone"
              defaultValue={profile?.phone ?? ""}
              className="pl-10 border-slate-200 focus:border-seeker-500 focus:ring-seeker-500"
              placeholder="+880 1XXXXXXXXX"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label htmlFor="bio" className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-400" />
          About You
        </label>
        <Textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={profile?.bio ?? ""}
          className="border-slate-200 focus:border-seeker-500 focus:ring-seeker-500 resize-none"
          placeholder="Tell employers about your background, strengths, and what you're looking for..."
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>Help employers understand who you are</span>
          <span>Recommended: 100-500 characters</span>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <label htmlFor="skills" className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-slate-400" />
          Skills
        </label>
        <Textarea
          id="skills"
          name="skills"
          rows={3}
          defaultValue={skillsString}
          className="border-slate-200 focus:border-seeker-500 focus:ring-seeker-500 resize-none"
          placeholder="React, TypeScript, Node.js, PostgreSQL, AWS..."
        />
        <p className="text-xs text-slate-500">Comma-separated list of your technical skills</p>
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <label htmlFor="experience" className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-slate-400" />
          Work Experience
        </label>
        <Textarea
          id="experience"
          name="experience"
          rows={5}
          defaultValue={experienceString}
          className="border-slate-200 focus:border-seeker-500 focus:ring-seeker-500 resize-none font-mono text-sm"
          placeholder={`Senior Engineer at Google (2021 - Present)\n• Led development of key features\n• Mentored junior developers\n\nSoftware Engineer at Meta (2018 - 2021)`}
        />
        <p className="text-xs text-slate-500">List your work experience, most recent first</p>
      </div>

      {/* Education */}
      <div className="space-y-2">
        <label htmlFor="education" className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-slate-400" />
          Education
        </label>
        <Textarea
          id="education"
          name="education"
          rows={4}
          defaultValue={educationString}
          className="border-slate-200 focus:border-seeker-500 focus:ring-seeker-500 resize-none font-mono text-sm"
          placeholder={`BSc in Computer Science\nUniversity of Dhaka (2014 - 2018)\n• CGPA: 3.8/4.0`}
        />
      </div>

      {/* Resume Upload */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Upload className="h-4 w-4 text-slate-400" />
          Resume (PDF)
        </label>
        <div className="rounded-lg border-2 border-dashed border-slate-200 p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-seeker-50 text-seeker-600">
              <Upload className="h-6 w-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">Upload your resume</p>
              <p className="text-xs text-slate-500">PDF up to 5MB</p>
            </div>
            <UploadButton
              endpoint="resumeUploader"
              onClientUploadComplete={() => {
                // Profile resumeUrl will be updated server-side
              }}
              onUploadError={() => {
                // Error handling
              }}
              appearance={{
                button: "bg-seeker-600 hover:bg-seeker-700 text-white",
              }}
            />
          </div>
        </div>
        {profile?.resumeUrl && (
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600">Resume uploaded</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-seeker-600 hover:underline font-medium"
              >
                View
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button 
          type="submit" 
          className="bg-seeker-600 hover:bg-seeker-700 min-w-[140px]"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Profile
        </Button>
      </div>
    </form>
  )
}
