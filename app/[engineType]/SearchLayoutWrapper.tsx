"use client";

import { useState } from 'react';
import { EngineConfig } from '@/config/engines';
import RefinementSelectors from '@/app/components/RefinementSelectors';
import Sidebar from '@/app/components/Sidebar';
import Results from '@/app/components/Results';
import Script from 'next/script';
import Search from '@/app/components/Search';
import Ticker from '@/app/components/Ticker';
import DataExtract from '@/app/components/DataExtract';

export default function SearchLayoutWrapper({ config }: { config: EngineConfig }) {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [refinement, setRefinement] = useState([]);
  const glowColor = config.theme?.radialGlow || 'rgba(52,211,153,0.12)';
  const gradientFrom = config.theme?.gradientFrom || 'from-neutral-200';
  const gradientTo = config.theme?.gradientTo || 'from-neutral-200';

  return (
    <div style={{ '--glow-color': glowColor } as React.CSSProperties} className={`min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,var(--glow-color),transparent),radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:100%_100%,16px_16px] p-4 flex flex-col items-center gap-2`}>
      <Sidebar />
      <div className="mx-auto p-4 flex flex-col items-center gap-2">

        <div className="text-center pb-1">
          <h1 className={`text-5xl font-extrabold tracking-tight bg-gradient-to-br ${gradientFrom} ${gradientTo} bg-clip-text text-transparent pb-1`}>{config.name}.</h1>
          <Ticker />
        </div>

        <RefinementSelectors refinement={refinement} theme={config.theme} />

        <Search />

        <DataExtract setResults={setResults} setTotalResults={setTotalResults} setTotalPages={setTotalPages} setRefinement={setRefinement} />

        <Results results={results} totalResults={totalResults} totalPages={totalPages} theme={config.theme} />
      
        <Script
          key={config.cx}
          src={`https://cse.google.com/cse.js?cx=${config.cx}`}
          strategy="afterInteractive"
        />

        <div
          key={config.cx}
          className="gcse-search"
          data-placeholder={config.placeholder}
        ></div>
      
      </div>
    </div>
  );
}