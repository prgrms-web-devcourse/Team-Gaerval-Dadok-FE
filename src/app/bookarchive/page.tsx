'use client';

import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

import { checkAuthentication } from '@/utils/helpers';

import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import BookArchiveForAuth from '@/components/bookArchive/BookArchiveForAuth';
import BookArchiveForUnAuth from '@/components/bookArchive/BookArchiveForUnAuth';
import TopHeader from '@/components/common/TopHeader';

import useIsScrollAtTop from '@/hooks/useIsScrollAtTop';

export default function BookArchivePage() {
  const { isScrollAtTop } = useIsScrollAtTop();

  return (
    <div className="flex w-full flex-col gap-[1rem] pb-[2rem]">
      <TopHeader blur={!isScrollAtTop}>
        <h1 className="text-main-900 font-heading-bold">BookArchive</h1>
      </TopHeader>
      {/* TODO: 스켈레톤 컴포넌트로 교체 */}
      <SSRSafeSuspense fallback={null}>
        <Contents />
      </SSRSafeSuspense>
    </div>
  );
}

const Contents = () => {
  const isAuthenticated = checkAuthentication();
  const { data: userData } = useMyProfileQuery({
    enabled: isAuthenticated,
  });

  const hasProfile = isAuthenticated && userData?.job?.jobGroupName;

  return hasProfile ? (
    <BookArchiveForAuth userJobGroup={userData.job.jobGroupName} />
  ) : (
    <BookArchiveForUnAuth />
  );
};
