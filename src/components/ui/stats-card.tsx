import { motion, useAnimationControls } from "framer-motion"
import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface StatsCardProps {
  title: string
  value: number
  description?: string
  icon?: ReactNode
  trend?: "up" | "down"
  variant?: "seeker" | "employer" | "admin" | "default"
  className?: string
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  variant = "default",
  className
}: StatsCardProps) {
  const controls = useAnimationControls()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          controls.start("animate")
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const cardElement = document.querySelector(`[data-stats-card]`)
    if (cardElement) observer.observe(cardElement)

    return () => observer.disconnect()
  }, [controls])

  const animateCounter = {
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  }

  const getVariantColors = (variant: StatsCardProps["variant"]): { bg: string; glow: string; ring: string } => {
    const colors: Record<string, { bg: string; glow: string; ring: string }> = {
      seeker: { bg: "from-seeker-50 to-blue-50/50", glow: "shadow-glow-seeker", ring: "ring-seeker-500/20" },
      employer: { bg: "from-employer-50 to-purple-50/50", glow: "shadow-glow-employer", ring: "ring-employer-500/20" },
      admin: { bg: "from-admin-50 to-orange-50/50", glow: "shadow-glow-admin", ring: "ring-admin-500/20" },
      default: { bg: "from-muted/20 to-muted/10", glow: "", ring: "ring-brand-500/20" }
    }
    const key = variant || "default"
    return colors[key] || colors.default
  }

  const variantColors = getVariantColors(variant)

  return (
    <motion.div
      data-stats-card
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? "animate" : "initial"}
      variants={{
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, staggerChildren: 0.1 }
        }
      }}
      className="w-full"
    >
      <Card className={cn(
        "group relative overflow-hidden border-0 bg-gradient-to-br hover:scale-[1.02] transition-all duration-500 cursor-pointer",
        variantColors.bg,
        variantColors.glow,
        variantColors.ring,
        "hover:shadow-glow-brand/75 hover:shadow-2xl",
        className
      )}>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-3 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg group-hover:rotate-3 transition-transform duration-500"
              initial={{ scale: 0.8, rotate: -10 }}
              animate="animate"
              variants={{
                animate: {
                  scale: 1,
                  rotate: 0,
                  transition: { type: "spring", stiffness: 400, damping: 15 }
                }
              }}
            >
              {icon}
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <motion.div 
            animate={controls}
            variants={animateCounter}
            className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-brand-600 bg-clip-text text-transparent"
          >
            {value.toLocaleString()}
          </motion.div>
          
          {description && (
            <CardDescription className="mt-2 text-sm font-medium text-muted-foreground/80">
              {description}
            </CardDescription>
          )}
          
          {trend && (
            <div className={cn(
              "mt-3 flex items-center gap-1 text-sm font-semibold",
              trend === "up" ? "text-success" : "text-destructive"
            )}>
              {trend === "up" ? "↗" : "↘"} 12% from last month
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

