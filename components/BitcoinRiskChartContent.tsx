'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom'
import 'chartjs-adapter-date-fns'

ChartJS.register(zoomPlugin)

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
)

interface BitcoinRiskChartProps {
  className?: string
  height?: number
}

interface CSVData {
  date: string
  btc_close: number
  btc_close_log: number
  combined_zscore: number
  zscore_0_100: number
}

function BitcoinRiskChartContent({ 
  className = '', 
  height = 494 
}: BitcoinRiskChartProps) {
  const [csvData, setCsvData] = useState<CSVData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [useLogScale, setUseLogScale] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(180) // 180 = 6M
  const [signalColor, setSignalColor] = useState('hsl(20, 100%, 50%)')
  const [signalColorAlpha, setSignalColorAlpha] = useState('hsla(20, 100%, 50%, 0.2)')
  const chartRef = useRef<ChartJS<'line'>>(null)

  // Resolve CSS variables on mount
  useEffect(() => {
    const resolveSignalColor = () => {
      if (typeof window !== 'undefined') {
        const computedStyle = getComputedStyle(document.documentElement)
        const signalValue = computedStyle.getPropertyValue('--signal').trim()
        setSignalColor(`hsl(${signalValue})`)
        setSignalColorAlpha(`hsla(${signalValue}, 0.2)`)
      }
    }

    resolveSignalColor()
  }, [])

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
            const [date, btc_close, btc_close_log, combined_zscore, zscore_0_100] = line.split(',')
            data.push({
              date,
              btc_close: parseFloat(btc_close),
              btc_close_log: parseFloat(btc_close_log),
              combined_zscore: parseFloat(combined_zscore),
              zscore_0_100: parseFloat(zscore_0_100)
            })
          }
        }
        
        // Remove duplicates and sort by date
        const uniqueData = data.filter((item, index, arr) => {
          return arr.findIndex(other => other.date === item.date) === index
        })
        
        uniqueData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        
        setCsvData(uniqueData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading CSV data:', error)
        setIsLoading(false)
      }
    }

    loadCSVData()
  }, [])

  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    if (!selectedPeriod) return csvData
    
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - selectedPeriod)
    
    return csvData.filter(item => new Date(item.date) >= cutoffDate)
  }, [csvData, selectedPeriod])

  // Memoize chart data preparation with performance optimization for large datasets
  const chartData = useMemo(() => {
    let dataToUse = filteredData
    
    // Apply data sampling for performance on large datasets
    if (selectedPeriod === null) {
      // MAX: Use every 7th data point
      dataToUse = filteredData.filter((_, index) => index % 7 === 0)
    } else if (selectedPeriod === 2190) {
      // 6Y: Use every 3rd data point
      dataToUse = filteredData.filter((_, index) => index % 3 === 0)
    }
    
    const labels = dataToUse.map(item => item.date)
    const priceValues = dataToUse.map(item => useLogScale ? item.btc_close_log : item.btc_close)
    
    // Use the pre-calculated zscore_0_100 values directly
    const indicatorValues = dataToUse.map(item => item.zscore_0_100)

    return { labels, priceValues, indicatorValues }
  }, [filteredData, useLogScale, selectedPeriod])

  // Memoize tooltip callbacks for better performance
  const tooltipCallbacks = useMemo(() => ({
    label: function(context: any) {
      const label = context.dataset.label || ''
      if (label === 'BTC Price') {
        const value = useLogScale ? Math.exp(context.parsed.y) : context.parsed.y
        return `${label}: $${value.toLocaleString()}`
      }
      if (label === 'Risk Indicator') {
        // Get the original z-score from the sampled data point
        const dataIndex = context.dataIndex
        let dataToUse = filteredData
        
        // Apply same sampling logic as in chartData
        if (selectedPeriod === null) {
          dataToUse = filteredData.filter((_, index) => index % 7 === 0)
        } else if (selectedPeriod === 2190) {
          dataToUse = filteredData.filter((_, index) => index % 3 === 0)
        }
        
        const originalZScore = dataToUse[dataIndex]?.combined_zscore || 0
        return `${label}: ${originalZScore.toFixed(2)} (${context.parsed.y.toFixed(0)}/100)`
      }
      return `${label}: ${context.parsed.y.toFixed(2)}`
    }
  }), [useLogScale, filteredData, selectedPeriod])

  // Memoize chart options
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: false as const,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 4,
      },
      line: {
        tension: 0,
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
        borderColor: signalColor,
        borderWidth: 1,
        titleFont: {
          family: 'zz_type_mon, monospace',
        },
        bodyFont: {
          family: 'zz_type_mon, monospace',
        },
        callbacks: tooltipCallbacks
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1, // Slower zoom for smoother experience
          },
          pinch: {
            enabled: true
          },
          mode: 'x' as const,
        },
        pan: {
          enabled: true,
          mode: 'x' as const,
        },
        limits: {
          x: { min: 'original' as const, max: 'original' as const }
        }
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          parser: 'yyyy-MM-dd',
          tooltipFormat: 'MMM dd, yyyy',
          displayFormats: {
            day: 'MMM dd',
            month: 'MMM yyyy',
            year: 'yyyy'
          }
        },
        display: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#FFFFFF',
          maxTicksLimit: 8,
          font: {
            family: 'zz_type_mon, monospace',
          },
        },
      },
      y: {
        type: useLogScale ? 'logarithmic' as const : 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#FFFFFF',
          font: {
            family: 'zz_type_mon, monospace',
          },
          callback: function(value: any) {
            if (useLogScale) {
              return '$' + Math.exp(value).toLocaleString()
            }
            return '$' + value.toLocaleString()
          }
        },
        title: {
          display: true,
          text: 'BTC Price',
          color: '#FFFFFF',
          font: {
            family: 'zz_type_mon, monospace',
            size: 12,
            weight: 'normal' as const
          }
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        min: 0,
        max: 100,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#FFFFFF',
          stepSize: 20,
          font: {
            family: 'zz_type_mon, monospace',
          },
        },
        title: {
          display: true,
          text: 'Risk Indicator (0-100)',
          color: '#FFFFFF',
          font: {
            family: 'zz_type_mon, monospace',
            size: 12,
            weight: 'normal' as const
          }
        },
      },
    },
  }), [useLogScale, tooltipCallbacks, signalColor])

  // Memoize the chart data object
  const data = useMemo(() => ({
    labels: chartData.labels,
    datasets: [
      // BTC Price line
      {
        label: 'BTC Price',
        data: chartData.priceValues,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
        yAxisID: 'y',
        order: 1,
      },
      // Indicator area with solid color for better performance
      {
        label: 'Risk Indicator',
        data: chartData.indicatorValues,
        borderColor: signalColor,
        backgroundColor: signalColorAlpha,
        fill: true,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
        yAxisID: 'y1',
        order: 2,
      },
    ],
  }), [chartData, signalColor, signalColorAlpha])

  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  const handleScaleChange = (scale: 'linear' | 'logarithmic') => {
    setUseLogScale(scale === 'logarithmic')
  }

  const handlePeriodChange = (period: number | null) => {
    setSelectedPeriod(period)
    
    // Reset zoom/pan to fit the filtered data into view
    setTimeout(() => {
      if (chartRef.current) {
        chartRef.current.resetZoom()
      }
    }, 100) // Small delay to ensure data has been updated
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-black border border-gray-700 p-6">
        {/* Chart */}
        <div style={{ height: `${height}px`, width: '100%' }}>
          <Line ref={chartRef} data={data} options={options} />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 mt-4 flex-wrap">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleScaleChange('linear')}
              className={`px-3 py-2 text-sm transition-colors relative ${
                !useLogScale
                  ? 'text-[hsl(var(--signal))]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              style={{ fontFamily: 'zz_type_mon, monospace' }}
            >
              Linear
              {!useLogScale && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--signal))]"></div>
              )}
            </button>
            <button
              onClick={() => handleScaleChange('logarithmic')}
              className={`px-3 py-2 text-sm transition-colors relative ${
                useLogScale
                  ? 'text-[hsl(var(--signal))]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              style={{ fontFamily: 'zz_type_mon, monospace' }}
            >
              Logarithmic
              {useLogScale && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--signal))]"></div>
              )}
            </button>
          </div>

          <div className="w-px h-6 bg-gray-600"></div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handlePeriodChange(180)}
              className={`px-3 py-2 text-sm transition-colors relative ${
                selectedPeriod === 180
                  ? 'text-[hsl(var(--signal))]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              style={{ fontFamily: 'zz_type_mon, monospace' }}
            >
              6M
              {selectedPeriod === 180 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--signal))]"></div>
              )}
            </button>
            <button
              onClick={() => handlePeriodChange(1095)}
              className={`px-3 py-2 text-sm transition-colors relative ${
                selectedPeriod === 1095
                  ? 'text-[hsl(var(--signal))]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              style={{ fontFamily: 'zz_type_mon, monospace' }}
            >
              3Y
              {selectedPeriod === 1095 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--signal))]"></div>
              )}
            </button>
            <button
              onClick={() => handlePeriodChange(2190)}
              className={`px-3 py-2 text-sm transition-colors relative ${
                selectedPeriod === 2190
                  ? 'text-[hsl(var(--signal))]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              style={{ fontFamily: 'zz_type_mon, monospace' }}
            >
              6Y
              {selectedPeriod === 2190 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--signal))]"></div>
              )}
            </button>
            <button
              onClick={() => handlePeriodChange(null)}
              className={`px-3 py-2 text-sm transition-colors relative ${
                selectedPeriod === null
                  ? 'text-[hsl(var(--signal))]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              style={{ fontFamily: 'zz_type_mon, monospace' }}
            >
              MAX
              {selectedPeriod === null && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--signal))]"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BitcoinRiskChartContent
