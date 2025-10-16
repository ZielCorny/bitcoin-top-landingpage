'use client'

import React from 'react'

interface HistoricalValuesProps {
  yesterday: number
  lastWeek: number
  lastMonth: number
  className?: string
}

const HistoricalValues: React.FC<HistoricalValuesProps> = ({ 
  yesterday, 
  lastWeek, 
  lastMonth, 
  className = '' 
}) => {
  return (
    <div className={`max-w-4xl mx-auto mb-40 -mt-32 ${className}`}>
      {/* Layout with Year's High/Low on sides when space allows (lg and up) */}
      <div className="hidden lg:flex items-center justify-center gap-4">
        {/* Historical Values Container - Center */}
        <div className="p-3" style={{ backgroundColor: 'hsl(var(--bg-subtle))' }}>
          <div className="grid grid-cols-3 gap-3">
            {/* Yesterday */}
            <div className="text-center">
              <div className="text-xs text-foreground/70 font-mono mb-1">Yesterday</div>
              <div className="text-lg font-bold text-foreground font-mono">{yesterday}</div>
            </div>
            
            {/* Last Week */}
            <div className="text-center">
              <div className="text-xs text-foreground/70 font-mono mb-1">Last Week</div>
              <div className="text-lg font-bold text-foreground font-mono">{lastWeek}</div>
            </div>
            
            {/* Last Month */}
            <div className="text-center">
              <div className="text-xs text-foreground/70 font-mono mb-1">Last Month</div>
              <div className="text-lg font-bold text-foreground font-mono">{lastMonth}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stacked layout for smaller screens (below lg) */}
      <div className="lg:hidden">
        {/* Historical Values Container */}
        <div className="bg-foreground/5 p-3 mb-4">
          <div className="grid grid-cols-3 gap-3">
            {/* Yesterday */}
            <div className="text-center">
              <div className="text-xs text-foreground/70 font-mono mb-1">Yesterday</div>
              <div className="text-lg font-bold text-foreground font-mono">{yesterday}</div>
            </div>
            
            {/* Last Week */}
            <div className="text-center">
              <div className="text-xs text-foreground/70 font-mono mb-1">Last Week</div>
              <div className="text-lg font-bold text-foreground font-mono">{lastWeek}</div>
            </div>
            
            {/* Last Month */}
            <div className="text-center">
              <div className="text-xs text-foreground/70 font-mono mb-1">Last Month</div>
              <div className="text-lg font-bold text-foreground font-mono">{lastMonth}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoricalValues
