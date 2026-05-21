"use client";

import { useState, useEffect } from 'react';

export default function Search() {
  const getQuery = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    return params.get('gsc.q') || '';
  };

  const [query, setQuery] = useState(getQuery());

  useEffect(() => {
    const handleHashChange = () => {
      setQuery(getQuery());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigation = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    params.set('gsc.q', query);
    window.location.hash = params.toString(); 
  };

  const clearQuery = () => {
    setQuery('');
    const params = new URLSearchParams(window.location.hash.substring(1));
    params.delete('gsc.q');
    params.delete('gsc.page');
    params.delete('gsc.sort');
    window.location.hash = params.toString(); 
  };

  return (
    <div className="relative items-center flex justify-between p-2 gap-2 w-xl mx-auto h-12 rounded-md border border-neutral-800 bg-neutral-900 hover:border-emerald-300/10 transition">
      <svg className='absolute left-2 text-neutral-400' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full outline-none text-neutral-300 placeholder:text-neutral-500" placeholder="Search for a torrent..." onKeyDown={(e) => e.key === 'Enter' && handleNavigation()} />
      <svg onClick={clearQuery} className='absolute right-2 cursor-pointer text-neutral-400 hover:text-neutral-300 transition' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </div>
  );
}