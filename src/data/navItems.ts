import type { NavItem } from '../types/navigation';

export const navItems: NavItem[] = [
  { type: 'link', text: 'Home', to: '/' },
  { type: 'link', text: 'About', to: '/about' },
  {
    type: 'dropdown',
    text: 'Tools',
    subLinks: [
      { type: 'link', text: 'Tool 1', to: '/tools/tool1' },
      { type: 'link', text: 'Tool 2', to: '/tools/tool2' },
      { type: 'link', text: 'Tool 3', to: '/tools/tool3' },
      { type: 'link', text: 'Ruby Runner', to: '/tools/ruby-runner' },
    ],
  },
  { type: 'external', text: 'GitHub', href: 'https://github.com/ytkg' },
];
