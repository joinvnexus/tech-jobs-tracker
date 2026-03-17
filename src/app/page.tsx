import {
  CategoriesSection,
  CareerTipsSection,
  EmployerCTA,
  HeroSection,
  TopCompaniesSection,
} from "@/components/home"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <CategoriesSection />
      <TopCompaniesSection />
      <CareerTipsSection />
      <EmployerCTA />
    </main>
  )
}
