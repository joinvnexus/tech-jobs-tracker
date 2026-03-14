import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = {
  default:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "text-foreground border-border",
  destructive:
    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
} as const

export type BadgeVariant = keyof typeof badgeVariants

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
          badgeVariants[variant],
          className,
        )}
        {...props}
      />
    )
  },
)

Badge.displayName = "Badge"

