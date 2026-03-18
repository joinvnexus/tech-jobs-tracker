import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Briefcase, MapPin, DollarSign, Clock, Eye, Building2 } from "lucide-react"

export interface JobCardProps {
  id: string
  slug: string
  title: string
  company: {
    name: string
    logo?: string | null
  }
  location: string
  salaryRange?: string | null
  jobType: string
  createdAt: Date
  views?: number
  status?: "ACTIVE" | "PENDING" | "CLOSED"
  featured?: boolean
}

interface JobCardComponentProps {
  job: JobCardProps
  variant?: "default" | "compact" | "featured"
  showActions?: boolean
  className?: string
}

/**
 * Reusable Job Card component for displaying job listings
 * Used across the website: homepage, job listing, saved jobs, etc.
 */
export function JobCard({ 
  job, 
  variant = "default", 
  showActions = true,
  className 
}: JobCardComponentProps) {
  const isCompact = variant === "compact"
  const isFeatured = variant === "featured"
  
  // Format job type for display
  const formatJobType = (type: string) => {
    return type.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())
  }
  
  // Format date
  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`
    return new Date(date).toLocaleDateString()
  }

  return (
    <Card 
      className={cn(
        // Base styles
        "group/job relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1 hover:border-brand-200",
        // Featured variant has accent border
        isFeatured ? "border-l-4 border-l-amber-500" : "border-slate-200",
        // Compact variant
        isCompact ? "p-4" : "p-5",
        className
      )}
    >
      {/* Featured badge */}
      {job.featured && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-tl-lg rounded-br-lg rounded-tr-none bg-amber-500 hover:bg-amber-600">
            Featured
          </Badge>
        </div>
      )}
      
      <div className={cn("flex gap-4", isCompact ? "flex-row" : "flex-col")}>
        {/* Company Logo */}
        <div className={cn(
          "flex-shrink-0 rounded-xl bg-gradient-to-br flex items-center justify-center font-bold text-white shadow-md",
          "group-hover/job:scale-105 transition-transform duration-300",
          isCompact ? "w-12 h-12 text-sm" : "w-14 h-14 text-lg",
          "from-brand-500 to-brand-600"
        )}>
          {job.company.logo ? (
            <img 
              src={job.company.logo} 
              alt={job.company.name} 
              className="w-full h-full object-cover rounded-xl" 
            />
          ) : (
            <Building2 className={cn(isCompact ? "w-5 h-5" : "w-6 h-6")} />
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title & Company */}
          <div className={cn("space-y-1", isCompact && "flex-1")}>
            <CardTitle className="group-hover/job:text-brand-600 transition-colors line-clamp-2">
              <Link href={`/jobs/${job.slug}`} className="focus:outline-none">
                {job.title}
              </Link>
            </CardTitle>
            
            {!isCompact && (
              <CardDescription className="font-medium text-slate-700">
                {job.company.name}
              </CardDescription>
            )}
          </div>
          
          {/* Details - Compact shows inline, default shows as grid */}
          {isCompact ? (
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
              <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                {formatJobType(job.jobType)}
              </Badge>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              {job.salaryRange && (
                <span className="text-green-600 font-medium">
                  {job.salaryRange}
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-400" />
                {formatJobType(job.jobType)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                {job.location}
              </span>
              {job.salaryRange && (
                <span className="flex items-center gap-1.5 text-green-600 font-medium">
                  <DollarSign className="w-4 h-4" />
                  {job.salaryRange}
                </span>
              )}
            </div>
          )}
          
          {/* Actions */}
          {showActions && (
            <div className={cn(
              "flex items-center gap-2 mt-4",
              isCompact ? "flex-shrink-0" : ""
            )}>
              {!isCompact && (
                <Button asChild size="sm" className="flex-1 sm:flex-none">
                  <Link href={`/jobs/${job.slug}`}>View Details</Link>
                </Button>
              )}
              {isCompact && (
                <Button asChild size="sm" variant="ghost" className="text-slate-500">
                  <Link href={`/jobs/${job.slug}`}>View</Link>
                </Button>
              )}
              
              {job.status && !isCompact && (
                <Badge 
                  variant={
                    job.status === "ACTIVE" ? "success" : 
                    job.status === "PENDING" ? "warning" : "error"
                  }
                  className="ml-auto"
                >
                  {job.status}
                </Badge>
              )}
              
              {!isCompact && (
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDate(job.createdAt)}
                </div>
              )}
            </div>
          )}
          
          {/* Footer info - only in default variant */}
          {!isCompact && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(job.createdAt)}
              </div>
              {job.views !== undefined && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Eye className="w-3.5 h-3.5" />
                  {job.views.toLocaleString()} views
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

/**
 * Simplified Job Card for lists and compact displays
 */
export function JobCardCompact({ 
  job, 
  className 
}: { 
  job: JobCardProps
  className?: string 
}) {
  return (
    <JobCard 
      job={job} 
      variant="compact" 
      showActions={false}
      className={className}
    />
  )
}

/**
 * Featured Job Card with larger design
 */
export function JobCardFeatured({ 
  job, 
  className 
}: { 
  job: JobCardProps
  className?: string 
}) {
  return (
    <JobCard 
      job={job} 
      variant="featured" 
      className={className}
    />
  )
}
