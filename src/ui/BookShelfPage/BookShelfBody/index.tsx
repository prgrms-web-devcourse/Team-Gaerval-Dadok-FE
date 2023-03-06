'use client';

import useBookshelfBookListQuery from '@/queries/bookshelf/useBookshelfBookListQuery';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import { VStack } from '@chakra-ui/react';

const BookShelfBody = ({ bookshelfId }: { bookshelfId: number }) => {
  const bookshelfBookListQuery = useBookshelfBookListQuery({ bookshelfId });
  const { data, isSuccess } = bookshelfBookListQuery;

  if (!isSuccess) return null;

  return (
    <VStack width="100%" spacing="2rem">
      <InteractiveBookShelf books={data.books} />
    </VStack>
  );
};

export default BookShelfBody;
