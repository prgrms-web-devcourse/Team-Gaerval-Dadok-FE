import { APIProfileBookshelf } from '@/types/bookshelf';
import { Heading, Highlight, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import InteractiveBookShelf from '../InteractiveBookShelf';

const RecommendedBookshelf = ({
  bookshelfId,
  bookshelfName,
  books,
}: APIProfileBookshelf) => {
  return (
    <VStack align="flex-start" spacing="1rem">
      <Heading as={Link} href={`/bookshelf/${bookshelfId}`} color="main">
        <Highlight query="님의 책장" styles={{ color: 'black' }}>
          {`${bookshelfName} >`}
        </Highlight>
      </Heading>
      <InteractiveBookShelf books={books} />
    </VStack>
  );
};

export default RecommendedBookshelf;
