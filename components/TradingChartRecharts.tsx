'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
} from 'recharts'

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

export default function TradingChartRecharts({ 
  className, 
  height = 500, 
  useLogScale = false,
  onLogScaleChange 
}: TradingChartProps) {
  const [csvData, setCsvData] = useState<CSVData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [zoomDomain, setZoomDomain] = useState<[number, number] | null>(null)
  const [brushDomain, setBrushDomain] = useState<[number, number] | null>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const chartRef = useRef<any>(null)

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
        
        // Sample data for better performance - take every 5th point
        const sampledData = uniqueData.filter((_, index) => index % 5 === 0)
        
        setCsvData(sampledData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading CSV data:', error)
        setIsLoading(false)
      }
    }

    loadCSVData()
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  // Prepare data for Recharts - moved before early return
  const chartData = csvData.map(item => ({
    date: item.date,
    price: useLogScale ? item.btc_close_log : item.btc_close,
    indicator: item.combined_zscore,
    // Add color based on indicator value
    priceColor: item.combined_zscore > 1 ? '#FF4444' : 
                item.combined_zscore < -1 ? '#44FF44' : '#FFFFFF'
  }))

  // Handle brush change for zoom with proper state management
  const handleBrushChange = useCallback((domain: any) => {
    console.log('Brush change:', domain)
    
    // Ignore null, undefined, or invalid domains
    if (!domain) {
      console.log('Ignoring null/undefined domain')
      return
    }
    
    // Handle index-based domain
    if (domain.startIndex !== undefined && domain.endIndex !== undefined && 
        domain.startIndex >= 0 && domain.endIndex >= 0 &&
        domain.startIndex < chartData.length && domain.endIndex < chartData.length) {
      
      console.log('Updating brush with indices:', domain.startIndex, domain.endIndex)
      
      // Update both states immediately to prevent resets
      setBrushDomain([domain.startIndex, domain.endIndex])
      setZoomDomain([domain.startIndex, domain.endIndex])
    } 
    // Handle date-based domain
    else if (domain.start && domain.end) {
      const startIndex = chartData.findIndex(item => item.date >= domain.start)
      const endIndex = chartData.findIndex(item => item.date >= domain.end)
      
      if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
        console.log('Updating brush with dates:', domain.start, domain.end)
        
        // Update both states immediately to prevent resets
        setBrushDomain([startIndex, endIndex])
        setZoomDomain([startIndex, endIndex])
      }
    } else {
      console.log('Invalid domain, ignoring:', domain)
    }
  }, [chartData])

  // Reset zoom
  const resetZoom = () => {
    setZoomDomain(null)
    setBrushDomain(null)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
  }

  // Get filtered data based on zoom
  const getFilteredData = () => {
    if (!zoomDomain) return chartData
    return chartData.slice(zoomDomain[0], zoomDomain[1] + 1)
  }

  const filteredData = getFilteredData()

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 border border-white/20 rounded-lg p-3 text-white">
          <p className="text-sm font-mono">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-mono" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value?.toFixed(2)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

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
      {/* Zoom Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-foreground/70 font-mono">
          {zoomDomain ? 'Zoomed View' : 'Full View'}
        </div>
        {zoomDomain && (
          <button
            onClick={resetZoom}
            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-mono hover:bg-primary/80 transition-colors"
          >
            Reset Zoom
          </button>
        )}
      </div>

      {/* Main Chart with Integrated Brush */}
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            ref={chartRef}
            data={filteredData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            
            <XAxis 
              dataKey="date" 
              stroke="#ffffff"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            
            <YAxis 
              yAxisId="price"
              orientation="right"
              stroke="#ffffff"
              fontSize={12}
              domain={['dataMin', 'dataMax']}
            />
            
            <YAxis 
              yAxisId="indicator"
              orientation="left"
              stroke="#ffffff"
              fontSize={12}
              domain={[-4, 4]}
            />
            
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Threshold lines */}
            <ReferenceLine yAxisId="indicator" y={1} stroke="#FF4444" strokeDasharray="5 5" />
            <ReferenceLine yAxisId="indicator" y={-1} stroke="#44FF44" strokeDasharray="5 5" />
            
            {/* Price line */}
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#FFFFFF"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#FFFFFF' }}
            />
            
            {/* Indicator line */}
            <Line
              yAxisId="indicator"
              type="monotone"
              dataKey="indicator"
              stroke="#DDFF00"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#DDFF00' }}
            />
            
            {/* Brush component for zoom selection */}
            <Brush
              dataKey="date"
              height={30}
              stroke="#8884d8"
              fill="rgba(136, 132, 216, 0.2)"
              onChange={handleBrushChange}
              startIndex={brushDomain ? brushDomain[0] : 0}
              endIndex={brushDomain ? brushDomain[1] : chartData.length - 1}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
              gap={5}
              padding={{ top: 5, right: 5, bottom: 5, left: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}