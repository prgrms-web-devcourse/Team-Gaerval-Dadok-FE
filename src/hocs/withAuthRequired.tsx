'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { checkAuthentication } from '@/utils/helpers';

const withAuthRequired = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Component = (props: P) => {
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const hasAccessToken = checkAuthentication();

      if (!hasAccessToken) {
        router.push('/login');
      } else {
        setIsAuthenticated(hasAccessToken);
      }
    }, [router]);

    if (!isAuthenticated) {
      return null;
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  return Component;
};

export default withAuthRequired;
