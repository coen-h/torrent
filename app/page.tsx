"use client";

import RefinementSelectors from './components/RefinementSelectors';
import Results from './components/Results';
import Script from 'next/script';
import Search from './components/Search';
import Ticker from './components/Ticker';

export default function SoftwareSearch() {

  return (
    <div className="mx-auto p-4 flex flex-col items-center gap-2">
      <div className="text-center pb-1">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-neutral-200 to-emerald-400 bg-clip-text text-transparent pb-1">Zither.</h1>
        <Ticker />
      </div>
      
      <RefinementSelectors />

      <Search />

      <Results />
      
      <Script
        src="https://cse.google.com/cse.js?cx=e05ec25e76bc046f5"
        strategy="afterInteractive"
      />

      <div
        className="gcse-search"
        data-placeholder="Search for software..."
      ></div>
      
    </div>
  );
}