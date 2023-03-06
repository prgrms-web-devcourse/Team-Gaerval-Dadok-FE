'use client';

import BookSearch from '@/ui/BookSearch';
import { VStack } from '@chakra-ui/react';

const BookPage = () => {
  return (
    <VStack px="2rem" pt="2rem">
      <BookSearch />
    </VStack>
  );
};

export default BookPage;
