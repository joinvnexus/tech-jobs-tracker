"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { createJobAction } from "./actions"

const initialState: { error?: string } = {}

export default function NewJobPage() {
  const [state, formAction] = useActionState(createJobAction, initialState)

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Post a new job
        </h1>
        <p className="text-sm text-slate-600">
          Create a detailed, compelling job post to attract top candidates on
          HireHub.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        {state.error ? (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        ) : null}

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Job title
          </label>
          <Input
            id="title"
            name="title"
            required
            placeholder="e.g. Senior React Engineer"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <Input
            id="location"
            name="location"
            required
            placeholder="e.g. Dhaka, Bangladesh or Remote"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="jobType" className="text-sm font-medium">
            Job type
          </label>
          <select
            id="jobType"
            name="jobType"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue="FULL_TIME"
          >
            <option value="FULL_TIME">Full time</option>
            <option value="PART_TIME">Part time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="REMOTE">Remote</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="experienceLevel" className="text-sm font-medium">
            Experience level
          </label>
          <Input
            id="experienceLevel"
            name="experienceLevel"
            placeholder="e.g. 3+ years, Mid-Senior"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="salaryRange" className="text-sm font-medium">
            Salary range
          </label>
          <Input
            id="salaryRange"
            name="salaryRange"
            placeholder="e.g. ৳150k – ৳200k / month"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Job description
          </label>
          <Textarea
            id="description"
            name="description"
            required
            rows={6}
            placeholder="Describe the role, mission, and what success looks like."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="responsibilities" className="text-sm font-medium">
            Responsibilities
          </label>
          <Textarea
            id="responsibilities"
            name="responsibilities"
            rows={4}
            placeholder="List the key responsibilities, each on a new line."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="requirements" className="text-sm font-medium">
            Requirements
          </label>
          <Textarea
            id="requirements"
            name="requirements"
            rows={4}
            placeholder="List the must-have skills, experience, and qualifications."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="benefits" className="text-sm font-medium">
            Benefits
          </label>
          <Textarea
            id="benefits"
            name="benefits"
            rows={3}
            placeholder="Comma-separated list of benefits (e.g. Health insurance, Remote-friendly, Yearly bonus)"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit">Publish job</Button>
        </div>
      </form>
    </div>
  )
}
