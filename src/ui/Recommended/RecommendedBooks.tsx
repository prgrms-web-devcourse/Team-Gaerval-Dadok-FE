import { APIDefaultBook } from '@/types/book';
import { APIJobGroup } from '@/types/job';
import {
  Flex,
  Heading,
  Highlight,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';

interface RecommendedBooksTypes {
  jobGroup: APIJobGroup['koreanName'];
  books: APIDefaultBook[];
}

const RecommendedBooks = ({ jobGroup, books }: RecommendedBooksTypes) => {
  return (
    <Flex width="100%" direction="column" gap="1rem" padding="2rem 0">
      <Heading color="main">
        <Highlight
          query="에서 많이 꽂은 책들이에요"
          styles={{ color: 'black' }}
        >
          {`${jobGroup}직군에서 많이 꽂은 책들이에요`}
        </Highlight>
      </Heading>
      <HStack width="100%" height="18.2rem" gap="1rem" overflowX="scroll">
        {books.map(book => (
          <VStack key={book.bookId} as={Link} href={`/book/${book.bookId}`}>
            <Image
              src={book.imageUrl}
              alt="bookImage"
              width="11rem"
              height="15.3rem"
              borderRadius="1.6rem"
            />
            <Text
              fontSize="md"
              textAlign="center"
              width="11rem"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {book.title}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Flex>
  );
};

export default RecommendedBooks;
