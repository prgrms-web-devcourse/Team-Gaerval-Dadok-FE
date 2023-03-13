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
import MyProfile from '@/ui/Profile/MyProfile';

const MyProfilePage = () => {
  return (
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
      <MyProfile />
    </VStack>
  );
};

export default MyProfilePage;
