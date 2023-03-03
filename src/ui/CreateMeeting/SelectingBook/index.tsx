import { Flex, useDisclosure } from '@chakra-ui/react';

import BottomSheet from '@/ui/common/BottomSheet';
import SearchingBook from './SearchingBook';

const SelectingBook = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        cursor="pointer"
        onClick={onOpen}
        _hover={{
          bgColor: 'white.400',
        }}
      >
        책을 선택해 주세요
      </Flex>
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        <SearchingBook />
      </BottomSheet>
    </Flex>
  );
};

export default SelectingBook;
