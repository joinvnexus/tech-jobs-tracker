"use client"
import {
  CategoriesSection,
  CareerTipsSection,
  EmployerCTA,
  HeroSection,
  NewsletterSection,
  TestimonialsSection,
  TopCompaniesSection,
} from "@/components/home"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <CategoriesSection />
      <TopCompaniesSection />
      <TestimonialsSection />
      <CareerTipsSection />
      <EmployerCTA />
      <NewsletterSection />

    </main>
  )
}
