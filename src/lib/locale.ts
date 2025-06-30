import Cookies from 'js-cookie';

export type Locale = 'pt' | 'es' | 'en';

export const defaultLocale: Locale = 'pt';
export const locales: Locale[] = ['pt', 'es', 'en'];

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
 * Cycle through locales: PT -> ES -> EN -> PT
 */
export function toggleLocale(): void {
  const currentLocale = getCurrentLocale();
  let newLocale: Locale;
  
  switch (currentLocale) {
    case 'pt':
      newLocale = 'es';
      break;
    case 'es':
      newLocale = 'en';
      break;
    case 'en':
      newLocale = 'pt';
      break;
    default:
      newLocale = 'pt';
  }
  
  setLocale(newLocale);
}

/**
 * Get the translation key for the language toggle button
 */
export function getToggleText(locale: Locale): string {
  switch (locale) {
    case 'pt':
      return 'Mudar para Espanhol';
    case 'es':
      return 'Cambiar a Inglés';
    case 'en':
      return 'Change to Portuguese';
    default:
      return 'Mudar para Espanhol';
  }
} 