import Cookies from 'js-cookie';

export type Locale = 'pt' | 'es';

export const defaultLocale: Locale = 'pt';
export const locales: Locale[] = ['pt', 'es'];

/**
 * Gets the current locale from cookies or defaults to 'pt'
 */
export function getCurrentLocale(): Locale {
  const savedLocale = Cookies.get('NEXT_LOCALE');
  return (savedLocale as Locale) || defaultLocale;
}

/**
 * Sets the locale in cookies and reloads the page
 */
export function setLocale(locale: Locale): void {
  if (!locales.includes(locale)) {
    console.error(`Invalid locale: ${locale}`);
    return;
  }
  
  Cookies.set('NEXT_LOCALE', locale, { expires: 30 }); // 30 days
  window.location.reload();
}

/**
 * Toggle between PT and ES
 */
export function toggleLocale(): void {
  const currentLocale = getCurrentLocale();
  const newLocale = currentLocale === 'pt' ? 'es' : 'pt';
  setLocale(newLocale);
}

/**
 * Get the translation key for the language toggle button
 */
export function getToggleText(locale: Locale): string {
  return locale === 'pt' ? 'Mudar para Espanhol' : 'Cambiar a Portugués';
} 