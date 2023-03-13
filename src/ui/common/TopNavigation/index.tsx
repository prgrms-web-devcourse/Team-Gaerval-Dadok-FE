import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

type PageTitleType = {
  pageTitle: string;
};

const TopNavigation = ({ pageTitle }: PageTitleType) => {
  const router = useRouter();

  return (
    <Flex width="100%" height="4.8rem" alignItems="center">
      <Image
        onClick={() => router.back()}
        src="/icons/back.svg"
        width={32}
        height={32}
        alt="goToRecentPage"
        priority
      />
      <Text fontSize="lg" fontWeight="700">
        {pageTitle}
      </Text>
    </Flex>
  );
};

export default TopNavigation;
