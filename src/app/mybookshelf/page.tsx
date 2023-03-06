'use client';

import useBookshelfInfoQuery from '@/queries/bookshelf/useBookshelfInfoQuery';
import { APIUser } from '@/types/user';
import BookShelfBody from '@/ui/BookShelfPage/BookShelfBody';
import TopNavigation from '@/ui/common/TopNavigation';
import { VStack } from '@chakra-ui/react';

interface MyBookShelfPageProps {
  params: { userId: APIUser['userId'] };
}

export default function MyBookShelf({
  params: { userId },
}: MyBookShelfPageProps) {
  const { data, isSuccess } = useBookshelfInfoQuery({ userId });

  if (!isSuccess) return null;

  return (
    <VStack
      width="100%"
      height="100%"
      maxWidth="43rem"
      padding="2rem 2rem 9rem 2rem"
    >
      <TopNavigation pageTitle="내 책장" />
      <BookShelfBody bookshelfId={data.bookshelfId} />
    </VStack>
  );
}
