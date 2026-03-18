import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  error?: boolean
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, error, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          // Base styles
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          
          // Required asterisk
          required && "after:text-destructive after:ml-0.5 after:text-sm after:content-['*']",
          
          // Error state
          error 
            ? "text-destructive" 
            : "text-foreground",
          
          className
        )}
        {...props}
      >
        {children}
      </label>
    )
  }
)
FormLabel.displayName = "FormLabel"

export { FormLabel }

