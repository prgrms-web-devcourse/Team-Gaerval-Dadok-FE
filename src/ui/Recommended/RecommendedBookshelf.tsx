import { APIBookshelf } from '@/types/bookshelf';
import { Flex, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import IconButton from '@/ui/common/IconButton';
import LikeButton from '@/ui/common/LikeButton';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';

const RecommendedBookshelf = ({
  bookshelfId,
  bookshelfName,
  books,
}: APIBookshelf) => {
  return (
    <VStack align="flex-start" spacing="2rem">
      <Flex align="center" w="100%" justify="space-between">
        <Text
          as={Link}
          href={`/bookshelf/${bookshelfId}`}
          fontSize="md"
          fontWeight="bold"
        >
          {`${bookshelfName}`}
        </Text>
        <Flex h="2.4rem" gap="1.6rem" align="center">
          <LikeButton />
          <IconButton
            as={Link}
            href={`/bookshelf/${bookshelfId}`}
            name="more-circle"
            size="1.6rem"
            fill
          />
        </Flex>
      </Flex>
      <InteractiveBookShelf books={books} />
    </VStack>
  );
};

export default RecommendedBookshelf;
