'use client';

import { VStack, Text } from '@chakra-ui/react';

import BookSearch from '@/ui/BookSearch';

const BookPage = () => {
  return (
    <VStack gap="1rem">
      <Text
        alignSelf="flex-start"
        fontSize="2rem"
        fontWeight="800"
        color="main"
      >
        Discover
      </Text>
      <BookSearch />
    </VStack>
  );
};

export default BookPage;
