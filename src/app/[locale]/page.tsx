import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, Zap, Shield, Layers, CheckCircle, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

import { ChartWrapper } from "@/components/chart/ChartWrapper"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
             <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[128px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-blue-300 mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              全新策略構建器現已上線
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              可視化策略組裝，<br />
              <span className="text-gradient">讓交易邏輯觸手可及</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Strategify 幫助交易者透過拖拉組件快速構建策略，並提供強大的回測系統驗證您的交易邏輯，無需編寫程式碼即可將想法轉化為現實。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto text-lg h-12 px-8">
                開始組裝策略 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 px-8 border-white/10 hover:bg-white/5">
                查看即時圖表
              </Button>
            </div>
            
            {/* Dashboard Preview */}
            <div className="mt-20 max-w-5xl mx-auto shadow-2xl shadow-blue-900/20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <ChartWrapper />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">為什麼選擇 Strategify?</h2>
              <p className="text-muted-foreground">我們提供最強大的無代碼策略開發環境，讓任何人都能成為量化交易者</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Layers className="w-10 h-10 text-yellow-400" />}
                title="模組化策略組裝"
                description="透過直觀的拖放介面，像堆積木一樣輕鬆組裝複雜的交易策略，無需編寫程式碼。"
              />
              <FeatureCard 
                icon={<CheckCircle className="w-10 h-10 text-emerald-400" />}
                title="全方位邏輯驗證"
                description="使用歷史數據進行高精度的回測，驗證策略在不同市場環境下的表現，確保邏輯穩健。"
              />
              <FeatureCard 
                icon={<Cpu className="w-10 h-10 text-blue-400" />}
                title="智能參數優化"
                description="AI 輔助尋找最佳參數組合，最大化策略潛力並降低過度擬合風險。"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">簡單透明的訂閱方案</h2>
              <p className="text-muted-foreground">選擇最適合您的交易工具組合</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard 
                title="Starter"
                price="$39"
                features={["3 個活躍策略", "基礎回測功能", "標準指標庫", "社群支援"]}
              />
              <PricingCard 
                title="Pro"
                price="$99"
                isPopular
                features={["10 個活躍策略", "高速雲端回測", "進階邏輯模組", "優先客服支援"]}
              />
              <PricingCard 
                title="Lifetime"
                price="$499"
                features={["無限策略數量", "專屬回測算力", "客製化模組開發", "API 存取權"]}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors group">
      <div className="mb-4 bg-white/5 w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function PricingCard({ title, price, features, isPopular }: { title: string, price: string, features: string[], isPopular?: boolean }) {
  return (
    <div className={cn(
      "p-8 rounded-2xl border flex flex-col relative",
      isPopular ? "bg-white/5 border-blue-500 shadow-2xl shadow-blue-900/20" : "bg-transparent border-white/10"
    )}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          MOST POPULAR
        </div>
      )}
      <h3 className="text-lg font-medium text-muted-foreground mb-2">{title}</h3>
      <div className="text-4xl font-bold text-white mb-6">
        {price} <span className="text-base font-normal text-muted-foreground">/ month</span>
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm text-gray-300">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <Button variant={isPopular ? "gradient" : "outline"} className="w-full">
        選擇此方案
      </Button>
    </div>
  )
}
