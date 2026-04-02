"use client"

import { motion } from "framer-motion"
import { Carousel } from "@/components/ui/carousel"
import { TestimonialCard } from "@/components/ui/testimonial-card"


const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Senior Frontend Developer",
    company: "TechNova Solutions",
    content: "HireHub transformed my job search. Found my dream role at TechNova within 2 weeks. The personalized recommendations and fast application process made all the difference.",
    rating: 5,
    avatar: "/avatars/ayesha.jpg"
  },
  {
    name: "Rahim Khan",
    role: "CTO & Founder",
    company: "ScaleUp Ventures",
    content: "Best platform for hiring top talent in Bangladesh. Quality candidates, easy filtering, and their verification process saves us hours. Highly recommend!",
    rating: 5,
    avatar: "/avatars/rahim.jpg",
    variant: "featured" as const
  },
  {
    name: "Fatema Begum",
    role: "Product Manager",
    company: "InnovateLabs",
    content: "User-friendly interface and excellent support. Applied to 15 roles and got 4 interviews in the first week. The profile completion tips were game-changing.",
    rating: 4.9,
    avatar: "/avatars/fatema.jpg"
  },
  {
    name: "Karim Ahmed",
    role: "HR Lead",
    company: "DigitalBridge",
    content: "Streamlined our hiring process. Got 200+ qualified applicants for our engineering roles. Built-in applicant tracking and resume parsing is fantastic.",
    rating: 5,
    avatar: "/avatars/karim.jpg"
  }
]

export function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-seeker-500/10 to-employer-500/10 blur-3xl animate-float-slow" />
        <div className="absolute right-0 bottom-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-brand-500/5 to-primary/10 blur-3xl animate-pulse-slow" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container-app relative"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto text-center space-y-8 mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-foreground to-brand-600 bg-clip-text text-transparent">
            Trusted by thousands
          </h2>
          <p className="text-2xl font-semibold text-foreground">
            of professionals
          </p>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed">
Don&apos;t just take our word for it. Join 25k+ job seekers and 2k+ companies who&apos;ve found
          </p>
        </motion.div>

        <Carousel autoplay loop className="max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              {...testimonial}
            />
          ))}
        </Carousel>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground/70 mb-6">
            4.9/5 average rating from 10k+ reviews
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
