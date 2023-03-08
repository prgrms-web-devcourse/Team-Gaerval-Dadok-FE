'use client';

import { Box, Heading, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import IconButton from '@/ui/common/IconButton';
import { BookInfo, BookCommentList } from '@/ui/BookDetail';
import useBookInfoQuery from '@/queries/book/useBookInfoQuery';

import type { APIDefaultBook } from '@/types/book';

const BookDetailPage = ({
  params: { id: bookId },
}: {
  params: { id: APIDefaultBook['bookId'] };
}) => {
  const router = useRouter();
  const bookQueryInfo = useBookInfoQuery(bookId, {
    onError: () => {
      router.replace('/');
    },
  });

  return (
    <Box pt="2rem" px="2rem" width="100%">
      <IconButton name="back" />
      <VStack
        w="100%"
        bgColor="white"
        p="2rem"
        shadow="lg"
        align="stretch"
        borderLeftRadius={15}
        gap="2rem"
      >
        {bookQueryInfo.isSuccess && (
          <BookInfo
            bookId={bookId}
            title={bookQueryInfo.data.title}
            author={bookQueryInfo.data.author}
            imageUrl={bookQueryInfo.data.imageUrl}
            contents={bookQueryInfo.data.contents}
          />
        )}
        {bookQueryInfo.isLoading && (
          <VStack spacing="2rem" align="stretch">
            <Skeleton width="18rem" height="25rem" />
            <SkeletonText
              mt="4"
              noOfLines={4}
              spacing="4"
              skeletonHeight="1.4rem"
            />
          </VStack>
        )}
      </VStack>
      <VStack align="flex-start">
        <Heading pt="3rem" pb="1rem" fontSize="lg">
          이 책에 남긴 글
        </Heading>
        <BookCommentList bookId={bookId} />
      </VStack>
    </Box>
  );
};

export default BookDetailPage;
