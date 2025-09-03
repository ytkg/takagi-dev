import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { NavDropdown } from '../types/navigation';

interface MobileDropdownProps {
  item: NavDropdown;
  toggleMenu: () => void;
}

export const MobileDropdown = ({ item, toggleMenu }: MobileDropdownProps) => {
  const [isMobileToolsOpen, setMobileIsToolsOpen] = useState(false);

  const toggleMobileTools = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMobileIsToolsOpen(!isMobileToolsOpen);
  };

  return (
    <div className="w-full">
      <button onClick={toggleMobileTools} className="p-4 w-full inline-flex justify-center items-center cursor-pointer">
        <span>{item.text}</span>
        <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform duration-200 ${isMobileToolsOpen ? 'rotate-180' : ''}`} />
      </button>
      {isMobileToolsOpen && (
        <div className="bg-gray-700">
          {item.subLinks.map((subLink) => (
            <Link key={subLink.to} to={subLink.to} className="block p-4 hover:text-gray-300 transition-colors" onClick={toggleMenu}>
              {subLink.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
