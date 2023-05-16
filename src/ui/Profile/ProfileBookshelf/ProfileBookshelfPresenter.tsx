import { APIBookshelf } from '@/types/bookshelf';
import LikeCount from '@/ui/common/LikeCount';
import { Flex, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import IconButton from '../../common/IconButton';
import InteractiveBookShelf from '../../InteractiveBookShelf';

const ProfileBookshelfPresenter = ({
  bookshelfId,
  bookshelfName,
  books,
  likeCount,
}: APIBookshelf) => {
  return (
    <VStack align="flex-start" gap="1rem" w="100%">
      <Flex align="center" w="100%" justify="space-between">
        <Text
          as={Link}
          href={`/bookshelf/${bookshelfId}`}
          fontSize="md"
          fontWeight="bold"
        >
          {`${bookshelfName}`}
        </Text>
        <Flex h="2.4rem" align="center">
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
      {books.length === 0 ? (
        <Text fontSize="md">책장이 비어있습니다.</Text>
      ) : (
        <InteractiveBookShelf books={books} />
      )}
    </VStack>
  );
};

export default ProfileBookshelfPresenter;
