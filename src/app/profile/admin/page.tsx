import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BarChart3, Shield, Settings, Database, Zap } from "lucide-react"

async function AdminStats() {
  const session = await auth()
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    throw new Error("Access denied")
  }

  const [userCount, jobCount, applicationCount, employerCount] = await Promise.all([
    prisma.user.count(),
    prisma.job.count({ where: { status: "ACTIVE" } }),
    prisma.jobApplication.count(),
    prisma.user.count({ where: { role: "EMPLOYER" } })
  ])

  return { 
    users: userCount,
    jobs: jobCount,
    applications: applicationCount,
    employers: employerCount
  }
}

export default async function AdminProfilePage() {
  const stats = await AdminStats()

  return (
    <div className="space-y-6">
      {/* Admin Dashboard Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-admin-600" />
            Admin Settings
          </CardTitle>
          <CardDescription>Platform management and system settings</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div className="text-center p-6 bg-gradient-to-br from-admin-50 rounded-xl border border-admin-200">
            <Users className="h-10 w-10 text-admin-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{stats.users}</div>
            <div className="text-sm text-slate-600">Total Users</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-brand-50 rounded-xl border border-brand-200">
            <BarChart3 className="h-10 w-10 text-brand-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{stats.jobs}</div>
            <div className="text-sm text-slate-600">Active Jobs</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-seeker-50 rounded-xl border border-seeker-200">
            <Users className="h-10 w-10 text-seeker-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{stats.employers}</div>
            <div className="text-sm text-slate-600">Employers</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 rounded-xl border border-orange-200">
            <Zap className="h-10 w-10 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{stats.applications}</div>
            <div className="text-sm text-slate-600">Applications</div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Controls */}
      <Card>
        <CardHeader>
          <CardTitle>System Controls</CardTitle>
          <CardDescription>Manage platform features and access advanced tools</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          <Button variant="outline" className="justify-start h-16">
            <Users className="h-5 w-5 mr-3" />
            Manage Users
          </Button>
          <Button variant="outline" className="justify-start h-16">
            <BarChart3 className="h-5 w-5 mr-3" />
            View Analytics
          </Button>
          <Button variant="outline" className="justify-start h-16">
            <Database className="h-5 w-5 mr-3" />
            Database Tools
          </Button>
          <Button variant="outline" className="justify-start h-16">
            <Zap className="h-5 w-5 mr-3" />
            Job Moderation
          </Button>
          <Button variant="outline" className="justify-start h-16">
            <Settings className="h-5 w-5 mr-3" />
            Feature Flags
          </Button>
          <Button variant="outline" className="justify-start h-16">
            <Shield className="h-5 w-5 mr-3" />
            Security Audit
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-admin-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-admin-800">
            <Settings className="h-5 w-5" />
            Quick Admin Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-6">
          <div className="flex flex-col sm:flex-row gap-3 p-4 border rounded-xl bg-admin-50">
            <div className="flex-1">
              <h4 className="font-medium text-slate-900 mb-1">Platform Status</h4>
              <div className="flex gap-2">
                <Badge variant="default" className="bg-green-100 text-green-800">All Systems OK</Badge>
                <Badge variant="secondary">5 Pending Jobs</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Review Pending
              </Button>
              <Button size="sm" variant="outline">
                System Logs
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="ghost" className="justify-start h-12">
              <Users className="h-4 w-4 mr-2" />
              Bulk User Actions
            </Button>
            <Button variant="ghost" className="justify-start h-12">
              <Zap className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
            <Button variant="ghost" className="justify-start h-12">
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

