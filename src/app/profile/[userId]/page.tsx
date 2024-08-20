'use client';

import { APIUser } from '@/types/user';
import BackButton from '@/v1/base/BackButton';
import ShareButton from '@/v1/base/ShareButton';
import TopNavigation from '@/v1/base/TopNavigation';
import ProfileBookShelf from '@/v1/profile/bookShelf/ProfileBookShelf';
import ProfileInfo from '@/v1/profile/info/ProfileInfo';

const UserProfilePage = ({
  params: { userId },
}: {
  params: { userId: APIUser['userId'] };
}) => {
  return (
    <>
      <TopNavigation>
        <TopNavigation.LeftItem>
          <BackButton />
        </TopNavigation.LeftItem>
        <TopNavigation.RightItem>
          <ShareButton />
        </TopNavigation.RightItem>
      </TopNavigation>
      <div className="mt-[1.5rem] flex flex-col gap-[2rem]">
        <ProfileInfo userId={userId} />
        <ProfileBookShelf userId={userId} />
      </div>
    </>
  );
};

export default UserProfilePage;
