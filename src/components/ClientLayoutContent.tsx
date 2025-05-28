'use client';

import { useAppSelector } from '@/store/store';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import ToggleDarkMode from './ToggleDarkMode';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Footer from './Footer';

export default function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const { darkMode } = useAppSelector((state) => state.theme);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} overflow-x-hidden`}>
      <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b w-full`}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/playground" className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M20 6H4C3.44772 6 3 6.44772 3 7V17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V7C21 6.44772 20.5523 6 20 6Z" />
                  <circle cx="7" cy="5" r="2" />
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="17" cy="5" r="2" />
                </svg>
                <span className="sr-only">Playground</span>
              </Link>
            </div>
            {/* Hamburger for mobile */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
            </div>
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link
                href="/home"
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-2 sm:px-3 lg:px-4 py-2 rounded-md text-sm font-medium`}
              >
                {t('navigation.home')}
              </Link>
              <Link
                href="/booking"
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-2 sm:px-3 lg:px-4 py-2 rounded-md text-sm font-medium`}
              >
                {t('navigation.booking')}
              </Link>
              <Link
                href="/my-account"
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-2 sm:px-3 lg:px-4 py-2 rounded-md text-sm font-medium`}
              >
                {t('navigation.myAccount')}
              </Link>
              <Link
                href="/about"
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-2 sm:px-3 lg:px-4 py-2 rounded-md text-sm font-medium`}
              >
                {t('navigation.about')}
              </Link>
              <LanguageSwitcher />
              <ToggleDarkMode />
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menuOpen */}
        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800">
            <Link
              href="/home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              {t('navigation.home')}
            </Link>
            <Link
              href="/booking"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              {t('navigation.booking')}
            </Link>
            <Link
              href="/my-account"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              {t('navigation.myAccount')}
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              {t('navigation.about')}
            </Link>
            <div className="flex items-center space-x-2 mt-2">
              <LanguageSwitcher />
              <ToggleDarkMode />
            </div>
          </div>
        </div>
      </nav>
      <main className="w-full flex-1 min-h-full max-w-6xl mx-auto py-6 px-2 sm:px-4 lg:px-8">
        {children}
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
} 