'use server';

import { cookies } from 'next/headers';

import { COOKIE_KEYS } from '@/constants';
import { verifyJWT } from '@/lib/auth/verify';

const SESSION_KEY = COOKIE_KEYS.ACCESS_TOKEN;
const SESSION_PUBLIC_UID_KEY = COOKIE_KEYS.PUBLIC_USER_ID;

export async function setAuthSession(token: string) {
  const payload = await verifyJWT(token);

  if (payload) {
    cookies().set(SESSION_KEY, token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      secure: false,
    });

    if (payload.id) {
      cookies().set(SESSION_PUBLIC_UID_KEY, `${payload.id}`, {
        sameSite: 'strict',
        path: '/',
      });
    }
  }
}

export async function deleteAuthSession() {
  cookies().delete(SESSION_KEY);
  cookies().delete(SESSION_PUBLIC_UID_KEY);
}
