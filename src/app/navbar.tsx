'use client'

import './globals.css'
import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono" role="navigation">
        <Link href="/" className="pl-8">takagi.dev</Link>
        <div className="px-8 cursor-pointer md:hidden" onClick={toggle}>
          <Bars3Icon className="h-6 w-6" />
        </div>
        <div className="pr-4 md:block hidden">
          <Link href="/" className="p-4">Home</Link>
          <Link href="/about" className="p-4">About</Link>
        </div>
      </nav>
      <div className={ isOpen ? "relative grid grid-rows-2 text-center items-center bg-gray-800 text-white font-mono" : "hidden" } onClick={toggle}>
        <Link href="/" className="p-4">Home</Link>
        <Link href="/about" className="p-4">About</Link>
      </div>
    </>
  )
}
