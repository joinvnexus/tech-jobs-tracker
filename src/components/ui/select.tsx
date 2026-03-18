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
            "flex w-full appearance-none rounded-lg border bg-white text-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            
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
              "border-slate-200 hover:border-slate-300 focus:border-brand-500": 
                variant === "default" && !error,
              
              // Filled - no border, background
              "border-0 bg-slate-50 hover:bg-slate-100 focus:bg-white focus:ring-brand-500": 
                variant === "filled" && !error,
              
              // Ghost - transparent
              "border-0 bg-transparent hover:bg-slate-50 focus:bg-white focus:ring-brand-500": 
                variant === "ghost" && !error,
              
              // Error state
              "border-red-300 focus:border-red-500 focus:ring-red-200": error,
            },
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
