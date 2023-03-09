import { APIDefaultBook } from '@/types/book';
import { APIJobGroup } from '@/types/job';
import { Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

interface RecommendedBooksTypes {
  jobGroup: APIJobGroup['koreanName'];
  books: APIDefaultBook[];
}

const RecommendedBooks = ({ jobGroup, books }: RecommendedBooksTypes) => {
  return (
    <Flex width="100%" direction="column" gap="1rem" padding="2rem 0">
      <Heading>{`${jobGroup}직군에서 많이 꽂은 책들이에요`}</Heading>
      {/* <Heading>{`개발직군에서 많이 꽂은 책들이에요`}</Heading> */}
      <Flex gap="1rem" overflowX="scroll">
        {books.map(book => (
          <VStack
            as={Link}
            href={`/book/${book.bookId}`}
            direction="column"
            key={book.bookId}
            width="11rem"
          >
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
              width="100%"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {book.title}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Flex>
  );
};

export default RecommendedBooks;
