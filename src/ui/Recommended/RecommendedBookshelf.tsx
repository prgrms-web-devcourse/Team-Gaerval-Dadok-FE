import { APIBookshelf } from '@/types/bookshelf';
import IconButton from '@/ui/common/IconButton';
import LikeCount from '@/ui/common/LikeCount';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import { Flex, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

const RecommendedBookshelf = ({
  bookshelfId,
  bookshelfName,
  books,
  likeCount,
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
          <LikeCount likeCount={likeCount} />
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
