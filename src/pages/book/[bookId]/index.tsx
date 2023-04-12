import { Box, Skeleton, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import bookAPI from '@/apis/book';
import useBookInfoQuery from '@/queries/book/useBookInfoQuery';
import useBookUserInfoQuery from '@/queries/book/useBookUserInfoQuery';
import { APIBook } from '@/types/book';
import { BookCommentList, BookInfo } from '@/ui/BookDetail';
import TopNavigation from '@/ui/common/TopNavigation';
import debounce from '@/utils/debounce';
import { isAuthed } from '@/utils/helpers';

const BookDetailPage = ({ bookId }: { bookId: APIBook['bookId'] }) => {
  const router = useRouter();

  const bookQueryInfo = useBookInfoQuery(bookId, {
    onError: () => {
      /** @todo /404 페이지로 교체 */
      router.replace('/');
    },
  });

  const bookUserQueryInfo = useBookUserInfoQuery(bookId, {
    enabled: isAuthed(),
  });

  const updateBookmark = (isBookMarked: boolean) => {
    if (!bookUserQueryInfo.isSuccess) {
      return;
    }

    const { isInMyBookshelf } = bookUserQueryInfo.data;

    if (!isInMyBookshelf && isBookMarked) {
      bookAPI.setBookMarked(bookId).then(() => {
        bookUserQueryInfo.refetch();
      });
    } else if (isInMyBookshelf && !isBookMarked) {
      bookAPI.unsetBookMarked(bookId).then(() => {
        bookUserQueryInfo.refetch();
      });
    }
  };

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
        {bookQueryInfo.isSuccess && bookUserQueryInfo.isSuccess && (
          <BookInfo
            title={bookQueryInfo.data.title}
            author={bookQueryInfo.data.author}
            imageUrl={bookQueryInfo.data.imageUrl}
            contents={bookQueryInfo.data.contents}
            url={bookQueryInfo.data.url}
            onBookmarkClick={debounce(updateBookmark, 500)}
            {...bookUserQueryInfo.data}
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
        {bookUserQueryInfo.isSuccess && (
          <BookCommentList
            bookId={bookId}
            isInMyBookshelf={bookUserQueryInfo.data.isInMyBookshelf}
          />
        )}
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
