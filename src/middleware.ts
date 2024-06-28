import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { verifyJWT } from '@/lib/auth';

const SERVER_ACCESS_TOKEN_KEY = 'access_token';
const SERVER_REFRESH_TOKEN_KEY = 'RefreshToken';
const DADOK_TOKEN_KEY = process.env.DADOK_TOKEN_KEY as string;

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(DADOK_TOKEN_KEY);

  // api proxy rewrite
  if (request.nextUrl.pathname.startsWith('/service-api/')) {
    const { search } = request.nextUrl;
    const pathname = request.nextUrl.pathname.replace('/service-api', '/api');
    const destination = `${process.env.NEXT_PUBLIC_API_URL}${pathname}${search}`;

    const headers = new Headers(request.headers);

    if (accessToken) {
      headers.set('Authorization', `Bearers ${accessToken.value}`);
    }

    return NextResponse.rewrite(destination, { request: { headers } });
  }

  // oauth 리다이렉팅
  if (request.nextUrl.pathname.startsWith('/login/redirect')) {
    const token =
      request.nextUrl.searchParams.get(SERVER_ACCESS_TOKEN_KEY) ?? '';
    const isAuthValid = await verifyJWT(token);

    console.log(isAuthValid, token);

    const response = NextResponse.next();

    if (isAuthValid) {
      response.cookies.set(DADOK_TOKEN_KEY, token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: true,
      });
    }

    console.log(response);

    return response;
  }

  /**
   * '/' 로 접근하는 경우, 아래 조건에 따라 redirect
   * cookie에 RefreshToken이 존재하면 /bookarchive
   * cookie에 RefreshToken이 없으면 /login
   */
  if (request.nextUrl.pathname.match(/^\/$/)) {
    if (request.cookies.has(SERVER_REFRESH_TOKEN_KEY)) {
      request.nextUrl.pathname = '/bookarchive';
    } else {
      request.nextUrl.pathname = '/login';
    }

    return NextResponse.redirect(request.nextUrl);
  }
}
