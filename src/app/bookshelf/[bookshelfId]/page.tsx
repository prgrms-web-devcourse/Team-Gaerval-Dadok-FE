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

  // 로그인 한 사용자는 책장의 모든 책장 열람 가능
  // 로그인 하지 않은 사용자는 책장의 일부만 열람 가능

  return (
    <VStack
      width="100%"
      height="100%"
      maxWidth="43rem"
      padding="2rem 2rem 10rem 2rem"
    >
      <TopNavigation pageTitle={`${infoData.userNickname}님의 책장`} />
      <HStack width="100%" height="3rem" gap="0.08rem">
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
