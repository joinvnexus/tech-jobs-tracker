import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CompanyForm } from "@/app/employer/company-form"
import { ExternalLink, MapPin } from "lucide-react"

import { Suspense } from "react"
import { Building2 } from "lucide-react"

async function CompanyData() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  if (session.user.role !== "EMPLOYER") {
    throw new Error("Access denied")
  }

  const company = await prisma.company.findUnique({
    where: { userId: session.user.id },
    select: {
      name: true,
      slug: true,
      description: true,
      website: true,
      location: true,
    },
  })

  return { company }
}

export default function EmployerProfilePage() {
  return (
    <div className="space-y-6">
      {/* Employer Tips */}
      <Card className="border-employer-200 bg-gradient-to-br from-employer-50 to-orange-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-employer-600" />
            Employer Profile Tips
          </CardTitle>
          <CardDescription>Complete your company profile to attract top talent</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 bg-employer-50/50 rounded-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-employer-100 text-employer-600">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-employer-800">Add Company Details</h4>
                <p className="text-sm text-employer-700">Your branded company page builds trust</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-employer-50/50 rounded-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-employer-100 text-employer-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-employer-800">Post Your First Job</h4>
                <p className="text-sm text-employer-700">Get 100+ qualified applications fast</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Form */}
      <Card className="border-employer-200 shadow-sm">
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>Create your employer brand and company page</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Suspense fallback={<div>Loading company form...</div>}>
            <EmployerCompanyForm />
          </Suspense>
        </CardContent>
      </Card>

      {/* Company Preview */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Company Page Preview</CardTitle>
          <CardDescription>How your company page appears publicly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 bg-gradient-to-br from-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4">
                <Building2 className="w-10 h-10 text-gray-500" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">[Your Company Name]</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-employer-100 text-employer-700 text-sm mb-6">
                <MapPin className="h-3 w-3" />
                [Location]
              </div>
            </div>
            <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto line-clamp-3">
              [Your company description will appear here to attract top talent and showcase your employer brand...]
            </p>
            <div className="flex justify-center gap-2 mb-8">
              <a className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-shadow text-sm font-medium">
                View Jobs <ExternalLink className="h-4 w-4 ml-1 inline" />
              </a>
              <a className="px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                Apply Now
              </a>
            </div>
            <div className="text-xs text-slate-500 text-center">
              hirehub.com/companies/[your-company-slug]
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

async function EmployerCompanyForm() {
  const { company } = await CompanyData()
const initialState: any = {}
  return <CompanyForm company={company || null} initialState={initialState} />
}


