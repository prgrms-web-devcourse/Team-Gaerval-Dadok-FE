'use client';

import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import AuthRequired from '@/ui/AuthRequired';
import TopNavigation from '@/ui/common/TopNavigation';
import ProfileForm from '@/ui/Profile/ProfileForm';
import { isAuthed } from '@/utils/helpers';
import { Skeleton, VStack } from '@chakra-ui/react';
import { Suspense } from 'react';

const EditMyPage = () => {
  return (
    <AuthRequired>
      <VStack justify="center" align="center">
        <TopNavigation pageTitle="내 프로필 수정" />
        <Suspense
          fallback={
            <VStack gap="2rem" align="stretch" w="100%">
              <Skeleton w="100%" height="6rem" />
              <Skeleton w="100%" height="6rem" />
              <Skeleton w="100%" height="6rem" />
            </VStack>
          }
        >
          <Contents />
        </Suspense>
      </VStack>
    </AuthRequired>
  );
};

const Contents = () => {
  const allJobQuery = useAllJobQuery({ enabled: isAuthed() });
  const { data: profileData } = useMyProfileQuery();

  return allJobQuery.isSuccess ? (
    <ProfileForm profile={profileData} jobGroups={allJobQuery.data.jobGroups} />
  ) : null;
};

export default EditMyPage;
