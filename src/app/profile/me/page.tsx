'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import userAPI from '@/apis/user';

import { checkAuthentication, removeAuth } from '@/utils/helpers';

import { IconArrowRight } from '@public/icons';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';

import { KAKAO_LOGIN_URL } from '@/constants/url';
import userKeys from '@/queries/user/key';
import Avatar from '@/v1/base/Avatar';
import Button from '@/v1/base/Button';
import Loading from '@/v1/base/Loading';
import Menu from '@/v1/base/Menu';
import TopHeader from '@/v1/base/TopHeader';
import BookShelf from '@/v1/bookShelf/BookShelf';
import ProfileBookShelf from '@/v1/profile/bookShelf/ProfileBookShelf';
import ProfileGroup from '@/v1/profile/group/ProfileGroup';
import ProfileInfo from '@/v1/profile/info/ProfileInfo';
import { useQueryClient } from '@tanstack/react-query';

const USER_ID = 'me';

const MyProfilePage = () => {
  const isAuthenticated = checkAuthentication();
  return (
    <SSRSafeSuspense fallback={<Loading fullpage />}>
      {isAuthenticated ? <MyProfileForAuth /> : <MyProfileForUnAuth />}
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
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogoutButtonClick = async () => {
    await userAPI.logout();
    removeAuth();
    queryClient.removeQueries({ queryKey: userKeys.me(), exact: true });
    router.refresh();
  };

  return (
    <>
      <TopHeader text="Profile">
        <Menu>
          <Menu.Toggle />
          <Menu.DropdownList>
            <Menu.Item onSelect={handleLogoutButtonClick}>로그아웃</Menu.Item>
          </Menu.DropdownList>
        </Menu>
      </TopHeader>
      <div className="flex flex-col gap-[2rem]">
        <ProfileInfo userId={USER_ID} />
        <Link href="/profile/me/edit" className="w-full">
          <Button colorScheme="main-light" size="full">
            <span className="mr-[0.5rem] text-sm font-bold text-black-700">
              프로필 수정
            </span>
          </Button>
        </Link>
        <ProfileBookShelf userId={USER_ID} />
        <ProfileGroup userId={USER_ID} />
      </div>
    </>
  );
};

export default MyProfilePage;
