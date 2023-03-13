import { APIProfileBookshelf } from '@/types/bookshelf';
import { Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import InteractiveBookShelf from '../InteractiveBookShelf';

const ProfileBookshelf = ({
  bookshelfId,
  bookshelfName,
  books,
}: APIProfileBookshelf) => {
  return (
    <VStack align="flex-start" gap="1rem" w="100%">
      <Text as={Link} href={`/bookshelf/${bookshelfId}`} fontSize="sm">
        {bookshelfName}
      </Text>
      {books.length === 0 ? (
        <Text fontSize="md">책장이 비어있습니다.</Text>
      ) : (
        <InteractiveBookShelf books={books} />
      )}
    </VStack>
  );
};

export default ProfileBookshelf;
