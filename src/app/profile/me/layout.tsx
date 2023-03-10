'use client';

import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import MoreIcon from '@public/icons/more.svg';
import AuthRequired from '@/ui/AuthRequired';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthRequired>
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
      {children}
    </AuthRequired>
  );
};

export default Layout;
