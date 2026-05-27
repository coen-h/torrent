"use client";

import { Gamepad, LaptopMinimal, Smartphone} from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className='absolute h-full flex p-1 items-center justify-center top-0 left-0'>
      <div className='bg-white/10 flex-col h-full w-10 py-1 flex gap-2 items-center rounded'>
        <Link href="/software" className='text-neutral-400 hover:text-white transition'><LaptopMinimal width={28} height={28} /></Link>
        <Link href="/games" className='text-neutral-400 hover:text-white transition'><Gamepad width={28} height={28} /></Link>
        <Link href="/apk" className='text-neutral-400 hover:text-white transition'><Smartphone width={28} height={28} /></Link>
      </div>
    </div>
  );
}