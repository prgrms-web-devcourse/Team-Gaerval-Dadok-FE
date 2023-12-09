import QueryErrorBoundaryFallback from '@/v1/base/QueryErrorBoundaryFallback';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { APIUser } from '@/types/user';
import MyProfileBookshelfContainer from './MyProfileBookshelfContainer';
import UserProfileBookshelfContainer from './UserProfileBookshelfContainer';
import useMounted from '@/hooks/useMounted';
import Loading from '@/v1/base/Loading';

const ProfileBookShelf = ({ userId }: { userId: 'me' | APIUser['userId'] }) => {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <QueryErrorBoundaryFallback
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
  return (
    <div className="flex min-h-[18.3rem] items-center justify-center">
      <Loading />
    </div>
  );
};
