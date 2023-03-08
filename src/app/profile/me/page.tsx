'use client';

import { Box } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import useMyprofileQuery from '@/queries/user/useMyProfileQuery';
import ProfileInfo from '@/ui/ProfileInfo';
import useMySummaryBookshlefQuery from '@/queries/bookshelf/useMySummaryBookshelfQuery';
import { useEffect } from 'react';
import BottomNavigation from '@/ui/BottomNavigation';

const MyProfilePage = () => {
  const userProfileQuery = useMyprofileQuery();
  const bookshelfQuery = useMySummaryBookshlefQuery();
  const pathname = usePathname();
  const router = useRouter();

  const isSuccess = userProfileQuery.isSuccess && bookshelfQuery.isSuccess;

  useEffect(() => {
    if (!userProfileQuery.isSuccess) return;
    const {
      nickname,
      job: { jobGroupName, jobName },
    } = userProfileQuery.data;
    const isSavedAdditionalInfo = !!(nickname && jobGroupName && jobName);
    if (!isSavedAdditionalInfo) router.replace(`${pathname}/add`);
  }, [userProfileQuery, isSuccess, pathname, router]);

  if (!isSuccess) return null;

  return (
    <Box as="main" width="100%">
      <ProfileInfo
        user={userProfileQuery.data}
        summaryBookshelf={bookshelfQuery.data}
      >
        <Box
          as={Link}
          href={`${pathname}/edit`}
          color="main"
          border="1px solid"
          borderRadius="5rem"
          textAlign="center"
          fontSize="md"
        >
          프로필 수정
        </Box>
      </ProfileInfo>
      <BottomNavigation />
    </Box>
  );
};

export default MyProfilePage;
