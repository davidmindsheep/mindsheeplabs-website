'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="bg-transparent w-full z-50 pt-[45px]">
      <div className="max-w-[1280px] mx-auto px-[85px] py-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/assets/branding/logo@2x.svg"
              alt="Logo"
              width={192}
              height={45}
              className="h-[45px] w-auto"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-12">
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

          {/* CTA Button */}
          <Button>
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
}