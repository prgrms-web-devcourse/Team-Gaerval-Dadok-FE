import QueryErrorBounaryFallback from '@/ui/common/QueryErrorBoundaryFallback';
import { Skeleton } from '@chakra-ui/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProfileBookshelfContainer from './ProfileBookshelfContainer';

const ProfileBookShelf = () => {
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
            <ProfileBookshelfContainer />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ProfileBookShelf;

const ProfileBookShelfSkelenton = () => {
  return <Skeleton w="100%" height="18rem" />;
};
