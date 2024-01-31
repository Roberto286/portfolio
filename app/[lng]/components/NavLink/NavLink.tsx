'use client';
import { NavLinkProps } from './NavLink.props';
import React from 'react';

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => {
  return (
    <li className="cursor-pointer">
      <a
        className="block 
        py-2 pl-3 pr-4 
        text-text-light-header dark:text-text-dark-header sm:text-lg font-medium	
        dark:hover:text-amber-700"
        href={href}
      >
        {children}
      </a>
    </li>
  );
};

export default NavLink;
