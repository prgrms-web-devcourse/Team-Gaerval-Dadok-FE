'use client';

import useUserProfileQuery from '@/queries/user/useUserProfileQuery';
import { APIUser } from '@/types/user';
import ProfileInfo from '@/ui/ProfileInfo';

interface UserProfilePageProps {
  params: { id: APIUser['userId'] };
}

const UserProfilePage = ({ params }: UserProfilePageProps) => {
  const userProfileQuery = useUserProfileQuery({ id: params.id });

  if (userProfileQuery.isSuccess) {
    return <ProfileInfo user={userProfileQuery.data} />;
  }

  return null;
};

export default UserProfilePage;
