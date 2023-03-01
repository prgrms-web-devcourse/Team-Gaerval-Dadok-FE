'use client';

import { setToken } from '@/api/axios';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const RedirectPage: NextPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const accessToken = searchParams && searchParams['access_token'];

  if (accessToken) {
    setToken(accessToken);
    redirect('/');
  }

  return <>redirect!</>;
};

export default RedirectPage;
