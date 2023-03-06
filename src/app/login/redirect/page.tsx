'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Flex, Spinner } from '@chakra-ui/react';

import { useAuth } from '@/hooks/auth';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

const RedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const { setAuth } = useAuth();
  const { isSuccess, data, refetch } = useMyProfileQuery();

  useEffect(() => {
    const isAuthed = !!accessToken;

    if (isAuthed) {
      accessToken && setAuth(accessToken);
      refetch();
    }
  }, [accessToken, refetch, setAuth]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const {
      job: { jobName, jobGroupName },
      nickname,
    } = data;
    const isSavedAdditioanlInfo = !!(nickname && jobGroupName && jobName);

    if (!isSavedAdditioanlInfo) {
      router.replace('/profile/me/add');
      return;
    }

    router.replace('/bookarchive');
  }, [data, isSuccess, router]);

  return (
    <Flex align="center" justify="center" height="95vh">
      <Spinner />
    </Flex>
  );
};

export default RedirectPage;
