import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import { type ApplyFormState, applyToJobAction } from "./actions"

interface ApplyPageProps {
  params: {
    slug: string
  }
}

export default async function ApplyPage({
  params,
}: ApplyPageProps) {
  const session = await auth()
  const job = await prisma.job.findUnique({
    where: { slug: params.slug },
    include: {
      company: true,
    },
  })

  if (!job || job.status !== "ACTIVE") {
    notFound()
  }

  if (!session?.user) {
    notFound()
  }

  const existingApplication = await prisma.jobApplication.findUnique({
    where: {
      jobId_userId: {
        jobId: job.id,
        userId: session.user.id,
      },
    },
  })

  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
  })

  const initialState: ApplyFormState = {}

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Apply for {job.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-sm text-slate-700">
          <p>
            You are applying to{" "}
            <span className="font-medium">{job.company?.name}</span> for the role
            of <span className="font-medium">{job.title}</span>.
          </p>

          <div className="space-y-2">
            <p className="text-xs text-slate-500">Resume</p>
            {profile?.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                View your uploaded resume
              </a>
            ) : (
              <p className="text-xs text-destructive">
                You don&apos;t have a resume uploaded yet. Please upload one from
                your profile before applying.
              </p>
            )}
          </div>

          {existingApplication ? (
            <p className="rounded-md bg-muted px-3 py-2 text-xs text-slate-700">
              You&apos;ve already applied to this job. You can&apos;t submit a
              second application.
            </p>
          ) : (
            <ApplyForm
              jobId={job.id}
              disabled={!profile?.resumeUrl}
              initialState={initialState}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useActionState } from "react"

interface ApplyFormProps {
  jobId: string
  disabled: boolean
  initialState: ApplyFormState
}

function ApplyForm({
  jobId,
  disabled,
  initialState,
}: ApplyFormProps){
  const [state, formAction] = useActionState(applyToJobAction, initialState)

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {state.error}
        </p>
      ) : null}
      <input type="hidden" name="jobId" value={jobId} />
      <div className="space-y-2">
        <label htmlFor="coverLetter" className="text-sm font-medium">
          Cover letter (optional)
        </label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          rows={6}
          placeholder="Explain why you're a great fit for this role."
        />
      </div>
      <Button type="submit" className="w-full" disabled={disabled}>
        Submit application
      </Button>
    </form>
  )
}

