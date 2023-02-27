'use client';

import { Flex } from '@chakra-ui/react';

type ChildrenType = {
  children: React.ReactNode;
};

const InteractiveBookShelf = ({ children }: ChildrenType) => {
  return (
    <Flex
      width="100%"
      height="18rem"
      maxWidth="39.8rem"
      padding="2.4rem 1.6rem"
      margin="2rem 0"
      shadow="md"
    >
      <Flex width="75%" justifyContent="space-between">
        {children}
      </Flex>
    </Flex>
  );
};

export default InteractiveBookShelf;
