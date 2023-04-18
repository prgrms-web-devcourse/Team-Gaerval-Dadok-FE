import QueryErrorBounaryFallback from '@/ui/common/QueryErrorBoundaryFallback';
import { Skeleton } from '@chakra-ui/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { APIUser } from '@/types/user';
import MyProfileBookshelfContainer from './MyProfileBookshelfContainer';
import UserProfileBookshelfContainer from './UserProfileBookshelfContainer';

const ProfileBookShelf = ({ userId }: { userId: 'me' | APIUser['userId'] }) => {
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
