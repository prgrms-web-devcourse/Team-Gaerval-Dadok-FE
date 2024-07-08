'use server';

import { cookies, headers } from 'next/headers';

import { COOKIE_KEYS, SESSION_COOKIES_KEYS } from '@/constants';
import { verifyJWT } from '@/lib/auth/verifyJWT';
import { getOrigin } from '@/lib/request/getOrigin';

const SESSION_KEY = COOKIE_KEYS.ACCESS_TOKEN;
const SESSION_PUBLIC_UID_KEY = COOKIE_KEYS.PUBLIC_USER_ID;
const SESSION_ADDED_PROFILE_KEY = COOKIE_KEYS.ADDED_PROFILE_FLAG;

/*
 * 새로운 accessToken 발급 받은 후, 세션 쿠키 갱신
 */
export async function getAuthSession() {
  const refreshToken = cookies().get(COOKIE_KEYS.REFRESH_TOKEN);

  if (!refreshToken) {
    return null;
  }

  const host = headers().get('host');
  const origin = getOrigin({ host }, headers());

  const response = await fetch(`${origin}/service-api/auth/token`, {
    method: 'POST',
    headers: {
      Cookie: `${refreshToken.name}=${refreshToken.value};`,
    },
  });

  const data: { accessToken?: string } = await response.json();

  if (!response.ok || !data || !data.accessToken) {
    return null;
  }

  await setAuthSession(data.accessToken);

  return data.accessToken;
}

/*
 *  accessToken 유효성 검사 후, accessToken과 uid 세션 쿠키에 삽입
 */
export async function setAuthSession(token: string) {
  const payload = await verifyJWT(token);

  if (payload) {
    cookies().set(SESSION_KEY, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    // 클라이언트에서 접근 가능하도록 public하게 설정
    if (payload.id) {
      cookies().set(SESSION_PUBLIC_UID_KEY, `${payload.id}`, {
        sameSite: 'lax',
      });
    }
  }
}

/*
 * auth 관련 세션 쿠키 모두 제거
 */
export async function deleteAuthSession() {
  SESSION_COOKIES_KEYS.map(key => cookies().delete(key));
}

/*
 * 추가 프로필이 등록되었는지 여부를 저장하는 세션 쿠키 설정
 */
export async function setProfileSession(value: boolean) {
  cookies().set(SESSION_ADDED_PROFILE_KEY, JSON.stringify(value), {
    httpOnly: true,
    sameSite: 'strict',
  });
}
