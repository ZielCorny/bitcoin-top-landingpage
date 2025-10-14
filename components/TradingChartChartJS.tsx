'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

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

export default function TradingChartChartJS({ 
  className, 
  height = 500, 
  useLogScale = false,
  onLogScaleChange 
}: TradingChartProps) {
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
        
        // Remove duplicates and sort by date
        const uniqueData = data.filter((item, index, arr) => {
          return arr.findIndex(other => other.date === item.date) === index
        })
        
        uniqueData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        
        // Sample data for better performance - take every 7th point (weekly sampling)
        const sampledData = uniqueData.filter((_, index) => index % 7 === 0)
        
        setCsvData(sampledData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading CSV data:', error)
        setIsLoading(false)
      }
    }

    loadCSVData()
  }, [])

  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  // Prepare data for Chart.js
  const labels = csvData.map(item => item.date)
  const priceValues = csvData.map(item => useLogScale ? item.btc_close_log : item.btc_close)
  const indicatorValues = csvData.map(item => item.combined_zscore)

  // Create gradient colors for price line based on indicator values
  const createGradientColors = () => {
    const colors: string[] = []
    indicatorValues.forEach(indicator => {
      if (indicator > 1) {
        colors.push('#FF4444') // Red for selling region
      } else if (indicator < -1) {
        colors.push('#44FF44') // Green for buying region
      } else {
        colors.push('#FFFFFF') // White for neutral region
      }
    })
    return colors
  }

  // Create simplified background regions for better performance
  const createBackgroundRegions = () => {
    const regions: any[] = []
    
    // Sample every 10th point for background regions to improve performance
    for (let i = 0; i < indicatorValues.length; i += 10) {
      const indicator = indicatorValues[i]
      let regionColor = ''
      
      if (indicator > 1) {
        regionColor = 'rgba(255, 68, 68, 0.1)' // Red background
      } else if (indicator < -1) {
        regionColor = 'rgba(68, 255, 68, 0.1)' // Green background
      }
      
      if (regionColor) {
        regions.push({
          start: i,
          end: Math.min(i + 9, indicatorValues.length - 1),
          color: regionColor
        })
      }
    }
    
    return regions
  }

  const backgroundRegions = createBackgroundRegions()

  const data = {
    labels,
    datasets: [
      // Background regions
      ...backgroundRegions.map((region, index) => ({
        label: '',
        data: new Array(labels.length).fill(null).map((_, i) => 
          i >= region.start && i <= region.end ? (useLogScale ? 8 : 100000) : null
        ),
        backgroundColor: region.color,
        borderColor: 'transparent',
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 0,
        order: 0,
      })),
      // Price line with segment colors
      {
        label: 'BTC Price',
        data: priceValues,
        borderColor: '#FFFFFF', // Default color
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fill: false,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        borderWidth: 2,
        yAxisID: 'y',
        order: 1,
        segment: {
          borderColor: (ctx: any) => {
            const index = ctx.p1DataIndex
            const indicator = indicatorValues[index]
            if (indicator > 1) return '#FF4444' // Red for selling
            if (indicator < -1) return '#44FF44' // Green for buying
            return '#FFFFFF' // White for neutral
          },
        },
      },
      // Indicator line
      {
        label: 'Indicator',
        data: indicatorValues,
        borderColor: '#DDFF00',
        backgroundColor: 'rgba(221, 255, 0, 0.1)',
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
        yAxisID: 'y1',
        order: 2,
      },
      // Threshold lines
      {
        label: 'Upper Threshold',
        data: new Array(labels.length).fill(1),
        borderColor: '#FF4444',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 1,
        yAxisID: 'y1',
        order: 3,
      },
      {
        label: 'Lower Threshold',
        data: new Array(labels.length).fill(-1),
        borderColor: '#44FF44',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 1,
        yAxisID: 'y1',
        order: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Disable animations for better performance
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    elements: {
      point: {
        radius: 0, // Hide points for better performance
        hoverRadius: 3,
      },
      line: {
        tension: 0, // Disable smooth curves for better performance
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
        title: {
          display: true,
          text: 'BTC Price',
          color: '#ffffff',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#ffffff',
        },
        title: {
          display: true,
          text: 'Indicator',
          color: '#ffffff',
        },
      },
    },
  }

  return (
    <div className={`w-full ${className}`}>
      <div style={{ height: `${height}px` }}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
