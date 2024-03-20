import { ReactNode, Suspense } from 'react';
import MyProfileContainer from './MyProfileInfoContainer';
import UserProfileInfoContainer from './UserProfileInfoContainer';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import type { APIUser } from '@/types/user';
import QueryErrorBoundaryFallback from '@/v1/base/QueryErrorBoundaryFallback';
import useMounted from '@/hooks/useMounted';

type ProfileInfoProps = {
  children?: ReactNode;
  userId: 'me' | APIUser['userId'];
};

const ProfileInfo = ({ userId, children }: ProfileInfoProps) => {
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
          <Suspense fallback={<ProfileInfoSkeleton />}>
            {userId === 'me' ? (
              <MyProfileContainer />
            ) : (
              <UserProfileInfoContainer userId={userId} />
            )}
            {children && children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ProfileInfo;

const ProfileInfoSkeleton = () => {
  return (
    <div className="mb-[2rem] flex animate-pulse flex-col gap-[2rem]">
      <div className="flex gap-[0.8rem]">
        <div className="h-[2.1rem] w-[3.8rem] rounded-lg bg-placeholder" />
        <div className="h-[2.1rem] w-[7.6rem] rounded-lg bg-placeholder" />
      </div>
      <div className="flex items-center gap-[1rem]">
        <div className="h-[7rem] w-[7rem] rounded-full bg-placeholder" />
        <div className="h-[2.7rem] w-[11rem] bg-placeholder text-lg" />
      </div>
    </div>
  );
};
