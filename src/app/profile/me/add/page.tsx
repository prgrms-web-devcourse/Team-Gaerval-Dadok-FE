'use client';

import useAllJobQuery from '@/queries/job/useAllJobQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import AdditionalProfileForm from '@/ui/AdditionalProfileForm';
import { Heading, Text, VStack } from '@chakra-ui/react';

const AdditionalProfile = () => {
  const allJobQuery = useAllJobQuery();
  const userProfileQuery = useMyProfileQuery();

  const isSuccess = allJobQuery.isSuccess && userProfileQuery.isSuccess;
  if (!isSuccess) return null;

  return (
    <VStack position="relative" zIndex={10} pt="6rem" gap="1rem">
      <Heading fontSize="lg">추가 정보를 입력해 주세요!</Heading>
      <Text fontSize="md" textAlign="center">
        추가 정보를 입력하면
        <br />
        <Text as="span" color="main" fontWeight="bold">
          다독다독
        </Text>
        이 추천하는 책장을 볼 수 있어요!
      </Text>
      <AdditionalProfileForm
        profile={userProfileQuery.data}
        jobGroups={allJobQuery.data.jobGroups}
      />
    </VStack>
  );
};

export default AdditionalProfile;
