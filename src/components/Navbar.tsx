import { Link } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileToolsOpen, setMobileIsToolsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    setMobileIsToolsOpen(false); // Close mobile tools when main menu closes
  };

  const handleToolsEnter = () => {
    setIsToolsOpen(true);
  };

  const handleToolsLeave = () => {
    setIsToolsOpen(false);
  };

  const toggleMobileTools = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMobileIsToolsOpen(!isMobileToolsOpen);
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
          <div className="relative inline-block" onMouseEnter={handleToolsEnter} onMouseLeave={handleToolsLeave}>
            <button className="p-4 inline-flex items-center">
              <span>Tools</span>
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            {isToolsOpen && (
              <div className="absolute right-0 w-40 mt-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                <div className="py-1">
                  <Link to="/tools/tool1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tool 1</Link>
                  <Link to="/tools/tool2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tool 2</Link>
                  <Link to="/tools/tool3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tool 3</Link>
                </div>
              </div>
            )}
          </div>
          <a href="https://github.com/ytkg" target="_blank" rel="noopener noreferrer" className="p-4">GitHub</a>
        </div>
      </nav>
      <div className={ isOpen ? "relative grid grid-rows-auto text-center items-center bg-gray-800 text-white font-mono" : "hidden" } onClick={toggle}>
        <Link to="/" className="p-4">Home</Link>
        <Link to="/about" className="p-4">About</Link>
        <div className="w-full">
          <button onClick={toggleMobileTools} className="p-4 w-full inline-flex justify-center items-center">
            <span>Tools</span>
            <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform duration-200 ${isMobileToolsOpen ? 'rotate-180' : ''}`} />
          </button>
          {isMobileToolsOpen && (
            <div className="bg-gray-700">
              <Link to="/tools/tool1" className="block p-4">Tool 1</Link>
              <Link to="/tools/tool2" className="block p-4">Tool 2</Link>
              <Link to="/tools/tool3" className="block p-4">Tool 3</Link>
            </div>
          )}
        </div>
        <a href="https://github.com/ytkg" target="_blank" rel="noopener noreferrer" className="p-4">GitHub</a>
      </div>
    </>
  );
}
