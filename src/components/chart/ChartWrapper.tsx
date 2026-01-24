"use client"

import dynamic from "next/dynamic"

const TradingChart = dynamic(
  () => import("./TradingChart").then((mod) => mod.TradingChart),
  { ssr: false }
)

export function ChartWrapper() {
  return <TradingChart />
}
