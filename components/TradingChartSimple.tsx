'use client'

import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

  // Prepare data for Chart.js - simple and fast
  const labels = csvData.map(item => item.date)
  const priceValues = csvData.map(item => useLogScale ? item.btc_close_log : item.btc_close)
  const indicatorValues = csvData.map(item => item.combined_zscore)

  const data = {
    labels,
    datasets: [
      // Price line - simple white line
      {
        label: 'BTC Price',
        data: priceValues,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        borderWidth: 2,
        yAxisID: 'y',
      },
      // Indicator line - simple yellow line
      {
        label: 'Indicator',
        data: indicatorValues,
        borderColor: '#DDFF00',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        borderWidth: 2,
        yAxisID: 'y1',
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
