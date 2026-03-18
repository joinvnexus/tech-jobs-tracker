import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "seeker" | "employer" | "admin";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-[0.98]",
          
          // Sizes
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3 text-xs": size === "sm",
            "h-12 rounded-lg px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          
          // Variants
          {
            // Default - Brand Blue
            "bg-brand-500 text-white hover:bg-brand-600 hover:shadow-md focus-visible:ring-ring":
              variant === "default",
            
            // Secondary - Gray
            "bg-secondary text-secondary-foreground hover:bg-secondary/80":
              variant === "secondary",
            
            // Outline
            "border-2 border-brand-500 text-brand-600 bg-transparent hover:bg-brand-50":
              variant === "outline",
            
            // Ghost
            "hover:bg-secondary hover:text-foreground": 
              variant === "ghost",
            
            // Destructive - Red
            "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive":
              variant === "destructive",
            
            // Link
            "text-brand-600 underline-offset-4 hover:underline":
              variant === "link",
            
            // Seeker - Teal
            "bg-seeker-500 text-white hover:bg-seeker-600 hover:shadow-lg hover:shadow-seeker-500/25 focus-visible:ring-seeker-500":
              variant === "seeker",
            
            // Employer - Purple  
            "bg-employer-500 text-white hover:bg-employer-600 hover:shadow-lg hover:shadow-employer-500/25 focus-visible:ring-employer-500":
              variant === "employer",
            
            // Admin - Orange
            "bg-admin-500 text-white hover:bg-admin-600 hover:shadow-lg hover:shadow-admin-500/25 focus-visible:ring-admin-500":
              variant === "admin",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
