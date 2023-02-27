import { Flex } from '@chakra-ui/react';

const SelectingBook = () => {
  return (
    <Flex p="1rem 2rem" justify="center">
      <Flex
        w="9rem"
        h="12rem"
        fontSize="sm"
        color="black.600"
        align="center"
        textAlign="center"
        bgColor="white.600"
        borderRadius="0.5rem"
      >
        책을 선택해 주세요
      </Flex>
    </Flex>
  );
};

export default SelectingBook;
