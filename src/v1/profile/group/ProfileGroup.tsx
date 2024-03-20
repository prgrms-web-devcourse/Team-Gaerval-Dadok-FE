import useMounted from '@/hooks/useMounted';
import { APIUser } from '@/types/user';
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
    <div className="flex animate-pulse flex-col gap-[0.6rem]">
      <div className="flex h-[2.7rem] w-[6rem] bg-placeholder" />
      <div className="flex gap-[1rem] overflow-scroll">
        <div className="flex flex-col gap-[0.5rem]">
          <div className="h-[11.6rem] w-[10rem] bg-placeholder" />
          <div className="h-[1.5rem] bg-placeholder" />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <div className="h-[11.6rem] w-[10rem] bg-placeholder" />
          <div className="h-[1.5rem]bg-placeholder" />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <div className="h-[11.6rem] w-[10rem] bg-placeholder" />
          <div className="h-[1.5rem] bg-placeholder" />
        </div>
      </div>
    </div>
  );
};
