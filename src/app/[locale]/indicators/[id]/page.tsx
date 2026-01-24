import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { getTranslations } from "next-intl/server"
import { BarChart2, Activity, Layers, ArrowLeft, CheckCircle2, HelpCircle } from "lucide-react"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { IndicatorChart } from "@/components/indicators/IndicatorChart"

export default async function IndicatorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const t = await getTranslations("Indicators")

  const indicators = {
    trend: {
      id: "trend",
      icon: <Activity className="w-16 h-16 text-blue-500 mb-6" />,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    oscillator: {
      id: "oscillator",
      icon: <Layers className="w-16 h-16 text-purple-500 mb-6" />,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    volume: {
      id: "volume",
      icon: <BarChart2 className="w-16 h-16 text-green-500 mb-6" />,
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
  }

  const indicator = indicators[id as keyof typeof indicators]

  if (!indicator) {
    return <div>Indicator not found</div>
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link href="/indicators">
            <Button variant="ghost" className="mb-8 hover:bg-white/5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Indicators
            </Button>
          </Link>

          {/* Hero Section */}
          <div className={`relative p-8 md:p-12 rounded-3xl border ${indicator.borderColor} bg-gradient-to-b ${indicator.color} backdrop-blur-sm mb-12`}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center">
                {indicator.icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t(`${id}.title`)}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t(`${id}.fullDescription.intro`)}
              </p>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Chart & Stats Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white text-center">{t("sectionHeaders.livePreview")}</h2>
              <IndicatorChart type={id as "trend" | "oscillator" | "volume"} />
              
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {t(`${id}.fullDescription.stats.winRate`)}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("sectionHeaders.stats.winRate")}</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                    {t(`${id}.fullDescription.stats.profitFactor`)}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("sectionHeaders.stats.profitFactor")}</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                    {t(`${id}.fullDescription.stats.trades`)}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("sectionHeaders.stats.trades")}</div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-white">{t("sectionHeaders.howItWorks")}</h2>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t(`${id}.fullDescription.howItWorks`)}
                </p>
              </div>
            </section>

            {/* Key Benefits */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-white">{t("sectionHeaders.keyBenefits")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                    <p className="text-muted-foreground">
                      {t(`${id}.fullDescription.keyBenefits.${index}`)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-muted-foreground" />
                {t("sectionHeaders.faq")}
              </h2>
              <div className="grid gap-4">
                {[0, 1].map((index) => (
                  <div key={index} className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t(`${id}.fullDescription.faq.${index}.q`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`${id}.fullDescription.faq.${index}.a`)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="text-center pt-12">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  Get Started with {t(`${id}.title`)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
