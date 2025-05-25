'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { NextIntlClientProvider } from 'next-intl';
import ClientLayoutContent from '@/components/ClientLayoutContent';

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: any;
};

export default function ClientLayout({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} key={locale}>
      <Provider store={store}>
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </Provider>
    </NextIntlClientProvider>
  );
} 