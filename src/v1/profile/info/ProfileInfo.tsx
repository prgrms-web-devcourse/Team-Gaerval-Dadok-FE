import { ReactNode, Suspense } from 'react';
import MyProfileContainer from './MyProfileInfoContainer';
import UserProfileInfoContainer from './UserProfileInfoContainer';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import type { APIUser } from '@/types/user';
import QueryErrorBoundaryFallback from '@/v1/base/QueryErrorBoundaryFallback';
import useMounted from '@/hooks/useMounted';
import Loading from '@/v1/base/Loading';

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
          <Suspense fallback={<ProfileInfoSkelenton />}>
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

const ProfileInfoSkelenton = () => {
  return (
    <div className="flex min-h-[11.1rem] items-center justify-center">
      <Loading />
    </div>
  );
};
