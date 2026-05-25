"use client";

import { Gamepad, LaptopMinimal, Smartphone} from 'lucide-react';
import Link from 'next/link';

export default function SearchLayoutWrapper() {
  return (
    <div className='h-full w-12 absolute left-0 top-0 p-1'>
      <div className='bg-white/10 flex-col py-1 flex gap-2 items-center rounded'>
        <Link href="/software" className='text-neutral-400 hover:text-white transition'><LaptopMinimal width={28} height={28} /></Link>
        <Link href="/games" className='text-neutral-400 hover:text-white transition'><Gamepad width={28} height={28} /></Link>
        <Link href="/apk" className='text-neutral-400 hover:text-white transition'><Smartphone width={28} height={28} /></Link>
      </div>
    </div>
  );
}