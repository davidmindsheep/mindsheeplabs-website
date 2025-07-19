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
  
  // Primary variant uses CSS gradient background for better mobile compatibility
  if (variant === 'primary') {
    const ButtonContent = () => (
      <div className={`relative ${baseClasses} ${className} bg-gradient-to-r from-[#FD5400] to-[#FF7A01] rounded-[25px] shadow-inner px-6 py-3 w-[160px] h-[38px] sm:w-[180px] sm:h-[42px] md:w-[200px] md:h-[45px] lg:w-[216px] lg:h-[49px]`}>
        <span className="flex items-center justify-center text-white font-medium text-xs sm:text-sm md:text-base h-full">
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
  const variantClasses = 'bg-transparent border-2 border-orange-500 text-orange-500 font-medium text-sm sm:text-base rounded-xl hover:bg-orange-500 hover:text-white w-[180px] h-[42px] sm:w-[200px] sm:h-[45px] lg:w-[216px] lg:h-[49px]';
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