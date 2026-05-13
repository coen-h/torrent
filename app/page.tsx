"use client";

import Script from 'next/script';

export default function SoftwareSearch() {
  return (
    <div className="mx-auto p-4">
      <p className="text-4xl font-semibold bg-gradient-to-r from-neutral-200 to-emerald-300 bg-clip-text text-transparent">TEST ZITHER Font Test.</p>

      <Script
        src="https://cse.google.com/cse.js?cx=a1c68bdb263434c9b"
        strategy="afterInteractive"
      />

      <div
        className="gcse-search"
        data-placeholder="Search for software..."
      ></div>
    </div>
  );
}