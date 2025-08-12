import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex justify-between items-center h-16 bg-white text-black sticky top-0 z-50 shadow-sm font-mono" role="navigation">
        <Link to="/" className="pl-8">takagi.dev</Link>
        <div className="px-8 cursor-pointer md:hidden" onClick={toggle}>
          <Bars3Icon className="h-6 w-6" />
        </div>
        <div className="pr-4 md:block hidden">
          <Link to="/" className="p-4">Home</Link>
          <Link to="/about" className="p-4">About</Link>
          <a href="https://github.com/ytkg" target="_blank" rel="noopener noreferrer" className="p-4">GitHub</a>
        </div>
      </nav>
      <div className={ isOpen ? "relative grid grid-rows-3 text-center items-center bg-gray-800 text-white font-mono" : "hidden" } onClick={toggle}>
        <Link to="/" className="p-4">Home</Link>
        <Link to="/about" className="p-4">About</Link>
        <a href="https://github.com/ytkg" target="_blank" rel="noopener noreferrer" className="p-4">GitHub</a>
      </div>
    </>
  );
}
