import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';

import Link from 'next/link';
import { Suspense } from 'react';
import MoreIcon from '@public/icons/more.svg';
import MyProfile from '@/ui/Profile/MyProfile';

const MyProfilePage = () => {
  return (
    <VStack justify="center" align="flex-start" gap="2rem">
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
      <Suspense
        fallback={
          <VStack gap="2rem" align="stretch">
            <SkeletonCircle size="8rem" />
            <Skeleton height="3rem" />
            <Skeleton height="4rem" />
            <Skeleton height="18rem" />
            <Skeleton height="25rem" />
          </VStack>
        }
      >
        <MyProfile />
      </Suspense>
    </VStack>
  );
};

export default MyProfilePage;
