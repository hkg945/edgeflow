"use client"

import { useTranslations } from "next-intl"
import { PricingCard } from "@/components/pricing/PricingCard"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function Pricing() {
  const t = useTranslations("Home.Pricing")
  const tHome = useTranslations("Home")

  return (
    <section id="pricing" className="py-24 relative">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="md:hidden flex items-center gap-2 text-sm text-muted-foreground mb-4 animate-pulse px-1">
          <ArrowRight className="w-4 h-4" />
          {tHome("swipeHint")}
        </div>

        <div className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 -mx-4 px-4 gap-4 md:grid md:grid-cols-3 md:gap-8 md:pb-0 md:mx-auto md:px-0 max-w-6xl">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0 }}
             className="min-w-[85vw] md:min-w-0 snap-center h-full"
          >
            <PricingCard 
              title={t("monthly")}
              price="$39"
              features={[t("feature1"), t("feature2"), t("feature3"), t("feature4")]}
              buttonText={t("subscribe")}
              planId="monthly"
            />
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="min-w-[85vw] md:min-w-0 snap-center h-full transform md:-translate-y-4"
          >
            <PricingCard 
              title={t("quarterly")}
              price="$99"
              popular
              features={[t("feature1"), t("feature2"), t("feature3"), t("feature4")]}
              buttonText={t("subscribe")}
              planId="quarterly"
            />
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="min-w-[85vw] md:min-w-0 snap-center h-full"
          >
            <PricingCard 
              title={t("yearly")}
              price="$299"
              features={[t("feature1"), t("feature2"), t("feature3"), t("feature4")]}
              buttonText={t("subscribe")}
              planId="yearly"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
