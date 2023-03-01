'use client';

import { VStack } from '@chakra-ui/react';
import TopNavigation from '@/ui/common/TopNavigation';

type ChildrenType = {
  children: React.ReactNode;
};

const MyBookShelfPage = ({ children }: ChildrenType) => {
  return (
    <VStack
      width="100%"
      height="100%"
      maxWidth="43rem"
      padding="2rem 2rem 8rem 2rem"
    >
      <TopNavigation pageTitle="내 책장" />
      <VStack width="100%" spacing="2rem">
        {children}
      </VStack>
    </VStack>
  );
};

export default MyBookShelfPage;
