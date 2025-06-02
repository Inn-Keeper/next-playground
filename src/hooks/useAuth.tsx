import React, { ReactNode } from 'react';
import { useAppSelector } from '@/store/store';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface AuthPrompt {
  showAuthPrompt: boolean;
  content: ReactNode;
}

export function useAuth() {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const t = useTranslations('auth');

  // TODO: Add a loading state
  // TODO: JWT token check
  const router = useRouter();
  const requireAuth = (): AuthPrompt => {
    if (!isAuthenticated) {
      return {
        showAuthPrompt: true,
        content: (
          <div className="flex flex-col items-center justify-center min-h-[60vh] bg-red-500">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">{t('signIn.title')}</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6">{t('signIn.message')}</p>
              <button onClick={() => router.push('/login')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                {t('signIn.button')}
              </button>
            </div>
          </div>
        )
      };
    }
    return { showAuthPrompt: false, content: null };
  };

  return {
    isAuthenticated,
    requireAuth
  };
} 