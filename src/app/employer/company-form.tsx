"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { type CompanyFormState, upsertCompanyAction } from "./actions"

interface CompanyFormProps {
  company:
    | {
        name: string
        slug: string
        description: string | null
        website: string | null
        location: string | null
      }
    | null
  initialState: CompanyFormState
}

export function CompanyForm({ company, initialState }: CompanyFormProps) {
  const [state, formAction] = useActionState(upsertCompanyAction, initialState)

  const defaultSlug =
    company?.slug ??
    (company?.name
      ? company.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : "")

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Company Name *
          </label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={company?.name ?? ""}
            placeholder="Enter company name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium">
            URL Slug
          </label>
          <Input
            id="slug"
            name="slug"
            defaultValue={defaultSlug}
            placeholder="company-url-slug"
          />
          <p className="text-xs text-muted-foreground">
            This will be used in your company URL
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={company?.description ?? ""}
          placeholder="Tell candidates about your company..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="website" className="text-sm font-medium">
            Website
          </label>
          <Input
            id="website"
            name="website"
            type="url"
            defaultValue={company?.website ?? ""}
            placeholder="https://your-website.com"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <Input
            id="location"
            name="location"
            defaultValue={company?.location ?? ""}
            placeholder="Dhaka, Bangladesh"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          {company ? "Update Company" : "Create Company"}
        </Button>
      </div>
    </form>
  )
}
