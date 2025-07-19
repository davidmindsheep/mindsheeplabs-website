'use client';

import React from 'react';

export default function S2Section() {
  const bodyTexts = [
    "You're burning budget on generic stock photos. Waiting weeks for creative that's outdated before it launches. Watching competitors move faster while you're stuck in revision hell.",
    "MindsheepLabs is exploring the frontier of AI-powered marketing—and we're taking select partners along for the ride. We're not replacing your team. We're giving them superpowers.",
    "Custom AI imagery with face consistency. Marketing automation with human control. Business processes that run themselves. Lead magnets that analyze prospects and write proposals automatically.",
    "We're in discovery mode, testing what's possible, and we want marketers who aren't afraid to be first."
  ];

  return (
    <section className="bg-white py-8 sm:py-16 lg:py-20">
      <div className="max-w-full sm:max-w-[768px] lg:max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-[85px]">
        <div className="max-w-full sm:max-w-[600px] lg:max-w-[876px] mx-auto text-center">
          {/* Section Headline */}
          <h2 className="s2-headline mb-6 sm:mb-8 lg:mb-12">
            {"Here's what's killing your marketing ROI right now."}
          </h2>

          {/* Content Grid */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 mt-8 sm:mt-12 lg:mt-16">
            {bodyTexts.map((text, index) => (
              <p key={index} className="body-text text-left">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}