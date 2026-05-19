"use client";

import { useState } from 'react';
import RefinementSelectors from './components/RefinementSelectors';
import Results from './components/Results';
import Script from 'next/script';
import Search from './components/Search';
import Ticker from './components/Ticker';
import DataExtract from './components/DataExtract';
import RecaptchaGuard from './components/Recaptcha';

export default function SoftwareSearch() {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [refinement, setRefinement] = useState([]);

  return (
    <div className="mx-auto my-auto p-4 flex flex-col items-center gap-2">
      <div className="text-center pb-1">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-neutral-200 to-emerald-400 bg-clip-text text-transparent pb-1">Zither.</h1>
        <Ticker />
      </div>
      
      <RefinementSelectors refinement={refinement} />

      <DataExtract setResults={setResults} setTotalResults={setTotalResults} setTotalPages={setTotalPages} setRefinement={setRefinement} />

      <Search />

      <RecaptchaGuard />

      <Results results={results} totalResults={totalResults} totalPages={totalPages} />
      
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