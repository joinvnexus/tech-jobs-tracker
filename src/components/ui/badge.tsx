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
  // Dot color mapping - using semantic colors from CSS vars
  const dotColor = 
    variant === "success" ? "bg-success" :
    variant === "warning" ? "bg-warning" :
    variant === "destructive" || variant === "error" ? "bg-danger" :
    variant === "info" ? "bg-info" :
    "bg-primary";

  // Determine styling based on variant - using HSL vars for better dark mode support
  const getVariantStyles = () => {
    switch (variant) {
      case "default":
        return "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300";
      case "secondary":
        return "bg-secondary/80 text-secondary-foreground";
      case "outline":
        return "border border-border/70 text-foreground/80";
      case "success":
        return "bg-success/15 text-success dark:bg-success/20";
      case "warning":
        return "bg-warning/15 text-warning dark:bg-warning/20";
      case "error":
      case "destructive":
        return "bg-danger/15 text-danger dark:bg-danger/20";
      case "info":
        return "bg-info/15 text-info dark:bg-info/20";
      case "seeker":
        return "bg-seeker/15 text-seeker dark:bg-seeker/20 dark:text-seeker-300";
      case "employer":
        return "bg-employer/15 text-employer dark:bg-employer/20 dark:text-employer-300";
      case "admin":
        return "bg-admin/15 text-admin dark:bg-admin/20 dark:text-admin-300";
      case "soft":
        return "bg-primary/5 text-primary/80 hover:bg-primary/10";
      case "dot":
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div
      className={cn(
        // Base styles
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200",
        
        // Variant styling
        getVariantStyles(),
        
        // Dot variant spacing
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
