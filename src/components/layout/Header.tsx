'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🖱️ Toggle menu clicked, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      console.log('🔄 Setting menu state to:', newState);
      return newState;
    });
  };

  return (
    <header className="bg-transparent w-full z-50 pt-[45px]">
      <div className="max-w-full sm:max-w-[768px] lg:max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-[85px] py-3 sm:py-4 lg:py-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/assets/branding/logo@2x.svg"
              alt="Logo"
              width={192}
              height={45}
              className="h-[32px] sm:h-[38px] lg:h-[45px] w-auto"
            />
          </div>

          {/* Navigation Links - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <a href="#home" className="text-white hover:text-[var(--color-5)] transition-colors">
              Home
            </a>
            <a href="#benefits" className="text-white hover:text-[var(--color-5)] transition-colors">
              Benefits
            </a>
            <a href="#about" className="text-white hover:text-[var(--color-5)] transition-colors">
              About Us
            </a>
            <a href="#contact" className="text-white hover:text-[var(--color-5)] transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button - Visible on mobile only */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded touch-manipulation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              role="button"
              style={{ touchAction: 'manipulation' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* CTA Button - Hidden on mobile */}
          <div className="hidden lg:block">
            <Button>
              Get Started
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg">
              <a 
                href="#home" 
                className="text-white hover:text-orange-400 transition-colors py-2 px-2 rounded hover:bg-white/10"
                onClick={() => {
                  console.log('Home link clicked');
                  setIsMobileMenuOpen(false);
                }}
              >
                Home
              </a>
              <a 
                href="#benefits" 
                className="text-white hover:text-orange-400 transition-colors py-2 px-2 rounded hover:bg-white/10"
                onClick={() => {
                  console.log('Benefits link clicked');
                  setIsMobileMenuOpen(false);
                }}
              >
                Benefits
              </a>
              <a 
                href="#about" 
                className="text-white hover:text-orange-400 transition-colors py-2 px-2 rounded hover:bg-white/10"
                onClick={() => {
                  console.log('About link clicked');
                  setIsMobileMenuOpen(false);
                }}
              >
                About Us
              </a>
              <a 
                href="#contact" 
                className="text-white hover:text-orange-400 transition-colors py-2 px-2 rounded hover:bg-white/10"
                onClick={() => {
                  console.log('Contact link clicked');
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact
              </a>
              <div className="pt-2 flex justify-center">
                <Button onClick={() => console.log('Get Started clicked')}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}