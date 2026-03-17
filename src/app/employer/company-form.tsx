"use client"

import { useActionState } from "react"
import { 
  Building2, 
  Globe, 
  MapPin, 
  Link as LinkIcon, 
  Save,
  ExternalLink
} from "lucide-react"

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
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-600">{state.error}</p>
        </div>
      ) : null}

      <div className="space-y-3">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="name"
              name="name"
              required
              defaultValue={company?.name ?? ""}
              className="pl-10 border-slate-200 focus:border-employer-500 focus:ring-employer-500"
              placeholder="Your company name"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="slug" className="text-sm font-medium text-slate-700">
            Company URL Slug
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="slug"
              name="slug"
              defaultValue={defaultSlug}
              className="pl-10 border-slate-200 focus:border-employer-500 focus:ring-employer-500 font-mono text-sm"
              placeholder="company-url-slug"
            />
          </div>
          <p className="text-xs text-slate-500">
            Your company page: hirehub.com/companies/{defaultSlug || 'your-company'}
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="description" className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-slate-400" />
          Company Description
        </label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={company?.description ?? ""}
          className="border-slate-200 focus:border-employer-500 focus:ring-employer-500 resize-none text-sm"
          placeholder="Tell candidates about your company, mission, culture, and what makes it a great place to work..."
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="website" className="text-sm font-medium text-slate-700">
            Website
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="website"
              name="website"
              type="url"
              defaultValue={company?.website ?? ""}
              className="pl-10 border-slate-200 focus:border-employer-500 focus:ring-employer-500"
              placeholder="https://your-website.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="location" className="text-sm font-medium text-slate-700">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="location"
              name="location"
              defaultValue={company?.location ?? ""}
              className="pl-10 border-slate-200 focus:border-employer-500 focus:ring-employer-500"
              placeholder="Dhaka, Bangladesh"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button 
          type="submit" 
          size="sm"
          className="bg-employer-600 hover:bg-employer-700"
        >
          <Save className="mr-1.5 h-3.5 w-3.5" />
          {company ? "Update" : "Create"} Company
        </Button>
      </div>
    </form>
  )
}
