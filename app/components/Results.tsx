"use client";

import { useEffect, useState } from 'react';

export default function Results({ results, totalResults, totalPages }) {

  const handleNavigation = (pageNum) => {
    const gsePaginationElements = document.querySelectorAll('.gsc-cursor-page');
    let clicked = false;
    
    gsePaginationElements.forEach((el) => {
      if (el.textContent === String(pageNum)) {
        el.click();
        clicked = true;
      }
    });

    if (!clicked) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      params.set('gsc.page', pageNum);
      window.location.hash = params.toString(); 
    }
  };

  const maxPagesToShow = Math.min(Number(totalPages) || 0, 10);
  const paginationArray = Array.from({ length: maxPagesToShow }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-2 w-full max-w-3xl">
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className="p-2 border flex gap-2 pr-40 relative border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-neutral-900 shadow-sm">
            <div>
              <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-100 hover:underline font-semibold text-lg line-clamp-1">{result.title}</a>
              <p className="text-sm text-mist-400 line-clamp-1">{result.link}</p>
              <p className="text-neutral-600 dark:text-neutral-300 mt-2 text-sm leading-relaxed">{result.snippet}</p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-40 p-2">
              <img src={result.image} alt={result.title} className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="absolute top-1 right-1 flex gap-1 z-10">
              {result.hasTorrent && (
                <span className="bg-emerald-500/40 backdrop-blur text-emerald-50 border border-emerald-500/30 text-xs font-semibold px-2 py-0.5 rounded-md">Torrent</span>
              )}
              {result.hasDirect && (
                <span className="bg-blue-500/40 backdrop-blur text-blue-50 border border-blue-500/30 text-xs font-semibold px-2 py-0.5 rounded-md">Direct</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-neutral-500 text-sm text-center animate-pulse">Waiting for search results...</p>
      )}
      
      {paginationArray.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-2">
          {paginationArray.map((pageNum) => (
            <button onClick={() => handleNavigation(pageNum)} key={pageNum} className="w-6 h-8 flex justify-center items-center text-sm font-medium rounded-md border border-neutral-800 text-neutral-400 bg-neutral-900 hover:bg-neutral-800 hover:text-neutral-100 transition-all">{pageNum}</button>
          ))}
        </div>
      )}
      
      <p className='text-center my-2'>{totalResults}</p>
    </div>
  );
}