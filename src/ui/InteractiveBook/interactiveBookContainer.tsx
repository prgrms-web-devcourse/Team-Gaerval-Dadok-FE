import { Flex } from '@chakra-ui/react';

type ChildrenType = {
  children: React.ReactNode;
};

const InteractiveBookContainer = ({ children }: ChildrenType) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      style={{
        perspective: '60rem',
        margin: '3rem',
      }}
    >
      {children}
    </Flex>
  );
};

export default InteractiveBookContainer;
