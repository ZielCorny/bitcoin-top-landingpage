'use client';

import React, { useState, useEffect } from 'react';

interface ConfidenceGaugeProps {
  confidence: number; // 0-100
  className?: string;
}

interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  isActive: boolean; // Whether this candle should be colored or grey
}

const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({ confidence, className = '' }) => {
  // Convert confidence to work with 50 candles (divide by 2 and round)
  const adjustedConfidence = Math.round(confidence / 2);
  
  // State for animation
  const [currentPattern, setCurrentPattern] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  
  // Generate multiple price action patterns
  const generatePriceActionPattern = (patternSeed: number): CandleData[] => {
    const candles: CandleData[] = [];
    let currentPrice = 100; // Starting price
    
    // Use patternSeed to create different variations
    const random = (seed: number, index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };
    
    // First 8 candles: Sharp move up
    for (let i = 0; i < 8; i++) {
      const volatility = 3 + random(patternSeed, i) * 8; // Wider range of volatility for more varied candle bodies
      const trend = 1.2 + random(patternSeed, i + 10) * 0.6; // Much stronger upward trend
      
      const open = currentPrice;
      const close = open + (random(patternSeed, i + 20) - 0.1) * volatility * trend; // Stronger bias towards up
      const high = Math.max(open, close) + random(patternSeed, i + 30) * volatility * 0.7; // Longer upper wicks
      const low = Math.min(open, close) - random(patternSeed, i + 40) * volatility * 0.2; // Shorter lower wicks
      
      candles.push({
        open,
        high,
        low,
        close,
        isActive: i < adjustedConfidence
      });
      
      currentPrice = close;
    }
    
    // Next 34 candles: Realistic movement with no trend
    for (let i = 8; i < 42; i++) {
      const volatility = 1 + random(patternSeed, i) * 6; // Wider range of volatility for more varied candle bodies
      const trend = -0.1 + random(patternSeed, i + 10) * 0.2; // No directional bias
      
      const open = currentPrice;
      const close = open + (random(patternSeed, i + 20) - 0.5) * volatility * (1 + trend);
      const high = Math.max(open, close) + random(patternSeed, i + 30) * volatility * 0.5; // Increased wick size
      const low = Math.min(open, close) - random(patternSeed, i + 40) * volatility * 0.5; // Increased wick size
      
      candles.push({
        open,
        high,
        low,
        close,
        isActive: i < adjustedConfidence
      });
      
      currentPrice = close;
    }
    
    // Last 8 candles: Sharp move up again
    for (let i = 42; i < 50; i++) {
      const volatility = 3 + random(patternSeed, i) * 8; // Wider range of volatility for more varied candle bodies
      const trend = 1.2 + random(patternSeed, i + 10) * 0.6; // Much stronger upward trend
      
      const open = currentPrice;
      const close = open + (random(patternSeed, i + 20) - 0.1) * volatility * trend; // Stronger bias towards up
      const high = Math.max(open, close) + random(patternSeed, i + 30) * volatility * 0.7; // Longer upper wicks
      const low = Math.min(open, close) - random(patternSeed, i + 40) * volatility * 0.2; // Shorter lower wicks
      
      candles.push({
        open,
        high,
        low,
        close,
        isActive: i < adjustedConfidence
      });
      
      currentPrice = close;
    }
    
    return candles;
  };

  // Generate current and next patterns
  const currentCandles = generatePriceActionPattern(currentPattern);
  const nextCandles = generatePriceActionPattern(currentPattern + 1);
  
  // Animation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTransitionProgress(0);
      
      // Animate transition
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 1500, 1); // 1.5 seconds
        
        setTransitionProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Transition complete
          setCurrentPattern(prev => prev + 1);
          setIsTransitioning(false);
        }
      };
      
      requestAnimationFrame(animate);
    }, 5000); // Switch every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Interpolate between current and next candles
  const interpolateCandles = (progress: number): CandleData[] => {
    return currentCandles.map((current, index) => {
      const next = nextCandles[index];
      return {
        open: current.open + (next.open - current.open) * progress,
        high: current.high + (next.high - current.high) * progress,
        low: current.low + (next.low - current.low) * progress,
        close: current.close + (next.close - current.close) * progress,
        isActive: current.isActive
      };
    });
  };

  const candles = isTransitioning ? interpolateCandles(transitionProgress) : currentCandles;
  
  // Find min and max values for scaling
  const allValues = candles.flatMap(c => [c.open, c.high, c.low, c.close]);
  const minPrice = Math.min(...allValues);
  const maxPrice = Math.max(...allValues);
  const priceRange = maxPrice - minPrice;
  
  // Scale values to 0-100 for display
  const scaleValue = (value: number) => ((value - minPrice) / priceRange) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Chart Container - Full Width */}
      <div className="relative h-40 w-full overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 100"
          className="absolute inset-0"
          preserveAspectRatio="none"
        >
          {/* Grid lines with fade effect */}
          <defs>
            <linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0"/>
              <stop offset="20%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.1"/>
              <stop offset="80%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0"/>
            </linearGradient>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="url(#gridFade)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
            
          {/* Candles */}
          {candles.map((candle, index) => {
            const candleWidth = 12; // Wider candles for better visibility with fewer total
            
            // Adjust positioning to prevent clipping - add padding for first and last candles
            const padding = candleWidth / 2; // Half candle width for padding
            const availableWidth = 1000 - (padding * 2); // Available width minus padding
            const x = padding + (index / 49) * availableWidth; // Spread across available width
            const xPos = x - candleWidth / 2;
            
            // Scale values to chart height
            const openY = 100 - scaleValue(candle.open);
            const closeY = 100 - scaleValue(candle.close);
            const highY = 100 - scaleValue(candle.high);
            const lowY = 100 - scaleValue(candle.low);
            
            // Determine if candle is bullish or bearish
            const isBullish = candle.close > candle.open;
            
            // Color based on active state
            const color = candle.isActive 
              ? (isBullish ? '#00e600' : '#ff3366') // Brighter green for bullish, catchy red for bearish
              : '#6b7280'; // Grey for inactive
            
            // Calculate body dimensions
            const bodyTop = Math.min(openY, closeY);
            const bodyBottom = Math.max(openY, closeY);
            const bodyHeight = Math.abs(closeY - openY) || 0.5; // Minimum height for visibility
            
            return (
              <g key={index}>
                {/* Upper wick */}
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={bodyTop}
                  stroke={color}
                  strokeWidth="1"
                  opacity="0.8"
                />
                
                {/* Lower wick */}
                <line
                  x1={x}
                  y1={bodyBottom}
                  x2={x}
                  y2={lowY}
                  stroke={color}
                  strokeWidth="1"
                  opacity="0.8"
                />
                
                {/* Candle body */}
                <rect
                  x={xPos}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={candle.isActive ? color : 'transparent'}
                  stroke={color}
                  strokeWidth="1"
                  rx="0.5"
                  ry="0.5"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default ConfidenceGauge;