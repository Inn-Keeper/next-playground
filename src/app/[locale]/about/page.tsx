import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose dark:prose-invert">
        <p className="mb-4">{t('description')}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('mission.title')}</h2>
        <p className="mb-4">{t('mission.description')}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('vision.title')}</h2>
        <p className="mb-4">{t('vision.description')}</p>
      </div>
    </div>
  );
} 