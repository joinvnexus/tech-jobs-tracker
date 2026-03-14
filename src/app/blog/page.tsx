import { Metadata } from "next"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Career Tips & Blog",
  description: "Expert career advice, job search tips, and industry insights to help you advance your career.",
}

const articles = [
  {
    slug: "optimize-your-dev-resume",
    title: "How to Optimize Your Tech Resume for ATS",
    excerpt: "Learn how to make your resume pass through Applicant Tracking Systems and land more interviews.",
    category: "Resume Tips",
    readingTime: "6 min read",
    date: "2024-01-15",
  },
  {
    slug: "ace-remote-interview",
    title: "Ace Your Next Remote Interview",
    excerpt: "Master the art of remote interviewing with these proven tips and strategies.",
    category: "Interview Tips",
    readingTime: "4 min read",
    date: "2024-01-10",
  },
  {
    slug: "switch-career-into-tech",
    title: "Switching into Tech from a Non-CS Background",
    excerpt: "A comprehensive guide for professionals looking to transition into the tech industry.",
    category: "Career Change",
    readingTime: "8 min read",
    date: "2024-01-05",
  },
  {
    slug: "salary-negotiation-guide",
    title: "Salary Negotiation: How to Get What You Deserve",
    excerpt: "Learn the art of salary negotiation and maximize your earning potential.",
    category: "Salary",
    readingTime: "5 min read",
    date: "2024-01-01",
  },
  {
    slug: "linkedin-optimization",
    title: "LinkedIn Profile Optimization for Job Seekers",
    excerpt: "Make your LinkedIn profile stand out to recruiters and hiring managers.",
    category: "Personal Branding",
    readingTime: "7 min read",
    date: "2023-12-28",
  },
  {
    slug: "work-life-balance",
    title: "Maintaining Work-Life Balance in Tech",
    excerpt: "Tips for burnout prevention and maintaining healthy boundaries in the tech industry.",
    category: "Wellness",
    readingTime: "5 min read",
    date: "2023-12-25",
  },
]

export default function BlogPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Career Tips & Insights</h1>
        <p className="mt-2 text-muted-foreground">
          Expert advice to help you land your dream job and grow your career
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.slug} className="flex flex-col transition hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {article.readingTime}
                </span>
              </div>
              <CardTitle className="mt-2 text-lg leading-tight">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="flex-1 text-sm text-muted-foreground">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{article.date}</span>
                <Button variant="ghost" size="sm" className="gap-1">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter CTA */}
      <Card className="mt-12 bg-primary/5">
        <CardContent className="py-8 text-center">
          <h2 className="text-2xl font-bold">Stay Updated</h2>
          <p className="mt-2 text-muted-foreground">
            Subscribe to our newsletter for the latest career tips and job opportunities.
          </p>
          <form className="mt-4 flex justify-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
