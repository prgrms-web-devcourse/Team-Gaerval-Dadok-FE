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
  const bookshelfInfoQuery = useBookshelfInfoQuery({
    bookshelfId,
  });
  const bookshelfBooksQuery = useBookshelfBooksQuery({ bookshelfId });

  const isSuccess =
    bookshelfInfoQuery.isSuccess && bookshelfBooksQuery.isSuccess;
  if (!isSuccess) return null;

  return (
    <VStack
      width="100%"
      height="100%"
      maxWidth="43rem"
      padding="2rem 2rem 10rem 2rem"
    >
      <TopNavigation
        pageTitle={`${bookshelfInfoQuery.data.userNickname}님의 책장`}
      />
      <HStack width="100%" height="3rem" gap="0.08rem">
        <UserJobInfoTag tag={bookshelfInfoQuery.data.job.jobGroupKoreanName} />
        {bookshelfInfoQuery.data.job.jobNameKoreanName && (
          <UserJobInfoTag tag={bookshelfInfoQuery.data.job.jobNameKoreanName} />
        )}
      </HStack>
      <VStack width="100%" spacing="2rem">
        <InteractiveBookShelf books={bookshelfBooksQuery.data.books} />
      </VStack>
    </VStack>
  );
}
