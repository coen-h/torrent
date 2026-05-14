"use client";

import RefinementSelectors from './components/RefinementSelectors';
import TotalResults from './components/TotalResults';
import Script from 'next/script';

export default function SoftwareSearch() {
  
  return (
    <div className="mx-auto p-4 flex flex-col items-center gap-2">
      <p className="text-4xl font-bold bg-gradient-to-r from-neutral-200 to-emerald-300 bg-clip-text text-transparent">Zither.</p>

      <RefinementSelectors />

      <Script
        src="https://cse.google.com/cse.js?cx=a1c68bdb263434c9b"
        strategy="afterInteractive"
      />

      <div
        className="gcse-search"
        data-placeholder="Search for software..."
      ></div>
      <TotalResults />
    </div>
  );
}