import useMounted from '@/hooks/useMounted';
import { APIUser } from '@/types/user';
import QueryErrorBounaryFallback from '@/ui/common/QueryErrorBoundaryFallback';
import { Skeleton } from '@chakra-ui/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProfileGroupContainer from './ProfileGroupContainer';

const ProfileGroup = ({ userId }: { userId: 'me' | APIUser['userId'] }) => {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <QueryErrorBounaryFallback
              minH="34.5rem"
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<ProfileBookShelfSkelenton />}>
            <ProfileGroupContainer userId={userId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ProfileGroup;

const ProfileBookShelfSkelenton = () => {
  return <Skeleton w="100%" height="34.5rem" />;
};
