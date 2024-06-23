import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/'],
};

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.match('/')) {
    /**
     * '/' 로 접근하는 경우, 아래 조건에 따라 redirect
     * cookie에 RefreshToken이 존재하면 /bookarchive
     * cookie에 RefreshToken이 없으면 /login
     */

    if (request.cookies.has('RefreshToken')) {
      request.nextUrl.pathname = '/bookarchive';
    } else {
      request.nextUrl.pathname = '/login';
    }

    return NextResponse.redirect(request.nextUrl);
  }
}
