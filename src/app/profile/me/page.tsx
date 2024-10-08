'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import userAPI from '@/apis/user';
import userKeys from '@/queries/user/key';

import { deleteAuthSession } from '@/server/session';
import { deleteCookie } from '@/utils/cookie';
import { checkAuthentication } from '@/utils/helpers';
import useIsScrollAtTop from '@/hooks/useIsScrollAtTop';

import { SESSION_COOKIES_KEYS } from '@/constants';
import { IconArrowRight } from '@public/icons';

import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';

import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import Menu from '@/components/common/Menu';
import TopHeader from '@/components/common/TopHeader';
import LoginLink from '@/components/common/LoginLink';
import BookShelf from '@/components/bookShelf/BookShelf';
import ProfileBookShelf from '@/components/profile/bookShelf/ProfileBookShelf';
import ProfileGroup from '@/components/profile/group/ProfileGroup';
import ProfileInfo from '@/components/profile/info/ProfileInfo';

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
  const { isScrollAtTop } = useIsScrollAtTop();

  return (
    <>
      <TopHeader blur={!isScrollAtTop}>
        <h1 className="text-main-900 font-heading-bold">Profile</h1>
      </TopHeader>
      <div className="flex flex-col gap-[3rem]">
        <div className="mb-[2rem] flex items-center gap-[1rem]">
          <Avatar size="large" />
          <div className="flex-grow">
            <h2 className="pb-[0.2rem] font-subheading-bold">
              로그인 / 회원가입
            </h2>
            <p className="text-placeholder font-body2-regular">
              카카오로 3초만에 가입할 수 있어요.
            </p>
          </div>
          <LoginLink>
            <IconArrowRight width="20px" />
          </LoginLink>
        </div>
        <div className="flex flex-col gap-[0.6rem]">
          <div className="flex items-center justify-between">
            <h3 className="font-body1-bold">책장</h3>
          </div>
          <BookShelf>
            <div className="w-app pb-[2.5rem] pt-[2rem] shadow-[0px_20px_20px_-16px_#D1D1D1]">
              <BookShelf.Background />
              <BookShelf.EmptyText />
            </div>
          </BookShelf>
        </div>
        <div className="flex flex-col gap-[0.6rem]">
          <h3 className="font-body1-bold">참여한 모임</h3>
          <p className="py-[4rem] text-center text-placeholder font-body2-regular">
            참여 중인 모임이 없어요.
          </p>
        </div>
      </div>
    </>
  );
};

const MyProfileForAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isScrollAtTop } = useIsScrollAtTop();

  const handleLogoutButtonClick = async () => {
    try {
      await userAPI.logout();
      await deleteAuthSession();
    } finally {
      SESSION_COOKIES_KEYS.map(key => deleteCookie(key));
      queryClient.removeQueries({ queryKey: userKeys.me(), exact: true });
      router.refresh();
    }
  };

  return (
    <>
      <TopHeader
        className="flex items-center justify-between"
        blur={!isScrollAtTop}
      >
        <h1 className="text-main-900 font-heading-bold">Profile</h1>
        <Menu>
          <Menu.Toggle />
          <Menu.BottomSheetList>
            <Menu.Item onSelect={handleLogoutButtonClick}>로그아웃</Menu.Item>
          </Menu.BottomSheetList>
        </Menu>
      </TopHeader>
      <div className="flex flex-col gap-[1rem]">
        <ProfileInfo userId={USER_ID} />
        <Link href="/profile/me/edit" className="w-full">
          <Button colorScheme="main-light" size="full">
            <span className="mr-[0.5rem] text-black-700 font-body2-bold">
              프로필 수정
            </span>
          </Button>
        </Link>
        <div className="mt-[3rem] flex flex-col gap-[3rem]">
          <ProfileBookShelf userId={USER_ID} />
          <ProfileGroup userId={USER_ID} />
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
