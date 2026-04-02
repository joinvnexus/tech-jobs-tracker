import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "bordered" | "elevated" | "glass" | "interactive" | "gradient";
    accent?: "none" | "brand" | "seeker" | "employer" | "admin";
    interactive?: boolean;
  }
>(({ className, variant = "default", accent = "none", interactive = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base styles
      "rounded-xl transition-all duration-200 ease-out",
      
      // Interactive variant
      interactive && "cursor-pointer hover:border-primary/30 hover:shadow-lg hover:-translate-y-1",
      
      // Variants
      {
        "bg-card text-card-foreground border border-border/60 shadow-sm": variant === "default",
        "bg-transparent border-2 border-border shadow-sm": variant === "bordered",
        "bg-card border border-border/40 shadow-md hover:shadow-lg transition-shadow duration-300": variant === "elevated",
        "bg-card/80 backdrop-blur-md border border-white/20 shadow-sm": variant === "glass",
        "cursor-pointer border border-border/40 shadow-sm hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-200": variant === "interactive",
        "bg-gradient-to-br from-card to-card/50 border border-border/40 shadow-sm": variant === "gradient",
      },
      
      // Accent borders
      {
        "border-l-4": accent !== "none",
        "border-l-primary": accent === "brand",
        "border-l-seeker-500": accent === "seeker",
        "border-l-employer-500": accent === "employer",
        "border-l-admin-500": accent === "admin",
      },
      
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-heading text-xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
