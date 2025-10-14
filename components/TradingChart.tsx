'use client'

import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType } from 'lightweight-charts'

interface TradingChartProps {
  className?: string
  height?: number
  useLogScale?: boolean
  onLogScaleChange?: (useLog: boolean) => void
}

interface CSVData {
  date: string
  btc_close: number
  btc_close_log: number
  combined_zscore: number
}

export default function TradingChart({ 
  className, 
  height = 500, 
  useLogScale = false,
  onLogScaleChange 
}: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)
  const [csvData, setCsvData] = useState<CSVData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load CSV data
  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const response = await fetch('/bitcoin-top.csv')
        const csvText = await response.text()
        
        const lines = csvText.split('\n')
        const data: CSVData[] = []
        
        // Skip header row
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (line) {
            const [date, btc_close, btc_close_log, combined_zscore] = line.split(',')
            data.push({
              date,
              btc_close: parseFloat(btc_close),
              btc_close_log: parseFloat(btc_close_log),
              combined_zscore: parseFloat(combined_zscore)
            })
          }
        }
        
        setCsvData(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading CSV data:', error)
        setIsLoading(false)
      }
    }

    loadCSVData()
  }, [])

  useEffect(() => {
    if (!chartContainerRef.current || csvData.length === 0) return

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#ffffff',
      },
      width: chartContainerRef.current.clientWidth,
      height: height,
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
      leftPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        visible: true,
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    })

    chartRef.current = chart

    // Prepare price data
    const priceData = csvData.map(item => ({
      time: item.date as any,
      value: useLogScale ? item.btc_close_log : item.btc_close,
    }))

    // Prepare indicator data
    const indicatorData = csvData.map(item => ({
      time: item.date as any,
      value: item.combined_zscore,
    }))

    // Add price line series
    const priceSeries = chart.addLineSeries({
      color: '#FFFFFF', // Neon lime color matching website background
      lineWidth: 2,
      priceScaleId: 'right',
    })

    // Add indicator line series on left axis
    const indicatorSeries = chart.addLineSeries({
      color: '#DDFF00', // White color
      lineWidth: 2,
      priceScaleId: 'left',
    })

    priceSeries.setData(priceData)
    indicatorSeries.setData(indicatorData)

    // Add horizontal threshold lines for buying and selling regions
    // Upper threshold (Selling region) at +1
    const upperThreshold = chart.addLineSeries({
      color: '#FF4444', // Red color for selling region
      lineWidth: 1,
      lineStyle: 2, // Dashed line
      priceScaleId: 'left',
    })
    
    // Lower threshold (Buying region) at -1
    const lowerThreshold = chart.addLineSeries({
      color: '#44FF44', // Green color for buying region
      lineWidth: 1,
      lineStyle: 2, // Dashed line
      priceScaleId: 'left',
    })

    // Create threshold data spanning the entire time range
    const timeRange = {
      start: csvData[0]?.date,
      end: csvData[csvData.length - 1]?.date
    }

    if (timeRange.start && timeRange.end) {
      const upperThresholdData = [
        { time: timeRange.start as any, value: 1 },
        { time: timeRange.end as any, value: 1 }
      ]
      
      const lowerThresholdData = [
        { time: timeRange.start as any, value: -1 },
        { time: timeRange.end as any, value: -1 }
      ]

      upperThreshold.setData(upperThresholdData)
      lowerThreshold.setData(lowerThresholdData)
    }

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
  }, [csvData, useLogScale, height])

  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <div ref={chartContainerRef} className="w-full" style={{ height: `${height}px` }} />
    </div>
  )
}
