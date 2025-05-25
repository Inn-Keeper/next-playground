'use client';
import { redirect } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function MyAccountPage() {
  const locale = useLocale();
  redirect({ href: '/my-account/profile', locale });
}