import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "xl" | "wide" | "full"
  center?: boolean
}

export function Container({
  children,
  className,
  size = "default",
  center = true
}: ContainerProps) {
  const sizeClasses = {
    default: "max-w-7xl",
    sm: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    wide: "max-w-screen-2xl",
    full: "max-w-full"
  }

  return (
    <div className={cn(
      "mx-auto w-full px-4 sm:px-6 lg:px-8",
      center && "max-w-screen-2xl",
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
}

