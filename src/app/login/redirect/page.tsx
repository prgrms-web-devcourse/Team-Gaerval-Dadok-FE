'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

import localStorage from '@/utils/storage';
import { Flex, Spinner } from '@chakra-ui/react';

const RedirectPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const accessToken = searchParams && searchParams['access_token'];

  useEffect(() => {
    const isAuthed = !!accessToken;
    const storage = localStorage('accessToken');

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
