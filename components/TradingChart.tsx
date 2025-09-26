'use client'

import { useEffect, useRef } from 'react'
import { createChart, ColorType } from 'lightweight-charts'

interface TradingChartProps {
  className?: string
}

export default function TradingChart({ className }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#ffffff',
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      crosshair: {
        mode: 0,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    })

    chartRef.current = chart

    // Generate mock data
    const mockData = []
    const basePrice = 45000
    const now = Date.now()
    
    for (let i = 0; i < 100; i++) {
      const time = now - (100 - i) * 24 * 60 * 60 * 1000 // Daily data
      const price = basePrice + Math.sin(i * 0.1) * 5000 + Math.random() * 2000 - 1000
      mockData.push({
        time: Math.floor(time / 1000),
        value: Math.round(price),
      })
    }

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#00FF00',
      downColor: '#FF0000',
      borderDownColor: '#FF0000',
      borderUpColor: '#00FF00',
      wickDownColor: '#FF0000',
      wickUpColor: '#00FF00',
    })

    // Generate candlestick data
    const candlestickData = []
    for (let i = 0; i < mockData.length; i++) {
      const base = mockData[i].value
      const open = base + (Math.random() - 0.5) * 1000
      const close = base + (Math.random() - 0.5) * 1000
      const high = Math.max(open, close) + Math.random() * 500
      const low = Math.min(open, close) - Math.random() * 500
      
      candlestickData.push({
        time: mockData[i].time as any,
        open: Math.round(open),
        high: Math.round(high),
        low: Math.round(low),
        close: Math.round(close),
      })
    }

    candlestickSeries.setData(candlestickData)

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartRef.current) {
        chartRef.current.remove()
      }
    }
  }, [])

  return (
    <div className={`w-full ${className}`}>
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  )
}
