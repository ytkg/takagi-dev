import type { NavItem } from '../types/navigation';

export const navItems: NavItem[] = [
  { type: 'link', text: 'Home', to: '/' },
  { type: 'link', text: 'About', to: '/about' },
  { type: 'link', text: 'Products', to: '/products' },
  {
    type: 'dropdown',
    text: 'Tools',
    subLinks: [
      { type: 'link', text: 'Tool 1', to: '/tools/tool1' },
      { type: 'link', text: 'Tool 2', to: '/tools/tool2' },
      { type: 'link', text: 'Tool 3', to: '/tools/tool3' },
      { type: 'link', text: 'JSON Formatter', to: '/tools/json-formatter' },
      { type: 'link', text: 'Base64 Converter', to: '/tools/base64-converter' },
    ],
  },
  { type: 'external', text: 'GitHub', href: 'https://github.com/ytkg' },
];
