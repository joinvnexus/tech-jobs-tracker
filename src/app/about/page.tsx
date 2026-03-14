import { Metadata } from "next"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, Building2, Globe, Heart, Shield, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About HireHub",
  description: "Learn about HireHub - the leading job portal connecting job seekers with top companies in Bangladesh and beyond.",
}

const stats = [
  { label: "Active Jobs", value: "10,000+", icon: Briefcase },
  { label: "Companies", value: "500+", icon: Building2 },
  { label: "Job Seekers", value: "50,000+", icon: Users },
  { label: "Countries", value: "20+", icon: Globe },
]

const values = [
  {
    icon: Heart,
    title: "We Care About People",
    description: "We put job seekers and employers at the center of everything we do.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We build trust through transparent processes and honest communication.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously improve our platform to make hiring faster and easier.",
  },
]

export default function AboutPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Connecting Talent with Opportunity
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          HireHub is the leading job portal in Bangladesh, helping thousands of job seekers 
          find their dream careers and employers find the perfect talent.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              Our mission is to create meaningful connections between job seekers and employers. 
              We believe that the right job can transform a life, and the right candidate can 
              transform a business. We are committed to making that connection happen.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title}>
              <CardHeader>
                <value.icon className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
        <p className="mt-2 text-muted-foreground">
          Join thousands of job seekers and employers on HireHub
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <Link href="/auth/register">Create Account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/employer">Post a Job</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
