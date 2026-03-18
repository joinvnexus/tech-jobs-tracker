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
    | "destructive";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        // Base styles
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        
        // Variants
        {
          // Default - Brand Blue
          "bg-brand-100 text-brand-800": variant === "default",
          
          // Secondary - Gray
          "bg-secondary text-secondary-foreground": variant === "secondary",
          
          // Outline
          "border border-border text-muted-foreground": variant === "outline",
          
          // Success - Green
          "bg-success/15 text-success": variant === "success",
          
          // Warning - Yellow
          "bg-warning/15 text-warning": variant === "warning",
          
          // Destructive - Red
          "bg-danger/15 text-danger": variant === "destructive",
          
          // Info - Sky Blue
          "bg-brand-100 text-brand-800": variant === "info",
          
          // Seeker - Teal
          "bg-seeker-100 text-seeker-800": variant === "seeker",
          
          // Employer - Purple
          "bg-employer-100 text-employer-800": variant === "employer",
          
          // Admin - Orange
          "bg-admin-100 text-admin-800": variant === "admin",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
