"use client";

import { useState } from 'react';

export default function RefinementSelectors({ refinement, theme, refinementExtra }) {
  const [selected, setSelected] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const activeBg = theme?.accentBg || 'bg-emerald-300/10';
  const hoverBorder = theme?.accentBorder || 'hover:border-emerald-300/25';
  const newValues = refinement.filter((val) => val !== refinementExtra[0] && val !== refinementExtra[1]);

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
    <div className={`flex gap-2 w-full justify-center ${refinement.length > 0 ? '' : 'hidden'}`}>
      <select value={dropdownValue} onChange={handleSelectNavigation} className={`max-[400px]:w-full bg-white/10 p-1 rounded border text-white border-white/5 ${hoverBorder} transition`}>
        {newValues.map((val, index) => (
          <option className='text-black bg-white' key={index}>{val}</option>
        ))}
      </select>
      {refinementExtra.length > 0 && (
        <div className='flex gap-1'>
          <button className={`${selected === refinementExtra[0] ? activeBg : 'bg-white/10'} p-1 rounded cursor-pointer border border-white/5 ${hoverBorder} transition-colors`} onClick={() => handleNavigation(refinementExtra[0])}>{refinementExtra[0]}</button>
          <button className={`${selected === refinementExtra[1] ? activeBg : 'bg-white/10'} p-1 rounded cursor-pointer border border-white/5 ${hoverBorder} transition-colors`} onClick={() => handleNavigation(refinementExtra[1])}>{refinementExtra[1]}</button>
        </div>
      )}
    </div>
  );
}