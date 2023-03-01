'use client';

import { Flex, VStack } from '@chakra-ui/react';

type ChildrenType = {
  children: React.ReactNode;
};

const MyBookShelfPage = ({ children }: ChildrenType) => {
  return (
    <main>
      <VStack
        width="100%"
        height="100vh"
        maxWidth="43rem"
        padding="2rem 2rem 8rem 2rem"
        color="black"
        border="0.1rem solid"
      >
        {/* PageHeader */}
        <Flex
          width="100%"
          height="3.6rem"
          align="center"
          fontSize="lg"
          fontWeight="700"
          color="red.800"
          border="0.1rem solid"
        >
          내 책장
        </Flex>
        {/* BookShelves */}
        <VStack width="100%" spacing="2rem">
          {children}
        </VStack>
      </VStack>
    </main>
  );
};

export default MyBookShelfPage;
