"use client"

import * as React from "react"
import { Search, Briefcase, Users, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/ui/search-input"
import { JobCard, JobCardProps } from "@/components/ui/job-card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  featuredJobs?: JobCardProps[]
  className?: string
}

export function HeroSection({
  featuredJobs,
  className
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to jobs with query
    window.location.href = `/jobs?search=${encodeURIComponent(searchQuery)}`
  }

  const stats = [
    { label: "Jobs Posted", value: "12,456", change: "+23%" },
    { label: "Companies", value: "2,847", change: "+12%" },
    { label: "Job Seekers", value: "156k", change: "+8%" }
  ]

  return (
    <section className={cn("relative overflow-hidden py-24 lg:py-32", className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-slate-50 dark:from-slate-900/50 dark:to-slate-900" />
      
      {/* Main content */}
      <div className="relative container mx-auto px-4">
        {/* Headline */}
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-8">
          <Badge className="animate-fade-in-up bg-gradient-to-r from-brand-500 to-seeker-500 text-white px-4 py-1">
            🚀 Join 150K+ Job Seekers
          </Badge>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black leading-tight bg-gradient-to-r from-foreground via-brand-600 to-seeker-600 bg-clip-text text-transparent">
            Find Your 
            <span className="block bg-gradient-to-r from-brand-500 via-seeker-500 to-employer-500 bg-clip-text text-transparent animate-fade-in-up stagger-1">
              Dream Job
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in-up stagger-2">
            Discover thousands of top opportunities from leading companies. 
            Apply with one click and land your next role faster.
          </p>
          
          {/* Search form */}
          <form 
            onSubmit={handleSearch}
            className="group relative max-w-3xl mx-auto animate-fade-in-up stagger-3"
          >
            <SearchInput 
              placeholder="Search 12k+ jobs (React, Remote, Full-time...)"
              variant="hero"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              showClear
              onClear={() => setSearchQuery("")}
            />
            <Button 
              type="submit" 
              size="lg" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-500 hover:bg-brand-600 shadow-glow-brand h-12 shadow-xl group-focus-within:-right-0 transition-all duration-300"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Jobs
            </Button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-24 animate-fade-in-up stagger-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-foreground mb-2 group-hover:text-brand-500 transition-colors">
                {stat.value}
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
              <span className="text-green-600 font-semibold text-sm block mt-1">
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* Featured jobs preview */}
        {featuredJobs && featuredJobs.length > 0 && (
          <div className="animate-fade-in-up stagger-5">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-1 w-12 bg-gradient-to-r from-brand-500 to-seeker-500 rounded-full" />
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Featured Jobs This Week
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.slice(0, 6).map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  variant={index === 0 ? "featured" : "default"}
                  className="animate-fade-in-up stagger-1"
                />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button asChild size="lg" className="group">
                <Link href="/jobs">
                  Browse All Jobs
                  <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/2 right-10 hidden xl:block animate-pulse-glow">
        <div className="w-32 h-32 bg-brand-500/10 rounded-2xl blur-xl" />
      </div>
      <div className="absolute bottom-20 left-10 hidden lg:block animate-pulse-glow">
        <div className="w-24 h-24 bg-seeker-500/10 rounded-full blur-xl" />
      </div>
    </section>
  )
}

