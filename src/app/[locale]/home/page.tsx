'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const t = useTranslations('navigation');

  return (
    <div className="space-y-6 h-full p-4 md:p-8"> {/* Added some padding for better spacing */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Booking System  
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative w-[600px] h-[400px]">
          <Image 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop"
            alt="A collection of cute pets"
            fill
            className="rounded-lg shadow-lg object-cover"
            priority
          />
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      
      <div className="mt-8 text-center">
        <Link href="/booking" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">
            {t('goToBooking')}
        </Link>
      </div>
      </div>
    </div>
  );  
}
