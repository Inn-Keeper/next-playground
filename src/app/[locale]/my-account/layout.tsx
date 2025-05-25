'use client';
import { useAppSelector } from '@/store/store';
import { FaUser, FaHistory, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('myAccount');
  const { darkMode } = useAppSelector((state) => state.theme);
  const { name } = useAppSelector((state) => state.user);
  const { requireAuth } = useAuth();
  const { showAuthPrompt, content } = requireAuth();
  const pathname = usePathname();
  const locale = useLocale();

  if (showAuthPrompt) {
    return <>{content}</>;
  }

  const isActive = (path: string) => pathname === `/${locale}${path}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h2 className="font-semibold">{name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member</p>
              </div>
            </div>
            <nav className="space-y-2">
              <Link
                href="/my-account/profile"
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/my-account/profile')
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FaUser className="text-lg" />
                <span>{t('profile')}</span>
              </Link>
              <Link
                href="/my-account/booking-history"
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/my-account/booking-history')
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FaHistory className="text-lg" />
                <span>{t('bookingHistory')}</span>
              </Link>
              <Link
                href="/my-account/settings"
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/my-account/settings')
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FaCog className="text-lg" />
                <span>{t('settings')}</span>
              </Link>
              <button 
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-500"
                onClick={() => {
                  // Add logout functionality here
                  console.log('Logout clicked');
                }}
              >
                <FaSignOutAlt className="text-lg" />
                <span>{t('logout')}</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
} 