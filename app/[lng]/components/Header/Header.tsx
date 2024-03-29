'use client';
import { HeaderProps } from './Header.props';
import React, { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import SocialsGroup from '../CTAMenu/CTAMenu';
import Button from '../Button/Button';
import { MoonStars, SunDim } from '@phosphor-icons/react';
import MobileMenuButton from '../MobileMenuButton/MobileMenuButton';

const Header: React.FC<HeaderProps> = ({ lng, className = '' }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      isDarkMode ? html.classList.add('dark') : html.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="w-9/12">
      <nav className={`${className} flex py-10 items-center justify-between max-lg:hidden`}>
        <Logo />
        <Button
          id="theme-toggle"
          type="button"
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <SunDim
              size={32}
              className="text-text-light-header dark:text-text-dark-header"
              weight="duotone"
            />
          ) : (
            <MoonStars
              size={32}
              className="text-text-dark-header"
              weight="duotone"
            />
          )}
        </Button>
        <NavigationMenu lng={lng} />
        <SocialsGroup />
      </nav>
      <nav className={`${className} flex py-10 items-center justify-between lg:hidden`}>
        <MobileMenuButton />
      </nav>
    </header>
  );
};

export default Header;
