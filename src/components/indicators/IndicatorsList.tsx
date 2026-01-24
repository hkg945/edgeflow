"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, ChevronUp, CheckCircle2, Clock, Target } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "@/i18n/routing"

interface Indicator {
  id: string
  icon: React.ReactNode
  color: string
  borderColor: string
}

interface IndicatorsListProps {
  indicators: Indicator[]
}

export function IndicatorsList({ indicators }: IndicatorsListProps) {
  const t = useTranslations("Indicators")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {indicators.map((indicator) => {
        const isExpanded = expandedId === indicator.id
        
        return (
          <div 
            key={indicator.id}
            className={`group relative p-8 rounded-2xl border ${indicator.borderColor} bg-gradient-to-b ${indicator.color} backdrop-blur-sm transition-all duration-300 flex flex-col`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            
            <div className="flex-1">
              {indicator.icon}
              
              <h3 className="text-2xl font-bold text-white mb-3">
                {t(`${indicator.id}.title`)}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t(`${indicator.id}.description`)}
              </p>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pb-6 border-t border-white/10 space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Features
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 pl-6 list-disc">
                        <li>{t(`${indicator.id}.details.feature1`)}</li>
                        <li>{t(`${indicator.id}.details.feature2`)}</li>
                        <li>{t(`${indicator.id}.details.feature3`)}</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-white font-medium">
                        <Target className="w-4 h-4 text-blue-400" />
                        {t(`${indicator.id}.details.bestFor`)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white font-medium">
                        <Clock className="w-4 h-4 text-orange-400" />
                        {t(`${indicator.id}.details.timeframe`)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 mt-4">
              <Button 
                className="flex-1 group/btn" 
                variant={isExpanded ? "secondary" : "outline"}
                onClick={() => toggleExpand(indicator.id)}
              >
                {isExpanded ? t("hideDetails") : t("viewDetails")}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2 group-hover/btn:translate-y-1 transition-transform" />
                )}
              </Button>

              <Link href={`/indicators/${indicator.id}`} className="flex-1">
                <Button className="w-full bg-white/10 hover:bg-white/20 border-white/10 hover:border-white/20 text-white" variant="outline">
                  {t("learnMore")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
