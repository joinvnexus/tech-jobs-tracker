"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Article {
  slug: string
  title: string
  readingTime: string
}

interface CareerTipsSectionProps {
  articles?: Article[]
}

export function CareerTipsSection({
  articles = [
    {
      slug: "optimize-your-dev-resume",
      title: "How to optimize your tech resume for ATS",
      readingTime: "6 min read",
    },
    {
      slug: "ace-remote-interview",
      title: "Ace your next remote interview",
      readingTime: "4 min read",
    },
    {
      slug: "switch-career-into-tech",
      title: "Switching into tech from a non-CS background",
      readingTime: "8 min read",
    },
  ],
}: CareerTipsSectionProps) {
  return (
    <section className="border-b bg-background py-14">
      <div className="container space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Career tips curated for you
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Learn how to stand out to recruiters, negotiate offers, and grow
              faster in your career.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">Visit blog</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <Card
              key={article.slug}
              className="border-slate-100 bg-card/80 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
            >
              <CardHeader className="space-y-2">
                <Badge variant="outline" className="w-fit text-[11px] uppercase">
                  Career tips
                </Badge>
                <CardTitle className="text-base font-semibold text-slate-900">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-xs text-slate-600">
                <span>{article.readingTime}</span>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/blog/${article.slug}`}>Read</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
