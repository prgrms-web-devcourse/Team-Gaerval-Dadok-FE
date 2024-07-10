import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { COOKIE_KEYS, SEARCH_PARAMS_KEYS } from '@/constants';
import { isAuthRefreshError } from '@/utils/helpers';
import { createQueryString } from '@/utils/url';
import { getOrigin } from '@/lib/request/getOrigin';
import {
  getAuthSession,
  setProfileSession,
  deleteAuthSession,
} from '@/server/session';

const REDIRECT_SEARCH_KEY = SEARCH_PARAMS_KEYS.REDIRECT_PATHNAME;

interface RetryRequest extends Request {
  retried?: boolean; // fetch 재시도 시 true로 설정
}

// GET /profile/redirect
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get(REDIRECT_SEARCH_KEY);

  const accessToken = cookies().get(COOKIE_KEYS.ACCESS_TOKEN);

  if (accessToken) {
    const _request: RetryRequest = request.clone();
    _request.retried = false;

    let response: Response;

    try {
      response = await fetchMyProfile(_request, accessToken.value);
    } catch (error) {
      console.log('Caught error, redirect to root!\n', error);
      await deleteAuthSession();
      return redirect('/');
    }

    const data = await response.json();
    const hasProfile = Boolean(data?.nickname && data?.job?.jobGroupName);

    await setProfileSession(hasProfile);

    if (!hasProfile) {
      const search = createQueryString({
        ...(destination && { [REDIRECT_SEARCH_KEY]: destination }),
      });
      redirect(`/profile/me/add${search}`);
    } else if (destination) {
      redirect(`${destination}`);
    } else {
      redirect('/bookarchive');
    }
  }

  return redirect('/');
}

/*
 * 내 프로필 조회
 */
const fetchMyProfile = async (
  request: RetryRequest,
  token: string
): Promise<Response> => {
  const origin = getOrigin(new URL(request.url), request.headers);
  const response = await fetch(`${origin}/service-api/users/me`, {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearers ${token}`,
    },
  });

  if (!response.ok) {
    // fetch 1번만 재시도
    if (!request.retried) {
      const error = await response.json();
      const code = error.code || '';

      if (isAuthRefreshError(code)) {
        // 새로운 auth 세션 쿠키 설정
        const newToken = await getAuthSession();
        if (!newToken) {
          throw Error('Failed to get access token');
        }

        // 재시도 flag 설정
        request.retried = true;

        // 재요청
        return fetchMyProfile(request, newToken);
      }
    }

    throw Error('Failed to get my profile', { cause: response });
  }

  return response;
};
