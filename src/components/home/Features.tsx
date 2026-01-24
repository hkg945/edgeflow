"use client"

import { BarChart2, Zap, Shield } from "lucide-react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export function Features() {
  const t = useTranslations("Home.Features")

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: t("card1Title"),
      description: t("card1Desc"),
      delay: 0
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: t("card2Title"),
      description: t("card2Desc"),
      delay: 0.1
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-blue-400" />,
      title: t("card3Title"),
      description: t("card3Desc"),
      delay: 0.2
    }
  ]

  return (
    <section id="features" className="py-24 relative overflow-hidden">
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
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-base">
        {description}
      </p>
    </motion.div>
  )
}
