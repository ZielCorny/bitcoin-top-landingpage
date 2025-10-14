'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
})

// Import Plotly for type definitions and methods
let Plotly: any = null
if (typeof window !== 'undefined') {
  import('plotly.js').then(module => {
    Plotly = module.default
  })
}

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

export default function TradingChartPlotly({ 
  className, 
  height = 700, 
  useLogScale = true,
  onLogScaleChange 
}: TradingChartProps) {
  const [csvData, setCsvData] = useState<CSVData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const plotRef = useRef<any>(null)

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
        
        // Sample data for better performance - take every 3rd point
        const sampledData = uniqueData.filter((_, index) => index % 3 === 0)
        
        setCsvData(sampledData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading CSV data:', error)
        setIsLoading(false)
      }
    }

    loadCSVData()
  }, [])

  // Ensure Plotly is loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && !Plotly) {
      import('plotly.js').then(module => {
        Plotly = module.default
      })
    }
  }, [])

  // Prepare data for Plotly - memoized to prevent resets
  const chartData = useMemo(() => {
    const dates = csvData.map(item => item.date)
    const prices = csvData.map(item => item.btc_close) // Always use actual prices
    const indicators = csvData.map(item => item.combined_zscore)

    return { dates, prices, indicators }
  }, [csvData])

  // Create threshold regions based on indicator values
  const thresholdRegions = useMemo(() => {
    const shapes: any[] = []
    
    // Add background differentiation for bottom chart
    shapes.push({
      type: 'rect',
      xref: 'paper',
      yref: 'paper',
      x0: 0,
      x1: 1,
      y0: 0,
      y1: 0.30,
      fillcolor: 'rgba(0, 0, 0, 1)',
      opacity: 1,
      line: { width: 1, color: 'rgba(255, 255, 255, 0.1)' },
      layer: 'below'
    })
    
    // Add separator line between charts
    shapes.push({
      type: 'line',
      xref: 'paper',
      yref: 'paper',
      x0: 0,
      x1: 1,
      y0: 0.30,
      y1: 0.30,
      line: { width: 1, color: 'rgba(255, 255, 255, 0.2)' },
      layer: 'below'
    })
    
    let aboveRegionStart: number | null = null
    let belowRegionStart: number | null = null

    chartData.dates.forEach((date, index) => {
      const indicatorValue = chartData.indicators[index]
      const currentDate = new Date(date).getTime()

      // Handle above threshold (+1) regions
      if (indicatorValue > 1) {
        if (aboveRegionStart === null) {
          aboveRegionStart = currentDate
        }
      } else {
        if (aboveRegionStart !== null) {
          // End of above-threshold region
          // Calculate vibrance based on average indicator value in this region
          const regionIndicators = chartData.indicators.slice(
            chartData.dates.findIndex(d => new Date(d).getTime() === aboveRegionStart),
            index + 1
          )
          const avgIndicatorValue = regionIndicators.reduce((sum, val) => sum + val, 0) / regionIndicators.length
          const vibrance = Math.min(Math.abs(avgIndicatorValue) / 2.5, 1) // Scale to max 2.5, cap at 1
          
          shapes.push({
            type: 'rect',
            xref: 'x',
            yref: 'paper',
            x0: aboveRegionStart,
            x1: currentDate,
            y0: 0.35,
            y1: 1,
            fillcolor: `rgba(255, 68, 68, ${0.2 + vibrance * 0.4})`, // Dynamic opacity based on vibrance
            opacity: 0.4 + vibrance * 0.4, // Dynamic opacity
            line: { width: 0 },
            layer: 'below'
          })
          aboveRegionStart = null
        }
      }

      // Handle below threshold (-1) regions
      if (indicatorValue < -1) {
        if (belowRegionStart === null) {
          belowRegionStart = currentDate
        }
      } else {
        if (belowRegionStart !== null) {
          // End of below-threshold region
          // Calculate vibrance based on average indicator value in this region
          const regionIndicators = chartData.indicators.slice(
            chartData.dates.findIndex(d => new Date(d).getTime() === belowRegionStart),
            index + 1
          )
          const avgIndicatorValue = regionIndicators.reduce((sum, val) => sum + val, 0) / regionIndicators.length
          const vibrance = Math.min(Math.abs(avgIndicatorValue) / 2.5, 1) // Scale to max 2.5, cap at 1
          
          shapes.push({
            type: 'rect',
            xref: 'x',
            yref: 'paper',
            x0: belowRegionStart,
            x1: currentDate,
            y0: 0.35,
            y1: 1,
            fillcolor: `rgba(68, 255, 68, ${0.2 + vibrance * 0.4})`, // Dynamic opacity based on vibrance
            opacity: 0.4 + vibrance * 0.4, // Dynamic opacity
            line: { width: 0 },
            layer: 'below'
          })
          belowRegionStart = null
        }
      }
    })

    // Handle case where regions extend to the end of data
    const lastDate = new Date(chartData.dates[chartData.dates.length - 1]).getTime()
    
    if (aboveRegionStart !== null) {
      shapes.push({
        type: 'rect',
        xref: 'x',
        yref: 'paper',
        x0: aboveRegionStart,
        x1: lastDate,
        y0: 0,
        y1: 1,
        fillcolor: 'rgba(255, 68, 68, 0.4)', // Red for selling region
        opacity: 0.6,
        line: { width: 0 },
        layer: 'below'
      })
    }

    if (belowRegionStart !== null) {
      shapes.push({
        type: 'rect',
        xref: 'x',
        yref: 'paper',
        x0: belowRegionStart,
        x1: lastDate,
        y0: 0,
        y1: 1,
        fillcolor: 'rgba(68, 255, 68, 0.4)', // Green for buying region
        opacity: 0.6,
        line: { width: 0 },
        layer: 'below'
      })
    }

    return shapes
  }, [chartData])

  // Create traces for Plotly - memoized to prevent resets
  const traces: any[] = useMemo(() => [
    // Price line
    {
      x: chartData.dates,
      y: chartData.prices,
      type: 'scatter',
      mode: 'lines',
      name: 'BTC Price',
      line: {
        color: '#FFFFFF',
        width: 2
      },
      xaxis: 'x',
      yaxis: 'y',
      hovertemplate: 'Price: $%{y:,.2f}<extra></extra>'
    },
    // Indicator line
    {
      x: chartData.dates,
      y: chartData.indicators,
      type: 'scatter',
      mode: 'lines',
      name: 'Indicator',
      line: {
        color: '#DDFF00',
        width: 2
      },
      xaxis: 'x2',
      yaxis: 'y2',
      hovertemplate: 'Indicator: %{y:.2f}<extra></extra>'
    },
    // Upper threshold line
    {
      x: chartData.dates,
      y: new Array(chartData.dates.length).fill(1),
      type: 'scatter',
      mode: 'lines',
      name: 'Sell Region',
      line: {
        color: '#FF4444',
        width: 1,
        dash: 'dash'
      },
      xaxis: 'x2',
      yaxis: 'y2',
      showlegend: false,
      visible: true,
      hovertemplate: 'Threshold: %{y}<extra></extra>'
    },
    // Lower threshold line
    {
      x: chartData.dates,
      y: new Array(chartData.dates.length).fill(-1),
      type: 'scatter',
      mode: 'lines',
      name: 'Buy Region',
      line: {
        color: '#44FF44',
        width: 1,
        dash: 'dash'
      },
      xaxis: 'x2',
      yaxis: 'y2',
      showlegend: false,
      visible: true,
      hovertemplate: 'Threshold: %{y}<extra></extra>'
    }
  ], [chartData])

  // Layout configuration - memoized to prevent resets
  const layout: any = useMemo(() => ({
    title: {
      text: 'Bitcoin Top Chart',
      font: { color: '#FFFFFF', size: 16 }
    },
    // Main price chart axes
    xaxis: {
      color: '#FFFFFF',
      gridcolor: 'rgba(255, 255, 255, 0.1)',
      showgrid: true,
      type: 'date',
      domain: [0, 1],
      anchor: 'y',
      matches: 'x2',
      showticklabels: false,
      tickformat: '%b %d, %Y',
      hoverformat: '%b %d, %Y'
    },
    yaxis: {
      title: {
        text: 'BTC Price ($)',
        font: { color: '#FFFFFF' }
      },
      color: '#FFFFFF',
      gridcolor: 'rgba(255, 255, 255, 0.1)',
      showgrid: true,
      side: 'right',
      type: useLogScale ? 'log' : 'linear',
      tickformat: '$,.0f',
      autorange: true,
      fixedrange: false,
      domain: [0.35, 1],
      anchor: 'x'
    },
    // Indicator subplot axes
    xaxis2: {
      title: 'Date',
      color: '#FFFFFF',
      gridcolor: 'rgba(255, 255, 255, 0.1)',
      showgrid: false,
      type: 'date',
      domain: [0, 1],
      anchor: 'y2',
      showticklabels: true,
      matches: 'x',
      tickformat: '%b %d, %Y'
    },
    yaxis2: {
      title: {
        text: 'Indicator',
        font: { color: '#FFFFFF' }
      },
      color: '#FFFFFF',
      gridcolor: 'rgba(255, 255, 255, 0.1)',
      showgrid: false,
      side: 'right',
      range: [-2.5, 2.5],
      fixedrange: true,
      domain: [0, 0.30],
      anchor: 'x2'
    },
    plot_bgcolor: 'rgba(0, 0, 0, 1)',
    paper_bgcolor: 'transparent',
    font: {
      color: '#FFFFFF',
      family: 'monospace'
    },
    legend: {
      x: 0,
      y: 1,
      bgcolor: 'rgba(0, 0, 0, 0.5)',
      bordercolor: 'rgba(255, 255, 255, 0.2)',
      borderwidth: 1,
      font: { color: '#FFFFFF' }
    },
    margin: {
      l: 60,
      r: 100,
      t: 60,
      b: 60
    },
    hovermode: 'x unified',
    dragmode: 'pan',
    shapes: thresholdRegions,
    hoverlabel: {
      bgcolor: 'rgba(0, 0, 0, 0.8)',
      bordercolor: 'rgba(255, 255, 255, 0.2)',
      font: {
        color: '#FFFFFF',
        family: 'monospace',
        size: 12
      }
    },
    hoverformat: '%b %d, %Y'
  }), [useLogScale, thresholdRegions])

  // Configuration for Plotly - minimal and clean
  const config: any = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    toImageButtonOptions: {
      format: 'png',
      filename: 'bitcoin-top-chart',
      height: height,
      width: 1200,
      scale: 2
    }
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
      <div style={{ height: `${height}px` }}>
        <Plot
          ref={plotRef}
          data={traces}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
        />
      </div>
    </div>
  )
}