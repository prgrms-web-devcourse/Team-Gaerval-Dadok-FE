import { APIDefaultBook } from '@/types/book';
import { APIJobGroup } from '@/types/job';
import { Flex, Highlight, HStack, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

interface RecommendedBooksTypes {
  jobGroup: APIJobGroup['koreanName'];
  books: APIDefaultBook[];
}

const RecommendedBooks = ({ jobGroup, books }: RecommendedBooksTypes) => {
  return (
    <Flex
      width="100%"
      direction="column"
      gap="1.5rem"
      padding="2rem 0"
      justify="flex-start"
    >
      <Text fontWeight="bold" fontSize="md">
        <Highlight
          query={jobGroup}
          styles={{
            px: '1rem',
            py: '0.2rem',
            color: 'main',
            borderRadius: '3rem',
            border: '1px',
            borderColor: 'main',
            fontSize: 'sm',
            verticalAlign: 'text-bottom',
            marginRight: '0.2rem',
          }}
        >
          {`${jobGroup} 직군에서 많이 꽂은 책들이에요`}
        </Highlight>
      </Text>
      <HStack width="100%" align="stretch" gap="1rem" overflowX="scroll">
        {books.map(({ bookId, imageUrl, title }) => (
          <VStack key={bookId} as={Link} href={`/book/${bookId}`}>
            <Image
              src={imageUrl}
              alt="bookImage"
              width="12rem"
              height="15.3rem"
              borderRadius="1rem"
            />
            <Text
              fontSize="sm"
              width="12rem"
              overflow="hidden"
              textOverflow="ellipsis"
              noOfLines={2}
              lineHeight="1.8rem"
              color="black.800"
            >
              {title}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Flex>
  );
};

export default RecommendedBooks;
