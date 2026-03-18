import * as React from "react"
import { TrendingUp, Users, Briefcase, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    positive: boolean
  }
  trend?: "up" | "down" | "stable"
  icon?: React.ComponentType<{ className?: string }>
  variant?: "default" | "seeker" | "employer" | "admin" | "gradient"
  className?: string
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({
    title,
    value,
    change,
    trend = "up",
    icon,
    variant = "default",
    className
  }, ref) => {
    const Icon = icon as React.ComponentType<{ className?: string }> || TrendingUp

    return (
      <Card 
        ref={ref}
        className={cn(
          "group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
          "border-0 bg-gradient-to-br",
          {
            "from-brand-50 to-secondary/70 border-gradient-brand": variant === "default",
            "from-seeker-50 to-secondary/70 border-gradient-seeker": variant === "seeker",
            "from-employer-50 to-secondary/70 border-gradient-employer": variant === "employer", 
            "from-admin-50 to-secondary/70 border-gradient-admin": variant === "admin",
            "from-brand-500/5 to-brand-500/10 backdrop-blur-sm border-brand-500/20": variant === "gradient"
          },
          className
        )}
      >
        <CardHeader className="pb-4 pt-6">
          <div className={cn(
            "absolute -right-4 top-4 h-16 w-16 rounded-2xl p-3 opacity-80 group-hover:opacity-100 transition-all",
            {
              "bg-brand-500 text-white shadow-glow-brand": variant === "default" || variant === "gradient",
              "bg-seeker-500 text-white shadow-glow-seeker": variant === "seeker",
              "bg-employer-500 text-white shadow-glow-employer": variant === "employer",
              "bg-admin-500 text-white shadow-glow-admin": variant === "admin",
            }
          )}>
            <Icon className="h-6 w-6" />
          </div>
          
          <CardTitle className="text-3xl font-bold text-foreground tracking-tight">
            {value}
          </CardTitle>
          
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
        </CardHeader>
        
        {change && (
          <CardContent className="pt-0 pb-6">
            <div className="flex items-center gap-1.5">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : trend === "down" ? (
                <TrendingUp className="h-4 w-4 text-danger rotate-180" />
              ) : (
                <span className="h-4 w-4 rounded-full bg-muted" />
              )}
              <span className={cn(
                "text-sm font-semibold",
                change.positive ? "text-success" : "text-danger"
              )}>
                {change.positive ? "+" : ""}{change.value}%
              </span>
              <span className="text-xs text-muted-foreground">since last month</span>
            </div>
          </CardContent>
        )}
      </Card>
    )
  }
)

StatsCard.displayName = "StatsCard"

export { StatsCard }

