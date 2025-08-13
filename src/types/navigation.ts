export type NavLink = {
  type: 'link';
  text: string;
  to: string;
};

export type NavExternalLink = {
  type: 'external';
  text: string;
  href: string;
};

export type NavDropdown = {
  type: 'dropdown';
  text: string;
  subLinks: NavLink[];
};

export type NavItem = NavLink | NavExternalLink | NavDropdown;
