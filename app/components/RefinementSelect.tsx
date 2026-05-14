"use client";

import { useEffect, useState } from 'react';

export default function SoftwareSearch() {
  const [spanValues, setSpanValues] = useState([]);

  useEffect(() => {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
      const elements = document.querySelectorAll('.gsc-refinementHeader span');
    
      if (elements.length > 0) {
        const values = Array.from(elements).map(el => el.textContent);
        const newValues = values.filter((val) => val !== 'Torrent' && val !== 'Direct');
        setSpanValues((prev) => {
          return JSON.stringify(prev) === JSON.stringify(values) ? prev : newValues;
        });
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    return () => observer.disconnect(); 
  }, []);

  const handleNavigation = (val) => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const formattedVal = val.toLowerCase().replace(/\s+/g, '_');
    const refinement = `more:${formattedVal}`;

    params.set('gsc.ref', refinement);
    params.set('gsc.tab', '0');
    
    window.location.hash = decodeURIComponent(params.toString());
  };

  return (
    <select className='bg-white/10 p-1 rounded'>
      {spanValues.map((val, index) => (
        <option onClick={() => handleNavigation(val)} key={index}>{val}</option>
      ))}
    </select>
  );
}