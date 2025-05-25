'use client';

import Game from '@/components/Game';
import ToggleDarkMode from '@/components/ToggleDarkMode';
import { useAppSelector } from '@/store/store';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('playground');
  const { darkMode } = useAppSelector((state) => state.theme);
  const { isAuthenticated, name } = useAppSelector((state) => state.user);

  return (
    <div className="space-y-6 h-full">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {t('title')}
      </h1>
      <h6 className="text-xl font-bold text-gray-900 dark:text-white">
        {t('subtitle')}
      </h6>
      
      <div className="rounded-lg bg-white h-64 p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {t('someRedux')}
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2 min-h-10">
            <span className="text-gray-600 dark:text-gray-400">{t('darkMode')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {darkMode ? t('enabled') : t('disabled')}
            </span>
            <ToggleDarkMode />
          </div>
          
          <div className="flex items-center space-x-2 min-h-10">
            <span className="text-gray-600 dark:text-gray-400">{t('authentication')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {isAuthenticated ? ( 
                <span className="text-green-500">{t('loggedIn')}</span>
              ) : (
                <span className="text-red-500">{t('notLoggedIn')}</span>
              )}
            </span>
          </div>
          
          {name && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 dark:text-gray-400">{t('name')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">{name}</span>
            </div>
          )}
        </div>
      </div>

      <Game />
    </div>
  );
} 