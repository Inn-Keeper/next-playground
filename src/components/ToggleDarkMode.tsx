'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleDarkMode } from '@/store/slices/themeSlice';
import { useEffect } from 'react';

export default function ToggleDarkMode() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="px-2 py-1 rounded text-xl ml-2
        bg-gray-200 text-gray-700
        dark:bg-gray-700 dark:text-gray-300"
    >
      {darkMode ? '🌞' : '🌙'}
    </button>
  );
} 