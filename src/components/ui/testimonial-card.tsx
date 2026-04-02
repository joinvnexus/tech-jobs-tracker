"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  content: string
  rating?: number
  avatar?: string
  variant?: "default" | "featured"
}

export function TestimonialCard({
  name,
  role,
  company,
  content,
  rating = 5,
  avatar,
  variant = "default"
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, type: "spring" }}
      className={cn(
        "relative group p-8 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-glow-brand/50 transition-all duration-500 overflow-hidden",
        variant === "featured" && "border-brand/30 bg-gradient-to-br from-brand-50/60 to-seeker-50/60 shadow-glow-brand/75 col-span-2 lg:col-span-1"
      )}
    >
      {/* Quote bubble */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-500/20 rounded-2xl border-4 border-white/50 flex items-center justify-center shadow-glow-brand">
        <Quote className="h-6 w-6 text-brand-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Rating */}
        {rating && (
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i}
                className={cn(
                  "h-4 w-4 transition-colors",
                  i < rating ? "text-brand-400 fill-brand-400" : "text-muted-foreground/50"
                )}
              />
            ))}
          </div>
        )}

        {/* Testimonial text */}
        <p className="text-lg leading-relaxed text-muted-foreground/90 font-medium italic">
          {content}
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-4 border-t border-border/30">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-seeker-500 text-white font-semibold shadow-lg ring-2 ring-white/50">
            {name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h4 className="font-semibold text-foreground group-hover:text-brand-600 transition-colors">
              {name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {role} @ {company}
            </p>
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}
