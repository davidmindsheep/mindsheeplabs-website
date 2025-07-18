'use client';

import React from 'react';

export default function S2Section() {
  const bodyTexts = [
    "You&apos;re burning budget on generic stock photos. Waiting weeks for creative that&apos;s outdated before it launches. Watching competitors move faster while you&apos;re stuck in revision hell.",
    "MindsheepLabs is exploring the frontier of AI-powered marketing—and we&apos;re taking select partners along for the ride. We&apos;re not replacing your team. We&apos;re giving them superpowers.",
    "Custom AI imagery with face consistency. Marketing automation with human control. Business processes that run themselves. Lead magnets that analyze prospects and write proposals automatically.",
    "We&apos;re in discovery mode, testing what&apos;s possible, and we want marketers who aren&apos;t afraid to be first."
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1280px] mx-auto px-[85px]">
        <div className="max-w-[876px] mx-auto text-center">
          {/* Section Headline */}
          <h2 className="s2-headline mb-12">
            Here&apos;s what&apos;s killing your marketing ROI right now.
          </h2>

          {/* Content Grid */}
          <div className="space-y-8 mt-16">
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