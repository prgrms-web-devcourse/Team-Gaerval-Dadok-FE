import QueryErrorBounaryFallback from '@/ui/common/QueryErrorBoundaryFallback';
import { Skeleton } from '@chakra-ui/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { APIUser } from '@/types/user';
import MyProfileBookshelfContainer from './MyProfileBookshelfContainer';
import UserProfileBookshelfContainer from './UserProfileBookshelfContainer';
import useMounted from '@/hooks/useMounted';

const ProfileBookShelf = ({ userId }: { userId: 'me' | APIUser['userId'] }) => {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <QueryErrorBounaryFallback
              minH="18rem"
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<ProfileBookShelfSkelenton />}>
            {userId === 'me' ? (
              <MyProfileBookshelfContainer />
            ) : (
              <UserProfileBookshelfContainer userId={userId} />
            )}
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
