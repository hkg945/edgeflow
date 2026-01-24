"use client"

import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser, useClerk } from "@clerk/nextjs"
import { subscribeToPlan } from "@/actions/subscription"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  popular?: boolean
  buttonText?: string
  planId: string
}

export function PricingCard({ title, price, features, popular, buttonText, planId }: PricingCardProps) {
  const { isSignedIn, user } = useUser()
  const { openSignIn } = useClerk()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!isSignedIn) {
      openSignIn()
      return
    }

    if (confirm(`確認要訂閱 ${title} 方案嗎？(此為模擬測試，不會實際扣款)`)) {
      setIsLoading(true)
      try {
        await subscribeToPlan(planId)
        router.push("/dashboard")
      } catch (error) {
        console.error("Subscription failed:", error)
        alert("訂閱失敗，請稍後再試")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className={cn(
      "relative p-8 rounded-2xl border flex flex-col h-full transition-all duration-300",
      popular 
        ? "bg-blue-900/10 border-blue-500 shadow-2xl shadow-blue-900/20 hover:shadow-blue-500/20" 
        : "bg-white/5 border-white/10 hover:border-blue-500/30"
    )}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/50">
          MOST POPULAR
        </div>
      )}
      
      <h3 className="text-lg font-medium text-muted-foreground mb-4">{title}</h3>
      <div className="mb-8">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-muted-foreground">/mo</span>
      </div>
      
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
            <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      
      <Button 
        variant={popular ? "gradient" : "outline"} 
        className="w-full"
        onClick={handleSubscribe}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          buttonText || "Subscribe"
        )}
      </Button>
    </div>
  )
}
