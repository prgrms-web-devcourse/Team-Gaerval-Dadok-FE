'use client';

import useUserSummaryBookshlefQuery from '@/queries/bookshelf/useUserSummaryBookshelfQuery';
import useUserProfileQuery from '@/queries/user/useUserProfileQuery';
import { APIUser } from '@/types/user';
import ProfileBookshelf from '@/ui/ProfileBookshelf';
import ProfileInfo from '@/ui/ProfileInfo';
import { Flex } from '@chakra-ui/react';

interface UserProfilePageProps {
  params: { id: APIUser['userId'] };
}

const UserProfilePage = ({ params: { id } }: UserProfilePageProps) => {
  const userProfileQuery = useUserProfileQuery({ id });
  const bookshelfQuery = useUserSummaryBookshlefQuery({ id });

  return (
    <Flex direction="column" justify="center" gap="2rem">
      {userProfileQuery.isSuccess && <ProfileInfo {...userProfileQuery.data} />}
      {bookshelfQuery.isSuccess && (
        <ProfileBookshelf {...bookshelfQuery.data} />
      )}
    </Flex>
  );
};

export default UserProfilePage;
