import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { navItems } from '../data/navItems';
import { DesktopDropdown } from './DesktopDropdown';
import { MobileDropdown } from './MobileDropdown';

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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${isOpen ? 'opacity-30' : 'opacity-0 pointer-events-none'}`}
        onClick={toggle}
      ></div>

      {/* Mobile Menu Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white font-mono z-60 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggle} aria-label="Close menu" className="cursor-pointer">
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          {navItems.map((item) => {
              switch (item.type) {
                case 'link':
                  return <Link key={item.to} to={item.to} className="p-4 w-full text-center" onClick={toggle}>{item.text}</Link>;
                case 'external':
                  return <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="p-4 w-full text-center" onClick={toggle}>{item.text}</a>;
                case 'dropdown':
                  return <MobileDropdown key={item.text} item={item} toggleMenu={toggle} />;
                default:
                  return null;
              }
            })}
        </div>
      </div>
    </>
  );
}
