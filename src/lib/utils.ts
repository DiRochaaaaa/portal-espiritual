import { Locale } from './locale';

// Helper function to adapt mantras for the MeditationPlayer component
export function adaptMantraFormat(mantra: Record<string, unknown>): {
  id: string;
  title: string;
  youtubeId: string;
  description: string;
  objective: string;
  color: string;
  text?: string;
} {
  return {
    id: mantra.id as string,
    title: mantra.title as string,
    youtubeId: mantra.youtubeId as string,
    description: mantra.description as string,
    objective: mantra.objective as string,
    color: mantra.color as string,
    text: mantra.text as string | undefined,
  };
}

// Format text with line breaks for display
export const formatContentWithLineBreaks = (content: string) => {
  return content.split('\n\n').map((paragraph, index) => ({
    key: index,
    text: paragraph
  }));
};

// Create a reusable translations getter
export function getTranslatedContent<T>(translations: Record<Locale, T>, locale: Locale): T {
  return translations[locale] || translations.pt;
}

// Utility for safely joining class names
export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// Create a utility for displaying dates in the correct locale format
export function formatDate(date: Date, locale: Locale): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'es-ES', options).format(date);
}

// Create a utility for pluralizing words according to count
export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

// Create reusable debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// Cache para evitar recálculos
const memoizedResults: Record<string, unknown> = {};

// Função para cálculos caros com memoização
export function memoize<T, TArgs extends unknown[]>(fn: (...args: TArgs) => T, getKey: (...args: TArgs) => string): (...args: TArgs) => T {
  return (...args: TArgs): T => {
    const key = getKey(...args);
    
    if (memoizedResults[key] === undefined) {
      memoizedResults[key] = fn(...args);
    }
    
    return memoizedResults[key] as T;
  };
}

// Função para limitar a frequência de execução de funções (throttle)
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number = 0;
  
  return function(this: unknown, ...args: Parameters<T>): void {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}