'use client';

import React from 'react';
import Image from 'next/image';

interface AnimatedBubbleProps {
  iconSrc: string;
  iconAlt: string;
  size?: number;
  animationType?: 'float' | 'float-delayed' | 'float-slow';
  className?: string;
}

export default function AnimatedBubble({ 
  iconSrc, 
  iconAlt, 
  size = 36, 
  animationType = 'float',
  className = '' 
}: AnimatedBubbleProps) {
  // Use CSS classes for animations instead of Framer Motion for now
  const animationClass = `bubble-${animationType}`;

  return (
    <div className={`inline-block ${animationClass} ${className}`}>
      <div className="relative group cursor-pointer">
        {/* Subtle background bubble effect */}
        <div className="absolute inset-0 bg-[var(--color-7)] rounded-full opacity-10 transform scale-150 blur-sm group-hover:opacity-20 transition-opacity"></div>
        
        {/* Main icon */}
        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-200">
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={size}
            height={size}
          />
        </div>
      </div>
    </div>
  );
}