import { currentUser } from "@clerk/nextjs/server"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Lock, Zap, CreditCard, LayoutDashboard, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"
import { TradingViewAccountDialog } from "@/components/dashboard/TradingViewAccountDialog"
import { getTranslations } from "next-intl/server"

export default async function DashboardPage() {
  const user = await currentUser()
  const t = await getTranslations("Dashboard")

  if (!user) return null

  const plan = user.publicMetadata?.plan as string | undefined
  const tradingViewUsername = user.publicMetadata?.tradingViewUsername as string | undefined
  const isPro = !!plan && plan !== "free"
  
  const planName = {
    "monthly": t("plan.monthly"),
    "quarterly": t("plan.quarterly"),
    "yearly": t("plan.yearly")
  }[plan || ""] || t("plan.free")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("welcome", { name: user.firstName || user.username || t("welcomeDefault") })}
          </h1>
          <p className="text-muted-foreground">
            {t("statusPrefix")}
            <span className={`font-medium ml-2 ${isPro ? "text-blue-400" : "text-green-500"}`}>
              {planName}
            </span>
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Subscriptions */}
          <div className="col-span-1 md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold text-white">{t("activeIndicators.title")}</h2>
            </div>
            
            <div className="space-y-4">
              {/* TradingView Account Alert */}
              {isPro && !tradingViewUsername && (
                <div className="p-4 mb-6 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-500 mb-1">{t("activeIndicators.alert.title")}</h3>
                    <p className="text-sm text-yellow-200/70 mb-3">
                      {t("activeIndicators.alert.description")}
                    </p>
                    <div className="w-fit">
                      <TradingViewAccountDialog />
                    </div>
                  </div>
                </div>
              )}

              {isPro ? (
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-500/20 rounded-md">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{t("activeIndicators.trend.title")}</h3>
                        <p className="text-xs text-muted-foreground">{t("activeIndicators.trend.description")}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      {t("activeIndicators.enabled")}
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-500/20 rounded-md">
                        <LayoutDashboard className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{t("activeIndicators.volatility.title")}</h3>
                        <p className="text-xs text-muted-foreground">{t("activeIndicators.volatility.description")}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      {t("activeIndicators.enabled")}
                    </Button>
                  </div>

                  <div className="mt-4 p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-300 mb-2">{t("activeIndicators.instruction.title")}</h4>
                    <p className="text-sm text-blue-200/70">
                      {t("activeIndicators.instruction.text")}
                      <br />
                      {t.rich("activeIndicators.instruction.accountNote", {
                        account: (chunks) => <span className="text-white font-medium">{tradingViewUsername || t("account.notSet")}</span>
                      })}
                    </p>
                  </div>
                </div>
              ) : (
                /* Empty State for Free Users */
                <div className="text-center py-10 bg-black/20 rounded-lg border border-dashed border-white/10">
                  <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-white mb-1">{t("activeIndicators.empty.title")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("activeIndicators.empty.description")}
                  </p>
                  <Link href="/#pricing">
                    <Button variant="gradient" size="sm">{t("activeIndicators.empty.button")}</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account & Billing */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <CreditCard className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className="text-xl font-bold text-white">{t("account.title")}</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">{t("account.email")}</span>
                  <span className="text-sm text-white truncate max-w-[150px]">
                    {user.emailAddresses[0]?.emailAddress}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">{t("account.tier")}</span>
                  <span className={`text-sm font-medium ${isPro ? "text-blue-400" : "text-muted-foreground"}`}>
                    {isPro ? t("account.proTier") : t("account.freeTier")}
                  </span>
                </div>
                
                <div className="py-3 border-b border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">{t("account.tradingViewAccount")}</span>
                    <span className={`text-sm ${tradingViewUsername ? "text-white" : "text-yellow-500"}`}>
                      {tradingViewUsername || t("account.notSet")}
                    </span>
                  </div>
                  <TradingViewAccountDialog initialUsername={tradingViewUsername} />
                </div>

                {isPro && (
                   <div className="flex justify-between items-center py-3 border-b border-white/5">
                     <span className="text-sm text-muted-foreground">{t("account.nextBilling")}</span>
                     <span className="text-sm text-white">2026-02-24</span>
                   </div>
                )}
                <Button variant="outline" className="w-full mt-2">
                  {isPro ? t("account.manageSubscription") : t("account.upgrade")}
                </Button>
              </div>
            </div>

            {/* Admin Tools - Blog Management */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 h-fit">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <LayoutDashboard className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Admin Tools</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your blog posts and content.
              </p>
              <Link href="/dashboard/blog">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Manage Blog
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
