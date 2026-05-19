"use client";

import { useState } from 'react';

export default function RefinementSelectors({ refinement }) {
  const [selected, setSelected] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');

  const handleSelectNavigation = (e) => {
    const val = e.target.value;
    if (!val) return;

    setSelected('');
    setDropdownValue(val);

    const params = new URLSearchParams(window.location.hash.substring(1));
    const formattedVal = val.toLowerCase().replace(/\s+/g, '_');

    if (formattedVal === 'all_results') {
      params.delete('gsc.ref');
    } else {
      params.set('gsc.ref', `more:${formattedVal}`);
    }

    params.set('gsc.tab', '0');
    params.delete('gsc.page');
    
    window.location.hash = params.toString();
  };

  const handleNavigation = (val) => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const formattedVal = val.toLowerCase().replace(/\s+/g, '_');
    setDropdownValue('');

    if (selected === val || formattedVal === 'all_results') {
      setSelected('');
      params.delete('gsc.ref');
    } else {
      setSelected(val);
      params.set('gsc.ref', `more:${formattedVal}`);
    }
    
    window.location.hash = params.toString();
    console.log(selected)
    console.log(dropdownValue)
  };

  return (
    <div className='flex gap-2'>
      <select value={dropdownValue} onChange={handleSelectNavigation} className='bg-white/10 p-1 rounded border border-emerald-100/10 hover:border-emerald-300/25'>
        {refinement.map((val, index) => (
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