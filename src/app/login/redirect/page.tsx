'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { Flex, Spinner } from '@chakra-ui/react';

import localStorage from '@/utils/storage';
import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants';

const RedirectPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const accessToken = searchParams && searchParams['access_token'];

  useEffect(() => {
    const isAuthed = !!accessToken;
    const storage = localStorage(ACCESS_TOKEN_STORAGE_KEY);

    if (isAuthed) {
      storage.set(accessToken);
      redirect('/');
    }
  }, [accessToken]);

  return (
    <Flex align="center" justify="center" height="95vh">
      <Spinner />
    </Flex>
  );
};

export default RedirectPage;
