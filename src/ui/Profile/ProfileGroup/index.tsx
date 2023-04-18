import QueryErrorBounaryFallback from '@/ui/common/QueryErrorBoundaryFallback';
import { Skeleton } from '@chakra-ui/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProfileGroupContainer from './ProfileGroupContainer';

const ProfileGroup = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <QueryErrorBounaryFallback
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<ProfileBookShelfSkelenton />}>
            <ProfileGroupContainer />
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
