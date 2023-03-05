'use client';

import AdditionalProfileForm from '@/ui/AdditionalProfileForm';
import { Heading, Text, VStack } from '@chakra-ui/react';

const AdditionalProfile = () => {
  return (
    <VStack
      h="100vh"
      bgColor="white"
      position="relative"
      zIndex={10}
      p="8rem 6rem"
      gap="1rem"
    >
      <Heading fontSize="lg">직업을 선택해주세요!</Heading>
      <Text fontSize="md" textAlign="center">
        직업을 선택하면{' '}
        <Text as="span" color="main" fontWeight="bold">
          다독다독
        </Text>
        이 추천하는 책장을 볼 수 있어요!
      </Text>
      <AdditionalProfileForm />
    </VStack>
  );
};

export default AdditionalProfile;
