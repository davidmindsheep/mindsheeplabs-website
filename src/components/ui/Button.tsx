'use client';

import React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  href, 
  variant = 'primary', 
  className = '' 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:scale-105';
  
  // Primary variant uses the Figma SVG button
  if (variant === 'primary') {
    const ButtonContent = () => (
      <div className={`relative ${baseClasses} ${className}`}>
        <svg 
          width="216" 
          height="49" 
          viewBox="0 0 432 98" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-[216px] h-[49px]"
        >
          <g filter="url(#filter0_i_button)">
            <rect width="432" height="98" rx="24.5" fill="url(#paint0_linear_button)"/>
          </g>
          <defs>
            <filter id="filter0_i_button" x="0" y="0" width="432" height="98" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="4"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_button"/>
            </filter>
            <linearGradient id="paint0_linear_button" x1="0" y1="49" x2="432" y2="49" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FD5400"/>
              <stop offset="1" stopColor="#FF7A01"/>
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-white font-medium text-base">
          {children || "Get Started"}
        </span>
      </div>
    );

    if (href) {
      return <a href={href}><ButtonContent /></a>;
    }
    return <button onClick={onClick}><ButtonContent /></button>;
  }
  
  // Secondary variant fallback
  const variantClasses = 'bg-transparent border-2 border-orange-500 text-orange-500 font-medium text-base rounded-xl hover:bg-orange-500 hover:text-white w-[216px] h-[49px]';
  const finalClassName = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={finalClassName}>
        {children || "Get Started"}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={finalClassName}>
      {children || "Get Started"}
    </button>
  );
}