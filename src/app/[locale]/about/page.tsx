import { useTranslations } from 'next-intl';
import Image from 'next/image';
export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="flex flex-col mb-6 items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&h=400&fit=crop"
          alt="Happy pets together"
          width={1000}
          height={600}
          className="rounded-xl shadow-lg object-cover"
        />
      </div>
      <div className="prose dark:prose-invert mb-8 mx-2">
        <p className="mb-4">{t('description')}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('mission.title')}</h2>
        <p className="mb-4">{t('mission.description')}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('vision.title')}</h2>
        <p className="mb-4">{t('vision.description')}</p>
        <div className="h-4 border-b border-gray-200 dark:border-gray-700 mb-4"></div>
        <p className="mb-4">{t('termsOfUse.description')}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacyPolicy.title')}</h2>
        <p className="mb-4">{t('privacyPolicy.description')}</p>
        <div className="h-4 border-b border-gray-200 dark:border-gray-700 mb-4"></div>
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('contactUs.title')}</h2>
        <p className="mb-4">{t('contactUs.description')}</p>
        <p className="mb-4">{t('contactUs.phone')}</p>
        <p className="mb-4">{t('contactUs.email')}</p>
        <p className="mb-4">{t('contactUs.address')}</p>
      </div>
    </div>
  );
} 