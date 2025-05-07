import { Locale } from './locale';

// Helper function to adapt mantras for the MeditationPlayer component
export const adaptMantraFormat = (mantra: any) => ({
  id: mantra.id,
  title: mantra.title,
  youtubeId: mantra.youtubeId,
  description: mantra.description,
  objective: mantra.objective,
  color: mantra.color
});

// Format text with line breaks for display
export const formatContentWithLineBreaks = (content: string) => {
  return content.split('\n\n').map((paragraph, index) => ({
    key: index,
    text: paragraph
  }));
};

// Create a reusable translations getter
export function getTranslatedContent<T>(translations: Record<Locale, T>, locale: Locale): T {
  return translations[locale];
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
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
} 