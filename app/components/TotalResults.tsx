"use client";

import { useEffect, useState } from 'react';

export default function TotalResults() {
  const [totalResults, setTotalResults] = useState('');

  useEffect(() => {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
      const resultInfoElement = document.querySelector('.gsc-result-info');
    
      if (resultInfoElement) {
        const textContent = resultInfoElement.textContent;

        setTotalResults((prev) => {
          return prev === textContent ? prev : textContent;
        });
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    return () => observer.disconnect(); 
  }, []);


  return (
    <p>{totalResults}</p>
  );
}