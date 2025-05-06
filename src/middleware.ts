import { NextRequest, NextResponse } from 'next/server';

const locales = ['pt', 'es'];
const defaultLocale = 'pt';

async function detectLanguageFromIP(request: NextRequest): Promise<string> {
  try {
    // Get IP address from request headers (if deployed on Vercel)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    
    // Skip IP detection for local development
    if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return defaultLocale;
    }
    
    // Fetch country information from ipapi.co
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    
    // Map countries to languages
    const { country_code } = data;
    
    if (country_code === 'BR' || country_code === 'PT') {
      return 'pt';
    }
    
    // Spanish-speaking countries
    const spanishCountries = [
      'ES', 'MX', 'CO', 'AR', 'PE', 'VE', 'CL', 'GT', 'EC', 
      'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY'
    ];
    
    if (spanishCountries.includes(country_code)) {
      return 'es';
    }
    
    return defaultLocale;
  } catch (error) {
    console.error('Error detecting language from IP:', error);
    return defaultLocale;
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
  
  // Check if locale is set in cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  
  // If locale cookie doesn't exist, detect it from IP
  let locale = localeCookie;
  if (!locale) {
    locale = await detectLanguageFromIP(request);
    
    // Create a response to set the cookie
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', locale, { 
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/' 
    });
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 