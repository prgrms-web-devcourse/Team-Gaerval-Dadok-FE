'use client';

import { VStack } from '@chakra-ui/react';
import AdditionalProfileForm from '@/ui/AdditionalProfileForm';
import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import TopNavigation from '@/ui/common/TopNavigation';

const EditMyPage = () => {
  const allJobQuery = useAllJobQuery();
  const userProfileQuery = useMyProfileQuery();

  const isSuccess = allJobQuery.isSuccess && userProfileQuery.isSuccess;
  if (!isSuccess) return null;

  return (
    <VStack justify="center" align="center">
      <TopNavigation pageTitle="내 프로필 수정" />
      <AdditionalProfileForm
        profile={userProfileQuery.data}
        jobGroups={allJobQuery.data.jobGroups}
      />
    </VStack>
  );
};

export default EditMyPage;
