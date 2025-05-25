'use client';

import { useAppSelector } from '@/store/store';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import ToggleDarkMode from './ToggleDarkMode';
import { Toaster } from 'react-hot-toast';

export default function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const { darkMode } = useAppSelector((state) => state.theme);
  const pathname = usePathname();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/playground" className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Next Playground
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/home"
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-3 py-2 rounded-md text-sm font-medium`}
              >
                {t('navigation.home')}
              </Link>
              <Link
                href="/booking"
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-3 py-2 rounded-md text-sm font-medium`}
              >
                {t('navigation.booking')}
              </Link>
              <Link
                href="/my-account"
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-3 py-2 rounded-md text-sm font-medium`}
              >
                {t('navigation.myAccount')}
              </Link>
              <Link
                href="/about"
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} px-3 py-2 rounded-md text-sm font-medium`}
              >
                {t('navigation.about')}
              </Link>
              <LanguageSwitcher />
              <ToggleDarkMode />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <Toaster position="top-center" />
    </div>
  );
} 