import { APIProfileBookshelf } from '@/types/bookshelf';
import { Flex, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import IconButton from '../common/IconButton';
import InteractiveBookShelf from '../InteractiveBookShelf';

const RecommendedBookshelf = ({
  bookshelfId,
  bookshelfName,
  books,
}: APIProfileBookshelf) => {
  return (
    <VStack align="flex-start" spacing="2rem">
      <Flex
        as={Link}
        href={`/bookshelf/${bookshelfId}`}
        align="center"
        w="100%"
        justify="space-between"
      >
        <Text fontSize="md" fontWeight="bold">
          {`${bookshelfName}`}
        </Text>
        <IconButton name="more-circle" size="1.6rem" fill />
      </Flex>
      <InteractiveBookShelf books={books} />
    </VStack>
  );
};

export default RecommendedBookshelf;
