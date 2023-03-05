'use client';

import useAllJobQuery from '@/queries/job/useAllJobQuery';
import AdditionalProfileForm from '@/ui/AdditionalProfileForm';
import { Heading, Text, VStack } from '@chakra-ui/react';

const AdditionalProfile = () => {
  const allJobQuery = useAllJobQuery();

  if (!allJobQuery.isSuccess) return null;

  return (
    <VStack
      h="100vh"
      bgColor="white"
      position="relative"
      zIndex={10}
      p="6rem 2rem"
      gap="1rem"
    >
      <Heading fontSize="lg">추가 정보를 선택해주세요!</Heading>
      <Text fontSize="md" textAlign="center">
        추가 정보를 입력하면
        <br />
        <Text as="span" color="main" fontWeight="bold">
          다독다독
        </Text>
        이 추천하는 책장을 볼 수 있어요!
      </Text>
      <AdditionalProfileForm
        jobGroups={allJobQuery.data.jobGroups}
        jobs={allJobQuery.data.jobs}
      />
    </VStack>
  );
};

export default AdditionalProfile;
