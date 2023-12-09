'use client';

import { APIUser } from '@/types/user';
import TopHeader from '@/v1/base/TopHeader';
import ProfileBookShelf from '@/v1/profile/bookShelf/ProfileBookShelf';
import ProfileInfo from '@/v1/profile/info/ProfileInfo';

const UserProfilePage = ({
  params: { userId },
}: {
  params: { userId: APIUser['userId'] };
}) => {
  return (
    <>
      <TopHeader text="Profile" />
      <div className="flex flex-col gap-[2rem]">
        <ProfileInfo userId={userId} />
        <ProfileBookShelf userId={userId} />
      </div>
    </>
  );
};

export default UserProfilePage;
