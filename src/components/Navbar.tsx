import { Link } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';

type NavLink = {
  type: 'link';
  text: string;
  to: string;
};

type NavExternalLink = {
  type: 'external';
  text: string;
  href: string;
};

type NavDropdown = {
  type: 'dropdown';
  text: string;
  subLinks: NavLink[];
};

type NavItem = NavLink | NavExternalLink | NavDropdown;

const navItems: NavItem[] = [
  { type: 'link', text: 'Home', to: '/' },
  { type: 'link', text: 'About', to: '/about' },
  {
    type: 'dropdown',
    text: 'Tools',
    subLinks: [
      { type: 'link', text: 'Tool 1', to: '/tools/tool1' },
      { type: 'link', text: 'Tool 2', to: '/tools/tool2' },
      { type: 'link', text: 'Tool 3', to: '/tools/tool3' },
    ],
  },
  { type: 'external', text: 'GitHub', href: 'https://github.com/ytkg' },
];

const DesktopDropdown = ({ item }: { item: NavDropdown }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsToolsOpen(true)} onMouseLeave={() => setIsToolsOpen(false)}>
      <button className="p-4 inline-flex items-center">
        <span>{item.text}</span>
        <ChevronDownIcon className="h-4 w-4 ml-1" />
      </button>
      {isToolsOpen && (
        <div className="absolute right-0 w-40 mt-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
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

const MobileDropdown = ({ item }: { item: NavDropdown }) => {
  const [isMobileToolsOpen, setMobileIsToolsOpen] = useState(false);

  const toggleMobileTools = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMobileIsToolsOpen(!isMobileToolsOpen);
  };

  return (
    <div className="w-full">
      <button onClick={toggleMobileTools} className="p-4 w-full inline-flex justify-center items-center">
        <span>{item.text}</span>
        <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform duration-200 ${isMobileToolsOpen ? 'rotate-180' : ''}`} />
      </button>
      {isMobileToolsOpen && (
        <div className="bg-gray-700">
          {item.subLinks.map((subLink) => (
            <Link key={subLink.to} to={subLink.to} className="block p-4">
              {subLink.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

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
          {navItems.map((item) => {
            switch (item.type) {
              case 'link':
                return <Link key={item.to} to={item.to} className="p-4">{item.text}</Link>;
              case 'external':
                return <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="p-4">{item.text}</a>;
              case 'dropdown':
                return <DesktopDropdown key={item.text} item={item} />;
              default:
                return null;
            }
          })}
        </div>
      </nav>
      <div className={ isOpen ? "relative grid grid-rows-auto text-center items-center bg-gray-800 text-white font-mono" : "hidden" } onClick={toggle}>
        {navItems.map((item) => {
            switch (item.type) {
              case 'link':
                return <Link key={item.to} to={item.to} className="p-4">{item.text}</Link>;
              case 'external':
                return <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="p-4">{item.text}</a>;
              case 'dropdown':
                return <MobileDropdown key={item.text} item={item} />;
              default:
                return null;
            }
          })}
      </div>
    </>
  );
}
