'use client';

import { useRouter } from 'next/navigation';
import { isAuthed, removeAuth } from '@/utils/helpers';
import userAPI from '@/apis/user';
import TopHeader from '@/v1/base/TopHeader';
import ProfileInfo from '@/v1/profile/info/ProfileInfo';
import ProfileBookShelf from '@/v1/profile/bookShelf/ProfileBookShelf';
import ProfileGroup from '@/v1/profile/group/ProfileGroup';
import Avatar from '@/v1/base/Avatar';
import Link from 'next/link';
import { IconArrowRight } from '@public/icons';
import BookShelf from '@/v1/bookShelf/BookShelf';
import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import Loading from '@/v1/base/Loading';

const USER_ID = 'me';
const KAKAO_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`;

const MyProfilePage = () => {
  return (
    <SSRSafeSuspense fallback={<Loading />}>
      {isAuthed() ? <MyProfileForAuth /> : <MyProfileForUnAuth />}
    </SSRSafeSuspense>
  );
};

const MyProfileForUnAuth = () => {
  return (
    <>
      <TopHeader text="Profile" />
      <div className="flex flex-col gap-[2rem]">
        <div className="mb-[2rem] flex items-center gap-[1rem]">
          <Avatar size="large" />
          <div className="flex-grow">
            <h2 className="text-lg font-bold">로그인 / 회원가입</h2>
            <p className="text-sm text-placeholder">
              카카오로 3초만에 가입할 수 있어요.
            </p>
          </div>
          <Link href={KAKAO_LOGIN_URL}>
            <IconArrowRight width="20px" />
          </Link>
        </div>
        <div className="flex flex-col gap-[0.6rem]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">책장</h3>
          </div>
          <BookShelf>
            <div className="w-app pb-[2.5rem] pt-[2rem] shadow-[0px_20px_20px_-16px_#D1D1D1]">
              <BookShelf.Background />
              <div className="pb-[5.5rem] pt-[3rem] text-center">
                <p className="text-sm text-placeholder">책장이 비었어요.</p>
              </div>
            </div>
          </BookShelf>
        </div>
        <div className="flex flex-col gap-[0.6rem]">
          <h3 className="text-lg font-bold">참여한 모임</h3>
          <div className="pb-[5.5rem] pt-[5.5rem] text-center">
            <p className="text-sm text-placeholder">참여 중인 모임이 없어요.</p>
          </div>
        </div>
      </div>
    </>
  );
};

const MyProfileForAuth = () => {
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
