'use client';
import React from 'react';

export type NavLinkProps = {
  children: React.ReactNode;
  href: string;
};

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => {
  return (
    <li className="cursor-pointer">
      <a
        className="block 
        py-2 pl-3 pr-4 
        text-text-light dark:text-text-dark sm:text-xl
        dark:hover:text-amber-700"
        href={href}
      >
        {children}
      </a>
    </li>
  );
};

export default NavLink;
