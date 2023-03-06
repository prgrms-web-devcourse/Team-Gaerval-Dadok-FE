'use client';

import useBookshelfBookListQuery from '@/queries/bookshelf/useBookshelfBookListQuery';
import { APIDefaultBookshelf } from '@/types/bookshelf';
import TopNavigation from '@/ui/common/TopNavigation';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import { VStack } from '@chakra-ui/react';

interface MyBookShelfPageProps {
  params: { bookshelvesId: APIDefaultBookshelf['bookshelfId'] };
}

export default function MyBookShelf({
  params: { bookshelvesId },
}: MyBookShelfPageProps) {
  const bookshelfBookListQuery = useBookshelfBookListQuery({ bookshelvesId });

  const isSuccess = bookshelfBookListQuery.isSuccess;
  if (!isSuccess) return null;

  return (
    <VStack
      width="100%"
      height="100%"
      maxWidth="43rem"
      padding="2rem 2rem 9rem 2rem"
    >
      <TopNavigation pageTitle="내 책장" />
      <VStack width="100%" spacing="2rem>">
        <InteractiveBookShelf books={bookshelfBookListQuery.data.books} />
      </VStack>
    </VStack>
  );
}
