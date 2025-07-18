'use client';

import React from 'react';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-[85px] py-24">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Hero Header Content */}
          <div className="max-w-[955px] space-y-6">
            {/* Main Headline */}
            <h1 className="hero-headline !text-white">
              AI-Powered Marketing & Business Automation With No Limits
            </h1>
            
            {/* Subheadline */}
            <p className="hero-subheadline max-w-[822px] mx-auto !text-white">
              Stop settling for human-speed creative and manual processes. Start exploring what AI can do for your campaigns and operations
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button>
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* You can add background patterns or decorative SVGs here */}
      </div>
    </section>
  );
}