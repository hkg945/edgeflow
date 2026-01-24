"use client"

import { useEffect, useRef } from "react"
import { createChart, ColorType, Time, CandlestickSeries, LineSeries } from "lightweight-charts"

export const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.05)" },
        horzLines: { color: "rgba(255, 255, 255, 0.05)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.1)",
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
    })

    chartRef.current = chart

    // Generate sample data
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    })

    const data = generateData()
    candlestickSeries.setData(data)

    // Add Moving Average Line
    const maSeries = chart.addSeries(LineSeries, {
      color: "#3b82f6",
      lineWidth: 2,
      crosshairMarkerVisible: false,
    })
    
    const maData = calculateSMA(data, 20)
    maSeries.setData(maData)

    // Fit content
    chart.timeScale().fitContent()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [])

  return (
    <div className="relative w-full h-[400px] bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
      <div ref={chartContainerRef} className="w-full h-full" />
      
      {/* Overlay Info */}
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md p-3 rounded-md border border-white/10 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-white font-bold">EdgeFlow AI Signal</span>
        </div>
        <div className="text-muted-foreground">BTC/USD • 1H</div>
      </div>
    </div>
  )
}

// Helper functions for data generation
function generateData() {
  const initialPrice = 45000
  let currentPrice = initialPrice
  const data = []
  const date = new Date()
  date.setHours(date.getHours() - 100) // Start 100 hours ago

  for (let i = 0; i < 100; i++) {
    const volatility = 200
    const open = currentPrice + (Math.random() - 0.5) * volatility
    const close = open + (Math.random() - 0.5) * volatility
    const high = Math.max(open, close) + Math.random() * volatility
    const low = Math.min(open, close) - Math.random() * volatility

    data.push({
      time: (date.getTime() / 1000) as Time,
      open,
      high,
      low,
      close,
    })

    currentPrice = close
    date.setHours(date.getHours() + 1)
  }
  return data
}

function calculateSMA(data: any[], period: number) {
  const smaData = []
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.close, 0)
    smaData.push({
      time: data[i].time,
      value: sum / period,
    })
  }
  return smaData
}
