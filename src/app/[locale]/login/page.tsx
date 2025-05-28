'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('./LoginForm'), {
  ssr: false,
});

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
          <div className="text-white text-xl flex items-center gap-2">
            <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Loading...
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
} 