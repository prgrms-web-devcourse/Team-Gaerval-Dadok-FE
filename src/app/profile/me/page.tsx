'use client';

import { useRouter } from 'next/navigation';
import { removeAuth } from '@/utils/helpers';
import userAPI from '@/apis/user';
import TopHeader from '@/v1/base/TopHeader';
import ProfileInfo from '@/v1/profile/info/ProfileInfo';
import ProfileBookShelf from '@/v1/profile/bookShelf/ProfileBookShelf';
import ProfileGroup from '@/v1/profile/group/ProfileGroup';

const USER_ID = 'me';

const MyProfilePage = () => {
  const router = useRouter();

  const handleLogoutButtonClick = async () => {
    await userAPI.logout();
    removeAuth();
    router.push('/');
  };

  return (
    <>
      <TopHeader text="Profile">
        <button onClick={handleLogoutButtonClick}>로그아웃</button>
      </TopHeader>
      <div className="flex flex-col gap-[2rem]">
        <ProfileInfo userId={USER_ID} />
        <ProfileBookShelf userId={USER_ID} />
        <ProfileGroup userId={USER_ID} />
      </div>
    </>
  );
};

export default MyProfilePage;
