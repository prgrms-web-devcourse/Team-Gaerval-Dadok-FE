'use client';

import { Box } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useMyprofileQuery from '@/queries/user/useMyProfileQuery';
import ProfileInfo from '@/ui/ProfileInfo';
import useMySummaryBookshlefQuery from '@/queries/bookshelf/useMySummaryBookshelfQuery';

const MyProfilePage = () => {
  const userProfileQuery = useMyprofileQuery();
  const bookshelfQuery = useMySummaryBookshlefQuery();
  const pathname = usePathname();

  const isSuccess = userProfileQuery.isSuccess && bookshelfQuery.isSuccess;
  if (!isSuccess) return null;

  return (
    <ProfileInfo
      user={userProfileQuery.data}
      summaryBookshelf={bookshelfQuery.data}
    >
      <Box
        as={Link}
        href={`${pathname}/edit`}
        px="2rem"
        py="1rem"
        color="main"
        border="1px solid"
        borderRadius="5rem"
        textAlign="center"
        fontSize="md"
      >
        프로필 수정
      </Box>
    </ProfileInfo>
  );
};

export default MyProfilePage;
