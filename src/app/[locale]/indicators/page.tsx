import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { getTranslations } from "next-intl/server"
import { BarChart2, Activity, Layers } from "lucide-react"
import { IndicatorsList } from "@/components/indicators/IndicatorsList"

export default async function IndicatorsPage() {
  const t = await getTranslations("Indicators")

  const indicators = [
    {
      id: "trend",
      icon: <Activity className="w-12 h-12 text-blue-500 mb-4" />,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: "oscillator",
      icon: <Layers className="w-12 h-12 text-purple-500 mb-4" />,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: "volume",
      icon: <BarChart2 className="w-12 h-12 text-green-500 mb-4" />,
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          {/* Grid */}
          <IndicatorsList indicators={indicators} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
