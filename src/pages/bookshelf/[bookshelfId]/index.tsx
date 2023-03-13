import useBookshelfBooksQuery from '@/queries/bookshelf/useBookshelfBookListQuery';
import useBookshelfInfoQuery from '@/queries/bookshelf/useBookshelfInfoQuery';
import { APIBookshelfInfo } from '@/types/bookshelf';
import TopNavigation from '@/ui/common/TopNavigation';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import UserJobInfoTag from '@/ui/UserJobInfoTag';
import { Box, HStack, Spinner, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function UserBookShelfPage({
  bookshelfId,
}: {
  bookshelfId: APIBookshelfInfo['bookshelfId'];
}) {
  const { ref, inView } = useInView();
  const { data: infoData, isSuccess: infoIsSuccess } = useBookshelfInfoQuery({
    bookshelfId,
  });
  const {
    data: testData,
    fetchNextPage,
    hasNextPage,
    isSuccess: booksIsSuccess,
    isFetching,
    isFetchingNextPage,
  } = useBookshelfBooksQuery({ bookshelfId });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (!(infoIsSuccess && booksIsSuccess)) return null;

  /**
   * @TODO
   * 로그인 한 사용자는 책장의 모든 책장 열람 가능
   * 로그인 하지 않은 사용자는 책장의 일부만 열람 가능
   */

  return (
    <VStack width="100%" height="100%">
      <TopNavigation pageTitle={infoData.bookshelfName} />
      <HStack width="100%" height="3rem" gap="0.08rem" px="1rem">
        <UserJobInfoTag tag={infoData.job.jobGroupKoreanName} />
        {infoData.job.jobNameKoreanName && (
          <UserJobInfoTag tag={infoData.job.jobNameKoreanName} />
        )}
      </HStack>
      <VStack width="100%" spacing="2rem">
        {testData.pages.map((page, idx) => (
          <InteractiveBookShelf key={idx} books={page.books} />
        ))}
        {isFetching && !isFetchingNextPage ? (
          <Spinner size="8rem" color="main" />
        ) : (
          <Box ref={ref} />
        )}
      </VStack>
    </VStack>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { bookshelfId } = context.query;

  return {
    props: {
      bookshelfId: Number(bookshelfId),
    },
  };
};
