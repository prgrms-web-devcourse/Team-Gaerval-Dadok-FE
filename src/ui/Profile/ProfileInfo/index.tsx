import { ReactNode, Suspense } from 'react';
import MyProfileContainer from './MyProfileInfoContainer';
import UserProfileInfoContainer from './UserProfileInfoContainer';
import { Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import type { APIUser } from '@/types/user';
import QueryErrorBounaryFallback from '@/ui/common/QueryErrorBoundaryFallback';

type ProfileInfoProps = {
  children?: ReactNode;
  userId: 'me' | APIUser['userId'];
};

const ProfileInfo = ({ userId, children }: ProfileInfoProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <QueryErrorBounaryFallback
              minH="12rem"
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
    <VStack gap="1rem" align="stretch" w="100%">
      <SkeletonCircle size="8rem" />
      <Skeleton w="80%" height="3rem" />
    </VStack>
  );
};
