import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react';

import Link from 'next/link';
import MoreIcon from '@public/icons/more.svg';
import AuthRequired from '@/ui/AuthRequired';
import ProfileInfo from '@/ui/Profile/ProfileInfo';
import ProfileBookShelf from '@/ui/Profile/ProfileBookshelf';
import ProfileGroup from '@/ui/Profile/ProfileGroup';
import { useRouter } from 'next/router';
import Button from '@/ui/common/Button';

const MyProfilePage = () => {
  const { pathname } = useRouter();

  return (
    <AuthRequired>
      <VStack justify="center" align="flex-start">
        <Box alignSelf="flex-end">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<MoreIcon />}
              background="inherit"
              border="none"
            />
            <MenuList fontSize="md">
              <MenuItem as={Link} href={'/logout'}>
                로그아웃
              </MenuItem>
            </MenuList>
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
