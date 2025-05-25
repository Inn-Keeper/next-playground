import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Normalize to full locale code
  const fullLocale = (await requestLocale) || routing.defaultLocale;
  const locale = hasLocale(routing.locales, fullLocale)
    ? fullLocale
    : routing.defaultLocale;
 
  return {
    locale,
    timeZone: 'Europe/Stockholm',
    messages: (await import(`../messages/${locale}.json`)).default
  };
});