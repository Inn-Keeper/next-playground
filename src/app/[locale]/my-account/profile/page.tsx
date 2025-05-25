'use client';
import { useAppSelector } from '@/store/store';
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const t = useTranslations('myAccount');
  const { darkMode } = useAppSelector((state) => state.theme);
  const { name } = useAppSelector((state) => state.user);

  return (
    <div className="space-y-6">
      {/* Profile Information Section */}
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
        <h2 className="text-xl font-semibold mb-4">{t('profileInformation')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">{t('user.name')}</label>
            <input
              type="text"
              value={name}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('user.email')}</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('user.phone')}</label>
            <input
              type="text"
              value="1234567890"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className={`w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
        </div>
        <div className="relative flex justify-center">
          <span className={`px-3 text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
            {t('address.title')}
          </span>
        </div>
      </div>

      {/* Address Section */}
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">{t('address.street')}</label>
            <input
              type="text"
              value="Main St"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('address.number')}</label>
            <input
              type="text"
              value="123"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('address.additionalInfo')}</label>
            <input
              type="text"
              value="Apt 4B"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('address.zipCode')}</label>
            <input
              type="text"
              value="12345"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('address.city')}</label>
            <input
              type="text"
              value="Anytown"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('address.country')}</label>
            <input
              type="text"
              value="USA"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
} 