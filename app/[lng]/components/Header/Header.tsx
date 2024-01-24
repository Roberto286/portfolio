'use client';

import React from 'react';
import { useTranslation } from '../../../i18n/client';
import Image from 'next/image';
import logo from '../../../../public/logo.svg';

export type HeaderProps = {
  lng: string;
};

export const Header: React.FC<HeaderProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'header');

  return (
    <nav className="fixed mx-auto border  top-0 left-0 right-0 z-10 bg-opacity-100 dark:border-[#33353F] dark:bg-[#121212]">
      <div className="flex container lg:py-4 flex-wrap items-center justify-left mx-auto px-4 py-2">
        <div className="logo-container relative w-24 h-12">
          <a href="/">
            <Image
              src={logo}
              alt=""
              fill
            />
          </a>
        </div>
        <div className="mobile-menu block md:hidden ml-auto">
          <button className="flex items-center px-3 py-2 border rounded border-[#02010a] text-[#02010a] hover:border-black hover:text-black dark:border-slate-200 dark:text-slate-200 dark:hover:text-white dark:hover:border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="menu hidden md:block md:w-auto flex-1"
          id="navbar"
        >
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0 justify-end">
            <li className="cursor-pointer">
              <a
                className="block py-2 pl-3 pr-4 text-[#22007c] dark:text-[#ADB7BE] sm:text-xl rounded md:p-0 dark:hover:text-white hover:text-[#04052e]"
                href="#about"
              >
                {t('Chi sono')}
              </a>
            </li>
            <li>
              <a
                className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
                href="#projects"
              >
                {t('Progetti')}
              </a>
            </li>
            <li>
              <a
                className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
                href="#contact"
              >
                {t('Contattami')}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
