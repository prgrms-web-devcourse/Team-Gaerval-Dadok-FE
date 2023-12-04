'use client';

import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { isAuthed } from '@/utils/helpers';
import { Suspense } from 'react';
import useMounted from '@/hooks/useMounted';
import BookArchiveForAuth from '@/v1/bookArchive/BookArchiveForAuth';
import BookArchiveForUnAuth from '@/v1/bookArchive/BookArchiveForUnAuth';
import TopHeader from '@/v1/base/TopHeader';

export default function BookArchivePage() {
  return (
    <div className="flex w-full flex-col gap-[1rem]">
      <TopHeader pathname="/bookarchive" />
      {/* TODO: 스켈레톤 컴포넌트로 교체 */}
      <Suspense fallback={null}>
        <Contents />
      </Suspense>
    </div>
  );
}

const Contents = () => {
  const { data: userData } = useMyProfileQuery({
    enabled: isAuthed(),
  });
  const mounted = useMounted();
  if (!mounted) return null;

  return isAuthed() ? (
    <BookArchiveForAuth userJobGroup={userData.job.jobGroupName} />
  ) : (
    <BookArchiveForUnAuth />
  );
};
