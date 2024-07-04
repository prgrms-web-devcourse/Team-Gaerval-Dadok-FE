import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { COOKIE_KEYS, SEARCH_PARAMS_KEYS } from '@/constants';
import { getOrigin } from '@/lib/request';

export async function GET(request: Request) {
  const origin = getOrigin(request);
  const { searchParams } = new URL(request.url);

  const redirectPath = searchParams.get(SEARCH_PARAMS_KEYS.REDIRECT_PATHNAME);

  const accessToken = cookies().get(COOKIE_KEYS.ACCESS_TOKEN);

  if (accessToken) {
    const response = await fetch(`${origin}/service-api/users/me`, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearers ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      return new Response('Failed to get my profile', response);
    }

    const data = await response.json();

    if (!data?.nickname || !data?.job?.jobGroupName) {
      redirect('/profile/me/add');
    } else if (redirectPath) {
      redirect(`${redirectPath}`);
    } else {
      redirect('/bookarchive');
    }
  }

  return new Response('Need AccessToken', { status: 400 });
}
