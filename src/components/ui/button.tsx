import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "seeker" | "employer" | "admin" | "gradient" | "soft" | "glow";
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
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-[0.98] hover:active:scale-[0.96]",
          
          // Sizes
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3 text-xs": size === "sm",
            "h-12 rounded-lg px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          
          // Variants
          {
            // Default - Primary Blue (using HSL var)
            "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-ring":
              variant === "default",
            
            // Secondary - Slate
            "bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:-translate-y-0.5":
              variant === "secondary",
            
            // Outline
            "border border-border text-foreground bg-transparent hover:bg-primary/5 hover:border-primary/30 hover:-translate-y-0.5":
              variant === "outline",
            
            // Ghost
            "hover:bg-secondary/50 hover:text-foreground hover:-translate-y-0.5": 
              variant === "ghost",
            
            // Destructive - Red
            "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-destructive":
              variant === "destructive",
            
            // Link
            "text-primary underline-offset-4 hover:underline hover:-translate-y-0.5":
              variant === "link",
            
            // Seeker - Teal (using HSL var)
            "bg-seeker text-white hover:bg-seeker-600 hover:shadow-lg hover:shadow-seeker-500/25 hover:-translate-y-0.5 focus-visible:ring-seeker":
              variant === "seeker",
            
            // Employer - Indigo (using HSL var)
            "bg-employer text-white hover:bg-employer-600 hover:shadow-lg hover:shadow-employer-500/25 hover:-translate-y-0.5 focus-visible:ring-employer":
              variant === "employer",
            
            // Admin - Orange (using HSL var)
            "bg-admin text-white hover:bg-admin-600 hover:shadow-lg hover:shadow-admin-500/25 hover:-translate-y-0.5 focus-visible:ring-admin":
              variant === "admin",

            // Gradient - New
            "bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 focus-visible:ring-primary":
              variant === "gradient",
            
            // Soft - New
            "bg-primary/10 text-primary hover:bg-primary/20 hover:-translate-y-0.5 focus-visible:ring-primary":
              variant === "soft",
            
            // Glow - New
            "bg-primary text-white shadow-lg hover:shadow-primary/40 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-primary":
              variant === "glow",
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
