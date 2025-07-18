'use client';

import React from 'react';
import Button from '../ui/Button';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';

export default function S5Section() {
  useAnimatedGradient('footer-canvas', ['#FF008D', '#835EFF']);
  
  return (
    <section className="bg-gradient-to-b from-[#9501df] to-[#1b0734] py-24 text-white text-center relative overflow-hidden">
      {/* Animated Gradient Background */}
      <canvas 
        id="footer-canvas" 
        className="absolute inset-0 w-full h-full opacity-80" 
        style={{ mixBlendMode: 'overlay' }}
      />
      <div className="max-w-[1280px] mx-auto px-[85px]">
        <div className="max-w-[744px] mx-auto">
          {/* Main CTA Headline */}
          <h2 className="s5-headline !text-white mb-6">
            Ready to explore what&apos;s possible?
          </h2>
          
          {/* CTA Subheadline */}
          <p className="hero-subheadline !text-white opacity-90 mb-12">
            Let&apos;s discover together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button>
              Start Exploring
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white border-opacity-20">
            <p className="text-sm !text-white opacity-75 mb-4">
              Trusted by marketing teams at
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <span className="text-sm !text-white">500+ Companies</span>
              <span className="text-sm !text-white">•</span>
              <span className="text-sm !text-white">50K+ Campaigns</span>
              <span className="text-sm !text-white">•</span>
              <span className="text-sm !text-white">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}