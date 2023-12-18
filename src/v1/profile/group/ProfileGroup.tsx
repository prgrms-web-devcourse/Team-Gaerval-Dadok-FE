import useMounted from '@/hooks/useMounted';
import { APIUser } from '@/types/user';
import Loading from '@/v1/base/Loading';
import QueryErrorBoundaryFallback from '@/v1/base/QueryErrorBoundaryFallback';
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
            <QueryErrorBoundaryFallback
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<ProfileGroupSkeleton />}>
            <ProfileGroupContainer userId={userId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ProfileGroup;

const ProfileGroupSkeleton = () => {
  return (
    <div className="flex min-h-[16.5rem] items-center justify-center">
      <Loading />
    </div>
  );
};
