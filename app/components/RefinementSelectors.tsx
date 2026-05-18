"use client";

import { useEffect, useState } from 'react';

export default function RefinementSelectors() {
  const [spanValues, setSpanValues] = useState([]);
  const [selected, setSelected] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');

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

  const handleSelectNavigation = (e) => {
    const val = e.target.value;
    if (!val) return;

    setSelected('');
    setDropdownValue(val);

    const params = new URLSearchParams(window.location.hash.substring(1));
    const formattedVal = val.toLowerCase().replace(/\s+/g, '_');
    const refinement = `more:${formattedVal}`;

    params.set('gsc.ref', refinement);
    params.set('gsc.tab', '0');
    params.delete('gsc.page');
    
    window.location.hash = params.toString();
  };

  const handleNavigation = (val) => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const formattedVal = val.toLowerCase().replace(/\s+/g, '_');
    const refinement = `more:${formattedVal}`;
    setDropdownValue('');

    if (selected === val) {
      setSelected('');
      params.delete('gsc.ref');
      params.set('gsc.tab', '0');
      params.delete('gsc.page');
    } else {
      setSelected(val);
      params.set('gsc.ref', refinement);
      params.set('gsc.tab', '0');
      params.delete('gsc.page');
    }
    
    window.location.hash = params.toString();
  };

  return (
    <div className='flex gap-2'>
      <select value={dropdownValue} onChange={handleSelectNavigation} className='bg-white/10 p-1 rounded border border-emerald-100/10 hover:border-emerald-300/25'>
        {spanValues.map((val, index) => (
          <option key={index}>{val}</option>
        ))}
      </select>

      <div className='flex gap-1'>
        <button className={`${selected === 'torrent' ? 'bg-emerald-300/10' : 'bg-white/10'} p-1 rounded cursor-pointer border border-emerald-100/10 hover:border-emerald-300/25`} onClick={() => handleNavigation('torrent')}>Torrent</button>
        <button className={`${selected === 'direct' ? 'bg-emerald-300/10' : 'bg-white/10'} p-1 rounded cursor-pointer border border-emerald-100/10 hover:border-emerald-300/25`} onClick={() => handleNavigation('direct')}>Direct</button>
      </div>
    </div>
  );
}