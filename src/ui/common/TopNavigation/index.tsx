'use client';

import { Text, Flex } from '@chakra-ui/react';
import Image from 'next/image';

const TopNavigation = () => {
  return (
    <Flex
      width="100%"
      height="4.8rem"
      marginBottom="1.4rem"
      alignItems="center"
    >
      <Image
        onClick={() => console.log('goRecent')}
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
