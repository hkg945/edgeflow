import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Features"
import { Pricing } from "@/components/home/Pricing"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
      </main>

      <Footer />
    </div>
  )
}
