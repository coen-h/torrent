"use client";

import RefinementSelectors from './components/RefinementSelectors';
import TypeLabels from './components/TypeLabels'; 
import Results from './components/Results';
import Script from 'next/script';

export default function SoftwareSearch() {
  return (
    <div className="mx-auto p-4 flex flex-col items-center gap-2">
      <div className="text-center pb-1">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-neutral-200 to-emerald-400 bg-clip-text text-transparent pb-1">Zither.</h1>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium">The intelligent software discovery engine.</p>
      </div>
      
      <TypeLabels />

      <RefinementSelectors />

      <Script
        src="https://cse.google.com/cse.js?cx=e05ec25e76bc046f5"
        strategy="afterInteractive"
      />

      <div
        className="gcse-search"
        data-placeholder="Search for software..."
      ></div>

      <Results />
    </div>
  );
}