import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { NavDropdown } from '../types/navigation';

export const DesktopDropdown = ({ item }: { item: NavDropdown }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsToolsOpen(true)} onMouseLeave={() => setIsToolsOpen(false)}>
      <button className="p-4 inline-flex items-center">
        <span>{item.text}</span>
        <ChevronDownIcon className="h-4 w-4 ml-1" />
      </button>
      {isToolsOpen && (
        <div className="absolute right-0 w-max mt-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="py-1">
            {item.subLinks.map((subLink) => (
              <Link key={subLink.to} to={subLink.to} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {subLink.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
