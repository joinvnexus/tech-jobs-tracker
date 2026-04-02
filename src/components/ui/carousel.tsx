import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"

interface CarouselProps {
  slides?: React.ReactNode[]
  className?: string
  autoplay?: boolean
  loop?: boolean
  children?: React.ReactNode
}

function toArray(children: React.ReactNode): React.ReactNode[] {
  const result = Array.isArray(children) ? children : [children]
  return result.filter(Boolean)
}

export function Carousel({ slides: slidesProp, className, autoplay = false, loop = true, children }: CarouselProps) {
  const slides = slidesProp ?? toArray(children)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop, 
      align: "start", 
      slidesToScroll: 1
    },
    autoplay ? [Autoplay({ delay: 4000 })] : []
  )

  useEffect(() => {
    if (emblaApi) {
      const handleSelect = () => {
        // Handle indicators, progress etc.
      }
      emblaApi.on("select", handleSelect)
      return () => {
        emblaApi.off("select", handleSelect)
      }
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={cn("group relative w-full", className)}
    >
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="min-w-0 flex-[0_0_100%] lg:flex-[0_0_80%] xl:flex-[0_0_66.66%]"
              initial={{ opacity: 0.7, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-full p-2">
                {slide}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute -left-2 top-1/2 -translate-y-1/2 rounded-full p-1 shadow-lg backdrop-blur-sm border-border/50",
          "lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300",
          "hover:shadow-glow-brand/50 hover:bg-card"
        )}
        onClick={scrollPrev}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute -right-2 top-1/2 -translate-y-1/2 rounded-full p-1 shadow-lg backdrop-blur-sm border-border/50",
          "lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300",
          "hover:shadow-glow-brand/50 hover:bg-card"
        )}
        onClick={scrollNext}
      >
        <ArrowRight className="h-5 w-5" />
      </Button>

      {/* Progress bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-secondary/50 rounded-full overflow-hidden lg:hidden">
        <div className="h-full bg-gradient-to-r from-brand-500 to-seeker-500 shadow-glow-brand rounded-full transition-all duration-1000" />
      </div>
    </motion.div>
  )
}
