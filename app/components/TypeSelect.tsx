"use client";

import { useEffect, useState } from 'react';

export default function SoftwareSearch() {
  const handleNavigation = (val) => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const formattedVal = val.toLowerCase().replace(/\s+/g, '_');
    const refinement = `more:${formattedVal}`;

    params.set('gsc.ref', refinement);
    params.set('gsc.tab', '0');
    
    window.location.hash = decodeURIComponent(params.toString());
  };

  return (
    <div className='flex gap-2'>
        <button className='border-emerald-300/25 p-1 rounded border bg-white/20' onClick={() => handleNavigation('torrent')}>Torrent</button>
        <button onClick={() => handleNavigation('direct')}>Direct</button>
    </div>
  );
}