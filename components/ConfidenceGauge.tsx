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
    
    // First 5 candles: 25% total upward move (but with variability - some red candles possible)
    const targetPrice1 = currentPrice * 1.20;
    const totalGain1 = targetPrice1 - currentPrice;
    
    for (let i = 0; i < 5; i++) {
      const open = currentPrice;
      
      // Calculate how much we need to gain on average per remaining candle
      const remaining = 5 - i;
      const avgGainNeeded = (targetPrice1 - currentPrice) / remaining;
      
      // More variability - candles can be red more often
      const candleMove = avgGainNeeded + (random(patternSeed, i + 20) - 0.5) * (avgGainNeeded * 1.2);
      const close = open + candleMove;
      
      // Moderate volatility
      const volatility = Math.abs(candleMove) * (0.2 + random(patternSeed, i + 30) * 0.3);
      const high = Math.max(open, close) + random(patternSeed, i + 40) * volatility;
      const low = Math.min(open, close) - random(patternSeed, i + 50) * volatility;
      
      candles.push({
        open,
        high,
        low,
        close,
        isActive: i < adjustedConfidence
      });
      
      currentPrice = close;
    }
    
    // Adjust to ensure we hit exactly 25% (in case randomness took us off)
    const adjustment1 = targetPrice1 - currentPrice;
    if (candles.length > 0) {
      candles[4].close += adjustment1;
      candles[4].high = Math.max(candles[4].high, candles[4].close);
      currentPrice = candles[4].close;
    }
    
    const sidewaysStart = currentPrice;
    
    // Next 40 candles: oscillate between -5% and +5% from current price with more ups and downs
    const minPrice = sidewaysStart * 0.95;
    const maxPrice = sidewaysStart * 1.05;
    const midPrice = sidewaysStart;
    
    for (let i = 5; i < 45; i++) {
      const open = currentPrice;
      
      // Mean reversion: when near boundaries, push back toward middle
      const distanceFromMid = (currentPrice - midPrice) / midPrice;
      const meanReversionForce = -distanceFromMid * 0.02; // Pull back toward center
      
      // Random walk with mean reversion
      const randomMove = (random(patternSeed, i + 20) - 0.5) * 0.10; // ±2% random component
      const movePercent = randomMove + meanReversionForce;
      
      let close = open * (1 + movePercent);
      
      // Soft boundaries - allow some overshoot but with resistance
      if (close > maxPrice) {
        close = maxPrice - random(patternSeed, i + 30) * (maxPrice - midPrice) * 0.1;
      } else if (close < minPrice) {
        close = minPrice + random(patternSeed, i + 30) * (midPrice - minPrice) * 0.1;
      }
      
      // Higher volatility for more dramatic candles
      const volatility = Math.abs(close - open) * (1.2 + random(patternSeed, i + 40) * 1.8);
      let high = Math.max(open, close) + random(patternSeed, i + 50) * volatility;
      let low = Math.min(open, close) - random(patternSeed, i + 60) * volatility;
      
      // Ensure wicks create variety
      high = Math.min(high, maxPrice * 1.02);
      low = Math.max(low, minPrice * 0.98);
      
      candles.push({
        open,
        high,
        low,
        close,
        isActive: i < adjustedConfidence
      });
      
      currentPrice = close;
    }
    
    // Last 5 candles: 30% total upward move (with variability)
    const targetPrice2 = currentPrice * 1.20;
    
    for (let i = 45; i < 50; i++) {
      const open = currentPrice;
      
      const remaining = 50 - i;
      const avgGainNeeded = (targetPrice2 - currentPrice) / remaining;
      
      // More variability - less extreme individual candle moves
      const candleMove = avgGainNeeded + (random(patternSeed, i + 20) - 0.5) * (avgGainNeeded * 1.0);
      const close = open + candleMove;
      
      // Moderate volatility
      const volatility = Math.abs(candleMove) * (0.2 + random(patternSeed, i + 30) * 0.4);
      const high = Math.max(open, close) + random(patternSeed, i + 40) * volatility;
      const low = Math.min(open, close) - random(patternSeed, i + 50) * volatility;
      
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
        const progress = Math.min(elapsed / 3000, 1); // 3 seconds
        
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
    }, 7000); // Switch every 2 seconds
    
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
    <div className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
      {/* Chart Container - Full Width */}
      <div className="relative h-80 w-full overflow-hidden">
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
            const padding = candleWidth; // One full candle width for padding
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
              ? (isBullish ? '#00ab00' : '#f01313') // Brighter green for bullish, catchy red for bearish
              : '#6b7280'; // Grey for inactive
            
            // Calculate body dimensions with minimum size constraints
            const bodyTop = Math.min(openY, closeY);
            const bodyBottom = Math.max(openY, closeY);
            const bodyHeight = Math.max(Math.abs(closeY - openY), 1); // Minimum height of 1 unit
            
            // Ensure wicks have minimum length
            const upperWickLength = Math.max(highY - bodyTop, 0.5);
            const lowerWickLength = Math.max(bodyBottom - lowY, 0.5);
            
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