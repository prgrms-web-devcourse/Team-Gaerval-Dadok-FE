'use client';

import TopNavigation from '@/ui/common/TopNavigation';
import { VStack } from '@chakra-ui/react';
import UsersBookShelfHeader from './UsersBookShelfHeader';

type ChildrenType = {
  children: React.ReactNode;
};

const DUMMY_USER = {
  userName: '벌레',
  tags: ['개발', '프론트엔드'],
};

const UsersBookShelfPage = ({ children }: ChildrenType) => {
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
        {children}
      </VStack>
    </VStack>
  );
};

export default UsersBookShelfPage;
