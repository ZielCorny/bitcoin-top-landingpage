'use client';

import React, { useState, useEffect } from 'react';
import HistoricalValues from './HistoricalValues';

interface BitcoinTopGaugeProps {
  className?: string;
}

interface CSVData {
  date: string
  btc_close: number
  btc_close_log: number
  combined_zscore: number
  zscore_0_100: number
}

interface GaugeData {
  current: number
  yesterday: number
  lastWeek: number
  lastMonth: number
  currentDate: string
}

const BitcoinTopGauge: React.FC<BitcoinTopGaugeProps> = ({ className = '' }) => {
  const [gaugeData, setGaugeData] = useState<GaugeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load CSV data and calculate gauge values
  useEffect(() => {
    const loadGaugeData = async () => {
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
        
        // Sort by date (most recent first)
        data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        
        if (data.length === 0) {
          setIsLoading(false)
          return
        }
        
        // Get the most recent data point
        const current = data[0]
        const currentDate = new Date(current.date)
        
        // Calculate yesterday (1 day ago)
        const yesterdayDate = new Date(currentDate)
        yesterdayDate.setDate(yesterdayDate.getDate() - 1)
        const yesterday = data.find(item => {
          const itemDate = new Date(item.date)
          return itemDate.toDateString() === yesterdayDate.toDateString()
        })
        
        // Calculate last week (7 days ago)
        const lastWeekDate = new Date(currentDate)
        lastWeekDate.setDate(lastWeekDate.getDate() - 7)
        const lastWeek = data.find(item => {
          const itemDate = new Date(item.date)
          return itemDate.toDateString() === lastWeekDate.toDateString()
        })
        
        // Calculate last month (30 days ago)
        const lastMonthDate = new Date(currentDate)
        lastMonthDate.setDate(lastMonthDate.getDate() - 30)
        const lastMonth = data.find(item => {
          const itemDate = new Date(item.date)
          return itemDate.toDateString() === lastMonthDate.toDateString()
        })
        
        setGaugeData({
          current: current.zscore_0_100,
          yesterday: yesterday?.zscore_0_100 || current.zscore_0_100,
          lastWeek: lastWeek?.zscore_0_100 || current.zscore_0_100,
          lastMonth: lastMonth?.zscore_0_100 || current.zscore_0_100,
          currentDate: current.date
        })
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading gauge data:', error)
        setIsLoading(false)
      }
    }

    loadGaugeData()
  }, [])

  if (isLoading || !gaugeData) {
    return (
      <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }
  // Helper function to convert polar to cartesian coordinates
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  
  // Helper function to create arc path
  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y, 
      "A", radius, radius, 1, largeArcFlag, 1, end.x, end.y
    ].join(" ");
  };
  
  // Create donut segment path
  const createSegment = (centerX: number, centerY: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) => {
    const outerStart = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const outerEnd = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", outerStart.x, outerStart.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 1, outerEnd.x, outerEnd.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 0, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };
  
  const centerX = 200;
  const centerY = 200;
  const innerRadius = 140;
  const outerRadius = 180;
  
  // Starting angle: 225 degrees (bottom left)
  // Total span: 270 degrees clockwise
  // 5 segments of 52 degrees each with 4 degrees spacing
  const startAngle = 226;
  const segmentAngle = 53;
  const spacing = 1;
  
  // Function to determine which segment should be active based on current value
  const getActiveSegment = (value: number) => {
    if (value >= 0 && value < 20) return 'BODENZONE'
    if (value >= 20 && value < 40) return 'AUFSCHWUNGZONE'
    if (value >= 40 && value < 60) return 'NEUTRALZONE'
    if (value >= 60 && value < 80) return 'RISIKOZONE'
    if (value >= 80 && value <= 100) return 'TOPZONE'
    return 'NEUTRALZONE' // fallback
  }

  const activeSegment = gaugeData ? getActiveSegment(gaugeData.current) : 'NEUTRALZONE'

  const segments = [
    { name: 'BODENZONE', color: 'hsl(var(--bg-subtle))', angle: startAngle },
    { name: 'AUFSCHWUNGZONE', color: 'hsl(var(--bg-subtle))', angle: startAngle + segmentAngle + spacing },
    { name: 'NEUTRALZONE', color: 'hsl(var(--bg-subtle))', angle: startAngle + 2 * (segmentAngle + spacing) },
    { name: 'RISIKOZONE', color: 'hsl(var(--signal))', angle: startAngle + 3 * (segmentAngle + spacing), textColor: '#fff' },
    { name: 'TOPZONE', color: 'hsl(var(--bg-subtle))', angle: startAngle + 4 * (segmentAngle + spacing) }
  ];

  return (
    <>
      <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
        <div className="relative w-full aspect-square">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              {segments.map((segment, index) => {
                const midAngle = segment.angle + segmentAngle / 2;
                const fontSize = 10; // Font size in pixels
                const textHeightOffset = fontSize / 2; // Half of text height
                const textRadius = (innerRadius + outerRadius) / 2 - textHeightOffset;
                const pathId = `segment-path-${index}`;
                // Arc goes from end to start for text (reversed direction for bottom-to-top reading)
                const arcPath = describeArc(centerX, centerY, textRadius, segment.angle + segmentAngle, segment.angle);
                
                return (
                  <path
                    key={pathId}
                    id={pathId}
                    d={arcPath}
                    fill="none"
                  />
                );
              })}
            </defs>
            
            {/* Draw segments */}
            {segments.map((segment, index) => (
              <g key={index}>
                {/* Segment fill */}
                <path
                  d={createSegment(centerX, centerY, innerRadius, outerRadius, segment.angle, segment.angle + segmentAngle)}
                  fill={segment.name === activeSegment ? 'hsl(var(--signal))' : 'hsl(var(--bg-subtle))'}
                  opacity={segment.name === activeSegment ? 0.6 : 0.8}
                />
                {/* Active segment border */}
                {segment.name === activeSegment && (
                  <path
                    d={createSegment(centerX, centerY, innerRadius, outerRadius, segment.angle, segment.angle + segmentAngle)}
                    fill="none"
                    stroke="hsl(var(--signal))"
                    strokeWidth="2"
                    opacity={1}
                  />
                )}
              </g>
            ))}
            
            {/* Zone labels curved along segments */}
            {segments.map((segment, index) => (
              <text
                key={`text-${index}`}
                fill={segment.name === activeSegment ? '#000' : '#000'}
                opacity={segment.name === activeSegment ? 1 : 0.6}
                fontSize="12"
                fontWeight="500"
              >
                <textPath href={`#segment-path-${index}`} startOffset="50%" textAnchor="middle">
                  {segment.name}
                </textPath>
              </text>
            ))}
            
            {/* Scale numbers positioned on inner side of donut */}
            {Array.from({ length: 11 }, (_, i) => i * 10).map((tickValue, index) => {
              // Calculate angle for each tick value (0-100 maps to 225-495 degrees)
              const angle = startAngle + (tickValue / 100) * 270;
              const textRadius = innerRadius - 7; // Position closer to the segments
              const textPos = polarToCartesian(centerX, centerY, textRadius, angle);
              
              return (
                <text
                  key={tickValue}
                  x={textPos.x}
                  y={textPos.y}
                        fill="hsl(var(--line-color))"
                  fontSize="8"
                  fontWeight="400"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${angle}, ${textPos.x}, ${textPos.y})`}
                  style={{ fontFamily: 'zz_type_exp, monospace' }}
                >
                  {tickValue}
                </text>
              );
            })}
            
            {/* Center value */}
            <text
              x="200"
              y="220"
              fill="hsl(var(--signal))"
              fontSize="100"
              fontWeight="800"
              style={{ fontFamily: 'zz_type_exp, monospace' ,letterSpacing: '-0.08em'}}
              textAnchor="middle"
            >
              {Math.round(gaugeData.current)}
            </text>

            {/* Date */}
            <text
              x="200"
              y="280"
              fill="hsl(var(--foreground) / 0.7)"
              fontSize="12"
              fontWeight="400"
              style={{ fontFamily: 'zz_type_exp, monospace' }}
              textAnchor="middle"
            >
              {new Date(gaugeData.currentDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </text>
          </svg>
        </div>
      </div>
      
      {/* Historical Values Component */}
      <HistoricalValues 
        yesterday={Math.round(gaugeData.yesterday)}
        lastWeek={Math.round(gaugeData.lastWeek)}
        lastMonth={Math.round(gaugeData.lastMonth)}
      />
    </>
  );
};

export default BitcoinTopGauge;
