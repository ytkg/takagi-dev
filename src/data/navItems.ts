import type { NavItem } from '../types/navigation';

export const navItems: NavItem[] = [
  { type: 'link', text: 'Home', to: '/' },
  { type: 'link', text: 'About', to: '/about' },
  { type: 'link', text: 'Products', to: '/products' },
  { type: 'link', text: 'Bookmarks', to: '/bookmarks' },
  {
    type: 'dropdown',
    text: 'Tools',
    subLinks: [
      { type: 'link', text: 'JSON Formatter', to: '/tools/json-formatter' },
      { type: 'link', text: 'Base64 Converter', to: '/tools/base64-converter' },
      { type: 'link', text: 'Character Counter', to: '/tools/character-counter' },
      { type: 'link', text: 'QR Code Generator', to: '/tools/qr-code-generator' },
      { type: 'link', text: 'Unix Timestamp Converter', to: '/tools/unix-timestamp-converter' },
    ],
  },
  { type: 'external', text: 'GitHub', href: 'https://github.com/ytkg' },
];
