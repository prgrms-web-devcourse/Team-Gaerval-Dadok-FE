'use client';

import useBookshelfBookListQuery from '@/queries/bookshelf/useBookshelfBookListQuery';
import { APIDefaultBookshelf } from '@/types/bookshelf';
import TopNavigation from '@/ui/common/TopNavigation';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import UsersBookShelfHeader from '@/ui/UsersBookShelfPage/UsersBookShelfHeader';
import { VStack } from '@chakra-ui/react';

const DUMMY_USER = {
  userName: '벌레',
  tags: ['개발', '프론트엔드'],
};
interface UsersBookShelfPageProps {
  params: { bookshelvesId: APIDefaultBookshelf['bookshelfId'] };
}

export default function UsersBookShelf({
  params: { bookshelvesId },
}: UsersBookShelfPageProps) {
  const bookshelfBookListQuery = useBookshelfBookListQuery({ bookshelvesId });

  const isSuccess = bookshelfBookListQuery.isSuccess;
  if (!isSuccess) return null;

  return (
    <VStack
      width="100%"
      height="100%"
      maxWidth="43rem"
      padding="2rem 2rem 10rem 2rem"
    >
      <TopNavigation pageTitle={`${DUMMY_USER.userName}님의 책장`} />
      <UsersBookShelfHeader />
      <VStack width="100%" spacing="2rem">
        <InteractiveBookShelf books={bookshelfBookListQuery.data.books} />
      </VStack>
    </VStack>
  );
}
