'use client';

import { Flex, useTheme } from '@chakra-ui/react';

type ChildrenType = {
  children: React.ReactNode;
};

const InteractiveBookShelf = ({ children }: ChildrenType) => {
  const theme = useTheme();

  return (
    <Flex
      width="100%"
      height="13.2rem"
      maxWidth="39.8rem"
      padding="0 1.6rem"
      border={`0.07rem solid ${theme.colors.white[600]}`}
      shadow="md"
      // backgroundColor="white.900"
      // boxShadow={`0rem 0.08rem 0.2rem ${theme.colors.black[600]}`}
    >
      <Flex
        width="calc(100% - 2rem)"
        marginTop="0.8rem"
        gap="25%"
        justifyContent="flex-start"
      >
        {children}
      </Flex>
      <Flex width="2rem" />
    </Flex>
  );
};

export default InteractiveBookShelf;
