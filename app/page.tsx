"use client";

// import { useState } from 'react';
// import { motion } from "framer-motion";
// import RefinementSelectors from '@/app/components/RefinementSelectors';
// import Results from '@/app/components/Results';
// import Script from 'next/script';
// import Search from '@/app/components/Search';
// import Ticker from '@/app/components/Ticker';
// import DataExtract from '@/app/components/DataExtract';

export default function SoftwareSearch() {
  // const [results, setResults] = useState([]);
  // const [totalResults, setTotalResults] = useState('');
  // const [totalPages, setTotalPages] = useState('');
  // const [refinement, setRefinement] = useState([]);
  // const [engine, setEngine] = useState('e05ec25e76bc046f5');

  return (
    <div className="min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(52,211,153,0.12),transparent),radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:100%_100%,16px_16px] p-4 flex flex-col items-center gap-2">
    {/* <div className="mx-auto p-4 flex flex-col items-center gap-2">

        <div className="text-center pb-1">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-neutral-200 to-emerald-400 bg-clip-text text-transparent pb-1">Zither.</h1>
          <Ticker />
        </div>
      
        {results.length > 0 ? (
          <RefinementSelectors refinement={refinement} />
        ) : ''}

        <Search />

      <DataExtract setResults={setResults} setTotalResults={setTotalResults} setTotalPages={setTotalPages} setRefinement={setRefinement} />

      <Results results={results} totalResults={totalResults} totalPages={totalPages} />
      
      <Script
        src={`https://cse.google.com/cse.js?cx=${engine}`}
        strategy="afterInteractive"
      />

      <div
        className="gcse-search"
        data-placeholder="Search for software..."
      ></div>
      
    </div> */}
    </div>
  );
}