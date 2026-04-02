import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 
    | "default" 
    | "secondary" 
    | "outline" 
    | "success" 
    | "warning" 
    | "error" 
    | "info"
    | "seeker"
    | "employer"
    | "admin"
    | "destructive"
    | "soft"
    | "dot";
  dot?: boolean;
}

function Badge({ className, variant = "default", dot = false, ...props }: BadgeProps) {
  // Determine dot color based on variant
  const dotColor = 
    variant === "success" ? "bg-success" :
    variant === "warning" ? "bg-warning" :
    variant === "destructive" || variant === "error" ? "bg-danger" :
    variant === "info" ? "bg-info" :
    "bg-primary";

  return (
    <div
      className={cn(
        // Base styles
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200",
        
        // Variants
        {
          // Default - Primary Blue
          "bg-primary/10 text-primary": variant === "default",
          
          // Secondary - Gray
          "bg-secondary/80 text-secondary-foreground": variant === "secondary",
          
          // Outline
          "border border-border/70 text-foreground/80": variant === "outline",
          
          // Success - Green
          "bg-success/15 text-success": variant === "success",
          
          // Warning - Amber
          "bg-warning/15 text-warning": variant === "warning",
          
          // Error/Danger - Red
          "bg-danger/15 text-danger": variant === "destructive" || variant === "error",
          
          // Info - Blue
          "bg-info/15 text-info": variant === "info",
          
          // Seeker - Teal
          "bg-seeker-100 text-seeker-700 dark:text-seeker-300": variant === "seeker",
          
          // Employer - Indigo
          "bg-employer-100 text-employer-700 dark:text-employer-300": variant === "employer",
          
          // Admin - Orange
          "bg-admin-100 text-admin-700 dark:text-admin-300": variant === "admin",

          // Soft - New (lighter background)
          "bg-primary/5 text-primary/80 hover:bg-primary/10": variant === "soft",
        },
        // Adjust for dot variant styling
        (variant === "dot" || dot) && (
          variant === "success" ? "bg-success/15 text-success" :
          variant === "warning" ? "bg-warning/15 text-warning" :
          variant === "destructive" || variant === "error" ? "bg-danger/15 text-danger" :
          variant === "info" ? "bg-info/15 text-info" :
          "bg-primary/10 text-primary"
        ),
        (variant === "dot" || dot) && "gap-1.5 pl-2",
        className
      )}
      {...props}
    >
      {/* Dot indicator for status badges */}
      {(variant === "dot" || dot) && (
        <span className={cn("h-1.5 w-1.5 rounded-full", dotColor)} />
      )}
    </div>
  );
}

export { Badge };
