'use client';

import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TopNavigation = () => {
  const router = useRouter();

  return (
    <Flex
      width="100%"
      height="4.8rem"
      marginBottom="1.4rem"
      alignItems="center"
    >
      <Image
        onClick={() => router.back()}
        src="/icons/goBackIcon.svg"
        width={48}
        height={48}
        alt="goToRecentPage"
        priority
      />
      <Text fontSize="lg" fontWeight="700">
        내 책장
      </Text>
    </Flex>
  );
};

export default TopNavigation;
