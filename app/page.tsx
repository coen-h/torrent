"use client";

import RefinementSelectors from './components/RefinementSelectors';
import TypeLabels from './components/TypeLabels'; 
import TotalResults from './components/TotalResults';
import Script from 'next/script';

export default function SoftwareSearch() {
  return (
    <div className="mx-auto p-4 flex flex-col items-center gap-2">
      <div className="text-center space-y-2">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-neutral-800 to-neutral-500 dark:from-neutral-200 dark:to-emerald-400 bg-clip-text text-transparent pb-1">Zither.</h1>
        <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-medium">The intelligent software discovery engine.</p>
      </div>
      
      <TypeLabels />

      <RefinementSelectors />

      <hr className='bg-white text-white'/>

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