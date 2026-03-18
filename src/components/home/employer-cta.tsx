import Link from "next/link"

import { Button } from "@/components/ui/button"

export function EmployerCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-700 via-brand-600 to-amber-500 py-14 text-white">
      <div className="absolute inset-0 opacity-25">
        <div className="absolute -right-16 top-0 h-52 w-52 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="container-app relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Hire top talent faster with HireHub.
          </h2>
          <p className="max-w-xl text-sm text-white/80 md:text-base md:leading-relaxed">
            Post jobs, manage candidates, and collaborate with your team from a
            single, powerful dashboard. Perfect for startups and growing teams in
            Bangladesh.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-white/90">
            <Link href="/employer">Post a job</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <Link href="/contact">Talk to our team</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
