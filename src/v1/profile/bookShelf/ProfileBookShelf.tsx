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
          <Suspense fallback={<ProfileBookShelfSkeleton />}>
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

const ProfileBookShelfSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-[2rem]">
      <div className="h-[2.7rem] w-[5rem] bg-placeholder" />

      <div className="flex h-[13.2rem] items-center justify-center">
        <Loading />
      </div>
    </div>
  );
};
