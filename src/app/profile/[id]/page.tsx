'use client';

import useUserSummaryBookshlefQuery from '@/queries/bookshelf/useUserSummaryBookshelfQuery';
import useUserProfileQuery from '@/queries/user/useUserProfileQuery';
import { APIUser } from '@/types/user';
import ProfileInfo from '@/ui/ProfileInfo';

interface UserProfilePageProps {
  params: { id: APIUser['userId'] };
}

const UserProfilePage = ({ params: { id } }: UserProfilePageProps) => {
  const userProfileQuery = useUserProfileQuery({ id });
  const bookshelfQuery = useUserSummaryBookshlefQuery({ id });

  const isSuccess = userProfileQuery.isSuccess && bookshelfQuery.isSuccess;
  if (!isSuccess) return null;

  return (
    <ProfileInfo
      user={userProfileQuery.data}
      summaryBookshelf={bookshelfQuery.data}
    />
  );
};

export default UserProfilePage;
