"use client";

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchPage() {
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
    <div className="relative items-center flex justify-between p-2 pl-10 pr-10 gap-2 w-xl mx-auto h-12 rounded-md border border-neutral-800 bg-neutral-700/10 backdrop-blur hover:border-neutral-700/50 transition">
      <div className='absolute left-2 text-neutral-400'><Search /></div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full outline-none text-neutral-300 placeholder:text-neutral-500" placeholder="Search for a torrent..." onKeyDown={(e) => e.key === 'Enter' && handleNavigation()} />
      <div onClick={clearQuery} className='absolute right-2 cursor-pointer text-neutral-400 hover:text-neutral-200 transition'><X /></div>
    </div>
  );
}