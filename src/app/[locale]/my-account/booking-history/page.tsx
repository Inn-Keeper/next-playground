'use client';
import { useAppSelector } from '@/store/store';
import { useTranslations } from 'next-intl';

export default function BookingHistoryPage() {
  const t = useTranslations('myAccount');
  const { darkMode } = useAppSelector((state) => state.theme);

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
      <h2 className="text-xl font-semibold mb-4">{t('recentBookings')}</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((booking) => {
          const bookingDate = new Date(2024, 2, booking + 10); // March is month 2 (0-based)
          const formattedDate = bookingDate.toLocaleDateString('en-US', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
          return (
            <div key={booking} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div>
                <h3 className="font-medium">{t('petGrooming')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('bookedFor', { date: formattedDate })}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                {t('confirmed')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 