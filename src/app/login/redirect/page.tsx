'use client';

import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { setAuth } from '@/utils/helpers';
import userAPI from '@/apis/user';

import Loading from '@/v1/base/Loading';

const RedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = searchParams.get('access_token');

  if (!accessToken) {
    notFound();
  }

  const checkSavedAdditionalInfo = useCallback(async () => {
    try {
      const isSavedAdditionalInfo = await userAPI.getMyProfile().then(
        ({
          data: {
            job: { jobName, jobGroupName },
            nickname,
          },
        }) => !!(nickname && jobGroupName && jobName)
      );

      if (!isSavedAdditionalInfo) {
        router.replace('/profile/me/add');
      }

      router.replace('/bookarchive');
    } catch {
      router.replace('/not-found');
    }
  }, [router]);

  useEffect(() => {
    const hasAccessToken = !!accessToken;

    if (hasAccessToken) {
      accessToken && setAuth(accessToken);
      checkSavedAdditionalInfo();
    }
  }, [accessToken, checkSavedAdditionalInfo]);

  return <Loading fullpage />;
};

export default RedirectPage;
