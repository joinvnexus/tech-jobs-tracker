"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export function EmployerCTA() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-sky-600 py-14 text-white">
      <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Hire top talent faster with HireHub.
          </h2>
          <p className="max-w-xl text-sm md:text-base md:leading-relaxed text-indigo-100">
            Post jobs, manage candidates, and collaborate with your team from a
            single, powerful dashboard. Perfect for startups and growing teams in
            Bangladesh.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-indigo-700 hover:bg-indigo-50"
          >
            <Link href="/employer">Post a job</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white">
            <Link href="/contact">Talk to our team</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
