'use client';

import { Box } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useMyprofileQuery from '@/queries/user/useMyProfileQuery';
import ProfileInfo from '@/ui/ProfileInfo';

const MyProfilePage = () => {
  const userProfileQuery = useMyprofileQuery();
  const pathname = usePathname();

  if (userProfileQuery.isSuccess) {
    return (
      <ProfileInfo user={userProfileQuery.data}>
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
  }

  return null;
};

export default MyProfilePage;
