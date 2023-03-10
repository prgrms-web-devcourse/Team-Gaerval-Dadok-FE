'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

import { useAuth } from '@/hooks/auth';

const Logout = () => {
  const { removeAuth } = useAuth();

  useEffect(() => {
    removeAuth();
  });

  redirect('/login');
};

export default Logout;
