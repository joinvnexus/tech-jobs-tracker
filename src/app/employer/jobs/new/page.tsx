"use client"

import { useActionState } from "react"
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  ListChecks, 
  Award,
  Heart,
  ArrowLeft,
  Plus
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { createJobAction } from "./actions"

const initialState: { error?: string } = {}

export default function NewJobPage() {
  const [state, formAction] = useActionState(createJobAction, initialState)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-4xl py-4 md:py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="text-slate-600">
              <a href="/employer/jobs">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </a>
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Post a new job
              </h1>
              <p className="text-sm text-slate-500 hidden md:block">
                Create a compelling job post to attract top talent
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-6 md:py-8 px-4">
        <form action={formAction} className="space-y-6">
          {/* Error Message */}
          {state.error ? (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-600">{state.error}</p>
            </div>
          ) : null}

          {/* Basic Information Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-employer-100 text-employer-600">
                  <Briefcase className="h-4 w-4" />
                </div>
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Job Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-slate-700">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="title"
                      name="title"
                      required
                      placeholder="e.g. Senior React Engineer"
                      className="pl-10 border-slate-200 focus:border-employer-500 focus:ring-employer-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-slate-700">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="location"
                      name="location"
                      required
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="pl-10 border-slate-200 focus:border-employer-500 focus:ring-employer-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Job Type */}
                <div className="space-y-2">
                  <label htmlFor="jobType" className="text-sm font-medium text-slate-700">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
                    <select
                      id="jobType"
                      name="jobType"
                      className="w-full rounded-lg border border-slate-200 bg-white px-10 py-2.5 text-sm focus:border-employer-500 focus:ring-employer-500 focus:outline-none"
                      defaultValue="FULL_TIME"
                    >
                      <option value="FULL_TIME">Full Time</option>
                      <option value="PART_TIME">Part Time</option>
                      <option value="CONTRACT">Contract</option>
                      <option value="INTERNSHIP">Internship</option>
                      <option value="REMOTE">Remote</option>
                    </select>
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <label htmlFor="experienceLevel" className="text-sm font-medium text-slate-700">
                    Experience Level
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="experienceLevel"
                      name="experienceLevel"
                      placeholder="e.g. 3+ years, Mid-Senior"
                      className="pl-10 border-slate-200 focus:border-employer-500 focus:ring-employer-500"
                    />
                  </div>
                </div>
              </div>

              {/* Salary Range */}
              <div className="space-y-2">
                <label htmlFor="salaryRange" className="text-sm font-medium text-slate-700">
                  Salary Range
                </label>
                <div className="relative max-w-md">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="salaryRange"
                    name="salaryRange"
                    placeholder="e.g. ৳150k – ৳200k / month"
                    className="pl-10 border-slate-200 focus:border-employer-500 focus:ring-employer-500"
                  />
                </div>
                <p className="text-xs text-slate-500">Leave blank if negotiable or competitive</p>
              </div>
            </CardContent>
          </Card>

          {/* Job Details Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-employer-100 text-employer-600">
                  <FileText className="h-4 w-4" />
                </div>
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-slate-700">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  placeholder="Describe the role, mission, and what success looks like..."
                  className="border-slate-200 focus:border-employer-500 focus:ring-employer-500 resize-none"
                />
                <p className="text-xs text-slate-500 text-right">Required</p>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2">
                <label htmlFor="responsibilities" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-slate-400" />
                  Responsibilities
                </label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  rows={4}
                  placeholder="• Lead technical decisions&#10;• Mentor junior developers&#10;• Collaborate with product team"
                  className="border-slate-200 focus:border-employer-500 focus:ring-employer-500 resize-none"
                />
                <p className="text-xs text-slate-500">Use bullet points for better readability</p>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <label htmlFor="requirements" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Award className="h-4 w-4 text-slate-400" />
                  Requirements
                </label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  placeholder="• 3+ years of React experience&#10;• Strong TypeScript skills&#10;• Experience with Node.js"
                  className="border-slate-200 focus:border-employer-500 focus:ring-employer-500 resize-none"
                />
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <label htmlFor="benefits" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-slate-400" />
                  Benefits
                </label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  rows={3}
                  placeholder="Health insurance, Remote-friendly, Yearly bonus, Learning budget"
                  className="border-slate-200 focus:border-employer-500 focus:ring-employer-500 resize-none"
                />
                <p className="text-xs text-slate-500">Comma-separated list of benefits</p>
              </div>
            </CardContent>
          </Card>

          {/* Preview Tip */}
          <div className="rounded-lg bg-employer-50 border border-employer-200 p-4">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-employer-100 text-employer-600 shrink-0">
                <Plus className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-employer-800">Pro Tip</h3>
                <p className="text-xs text-employer-700 mt-1">
                  Jobs with detailed descriptions and clear requirements get 40% more applications. 
                  Take time to make your post stand out!
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full md:w-auto"
              asChild
            >
              <a href="/employer/jobs">Cancel</a>
            </Button>
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-employer-600 hover:bg-employer-700"
            >
              Publish Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
