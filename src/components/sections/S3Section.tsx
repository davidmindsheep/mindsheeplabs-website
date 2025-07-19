'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import AnimatedBubble from '../animations/AnimatedBubble';

export default function S3Section() {
  const benefits = [
    {
      icon: '/assets/general/high-voltage@2x.svg',
      title: 'Brand-Consistent Imagery at Inhuman Speed',
      description: 'Why hire 10 models when one can become 100? We\'re exploring AI image generation with face consistency—authorized individual replication that lets your brand personalities show up everywhere.',
      animationType: 'float' as const
    },
    {
      icon: '/assets/general/magic-wand@2x.svg', 
      title: 'Marketing Automation That Doesn\'t Feel Automated',
      description: 'Campaigns that generate content automatically but nothing goes live without your approval. Human-guided automation that scales your output without sacrificing your voice.',
      animationType: 'float-delayed' as const
    },
    {
      icon: '/assets/general/direct-hit@2x.svg',
      title: 'Business Processes That Actually Process',
      description: 'Email sequences, proposals, workflow bottlenecks—we\'re automating the stuff eating your team\'s time so they can focus on work that moves needles.',
      animationType: 'float-slow' as const
    },
    {
      icon: '/assets/general/magnet@2x.svg',
      title: 'Lead Magnets With Built-In Sales Teams',
      description: 'Lead magnets that analyze prospects and generate custom proposals automatically. Your funnel becomes a conversion machine that works while you sleep.',
      animationType: 'float' as const
    },
    {
      icon: '/assets/general/gear@2x.svg',
      title: 'Innovation Partnership, Not Vendor Relationship',
      description: 'You\'re getting early access to marketing\'s future. As we discover what works, you\'re first in line for breakthroughs that\'ll make competitors scramble.',
      animationType: 'float-delayed' as const
    },
    {
      icon: '/assets/general/mechanical-arm@2x.svg',
      title: 'Super-Employee Transformation',
      description: 'What if your team could work at AI speed? We\'re exploring marketing automation and business process AI that turns your people into super-employees who accomplish in hours what used to take days.',
      animationType: 'float-slow' as const
    }
  ];

  // State to track which cards are shaking
  const [shakingCards, setShakingCards] = useState(new Array(benefits.length).fill(false));

  // Handle hover to trigger shake animation
  const handleCardHover = (cardIndex: number) => {
    // Only trigger if not already shaking
    if (!shakingCards[cardIndex]) {
      setShakingCards(prev => {
        const newShaking = [...prev];
        newShaking[cardIndex] = true;
        return newShaking;
      });

      // Stop shaking after animation completes (2 seconds)
      setTimeout(() => {
        setShakingCards(prev => {
          const newShaking = [...prev];
          newShaking[cardIndex] = false;
          return newShaking;
        });
      }, 2000);
    }
  };

  return (
    <section id="benefits" className="bg-[var(--color-6)] py-8 sm:py-16 lg:py-24">
      <div className="max-w-full sm:max-w-[768px] lg:max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-[85px]">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-20">
          <div className="inline-block bg-[var(--color-7)] text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium mb-4 sm:mb-6">
            Benefits
          </div>
          <h2 className="s3-headline">
            What happens when you stop accepting marketing limitations?
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                shakingCards[index] ? 'shake-animation' : ''
              }`}
              onMouseEnter={() => handleCardHover(index)}
            >
              {/* Animated Icon */}
              <div className="mb-6">
                <AnimatedBubble
                  iconSrc={benefit.icon}
                  iconAlt={benefit.title}
                  size={40}
                  animationType={benefit.animationType}
                />
              </div>

              {/* Content */}
              <h3 className="benefit-header mb-4">
                {benefit.title}
              </h3>
              <p className="benefit-body">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button>
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}