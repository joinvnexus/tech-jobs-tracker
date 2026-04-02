import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled" | "flushed" | "ghost";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex w-full text-sm transition-all duration-200 ease-out",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          
          // Variants
          {
            // Default
            "h-10 rounded-lg border border-input bg-background px-3 py-2":
              variant === "default",
            
            // Filled - New
            "h-10 rounded-lg border border-transparent bg-secondary/30 px-3 py-2 hover:bg-secondary/50 focus:bg-background focus:border-input":
              variant === "filled",
            
            // Flushed - New
            "h-10 rounded-none border-b border-x-0 border-input bg-transparent px-0 py-2 focus:border-primary focus:ring-0 focus:ring-offset-0":
              variant === "flushed",
            
            // Ghost - New
            "h-10 rounded-lg border-0 bg-transparent px-3 py-2 hover:bg-secondary/30 focus:bg-background focus:border-input":
              variant === "ghost",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
