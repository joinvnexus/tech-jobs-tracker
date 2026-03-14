"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UploadButton } from "@/lib/uploadthing"

import { type ProfileFormState, updateProfileAction } from "./actions"

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
    skills: string[]
    experience: unknown
    education: unknown
    resumeUrl: string | null
  } | null
}

export function ProfileForm({ user, profile }: ProfileFormProps)  {
  const [state, formAction] = useActionState(updateProfileAction, initialState)

  const skillsString = profile?.skills.join(", ") ?? ""
  const experienceString = Array.isArray(profile?.experience)
    ? (profile?.experience as string[]).join("\n")
    : ""
  const educationString = Array.isArray(profile?.education)
    ? (profile?.education as string[]).join("\n")
    : ""

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full name
          </label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={user.name ?? ""}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Headline
          </label>
          <Input
            id="title"
            name="title"
            defaultValue={profile?.title ?? ""}
            placeholder="e.g. Senior React Engineer"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" value={user.email} disabled />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            defaultValue={profile?.phone ?? ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="bio" className="text-sm font-medium">
          About you
        </label>
        <Textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={profile?.bio ?? ""}
          placeholder="Tell employers about your background, strengths, and what you're looking for."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="skills" className="text-sm font-medium">
          Skills
        </label>
        <Textarea
          id="skills"
          name="skills"
          rows={2}
          defaultValue={skillsString}
          placeholder="Comma-separated skills, e.g. React, TypeScript, Node.js, PostgreSQL"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="experience" className="text-sm font-medium">
          Experience
        </label>
        <Textarea
          id="experience"
          name="experience"
          rows={4}
          defaultValue={experienceString}
          placeholder="One experience per line, e.g. Senior Engineer at X (2021–Present)"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="education" className="text-sm font-medium">
          Education
        </label>
        <Textarea
          id="education"
          name="education"
          rows={4}
          defaultValue={educationString}
          placeholder="One education entry per line, e.g. BSc in CSE – University of Dhaka"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Resume (PDF)</p>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <UploadButton
            endpoint="resumeUploader"
            onClientUploadComplete={() => {
              // profile resumeUrl will be updated server-side; page can be refreshed manually or via navigation
            }}
            onUploadError={() => {
              // swallow for now; state message can be added later
            }}
          />
          {profile?.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-primary hover:underline"
            >
              View current resume
            </a>
          ) : (
            <p className="text-sm text-slate-500">
              No resume uploaded yet.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save profile</Button>
      </div>
    </form>
  )
}

