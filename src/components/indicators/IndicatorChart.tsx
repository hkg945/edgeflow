"use client"

import { useEffect, useRef } from "react"
import { createChart, ColorType, Time, CandlestickSeries, LineSeries, HistogramSeries, CrosshairMode } from "lightweight-charts"

interface IndicatorChartProps {
  type: "trend" | "oscillator" | "volume"
}

export const IndicatorChart = ({ type }: IndicatorChartProps) => {
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
      height: 450,
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.1)",
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.1)",
        scaleMargins: {
          top: 0.1,
          bottom: type === "oscillator" || type === "volume" ? 0.3 : 0.1,
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    })

    chartRef.current = chart

    // 1. Add Main Candlestick Series
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    })

    const data = generateData()
    candlestickSeries.setData(data)

    // 2. Add Indicator specific series
    if (type === "trend") {
      // Trend: Two Moving Averages (Fast/Slow)
      const fastMA = chart.addSeries(LineSeries, {
        color: "#3b82f6",
        lineWidth: 2,
        title: "Fast Trend",
      })
      const slowMA = chart.addSeries(LineSeries, {
        color: "#8b5cf6",
        lineWidth: 2,
        title: "Slow Trend",
      })

      fastMA.setData(calculateSMA(data, 10))
      slowMA.setData(calculateSMA(data, 30))
    } 
    
    else if (type === "oscillator") {
      // Oscillator: RSI-like line in a separate pane (bottom)
      const oscillatorSeries = chart.addSeries(LineSeries, {
        color: "#f59e0b",
        lineWidth: 2,
        priceScaleId: "oscillator",
        title: "Momentum",
      })
      
      chart.priceScale("oscillator").applyOptions({
        scaleMargins: {
          top: 0.75, // Place at bottom 25%
          bottom: 0,
        },
      })

      oscillatorSeries.setData(calculateOscillator(data))
    } 
    
    else if (type === "volume") {
      // Volume: Histogram in a separate pane (bottom) or overlay at bottom
      const volumeSeries = chart.addSeries(HistogramSeries, {
        priceScaleId: "volume",
        priceFormat: {
          type: "volume",
        },
        title: "Volume Flow",
      })

      chart.priceScale("volume").applyOptions({
        scaleMargins: {
          top: 0.7, // Place at bottom 30%
          bottom: 0,
        },
      })

      volumeSeries.setData(calculateVolume(data))
    }

    // Fit content
    chart.timeScale().fitContent()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [type])

  return (
    <div className="relative w-full h-[450px] bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
      <div ref={chartContainerRef} className="w-full h-full" />
      
      {/* Overlay Info */}
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-2 h-2 rounded-full ${
            type === "trend" ? "bg-blue-500" : 
            type === "oscillator" ? "bg-orange-500" : "bg-green-500"
          }`}></div>
          <span className="text-white font-bold uppercase tracking-wider">
            {type === "trend" ? "EdgeFlow Trend" : 
             type === "oscillator" ? "EdgeFlow Oscillator" : "EdgeFlow Volume"}
          </span>
        </div>
        <div className="text-muted-foreground font-mono">BTC/USD • 1H</div>
      </div>
    </div>
  )
}

// Helpers
function generateData() {
  const initialPrice = 45000
  let currentPrice = initialPrice
  const data = []
  const date = new Date()
  date.setHours(date.getHours() - 150)

  for (let i = 0; i < 150; i++) {
    const volatility = 150
    const change = (Math.random() - 0.5) * volatility
    const open = currentPrice
    const close = currentPrice + change
    const high = Math.max(open, close) + Math.random() * 50
    const low = Math.min(open, close) - Math.random() * 50
    
    currentPrice = close

    data.push({
      time: (date.getTime() / 1000) as Time,
      open,
      high,
      low,
      close,
    })

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

function calculateOscillator(data: any[]) {
  // Simple RSI-like mock
  return data.map((d, i) => ({
    time: d.time,
    value: 50 + Math.sin(i * 0.2) * 30 + (Math.random() - 0.5) * 10
  }))
}

function calculateVolume(data: any[]) {
  return data.map((d) => ({
    time: d.time,
    value: Math.random() * 1000,
    color: d.close > d.open ? "rgba(16, 185, 129, 0.5)" : "rgba(239, 68, 68, 0.5)"
  }))
}
