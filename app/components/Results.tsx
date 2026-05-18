"use client";

import { useEffect, useState } from 'react';

export default function Results() {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState('');

  useEffect(() => {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
      const resultNodes = document.querySelectorAll('.gsc-webResult.gsc-result');
      const resultInfoElement = document.querySelector('.gsc-result-info');
    
      if (resultInfoElement) {
        const textContent = resultInfoElement.textContent;

        setTotalResults((prev) => {
          return prev === textContent ? prev : textContent;
        });
      }
      
      if (resultNodes.length > 0) {
        const parsedResults = Array.from(resultNodes).map((node) => {
          const titleElement = node.querySelector('.gs-title a');
          const snippetElement = node.querySelector('.gs-snippet');
          const imageElement = node.querySelector('.gs-image img');
          const hasDirect = node.querySelector('.gs-label[data-refinementlabel="direct"]');
          const hasTorrent = node.querySelector('.gs-label[data-refinementlabel="torrent"]');

          return {
            title: titleElement ? titleElement.textContent : '',
            link: titleElement ? titleElement.href : '',
            snippet: snippetElement ? snippetElement.textContent : '',
            image: imageElement ? imageElement.src : '',
            hasDirect: hasDirect ? true : false,
            hasTorrent: hasTorrent ? true : false
          };
        }).filter(res => res.title && res.link);

        setResults((prev) => {
          if (prev.length === parsedResults.length && prev[0]?.link === parsedResults[0]?.link) {
            return prev;
          }
          return parsedResults;
        });
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    return () => observer.disconnect(); 
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full max-w-3xl mt-6">
      {results.length > 0 ? (
        results.map((result, index) => (
          <div  className="p-2 border flex gap-2 relative border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-neutral-900 shadow-sm">
            <div>
              <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-100 hover:underline font-semibold text-lg line-clamp-1">{result.title}</a>
              <p className="text-sm text-mist-400 truncate">{result.link}</p>
              <p className="text-neutral-600 dark:text-neutral-300 mt-2 text-sm leading-relaxed">{result.snippet}</p>
            </div>
            <img src={result.image} alt={result.title} className="w-44 object-cover rounded-md" />
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
      <p className='text-center mt-6 mb-2'>{totalResults}</p>
    </div>
  );
}