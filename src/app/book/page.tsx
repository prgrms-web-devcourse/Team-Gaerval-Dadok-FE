'use client';

import { VStack } from '@chakra-ui/react';

import BookSearch from '@/ui/BookSearch';
import BottomNavigation from '@/ui/BottomNavigation';

const BookPage = () => {
  return (
    <VStack>
      <BookSearch />
      <BottomNavigation />
    </VStack>
  );
};

export default BookPage;
