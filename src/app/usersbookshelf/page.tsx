'use client';

import useBookshelfInfoQuery from '@/queries/bookshelf/useBookshelfInfoQuery';
import { APIUser } from '@/types/user';
import TopNavigation from '@/ui/common/TopNavigation';
import BookShelfBody from '@/ui/BookShelfPage/BookShelfBody';
import BookShelfHeader from '@/ui/BookShelfPage/BookShelfHeader';
import { VStack } from '@chakra-ui/react';

interface UsersBookShelfPageProps {
  params: { userId: APIUser['userId'] };
}

export default function UsersBookShelf({
  params: { userId },
}: UsersBookShelfPageProps) {
  const { data, isSuccess } = useBookshelfInfoQuery({ userId });

  if (!isSuccess) return null;

  return (
    <VStack
      width="100%"
      height="100%"
      maxWidth="43rem"
      padding="2rem 2rem 10rem 2rem"
    >
      <TopNavigation pageTitle={`${data.userNickname}님의 책장`} />
      <BookShelfHeader bookshelfInfo={data} />
      <BookShelfBody bookshelfId={data.bookshelfId} />
    </VStack>
  );
}
