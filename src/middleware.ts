import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { verifyJWT } from '@/lib/auth/verify';
import { COOKIE_KEYS, SEARCH_PARAMS_KEYS } from '@/constants';

// constants
const SESSION_KEY = COOKIE_KEYS.ACCESS_TOKEN;
const SESSION_PUBLIC_UID_KEY = COOKIE_KEYS.PUBLIC_USER_ID;
const ACCESS_TOKEN_KEY = SEARCH_PARAMS_KEYS.ACCESS_TOKEN;
const REFRESH_TOKEN_KEY = COOKIE_KEYS.REFRESH_TOKEN;
const REDIRECT_PATHNAME_KEY = SEARCH_PARAMS_KEYS.REDIRECT_PATHNAME;

const EXCLUDE_AUTH_HEADER_PATHS = ['/api/auth/token'];

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_KEY);

  // server api call proxy
  if (request.nextUrl.pathname.startsWith('/service-api/')) {
    const { search } = request.nextUrl;
    const pathname = request.nextUrl.pathname.replace('/service-api', '/api');
    const destination = `${process.env.NEXT_PUBLIC_API_URL}${pathname}${search}`;

    const headers = new Headers(request.headers);

    if (session && !EXCLUDE_AUTH_HEADER_PATHS.includes(pathname)) {
      headers.set('Authorization', `Bearers ${session.value}`);
    }

    return NextResponse.rewrite(destination, { request: { headers } });
  }

  // oAuth redirect
  if (request.nextUrl.pathname.startsWith('/login/redirect')) {
    const token = request.nextUrl.searchParams.get(ACCESS_TOKEN_KEY) ?? '';
    const payload = await verifyJWT(token);

    const destination = new URL('/api/profile', request.url);

    // redirect pathname이 있으면 search parameter에 추가
    const redirectPathname = request.nextUrl.searchParams.get(
      REDIRECT_PATHNAME_KEY
    );

    if (redirectPathname) {
      destination.searchParams.append(REDIRECT_PATHNAME_KEY, redirectPathname);
    }

    const response = NextResponse.redirect(destination);

    // cookie에 auth session 추가
    if (payload) {
      response.cookies.set(SESSION_KEY, token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: false,
      });

      if (payload.id) {
        response.cookies.set(SESSION_PUBLIC_UID_KEY, `${payload.id}`, {
          sameSite: 'strict',
          path: '/',
        });
      }
    }

    return response;
  }

  /**
   * '/' 로 접근하는 경우, 아래 조건에 따라 redirect
   * cookie에 RefreshToken이 존재하면 /bookarchive
   * cookie에 RefreshToken이 없으면 /login
   */
  if (request.nextUrl.pathname.match(/^\/$/)) {
    if (request.cookies.has(REFRESH_TOKEN_KEY)) {
      request.nextUrl.pathname = '/bookarchive';
    } else {
      request.nextUrl.pathname = '/login';
    }

    return NextResponse.redirect(request.nextUrl);
  }
}
