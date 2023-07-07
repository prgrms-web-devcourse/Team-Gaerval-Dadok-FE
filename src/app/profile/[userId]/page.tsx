'use client';

import { APIUser } from '@/types/user';
import TopNavigation from '@/ui/common/TopNavigation';
import ProfileBookShelf from '@/ui/Profile/ProfileBookshelf';
import ProfileInfo from '@/ui/Profile/ProfileInfo';
import { VStack } from '@chakra-ui/react';

const UserProfilePage = ({
  params: { userId },
}: {
  params: { userId: APIUser['userId'] };
}) => {
  return (
    <VStack justify="center" align="flex-start" w="100%">
      <TopNavigation pageTitle="" />
      <VStack justify="flex-start" gap="2rem" w="100%">
        <ProfileInfo userId={userId} />
        <ProfileBookShelf userId={userId} />
      </VStack>
    </VStack>
  );
};

export default UserProfilePage;
