"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { type EditJobState, updateJobAction } from "./actions"

const initialState: EditJobState = {}

interface EditJobFormProps {
  job: {
    id: string
    title: string
    description: string
    responsibilities?: string | null
    requirements?: string | null
    benefits?: string | null
    salaryRange?: string | null
    location: string
    jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "REMOTE"
    experienceLevel?: string | null
    status: "PENDING" | "ACTIVE" | "EXPIRED"
  }
}

export function EditJobForm({ job }: EditJobFormProps) {
  const [state, formAction] = useActionState(updateJobAction, initialState)

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <input type="hidden" name="jobId" value={job.id} />

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Job title
        </label>
        <Input
          id="title"
          name="title"
          required
          defaultValue={job.title}
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
          defaultValue={job.location}
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
          defaultValue={job.jobType}
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
          defaultValue={job.experienceLevel ?? ""}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="salaryRange" className="text-sm font-medium">
          Salary range
        </label>
        <Input
          id="salaryRange"
          name="salaryRange"
          defaultValue={job.salaryRange ?? ""}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          defaultValue={job.status}
        >
          <option value="PENDING">Pending</option>
          <option value="ACTIVE">Active</option>
          <option value="EXPIRED">Expired</option>
        </select>
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
          defaultValue={job.description}
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
          defaultValue={job.responsibilities ?? ""}
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
          defaultValue={job.requirements ?? ""}
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
          defaultValue={job.benefits ? JSON.parse(job.benefits).join(", ") : ""}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}

