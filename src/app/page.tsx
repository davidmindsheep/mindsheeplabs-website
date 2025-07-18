'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import S2Section from '@/components/sections/S2Section';
import S3Section from '@/components/sections/S3Section';
import S4Section from '@/components/sections/S4Section';
import S5Section from '@/components/sections/S5Section';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';

export default function Home() {
  useAnimatedGradient('hero-canvas', ['#835EFF', '#FF008D']);
  
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-[#1b0734] to-[#9501df] min-h-[700px] relative overflow-hidden">
        {/* Animated Gradient Background */}
        <canvas 
          id="hero-canvas" 
          className="absolute inset-0 w-full h-full opacity-80" 
          style={{ mixBlendMode: 'overlay' }}
        />
        {/* Marquee Text - Made for Marketers by Marketers */}
        <div className="absolute top-0 left-0 w-full h-[45px] bg-[#9501df] overflow-hidden z-50">
          <div className="flex items-center h-full">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-white mx-8 text-sm font-medium">
                Made for Marketers by Marketers ✦ Powered by AI ✦ Made for Marketers by Marketers ✦ Powered by AI ✦ Made for Marketers by Marketers ✦ Powered by AI
              </span>
            </div>
          </div>
        </div>
        
        <Header />
        <main>
          <HeroSection />
        </main>
      </div>
      <main>
        <S2Section />
        <S3Section />
        <S4Section />
        <S5Section />
      </main>
      <Footer />
    </div>
  );
}