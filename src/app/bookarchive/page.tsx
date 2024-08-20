'use client';

import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

import { checkAuthentication } from '@/utils/helpers';

import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import BookArchiveForAuth from '@/v1/bookArchive/BookArchiveForAuth';
import BookArchiveForUnAuth from '@/v1/bookArchive/BookArchiveForUnAuth';
import TopHeader from '@/v1/base/TopHeader';

export default function BookArchivePage() {
  return (
    <div className="flex w-full flex-col gap-[1rem] pb-[2rem]">
      <TopHeader text="BookArchive" />
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

  return isAuthenticated ? (
    <BookArchiveForAuth userJobGroup={userData.job.jobGroupName} />
  ) : (
    <BookArchiveForUnAuth />
  );
};
