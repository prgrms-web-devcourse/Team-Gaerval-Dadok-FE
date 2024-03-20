import { ComponentPropsWithoutRef, Suspense } from 'react';

import useMounted from '@/hooks/useMounted';

const SSRSafeSuspense = (props: ComponentPropsWithoutRef<typeof Suspense>) => {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }

  return <>{props.fallback}</>;
};

export default SSRSafeSuspense;
