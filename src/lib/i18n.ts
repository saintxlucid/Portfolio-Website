export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function getLocale(pathname: string): Locale {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];

  if (locales.includes(potentialLocale as Locale)) {
    return potentialLocale as Locale;
  }

  return defaultLocale;
}
