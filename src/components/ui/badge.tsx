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
          "bg-slate-100 text-slate-800": variant === "secondary",
          
          // Outline
          "border border-slate-300 text-slate-700": variant === "outline",
          
          // Success - Green
          "bg-green-100 text-green-800": variant === "success",
          
          // Warning - Yellow
          "bg-yellow-100 text-yellow-800": variant === "warning",
          
          // Destructive - Red
          "bg-red-100 text-red-800": variant === "destructive",
          
          // Info - Sky Blue
          "bg-sky-100 text-sky-800": variant === "info",
          
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
