'use client';

import { APIUser } from '@/types/user';
import BackButton from '@/components/common/BackButton';
import ShareButton from '@/components/common/ShareButton';
import TopNavigation from '@/components/common/TopNavigation';
import ProfileBookShelf from '@/components/profile/bookShelf/ProfileBookShelf';
import ProfileInfo from '@/components/profile/info/ProfileInfo';

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
