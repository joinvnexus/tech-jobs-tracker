import * as React from "react"
import { Check, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterChip } from "@/components/ui/filter-chip"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FilterOption {
  id: string
  label: string
  value: string
  count?: number
  selected?: boolean
}

interface JobFilterSidebarProps {
  filters: {
    location: FilterOption[]
    jobType: FilterOption[]
    salary: FilterOption[]
    experience: FilterOption[]
    remote: string[]
  }
  activeFilters: string[]
  onFilterChange: (filters: string[]) => void
  onLocationSearch: (value: string) => void
  className?: string
}

interface FilterSectionProps {
  title: string
  options: FilterOption[]
  activeFilters: string[]
  onToggle: (value: string) => void
  className?: string
}

const FilterSection = React.memo(
  ({ title, options, activeFilters, onToggle, className }: FilterSectionProps) => (
    <div className={cn("space-y-3", className)}>
      <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
        {title}
      </h3>
      <div className="space-y-2">
        {options.map((option) => (
          <Button
            key={option.id}
            variant="ghost"
            className={cn(
              "justify-start h-10 p-0 hover:bg-accent hover:text-foreground w-full text-left",
              activeFilters.includes(option.value) && "bg-brand-50 border-brand-200 text-brand-700 font-medium"
            )}
            onClick={() => onToggle(option.value)}
          >
            <div className="flex items-center justify-between w-full">
              <span className="truncate">{option.label}</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
                <Check
                  className={cn(
                    "h-3.5 w-3.5",
                    activeFilters.includes(option.value) ? "text-brand-500" : "opacity-0"
                  )}
                />
                {option.count !== undefined && option.count}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
)

FilterSection.displayName = "FilterSection"

export function JobFilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onLocationSearch,
  className
}: JobFilterSidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [locationQuery, setLocationQuery] = React.useState("")

  const handleFilterToggle = (value: string) => {
    const newFilters = activeFilters.includes(value)
      ? activeFilters.filter(f => f !== value)
      : [...activeFilters, value]
    onFilterChange(newFilters)
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocationQuery(value)
    onLocationSearch(value)
  }

  const formatFilterLabel = (filter: string) => {
    if (!filter.includes(":")) return filter
    const [rawKey, rawValue] = filter.split(":")
    const key = rawKey.replace(/([A-Z])/g, " $1").trim()
    const value = rawValue.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    return `${key.charAt(0).toUpperCase()}${key.slice(1)}: ${value}`
  }

  return (
    <div className={cn(
      "w-full lg:w-80 xl:w-96 border-r bg-background h-screen sticky top-0 overflow-y-auto",
      isCollapsed && "hidden lg:block lg:w-16",
      className
    )}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b p-6">
        <div className="flex items-center justify-between">
          <h2 className={cn(
            "font-heading text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent",
            isCollapsed && "sr-only"
          )}>
            Filters
          </h2>
          
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(true)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Active filters */}
        {activeFilters.length > 0 && !isCollapsed && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <FilterChip
                key={filter}
                label={formatFilterLabel(filter)}
                removable
                onRemove={() => handleFilterToggle(filter)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("p-6 space-y-8", isCollapsed && "p-2")}>
        {!isCollapsed ? (
          <>
            {/* Location search */}
            <div>
              <Input
                placeholder="Search locations..."
                value={locationQuery}
                onChange={handleLocationChange}
                className="h-12"
              />
            </div>

            {/* Filter sections */}
            <FilterSection
              title="Job Type"
              options={filters.jobType}
              activeFilters={activeFilters}
              onToggle={handleFilterToggle}
            />
            
            <FilterSection
              title="Location"
              options={filters.location}
              activeFilters={activeFilters}
              onToggle={handleFilterToggle}
            />
            
            <FilterSection
              title="Salary Range"
              options={filters.salary}
              activeFilters={activeFilters}
              onToggle={handleFilterToggle}
            />
            
            <FilterSection
              title="Experience"
              options={filters.experience}
              activeFilters={activeFilters}
              onToggle={handleFilterToggle}
            />
            
            {/* Remote toggle */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">
                Remote
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1 justify-start",
                    activeFilters.includes("remote:true") && "bg-brand-50 border-brand-200 text-brand-700 font-medium"
                  )}
                  onClick={() => handleFilterToggle("remote:true")}
                >
                  Remote OK
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1 justify-start", 
                    activeFilters.includes("remote:false") && "bg-brand-50 border-brand-200 text-brand-700 font-medium"
                  )}
                  onClick={() => handleFilterToggle("remote:false")}
                >
                  On-site
                </Button>
              </div>
            </div>

            {/* Clear all */}
            <Button
              variant="outline"
              className="w-full h-11 text-sm"
              onClick={() => onFilterChange([])}
            >
              Clear all filters
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(false)}
            className="w-full h-16 mx-auto"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  )
}

