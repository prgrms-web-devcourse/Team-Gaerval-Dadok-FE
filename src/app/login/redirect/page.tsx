'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Flex, Spinner } from '@chakra-ui/react';

import { useAuth } from '@/hooks/auth';

const RedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const { setAuth } = useAuth();

  useEffect(() => {
    const isAuthed = !!accessToken;

    if (isAuthed) {
      setAuth(accessToken);
      router.replace('/bookarchive');
    }
  });

  return (
    <Flex align="center" justify="center" height="95vh">
      <Spinner />
    </Flex>
  );
};

export default RedirectPage;
