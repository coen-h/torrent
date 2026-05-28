"use client";

import { Gamepad, LaptopMinimal, Smartphone, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    const handleScroll = () => {
      if (window.innerWidth < 900) {
        setOpen((prevOpen) => (prevOpen ? false : prevOpen));
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true); 
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <>
      <div className={`absolute z-20 h-full flex p-1 items-center justify-center transition-transform left-0 top-0 ${open ? '' : '-translate-x-full'}`}>
        <div className='bg-white/10 backdrop-blur flex-col h-full w-10 py-1 flex gap-2 items-center rounded'>
          <Link href="/software" className='text-neutral-400 hover:text-white transition'><LaptopMinimal width={28} height={28} /></Link>
          <Link href="/games" className='text-neutral-400 hover:text-white transition'><Gamepad width={28} height={28} /></Link>
          <Link href="/apk" className='text-neutral-400 hover:text-white transition'><Smartphone width={28} height={28} /></Link>
        </div>
      </div>
      <button className={`absolute left-1.5 bottom-1.5 text-neutral-400 hover:text-white ${open ? '' : 'bg-white/10'} rounded backdrop-blur p-1 transition cursor-pointer z-30`} onClick={() => setOpen(!open)}><ExternalLink width={28} height={28} /></button>
    </>
  );
}