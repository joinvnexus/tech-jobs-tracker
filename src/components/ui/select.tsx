import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: "default" | "filled" | "ghost";
  selectSize?: "sm" | "default" | "lg";
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant = "default", selectSize = "default", error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            // Base styles
            "flex w-full appearance-none rounded-lg border bg-background text-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary/60",
            
            // Padding for chevron
            "pr-10",
            
            // Sizes
            {
              "h-9 px-3 py-1.5 text-xs": selectSize === "sm",
              "h-11 px-4 py-2": selectSize === "default",
              "h-14 px-5 py-3 text-base": selectSize === "lg",
            },
            
            // Variants
            {
              // Default - bordered
              "border-border hover:border-border/80 focus:border-primary": 
                variant === "default" && !error,
              
              // Filled - no border, background
              "border-0 bg-secondary/60 hover:bg-secondary/80 focus:bg-background focus:ring-primary": 
                variant === "filled" && !error,
              
              // Ghost - transparent
              "border-0 bg-transparent hover:bg-secondary/50 focus:bg-background focus:ring-primary": 
                variant === "ghost" && !error,
              
              // Error state
              "border-destructive focus:border-destructive focus:ring-destructive/20": error,
            },
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
