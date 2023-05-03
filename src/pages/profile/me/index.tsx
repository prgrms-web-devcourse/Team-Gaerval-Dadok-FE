import { Box, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AuthRequired from '@/ui/AuthRequired';
import ProfileInfo from '@/ui/Profile/ProfileInfo';
import ProfileBookShelf from '@/ui/Profile/ProfileBookshelf';
import ProfileGroup from '@/ui/Profile/ProfileGroup';
import Button from '@/ui/common/Button';
import { Menu, MenuItem } from '@/ui/common/Menu';
import { removeAuth } from '@/utils/helpers';
import userAPI from '@/apis/users';

const MyProfilePage = () => {
  const { pathname, push } = useRouter();

  const handleLogoutButtonClick = async () => {
    await userAPI.logout();
    removeAuth();
    push('/');
  };

  return (
    <AuthRequired>
      <VStack justify="center" align="flex-start">
        <Box alignSelf="flex-end">
          <Menu>
            <MenuItem text="로그아웃" onClick={handleLogoutButtonClick} />
          </Menu>
        </Box>
        <VStack w="100%" align="flex-start" gap="2rem">
          <ProfileInfo userId="me">
            <Button
              as={Link}
              href={`${pathname}/edit`}
              scheme="orange"
              fullWidth
              bgColor="main"
              color="white.900"
            >
              프로필 수정
            </Button>
          </ProfileInfo>
          <ProfileBookShelf userId="me" />
          <ProfileGroup />
        </VStack>
      </VStack>
    </AuthRequired>
  );
};

export default MyProfilePage;
