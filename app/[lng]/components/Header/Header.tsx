'use client';
import React from 'react';
import Logo from '../Logo/Logo';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import SocialsGroup from '../CTAMenu/CTAMenu';

export interface BoxProps {
  lng: string;
  className?: string;
}

const Header: React.FC<BoxProps> = ({ lng, className }) => {
  return (
    <nav className={`${className || ''} flex justify-center`}>
      <div className="flex items-center w-9/12">
        <Logo />
        <NavigationMenu lng={lng} />
        <SocialsGroup />
      </div>
    </nav>
  );
};

export default Header;
