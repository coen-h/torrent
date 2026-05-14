"use client";

import { useEffect, useState } from 'react';
import RefinementSelect from './components/RefinementSelect';
import TypeSelect from './components/TypeSelect';
import Script from 'next/script';

export default function SoftwareSearch() {
  
  return (
    <div className="mx-auto p-4">
      <p className="text-4xl font-bold bg-gradient-to-r from-neutral-200 to-emerald-300 bg-clip-text text-transparent">TEST ZITHER Font Test.</p>

      <div className='flex gap-2'>
        <RefinementSelect />
        <TypeSelect />
      </div>

      <Script
        src="https://cse.google.com/cse.js?cx=a1c68bdb263434c9b"
        strategy="afterInteractive"
      />

      <div
        className="gcse-search"
        data-placeholder="Search for software..."
      ></div>
    </div>
  );
}