import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  COOKIE_KEYS,
  SEARCH_PARAMS_KEYS,
  SESSION_COOKIES_KEYS,
} from '@/constants';
import { createQueryString } from '@/utils/url';
import { verifyJWT } from '@/lib/auth/verifyJWT';

// cookie constants
const SESSION_AUTH_KEY = COOKIE_KEYS.ACCESS_TOKEN;
const SESSION_PUBLIC_UID_KEY = COOKIE_KEYS.PUBLIC_USER_ID;
const REFRESH_TOKEN_KEY = COOKIE_KEYS.REFRESH_TOKEN;

// search parameter constants
const ACCESS_TOKEN_KEY = SEARCH_PARAMS_KEYS.ACCESS_TOKEN;
const REDIRECT_SEARCH_KEY = SEARCH_PARAMS_KEYS.REDIRECT_PATHNAME;

// Authorization Header를 포함하지 않는 API
const EXCLUDE_AUTH_HEADER_API = ['/api/auth/token'];

// 추가 프로필 등록이 반드시 필요한 path
const NEED_PROFILE_PATHS = ['/bookarchive', '/profile/me', '/profile/me/edit'];

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static, images, icons (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - pwaServiceWorker, manifest (pwa related files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons|pwaServiceWorker|manifest).*)',
  ],
};

export async function middleware(request: NextRequest) {
  // accessToken을 담고 있는 세션 쿠키
  const authSession = request.cookies.get(SESSION_AUTH_KEY);

  /*
   * Server API Proxy
   */
  if (request.nextUrl.pathname.startsWith('/service-api/')) {
    const { search } = request.nextUrl;
    const pathname = request.nextUrl.pathname.replace('/service-api', '/api');
    const destination = `${process.env.NEXT_PUBLIC_API_URL}${pathname}${search}`;

    const headers = new Headers(request.headers);

    // Authorization header 추가
    if (authSession && !EXCLUDE_AUTH_HEADER_API.includes(pathname)) {
      headers.set('Authorization', `Bearers ${authSession.value}`);
    }

    return NextResponse.rewrite(destination, { request: { headers } });
  }

  /*
   * 로그인 상태이면서
   * 'NEED_PROFILE_PATHS'에 포함되어 있는 경우,
   * 추가 프로필 등록 페이지로 리다이렉션
   */
  if (authSession && NEED_PROFILE_PATHS.includes(request.nextUrl.pathname)) {
    const isVerfied = await verifyJWT(authSession.value);

    // accessToken이 유효하지 않은 경우, auth 관련 세션 쿠키 모두 제거 후 재요청
    if (!isVerfied) {
      const response = NextResponse.rewrite(request.url, { request });
      SESSION_COOKIES_KEYS.map(key => response.cookies.delete(key));
      return response;
    }

    // 프로필이 등록되었는지 여부를 저장하고 있는 세션 쿠키
    const profileSession = request.cookies.get(COOKIE_KEYS.ADDED_PROFILE_FLAG);

    // 프로필 세션 쿠기가 없거나 프로필이 등록되어 있지 않으면,
    // '/profile/redirect?from=[현재_요청_pathname]'로 리다이렉션
    if (!profileSession || !JSON.parse(profileSession.value)) {
      const destination = new URL('/profile/redirect', request.url);
      const search = createQueryString({
        [REDIRECT_SEARCH_KEY]: request.nextUrl.pathname,
      });

      return NextResponse.redirect(`${destination}${search}`);
    }

    // accessToken이 유효하고, 프로필도 등록되어 있으면 응답 재개
    return NextResponse.next();
  }

  /*
   * oAuth redirect uri 요청이 들어오면,
   * '/profile/redirect'로 리다이렉션
   */
  if (request.nextUrl.pathname.startsWith('/login/redirect')) {
    const token = request.nextUrl.searchParams.get(ACCESS_TOKEN_KEY) ?? '';
    const jwtPayload = await verifyJWT(token);

    const redirectPathname =
      request.nextUrl.searchParams.get(REDIRECT_SEARCH_KEY);

    const destination = new URL('/profile/redirect', request.url);
    const search = createQueryString({
      ...(redirectPathname && { [REDIRECT_SEARCH_KEY]: redirectPathname }),
    });

    const response = NextResponse.redirect(`${destination}${search}`);

    // 인증 관련 세션 쿠키 추가
    if (jwtPayload) {
      response.cookies.set(SESSION_AUTH_KEY, token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: false,
      });

      if (jwtPayload.id) {
        response.cookies.set(SESSION_PUBLIC_UID_KEY, `${jwtPayload.id}`, {
          sameSite: 'strict',
          path: '/',
        });
      }
    }

    return response;
  }

  /*
   * '/' 로 접근하는 경우, 아래 조건에 따라 리다이렉션
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
