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
      marginTop="0.8rem"
      gap="24%"
      justifyContent="flex-start"
    >
      {children}
    </Flex>
  );
};

export default InteractiveBookShelf;
