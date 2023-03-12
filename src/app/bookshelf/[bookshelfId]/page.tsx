'use client';

import useBookshelfBooksQuery from '@/queries/bookshelf/useBookshelfBookListQuery';
import useBookshelfInfoQuery from '@/queries/bookshelf/useBookshelfInfoQuery';
import { APIBookshelfInfo } from '@/types/bookshelf';
import TopNavigation from '@/ui/common/TopNavigation';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import UserJobInfoTag from '@/ui/UserJobInfoTag';
import { HStack, VStack } from '@chakra-ui/react';

interface UsersBookShelfPageProps {
  params: { bookshelfId: APIBookshelfInfo['bookshelfId'] };
}

export default function UserBookShelfPage({
  params: { bookshelfId },
}: UsersBookShelfPageProps) {
  const { data: infoData, isSuccess: infoIsSuccess } = useBookshelfInfoQuery({
    bookshelfId,
  });
  const { data: booksData, isSuccess: booksIsSuccess } = useBookshelfBooksQuery(
    { bookshelfId }
  );

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
        <InteractiveBookShelf books={booksData.books} />
      </VStack>
    </VStack>
  );
}
