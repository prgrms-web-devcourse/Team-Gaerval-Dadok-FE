import { Box, Skeleton, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import useBookInfoQuery from '@/queries/book/useBookInfoQuery';
import { APIDefaultBook } from '@/types/book';
import { BookCommentList, BookInfo } from '@/ui/BookDetail';
import TopNavigation from '@/ui/common/TopNavigation';
import { GetServerSideProps } from 'next';

const BookDetailPage = ({ bookId }: { bookId: APIDefaultBook['bookId'] }) => {
  const router = useRouter();

  const bookQueryInfo = useBookInfoQuery(bookId, {
    onError: () => {
      /** @todo /404 페이지로 교체 */
      router.replace('/');
    },
  });

  return (
    <Box>
      <TopNavigation pageTitle="책 상세 페이지" />
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

      <VStack align="stretch">
        <Text pt="3rem" pb="1rem" fontSize="lg" fontWeight="bold">
          책 코멘트
        </Text>
        <BookCommentList bookId={bookId} />
      </VStack>
    </Box>
  );
};

export default BookDetailPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { bookId } = context.query;

  return {
    props: {
      bookId: Number(bookId),
    },
  };
};
