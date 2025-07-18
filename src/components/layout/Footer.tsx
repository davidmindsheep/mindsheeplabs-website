'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black w-full py-16 text-white">
      <div className="max-w-[1280px] mx-auto px-[86px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Page Links */}
          <div>
            <h3 className="benefit-header mb-4 !text-white">Quick Links</h3>
            <ul className="space-y-2">
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
            <h3 className="benefit-header mb-4 !text-white">Contact Details</h3>
            <div className="space-y-2">
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
            <h3 className="benefit-header mb-4 !text-white">Company</h3>
            <p className="body-text !text-white">
              Made for Marketers by Marketers ✦ Powered by AI
            </p>
          </div>
        </div>

        {/* Footer Watermark/Copyright */}
        <div className="border-t border-white border-opacity-30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="body-text !text-white">
              MindsheepLabs © 2025 All Rights Reserved
            </p>
            <div className="mt-4 md:mt-0">
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