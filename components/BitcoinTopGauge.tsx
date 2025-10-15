'use client';

import React, { useState } from 'react';

interface BitcoinTopGaugeProps {
  value: number; // 0-100
  className?: string;
}

const BitcoinTopGauge: React.FC<BitcoinTopGaugeProps> = ({ value, className = '' }) => {
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
  const startAngle = 225;
  const segmentAngle = 53;
  const spacing = 1;
  
  const segments = [
    { name: 'BODENZONE', color: '#c4d82e', angle: startAngle },
    { name: 'AUFSCHWUNGZONE', color: '#d4e534', angle: startAngle + segmentAngle + spacing },
    { name: 'NEUTRALZONE', color: '#d9ea3a', angle: startAngle + 2 * (segmentAngle + spacing) },
    { name: 'RISIKOZONE', color: '#ff5722', angle: startAngle + 3 * (segmentAngle + spacing), textColor: '#fff' },
    { name: 'TOPZONE', color: '#c4d82e', angle: startAngle + 4 * (segmentAngle + spacing) }
  ];

  return (
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
            <path
              key={index}
              d={createSegment(centerX, centerY, innerRadius, outerRadius, segment.angle, segment.angle + segmentAngle)}
              fill={segment.color}
              opacity={segment.name === 'RISIKOZONE' ? 1 : 0.8}
            />
          ))}
          
          {/* Zone labels curved along segments */}
          {segments.map((segment, index) => (
            <text
              key={`text-${index}`}
              fill={segment.textColor || '#333'}
              fontSize="10"
              fontWeight="700"
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
                fill="#999"
                fontSize="8"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${angle}, ${textPos.x}, ${textPos.y})`}
              >
                {tickValue}
              </text>
            );
          })}
          
          {/* Center value */}
          <text
            x="200"
            y="220"
            fill="#ff5722"
            fontSize="100"
            fontWeight="900"
            textAnchor="middle"
          >
            {value}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default BitcoinTopGauge;
