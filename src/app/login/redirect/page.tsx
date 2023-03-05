'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Flex, Spinner } from '@chakra-ui/react';

import localStorage from '@/utils/storage';
import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants';

const RedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');

  useEffect(() => {
    const isAuthed = !!accessToken;
    const storage = localStorage(ACCESS_TOKEN_STORAGE_KEY);

    if (isAuthed) {
      storage.set(accessToken);
      router.push('/bookarchive');
    }
  }, [accessToken, router]);

  return (
    <Flex align="center" justify="center" height="95vh">
      <Spinner />
    </Flex>
  );
};

export default RedirectPage;
