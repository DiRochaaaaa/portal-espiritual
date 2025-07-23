import { NextRequest, NextResponse } from 'next/server';

const locales = ['pt', 'es', 'en', 'fr'];
const defaultLocale = 'pt';

// Função para detectar e processar slugs de idioma na URL
function detectLanguageFromUrl(pathname: string): { locale: string | null, cleanPath: string } {
  // Verifica se a URL começa com /en, /es, /fr, /br ou /pt
  if (pathname.startsWith('/en')) {
    return { locale: 'en', cleanPath: pathname.replace(/^\/en/, '') || '/' };
  }
  if (pathname.startsWith('/es')) {
    return { locale: 'es', cleanPath: pathname.replace(/^\/es/, '') || '/' };
  }
  if (pathname.startsWith('/fr')) {
    return { locale: 'fr', cleanPath: pathname.replace(/^\/fr/, '') || '/' };
  }
  if (pathname.startsWith('/br') || pathname.startsWith('/pt')) {
    return { locale: 'pt', cleanPath: pathname.replace(/^\/(?:br|pt)/, '') || '/' };
  }
  
  return { locale: null, cleanPath: pathname };
}

async function detectLanguageFromIP(request: NextRequest): Promise<{ locale: string, isDetected: boolean }> {
  try {
    // Get IP address from request headers (if deployed on Vercel)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    
    // Skip IP detection for local development
    if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return { locale: defaultLocale, isDetected: false };
    }
    
    // Fetch country information from ipapi.co
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    
    // Map countries to languages
    const { country_code } = data;
    
    if (country_code === 'BR' || country_code === 'PT') {
      return { locale: 'pt', isDetected: true };
    }
    
    // English-speaking countries
    const englishCountries = [
      'US', 'GB', 'AU', 'CA', 'NZ', 'IE', 'ZA', 'IN', 
      'SG', 'MY', 'PH', 'NG', 'KE', 'GH', 'JM', 'TT'
    ];
    
    if (englishCountries.includes(country_code)) {
      return { locale: 'en', isDetected: true };
    }
    
    // Spanish-speaking countries
    const spanishCountries = [
      'ES', 'MX', 'CO', 'AR', 'PE', 'VE', 'CL', 'GT', 'EC', 
      'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY'
    ];
    
    if (spanishCountries.includes(country_code)) {
      return { locale: 'es', isDetected: true };
    }
    
    // Se chegou aqui, significa que o país não está na lista conhecida
    return { locale: defaultLocale, isDetected: false };
  } catch (error) {
    console.error('Error detecting language from IP:', error);
    return { locale: defaultLocale, isDetected: false };
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static files and API routes
  if (
    pathname.includes('/_next') || 
    pathname.includes('/api/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/locales/')
  ) {
    return NextResponse.next();
  }
  
  // Detectar idioma da URL primeiro
  const { locale: urlLocale, cleanPath } = detectLanguageFromUrl(pathname);
  
  // Se encontrou um slug de idioma na URL, define o idioma e redireciona
  if (urlLocale) {
    const response = NextResponse.redirect(new URL(cleanPath, request.url));
    
    // Define o cookie de idioma
    response.cookies.set('NEXT_LOCALE', urlLocale, { 
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: '/' 
    });
    
    // Remove o cookie de necessidade de seleção de idioma, se existir
    response.cookies.delete('NEEDS_LANGUAGE_SELECTION');
    
    return response;
  }
  
  // Check if locale is set in cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  
  // If locale cookie doesn't exist, detect it from IP
  let locale = localeCookie;
  let needsSelection = false;
  
  if (!locale) {
    const result = await detectLanguageFromIP(request);
    locale = result.locale;
    needsSelection = !result.isDetected;
    
    // Create a response to set the cookie
    const response = NextResponse.next();
    
    // Set the locale cookie
    response.cookies.set('NEXT_LOCALE', locale, { 
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/' 
    });
    
    // Set a flag if we need language selection
    if (needsSelection) {
      response.cookies.set('NEEDS_LANGUAGE_SELECTION', 'true', {
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      });
    }
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};