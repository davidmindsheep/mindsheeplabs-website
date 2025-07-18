'use client';

import React from 'react';

export default function S4Section() {
  const bodyTexts = [
    "MindsheepLabs exists because brilliant marketers were getting outgunned by teams with bigger budgets and faster systems. The playing field isn't level—but AI is about to flip the table.",
    "We're not another agency promising magical solutions. We're explorers mapping uncharted territory in AI-powered marketing, and we're looking for pioneering clients who want to discover this frontier with us.",
    "The question isn't whether AI will transform how you do business.",
    "The question is: Do you want to help write the playbook, or wait for someone else to hand you a copy?"
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-[86px]">
        {/* Two-column layout matching Figma design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Us label and Headline */}
          <div className="lg:max-w-[488px]">
            <div className="inline-block bg-[var(--color-5)] text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
              About Us
            </div>
            <h2 className="s4-headline">
              {"Great marketers shouldn't lose to inferior competitors with better systems."}
            </h2>
          </div>

          {/* Right Column - Body Text */}
          <div className="lg:max-w-[588px] space-y-8">
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