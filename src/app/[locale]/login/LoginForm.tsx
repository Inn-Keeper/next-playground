'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { setAuthenticated } from '@/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const t = useTranslations('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();

  const handleOnSuccess = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setAuthenticated(true));
  };

  useEffect(() => {
    if (authenticated) {
      router.push('/booking');
    }
  }, [authenticated, router]);

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 p-4">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 md:p-10 flex flex-col gap-6">
        <div className="flex items-center justify-center">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 dark:text-blue-400 mb-2">Login</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleOnSuccess}>
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 dark:bg-gray-800 dark:text-white transition"
            autoComplete="email"
            disabled={loading}
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 dark:bg-gray-800 dark:text-white transition w-full pr-12"
              autoComplete="current-password"
              disabled={loading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 text-sm"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={loading}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition text-lg mt-2 flex items-center justify-center"
            disabled={loading}
          >
            {t('submit')}
          </button>
        </form>
        <button
          onClick={() => signIn('google', { callbackUrl: '/home' })}
          className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-blue-50 text-gray-700 font-medium py-2 rounded-lg shadow-sm transition text-base w-full mt-2"
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block mr-2"><g><path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.1-6.1C34.3 5.5 29.4 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5c11 0 20.5-8.5 20.5-20.5 0-1.4-.1-2.7-.4-4z"/><path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c2.7 0 5.2.9 7.2 2.4l6.1-6.1C34.3 5.5 29.4 3.5 24 3.5c-7.2 0-13.4 4.1-16.7 10.2z"/><path fill="#FBBC05" d="M24 44.5c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3c-2 1.4-4.5 2.2-7.6 2.2-5.6 0-10.3-3.7-12-8.7l-6.6 5.1C7.6 39.9 15.2 44.5 24 44.5z"/><path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 3-3.5 5.4-6.3 6.7l6.5 5.3c-1.8 1.7-4.1 3.1-6.8 3.7 6.1-1.1 11-6.1 11-12.2 0-1.4-.1-2.7-.4-4z"/></g></svg>
          {t('signInGoogle')}
        </button>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm mt-4">
          <Link href="/register" className="text-blue-600 hover:underline">{t('register')}</Link>
          <Link href="/forgot-password" className="text-blue-600 hover:underline">{t('forgotPassword')}</Link>
          <Link href="/" className="text-blue-600 hover:underline">{t('backToHome')}</Link>
        </div>
      </div>
    </div>
  );
} 