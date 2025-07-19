'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black w-full py-8 sm:py-12 lg:py-16 text-white">
      <div className="max-w-full sm:max-w-[768px] lg:max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-[86px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Page Links */}
          <div>
            <h3 className="benefit-header mb-3 sm:mb-4 !text-white">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <a href="#home" className="body-text !text-white hover:!text-gray-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#benefits" className="body-text !text-white hover:!text-gray-300 transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#about" className="body-text !text-white hover:!text-gray-300 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="benefit-header mb-3 sm:mb-4 !text-white">Contact Details</h3>
            <div className="space-y-1 sm:space-y-2">
              <p className="body-text !text-white">
                Email: example@email.com
              </p>
              <p className="body-text !text-white">
                Phone: +12 345 678
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="benefit-header mb-3 sm:mb-4 !text-white">Company</h3>
            <p className="body-text !text-white">
              Made for Marketers by Marketers ✦ Powered by AI
            </p>
          </div>
        </div>

        {/* Footer Watermark/Copyright */}
        <div className="border-t border-white border-opacity-30 pt-4 sm:pt-6 lg:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <p className="body-text !text-white">
              MindsheepLabs © 2025 All Rights Reserved
            </p>
            <div className="mt-0">
              <Image
                src="/assets/branding/logo-mark@2x.svg"
                alt="Logo Mark"
                width={40}
                height={40}
                className="opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}