import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterChipProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  active?: boolean
  variant?: "default" | "outline" | "seeker" | "employer"
  removable?: boolean
  onRemove?: () => void
}

const FilterChip = ({ className, label, active = false, variant = "default", removable = false, onRemove, children, ...props }: FilterChipProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <Badge 
          variant={active ? "default" : "outline"}
          className={cn(
          "flex items-center gap-1.5 cursor-pointer transition-all duration-200 hover:scale-105 group relative",
          active && "shadow-md ring-2 ring-brand-500/30",
          className
        )}
        {...props}
      >
        <span className="font-medium truncate max-w-[120px]">{label}</span>
        
        {removable && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        
        {children}
      </Badge>
    )
  }


FilterChip.displayName = "FilterChip"

export { FilterChip }

