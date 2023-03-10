import { APIProfileBookshelf } from '@/types/bookshelf';
import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import InteractiveBookShelf from '../InteractiveBookShelf';

const ProfileBookshelf = ({ bookshelfName, books }: APIProfileBookshelf) => {
  return (
    <Box>
      <Text as={Link} href="/usersbookshelf" fontSize="sm">
        {bookshelfName}
      </Text>
      {books.length === 0 ? (
        <Text fontSize="md">책장이 비어있습니다.</Text>
      ) : (
        <InteractiveBookShelf books={books} />
      )}
    </Box>
  );
};

export default ProfileBookshelf;
